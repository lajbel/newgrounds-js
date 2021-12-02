import { Medal } from "./medal";
import { Scoreboard } from "./score";

export interface Newgrounds {
    appId?: string;
    cipher?: string;
    sessionId: string;
    scoreboards: Scoreboard[];
    medals: Medal[];
    displayMedalQueue: any[];
    config?: NewgroundsConf;
};

export interface NewgroundsConf {
    medalDisplayTime?: number;
    showPopUps?: boolean;
    showDescriptions: boolean;
    debug: boolean;
};