import { App, Session } from "./types";

export class AppComponent implements App {
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
    getCurrentVersion(version: string): Promise<string | boolean> {
        throw new Error("Method not implemented.");
    }
    getHostLicense(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
