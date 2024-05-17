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

export const login = async () => {
    const getSession = async () => (await getClient().call("App.checkSession"))?.result?.data
    const checkedSession = await getSession();

    return new Promise<User>((resolve) => {
        let session = checkedSession?.session;
        if (session?.user) return resolve(session.user);

        const passportUrl = session.passport_url!;

        globalThis.open(passportUrl, "Newgrounds Passport", "height=600,width=800");

        const checkInterval = setInterval(async () => {
            const checkedSession = await getSession();

            if (checkedSession?.session?.user) {
                console.log("User logged in!");
                clearInterval(checkInterval);
                resolve(checkedSession?.session.user);
            }
        }, 6000);
    });
};
