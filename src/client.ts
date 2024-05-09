import CryptoJS from "crypto-js";
import type { NGIOComponent, NGIOData, NGIOParams } from "./types/components";
import type { NGIOResponse } from "./types/objectModels";

export type NewgroundsConfig = {
    debug?: boolean;
};

export class NewgroundsClient {
    private _appID: string;
    private _cipher: string;
    private _sessionID: string | null;
    private _debug: boolean;

    constructor(appID: string, cipher: string, config?: NewgroundsConfig) {
        this._appID = appID;
        this._cipher = cipher;
        this._debug = config?.debug ?? false;

        const url = new URL(globalThis.location.href);
        this._sessionID = url.searchParams.get("ngio_session_id") ?? null;

        if (!this._sessionID) {
            const startSession = async () => {
                const sessionStarted = await this.call("App.startSession");
                this._sessionID = sessionStarted.result.data.session.id;
            };

            startSession();
        }
    }

    private encryptCall(call) {
        if (!this._cipher) return call;

        const aesKey = CryptoJS.enc.Base64.parse(this._cipher);
        const iv = CryptoJS.lib.WordArray.random(16);
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(call), aesKey, {
            iv,
        });
        const secure = CryptoJS.enc.Base64.stringify(
            iv.concat(encrypted.ciphertext),
        );

        call.secure = secure;
        call.parameters = null;

        return call;
    }

    async call<C extends NGIOComponent>(
        component: C,
        parameters?: NGIOParams[C],
    ): Promise<NGIOResponse<NGIOData[C]>> {
        const call = this.encryptCall({ component, parameters });

        const input = {
            app_id: this._appID,
            session_id: this._sessionID,
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

                if (this._debug) {
                    console.log("Newgrounds API Response:", jsonResponse);
                }

                return jsonResponse;
            } else {
                throw new Error("Network response was not ok.");
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            throw error;
        }
    }
}
