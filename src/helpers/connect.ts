import { NewgroundsClient } from "../client";
import { setClient } from "../helpers";
import { User } from "../types/objectModels";

export function connect(appID: string, encKey: string) {
    const client = new NewgroundsClient(appID, encKey);

    setClient(client);

    return client;
}

export function login() {
    const checkedSession = this.call("App.checkSession");

    return new Promise<User>((resolve, reject) => {
        if (checkedSession?.result?.data?.session?.user) {
            resolve(checkedSession.result.data.session.user);
        } else {
            const passportUrl = checkedSession.result.data.session.passport_url;

            globalThis.open(passportUrl, "Newgrounds Passport", "height=600,width=800");

            const checkInterval = setInterval(() => {
                const checkedSession = this.call("App.checkSession");

                if (checkedSession?.result?.data?.session?.user) {
                    console.log("User logged in!");
                    clearInterval(checkInterval);
                    resolve(checkedSession.result.data.session.user);
                }
            }, 6000);
        }
    });
}
