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

type Unionize<T extends object> = {
    [k in keyof T]: k;
}[keyof T];

export type ComponentsCategories = {
    App: App;
    CloudSave: CloudSave;
    Event: Event;
    Gateway: Gateway;
    Loader: Loader;
    Medal: Medal;
    ScoreBoard: ScoreBoard;
};

export type ComponentCategory = Unionize<ComponentsCategories>;
export type Component<T> = T extends ComponentCategory ? Unionize<ComponentsCategories[T]> : never;
// export type ComponentAndMethod<T> = T extends `${infer C}.${infer M}` ? C extends Component ? M extends ComponentMethods<C> ? T : never : never : never;

/**
 * Used to get and validate information associated with your app, including user sessions.
 *
 * https://www.newgrounds.io/help/components/#app
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
    /**
     * Increments "Total Views" statistic.
     *
     * http://www.newgrounds.io/help/components/#app-logview
     */
    logView(host: string): Promise<void>;
    /**
     * Starts a new session for the application.
     *
     * http://www.newgrounds.io/help/components/#app-startsession
     */
    startSession(force: boolean): Promise<Session>;
};

/**
 * Handles loading and saving of game states.
 *
 * https://www.newgrounds.io/help/components/#cloudsave
 */
export type CloudSave = {
    /**
     * Deletes all data from a save slot.
     *
     * https://www.newgrounds.io/help/components/#cloudsave-clearslot
     */
    clearSlot(id: string): Promise<void>;
    /**
     * Returns a specific saveslot object.
     *
     * https://www.newgrounds.io/help/components/#cloudsave-loadslot
     */
    loadSlot(id: string): Promise<{}>;
    /**
     * Returns a list of saveslot objects.
     *
     * https://www.newgrounds.io/help/components/#cloudsave-listslots
     */
    listSlots(): Promise<{}>;
};

/**
 * Handles logging of custom events.
 *
 * https://www.newgrounds.io/help/components/#event
 */
export type Event = {};

/**
 * Provides information about the gateway server.
 */
export type Gateway = {};

/**
 * This class handles loading various URLs and tracking referral stats.
 *
 * Note: These calls do not return any JSON packets (unless the redirect param is set to false). Instead, they redirect to the appropriate URL. These calls should be executed in a browser window vs using AJAX or any other internal loaders.
 *
 * https://www.newgrounds.io/help/components/#loader
 */
export type Loader = {};

/**
 * Handles loading and unlocking of medals.
 *
 * https://www.newgrounds.io/help/components/#medal
 */
export type Medal = {};

/**
 * Handles loading and posting of high scores and scoreboards.
 *
 * https://www.newgrounds.io/help/components/#scoreboard
 */
export type ScoreBoard = {};

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
     * Current session id.
     */
    sessionId?: string;
    /**
     * Connect with your Newgrounds project.
     */
    connect(appId: string, encryptionKey: string, opt: NewgroundsOpt): void;
};

export type NewgroundsOpt = {
    debug?: boolean;
};
