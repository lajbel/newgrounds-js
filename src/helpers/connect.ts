import { NewgroundsClient, NewgroundsConfig } from "../client";
import { getClient, setClient } from "../helpers";
import type { User } from "../types/objectModels";

export function connect(
    appID: string,
    encKey: string,
    config?: NewgroundsConfig,
) {
    const client = new NewgroundsClient(appID, encKey, config);

    setClient(client);

    return client;
}

const getSessionData = async () => {
    let session = await getClient().call("App.checkSession");
    return session?.result?.data;
};

export const login = async () => {
    let checkedSession = await getSessionData();

    return new Promise<User | null>(async (resolve, reject) => {
        let session = checkedSession?.session;

        if (!checkedSession.session) {
            session = await getClient().startSession();
        }

        if (session.user) {
            return resolve(session.user);
        }

        if (!session.passport_url) {
            throw new Error("No passport url found in session data");
        }

        let passportUrl = session.passport_url;

        const loginWindow = globalThis.open(
            passportUrl,
            "Newgrounds Passport",
            "height=600, width=800",
        );

        const checkInterval = setInterval(async () => {
            if (loginWindow?.closed) {
                const checkedSession = await getSessionData();

                if (checkedSession?.session?.user) {
                    clearInterval(checkInterval);
                    return resolve(checkedSession.session.user);
                } else {
                    clearInterval(checkInterval);
                    return resolve(null);
                }
            }
        }, 100);
    });
};
