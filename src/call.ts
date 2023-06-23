import { Newgrounds } from "./types";

export function encryptCall<T extends { secure?: string; parameters?: any }>(app: Newgrounds, call: T): T {
    if (!app.encryptionKey) return call;

    const aesKey = app.CryptoJS.enc.Base64.parse(app);
    const iv = app.CryptoJS.lib.WordArray.random(16);
    const encrypted = app.CryptoJS.AES.encrypt(JSON.stringify(call), aesKey, { iv });
    const secure = app.CryptoJS.enc.Base64.stringify(iv.concat(encrypted.ciphertext));

    call.secure = secure;
    call.parameters = null;
    return call;
}

export function call(app: Newgrounds, component: string, parameters: any, async: boolean = false) {
    const call = encryptCall(app, { component, parameters });

    const input = {
        app_id: app.appId,
        session_id: app.sessionId,
        call,
    };

    const formData = new FormData();
    formData.append("input", JSON.stringify(input));

    const xmlHttp = new XMLHttpRequest();
    const url = "https://newgrounds.io/gateway_v3.php";

    xmlHttp.open("POST", url, app.options.debug ? false : async);
    xmlHttp.send(formData);

    if (xmlHttp.responseText) {
        if (app.options.debug) console.log(xmlHttp.responseText);

        this.responseText = xmlHttp.responseText;
        return JSON.parse(xmlHttp.responseText);
    } else {
        return null;
    }
}
