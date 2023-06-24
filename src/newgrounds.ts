import type { NewgroundsOpt } from "./types";
import { AppComponent } from "./components";
import { setCrypto } from "./crypto";

export class NewgroundsClient {
    appId: string;
    encryptionKey: string;
    options: any;
    sessionId?: string;
    CryptoJS: any;
    App: AppComponent;

    constructor(appId?: string, encryptionKey?: string, opt?: any) {
        this.appId = appId ?? "";
        this.encryptionKey = encryptionKey ?? "";
        this.options = opt;

        this.App = new AppComponent(this);
    }

    connect(appId: string, encryptionKey: string, opt: NewgroundsOpt): void {
        this.appId = appId;
        this.encryptionKey = encryptionKey;
        this.options = opt;

        setCrypto(this);

        const url = new URL(window.location.href);
        this.sessionId = url.searchParams.get("ngio_session_id") ?? undefined;
    }
}
