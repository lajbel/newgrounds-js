import { NewgroundsClient } from "../client";
import { getClient, setClient } from "../helpers";
import type { User } from "../types/objectModels";

export function connect(appID: string, encKey: string) {
    const client = new NewgroundsClient(appID, encKey);

    setClient(client);

    return client;
}

export const login = async () => {
    const checkedSession = await getClient().call("App.checkSession");

    return new Promise<User>((resolve) => {
        if (checkedSession?.result?.data?.session?.user) {
            resolve(checkedSession.result.data.session.user);
        } else {
            const passportUrl = checkedSession.result.data.session.passport_url!;

            globalThis.open(passportUrl, "Newgrounds Passport", "height=600,width=800");

            const checkInterval = setInterval(async () => {
                const checkedSession = await getClient().call("App.checkSession");

                if (checkedSession?.result?.data?.session?.user) {
                    console.log("User logged in!");
                    clearInterval(checkInterval);
                    resolve(checkedSession.result.data.session.user);
                }
            }, 6000);
        }
    });
};
