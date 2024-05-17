import type { NewgroundsClient, NewgroundsConfig } from "./client";
import type { ScoreBoardGetScoresParams } from "./types/components";
import type { SaveSlot, Score, User } from "./types/objectModels";

export interface NewgroundsJS {
    /**
     * Create a client and connect to the Newgrounds API
     *
     * @param appID The app id found on the Newgrounds API project page
     * @param encKey The encryption key found on the Newgrounds API project page
     *
     * @returns A new NewgroundsClient
     */
    connect(
        appID: string,
        encKey: string,
        config?: NewgroundsConfig,
    ): NewgroundsClient;
    /**
     * Log in the user
     *
     * @returns The user that was logged in
     */
    login(): Promise<User>;
    /**
     * Unlock a medal
     *
     * @param medalID The id of the medal to unlock
     *
     * @returns A boolean indicating if the medal was unlocked
     */
    unlockMedal(medalID: number): Promise<boolean>;
    /**
     * Get the scores for a scoreboard
     *
     * @param scoreboardID The id of the scoreboard to get scores from
     *
     * @returns Scores corresponding to the scoreboard
     */
    getScores(
        scoreboardID: number,
        opt: ScoreBoardGetScoresParams,
    ): Promise<Score[]>;
    /**
     * Post a score to a scoreboard
     *
     * @param scoreboardID The id of the scoreboard to post the score to
     * @param value The value of the score
     *
     * @returns The Score that was posted to the board.
     */
    postScore(scoreboardID: number, value: number): Promise<Score>;
    /**
     * Get the username of the current user
     *
     * @returns The username of the current user, if they are logged in
     */
    getUsername(): Promise<string | undefined>;
    /**
     * Get the version of your Newgrounds Project
     *
     * @returns The version of your Newgrounds Project
     */
    getVersion(): Promise<string>;
    /**
     * Check if the current user is a supporter
     *
     * @returns A boolean indicating if the user is a supporter, if they are logged in
     */
    isSupporter(): Promise<boolean | undefined>;
    /**
     * Get cloud data from a save slot
     *
     * @param id The id of the save slot
     *
     * @returns The data stored in the save slot
     */
    getCloudData(id: number): Promise<string>;
    /**
     * Set cloud data in a save slot
     *
     * @param id The id of the save slot
     * @param value The value to store in the save slot
     *
     * @returns The save slot that was updated
     */
    setCloudData(id: number, value: string): Promise<SaveSlot>;
    /**
     * Check if the game is current running on Newgrounds.com
     *
     * @returns A boolean indicating if the game is running on Newgrounds.com
     */
    isOnNewgrounds(): boolean;
    /**
     * Pings the Newgrounds API
     *
     * @returns "pong"
     */
    ping(): Promise<string>;
    /**
     * Automatically pings the Newgrounds API, this is useful for keeping the session alive
     *
     * @param ms The interval in milliseconds
     */
    autoPing(ms: number): void;
    /**
    * A function to load a sound as a ArrayBuffer based on the provided ID.
    *
    * @param {string} id - The ID of the sound to load.
    * @return {Promise<ArrayBuffer>} A promise that resolves with the loaded sound as an ArrayBuffer.
    */
    loadSoundID(id: string | number): Promise<ArrayBuffer>;
    /**
     * The NewgroundsClient class
     */
    NewgroundsClient: typeof NewgroundsClient;
}

export declare const ng: NewgroundsJS;
export declare const connect: NewgroundsJS["connect"];
export declare const login: NewgroundsJS["login"];
export declare const unlockMedal: NewgroundsJS["unlockMedal"];
export declare const getScores: NewgroundsJS["getScores"];
export declare const postScore: NewgroundsJS["postScore"];
export declare const getUsername: NewgroundsJS["getUsername"];
export declare const getVersion: NewgroundsJS["getVersion"];
export declare const isSupporter: NewgroundsJS["isSupporter"];
export declare const getCloudData: NewgroundsJS["getCloudData"];
export declare const setCloudData: NewgroundsJS["setCloudData"];
export declare const loadSoundID: NewgroundsJS["loadSoundID"];


export default ng;
