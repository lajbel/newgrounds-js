import { NewgroundsClient, ComponentCategory, Component, ReturnTypeOfComponentMethod } from "./types";
declare const CryptoJS: any;

export function encryptCall<T extends { secure?: string; parameters?: any }>(app: NewgroundsClient, call: T): T {
    console.log("aaa");

    if (!app.encryptionKey) return call;

    console.log(CryptoJS);

    const aesKey = CryptoJS.enc.Base64.parse(app.encryptionKey);
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(call), aesKey, { iv });
    const secure = CryptoJS.enc.Base64.stringify(iv.concat(encrypted.ciphertext));

    call.secure = secure;
    call.parameters = null;
    return call;
}

export function call<T extends ComponentCategory, T2 extends Component<T>>(
    app: NewgroundsClient,
    component: T,
    method: T2,
    parameters?: any,
    async?: boolean
): ReturnTypeOfComponentMethod<T, T2> {
    const call = encryptCall(app, { component: `${component}.${method}`, parameters });

    const input = {
        app_id: app.appId,
        session_id: app.sessionId,
        call,
    };

    const formData = new FormData();
    formData.append("input", JSON.stringify(input));

    const xmlHttp = new XMLHttpRequest();
    const url = "https://newgrounds.io/gateway_v3.php";

    xmlHttp.open("POST", url, app.options.debug ?? false);
    xmlHttp.send(formData);

    if (xmlHttp.responseText) {
        console.log(xmlHttp.responseText);

        // this.responseText = xmlHttp.responseText;
        return JSON.parse(xmlHttp.responseText).result?.data;
    } else {
        return null as ReturnTypeOfComponentMethod<T, Component<T>>;
    }
}
