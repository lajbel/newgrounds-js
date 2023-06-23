import { App, Session } from "./types";

class NGApp implements App {
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
