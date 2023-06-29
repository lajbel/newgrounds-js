import type { Session } from "./types";
import { NewgroundsClient } from "./newgrounds";
import { call } from "./call";

/**
 * Used to get and validate information associated with your app, including user sessions.
 *
 * https://www.newgrounds.io/help/components/#app
 */
export class AppComponent {
    ngClient: NewgroundsClient;

    constructor(ngClient: NewgroundsClient) {
        this.ngClient = ngClient;
    }

    /**
     * Checks the validity of a session id and returns the results in a Session object.
     *
     * http://www.newgrounds.io/help/components/#app-checksession
     */
    checkSession(): Promise<Session> {
        throw new Error("Method not implemented.");
    }
    /**
     * Ends the current session, if any.
     *
     * http://www.newgrounds.io/help/components/#app-endsession
     */
    endSession(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    /**
     * Gets the version number of the app as defined in your "Version Control" settings.
     *
     * http://www.newgrounds.io/help/components/#app-getcurrenversion
     */
    getCurrentVersion(): Promise<{ client_deprecated: boolean; current_version: string }> {
        return call(this.ngClient, "App", "getCurrentVersion");
    }
    /**
     * Checks a client-side host domain against domains defined in your "Game Protection" settings.
     *
     * http://www.newgrounds.io/help/components/#app-gethostlicense
     */
    getHostLicense(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    /**
     * Increments "Total Views" statistic.
     *
     * http://www.newgrounds.io/help/components/#app-logview
     */
    logView(host: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    /**
     * Starts a new session for the application.
     *
     * http://www.newgrounds.io/help/components/#app-startsession
     */
    startSession(force: boolean): Promise<Session> {
        throw new Error("Method not implemented.");
    }
}
