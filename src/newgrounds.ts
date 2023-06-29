import type { NewgroundsOpt } from "./types";
import { AppComponent } from "./components";

export class NewgroundsClient {
    /** Current app id. */
    appId: string;
    /** Current encryption key. */
    encryptionKey: string;
    /** Current options. */
    options: any;
    /** Current session id. */
    sessionId?: string;
    /** App component. */
    App: AppComponent;

    constructor(appId?: string, encryptionKey?: string, opt?: any) {
        this.appId = appId ?? "";
        this.encryptionKey = encryptionKey ?? "";
        this.options = opt;

        this.App = new AppComponent(this);
    }

    /** Connect with your Newgrounds project. */
    connect(appId: string, encryptionKey: string, opt: NewgroundsOpt): void {
        this.appId = appId;
        this.encryptionKey = encryptionKey;
        this.options = opt;

        const url = new URL(window.location.href);
        this.sessionId = url.searchParams.get("ngio_session_id") ?? undefined;
    }
}
