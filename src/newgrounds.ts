import type { Newgrounds, NewgroundsOpt } from "./types";
import { setCrypto } from "./crypto";

class NewgroundsClient implements Newgrounds {
    constructor(appId: string, encryptionKey: string, opt: any) {
        this.appId = appId;
        this.encryptionKey = encryptionKey;
        this.options = opt;
    }

    CryptoJS: any;
    appId: string;
    encryptionKey: string;
    options: any;
    sessionId?: string;

    connect(appId: string, encryptionKey: string, opt: NewgroundsOpt): void {
        this.appId = appId;
        this.encryptionKey = encryptionKey;
        this.options = opt;

        setCrypto(this);

        const url = new URL(window.location.href);
        this.sessionId = url.searchParams.get("ngio_session_id") ?? undefined;
    }
}
