/**
 * Contains extra debugging information.
 */
interface Debug {
    /** The time, in milliseconds, that it took to execute a request. */
    exec_time: string;
    /** A copy of the request object that was posted to the server. */
    request: Request;
}

/**
 * Represents an error response from the server.
 */
interface Error {
    /** A code indicating the error type. */
    code: number;
    /** Contains details about the error. */
    message: string;
}

/**
 * Contains all the information needed to execute an API component.
 */
interface Execute {
    /** The name of the component you want to call, ie 'App.connect'. (Only required if 'secure' is not set.) */
    component?: string;
    /** An optional value that will be returned, verbatim, in the Result object. */
    echo?: any;
    /** An object of parameters you want to pass to the component. */
    parameters?: object | object[];
    /** A an encrypted Execute object or array of Execute objects. (Only required if 'component' is not set.) */
    secure?: string | string[];
}

/**
 * Contains information about a medal.
 */
export type Medal = {
    /** A short description of the medal. */
    description: string;
    /** The difficulty id of the medal. */
    difficulty: number;
    /** The URL for the medal's icon. */
    icon: string;
    /** The numeric ID of the medal. */
    id: number;
    /** The name of the medal. */
    name: string;
    /** Indicates if the medal is secret. */
    secret: boolean;
    /** Indicates if the medal is unlocked. */
    unlocked: boolean;
    /** The medal's point value. */
    value: number;
};

/**
 * A top-level wrapper containing any information needed to authenticate the application/user and any component calls being made.
 */
interface Request {
    /** Your application's unique ID. */
    app_id: string;
    /** If set to true, calls will be executed in debug mode. */
    debug?: boolean;
    /** An optional value that will be returned, verbatim, in the Response object. */
    echo?: any;
    /** A Execute object, or array of one-or-more Execute objects. */
    execute: Execute | Execute[];
    /** An optional login session id. */
    session_id?: string;
}

/**
 * Contains all return output from an API request.
 */
export interface Response<D extends object> {
    /** If there was an error, this will contain the current version number of the API gateway. */
    api_version?: string;
    /** Your application's unique ID. */
    app_id: string;
    /** Contains extra information you may need when debugging (debug mode only). */
    debug?: Debug;
    /** If you passed an 'echo' value in your request object, it will be echoed here. */
    echo?: any;
    /** This will contain any error info if the success property is false. */
    error?: Error;
    /** If there was an error, this will contain the URL for our help docs. */
    help_url?: string;
    /** This will be a Result object, or an array containing one-or-more Result objects. */
    result: Result<D>;
    /** If false, there was a problem with your 'request' object. Details will be in the error property. */
    success: boolean;
}

/**
 * Contains information returned by an API component.
 */
export type Result<T extends object> = {
    /** The name of the component that was executed (ie 'Medal.unlock'). */
    component: string;
    /** An object, or array of one-or-more objects, containing any returned properties or errors. */
    data: T;
    /** If you passed an 'echo' value in your execute object, it will be echoed here. */
    echo?: any;
    /** This will contain any error info if the success property is false. */
    error?: Error;
    /** If false, there was a problem with your 'request' object. Details will be in the error property. */
    success: boolean;
};

/**
 * Contains information about a CloudSave slot.
 */
export type SaveSlot = {
    /** A date and time (in ISO 8601 format) representing when this slot was last saved. */
    datetime: string;
    /** The slot number. */
    id: number;
    /** The size of the save data in bytes. */
    size: number;
    /** A unix timestamp representing when this slot was last saved. */
    timestamp: number;
    /** The URL containing the actual save data for this slot, or null if this slot has no data. */
    url: string | null;
};

/**
 * Contains information about a score posted to a scoreboard.
 */
export type Score = {
    /** The score value in the format selected in your scoreboard settings. */
    formatted_value: string;
    /** The tag attached to this score (if any). */
    tag: string;
    /** The user who earned score. If this property is absent, the score belongs to the active user. */
    user: User | null;
    /** The integer value of the score. */
    value: number;
};

/**
 * Contains information about a scoreboard.
 */
export type ScoreBoard = {
    /** The numeric ID of the scoreboard. */
    id: number;
    /** The name of the scoreboard. */
    name: string;
};

/**
 * Contains information about the current user session.
 */
export type Session = {
    /** If true, the session_id is expired. Use App.startSession to get a new one. */
    expired: boolean;
    /** A unique session identifier. */
    id: string;
    /** If the session has no associated user but is not expired, this property will provide a URL that can be used to sign the user in. */
    passport_url: string | null;
    /** If true, the user would like you to remember their session id. */
    remember: boolean;
    /** If the user has not signed in, or granted access to your app, this will be null. */
    user: User | null;
};

/**
 * Contains information about a user.
 */
export type User = {
    /** The user's icon images. */
    icons: UserIcons;
    /** The user's numeric ID. */
    id: number;
    /** The user's textual name. */
    name: string;
    /** Returns true if the user has a Newgrounds Supporter upgrade. */
    supporter: boolean;
};

/**
 * Contains any icons associated with this user.
 */
export type UserIcons = {
    /** The URL of the user's large icon. */
    large: string;
    /** The URL of the user's medium icon. */
    medium: string;
    /** The URL of the user's small icon. */
    small: string;
};
