import { NewgroundsClient } from "./newgrounds";
import { AppComponent } from "./components";
export { NewgroundsClient } from "./newgrounds";
export { AppComponent } from "./components";

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
    App: AppComponent;
    CloudSave: CloudSave;
    Event: Event;
    Gateway: Gateway;
    Loader: Loader;
    Medal: Medal;
    ScoreBoard: ScoreBoard;
};

export type ComponentCategory = Unionize<ComponentsCategories>;
export type Component<T> = T extends ComponentCategory ? Unionize<ComponentsCategories[T]> : never;
export type ReturnTypeOfComponentMethod<T extends ComponentCategory, M extends Component<T>> = T extends ComponentCategory
    ? M extends Component<T>
        ? ComponentsCategories[T][M] extends (...args: any[]) => any
            ? ReturnType<ComponentsCategories[T][M]>
            : never
        : never
    : never;

type A = ReturnTypeOfComponentMethod<"App", "getCurrentVersion">;
// export type ComponentAndMethod<T> = T extends `${infer C}.${infer M}` ? C extends Component ? M extends ComponentMethods<C> ? T : never : never : never;

/**
 * Handles loading and saving of game states.
 *
 * https://www.newgrounds.io/help/components/#cloudsave
 */
export declare class CloudSave {
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
}

/**
 * Handles logging of custom events.
 *
 * https://www.newgrounds.io/help/components/#event
 */
export declare class Event {}

/**
 * Provides information about the gateway server.
 */
export declare class Gateway {}

/**
 * This class handles loading various URLs and tracking referral stats.
 *
 * Note: These calls do not return any JSON packets (unless the redirect param is set to false). Instead, they redirect to the appropriate URL. These calls should be executed in a browser window vs using AJAX or any other internal loaders.
 *
 * https://www.newgrounds.io/help/components/#loader
 */
export declare class Loader {}

/**
 * Handles loading and unlocking of medals.
 *
 * https://www.newgrounds.io/help/components/#medal
 */
export declare class Medal {}

/**
 * Handles loading and posting of high scores and scoreboards.
 *
 * https://www.newgrounds.io/help/components/#scoreboard
 */
export declare class ScoreBoard {}

export type NewgroundsOpt = {
    debug?: boolean;
};

export default NewgroundsClient;
