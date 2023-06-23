export type User = {
    icons: UserIcons;
    id: number;
    name: string;
    supporter: boolean;
};

export type UserIcons = {
    small: string;
    medium: string;
    large: string;
};

export type Session = {
    expired: boolean;
    id: string;
    passport_url: string;
    remember: boolean;
    user: User;
};

/**
 * Used to get and validate information associated with your app, including user sessions.
 */
export type App = {
    /**
     * Checks the validity of a session id and returns the results in a Session object.
     *
     * http://www.newgrounds.io/help/components/#app-checksession
     */
    checkSession(): Promise<Session>;
    /**
     * Ends the current session, if any.
     *
     * http://www.newgrounds.io/help/components/#app-endsession
     */
    endSession(): Promise<void>;
    /**
     * Gets the version number of the app as defined in your "Version Control" settings.
     *
     * http://www.newgrounds.io/help/components/#app-getcurrenversion
     */
    getCurrentVersion(version: string): Promise<string | boolean>;
    /**
     * Checks a client-side host domain against domains defined in your "Game Protection" settings.
     *
     * http://www.newgrounds.io/help/components/#app-gethostlicense
     */
    getHostLicense(): Promise<boolean>;
};

export type Newgrounds = {
    CryptoJS: any;
    /**
     * Current app id.
     */
    appId: string;
    /**
     * Current encryption key.
     */
    encryptionKey: string;
    /**
     * Current options.
     */
    options: NewgroundsOpt;
    /**
     * Connect with your Newgrounds project.
     */
    connect(appId: string, encryptionKey: string, opt: NewgroundsOpt): void;
};

export type NewgroundsOpt = {
    debug?: boolean;
};
