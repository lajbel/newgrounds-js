import type { AppComponent as AppComponentType, Session } from "./types";
import { NewgroundsClient } from "./newgrounds";
import { call } from "./call";

export class AppComponent implements AppComponentType {
    ngClient: NewgroundsClient;

    constructor(ngClient: NewgroundsClient) {
        this.ngClient = ngClient;
    }

    logView(host: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    startSession(force: boolean): Promise<Session> {
        throw new Error("Method not implemented.");
    }
    checkSession(): Promise<Session> {
        throw new Error("Method not implemented.");
    }
    endSession(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getCurrentVersion(): Promise<{ client_deprecated: boolean; current_version: string }> {
        return call(this.ngClient, "App", "getCurrentVersion");
    }
    getHostLicense(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
