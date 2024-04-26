import CryptoJS from "crypto-js";

export function encryptCall(call) {
    if (!this.cipher) return call;

    const aesKey = CryptoJS.enc.Base64.parse(this.cipher);
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(call), aesKey, { iv });
    const secure = CryptoJS.enc.Base64.stringify(iv.concat(encrypted.ciphertext));

    call.secure = secure;
    call.parameters = null;

    return call;
}

export async function call(component, parameters = false, async = true) {
    const call = this.encryptCall({ component, parameters });

    const input = {
        app_id: this.appID,
        session_id: this.sessionID,
        call,
    };

    const formData = new FormData();
    formData.append("input", JSON.stringify(input));

    const url = "https://newgrounds.io/gateway_v3.php";

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
            mode: "cors",
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            if (this.debug) console.log(jsonResponse);
            return jsonResponse;
        } else {
            throw new Error("Network response was not ok.");
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        throw error;
    }
}
