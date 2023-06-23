import { Newgrounds } from "./types";

export function encryptCall(app: Newgrounds, call: any) {
    if (!app.encryptionKey) return call;
        
    const aesKey = app.CryptoJS.enc.Base64.parse(app);
    const iv = app.CryptoJS.lib.WordArray.random(16);
    const encrypted = app.CryptoJS.AES.encrypt(JSON.stringify(call), aesKey, {iv});
    const secure = app.CryptoJS.enc.Base64.stringify(iv.concat(encrypted.ciphertext));

    call.secure = secure;
    call.parameters = null;
    return call;
};

export function call(component, parameters = false, async = true) {
    const call = this.encryptCall({component, parameters});
        
    const input =  {
        app_id: this.appID,
        session_id: this.sessionID,
        call
    };

    const formData = new FormData();
    formData.append('input', JSON.stringify(input));
        
    const xmlHttp = new XMLHttpRequest();
    const url = 'https://newgrounds.io/gateway_v3.php';

    xmlHttp.open('POST', url, this.debug ? false : async);
    xmlHttp.send(formData);
        
    if (xmlHttp.responseText) {
        if (this.debug) console.log(xmlHttp.responseText);

        this.responseText = xmlHttp.responseText;
        return JSON.parse(xmlHttp.responseText);
    };
};