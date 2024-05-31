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
    return session?.result?.data
}

export const login = async () => {
    let checkedSession = await getSessionData();

    return new Promise<User>((resolve) => {
        let session = checkedSession?.session;
        if (session?.user) {
            return resolve(session.user);
        }
        
        let passportUrl = session.passport_url!;

        globalThis.open(
            passportUrl,
            "Newgrounds Passport",
            "height=600,width=800",
        );

        const checkInterval = setInterval(async () => {
            const checkedSession = await getSessionData();

            if (checkedSession?.session?.user) {
                console.log("User logged in!");
                clearInterval(checkInterval);
                resolve(checkedSession.session.user);
            }
        }, 6000);
        
    });
};
