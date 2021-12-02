import { Medal } from "./medal";
import { Scoreboard } from "./score";
import { call } from "../functions/call";

export interface Newgrounds {
	appId?: string;
	cipher?: string;
	sessionId: string;
	scoreboards: Scoreboard[];
	medals: Medal[];
	displayMedalQueue: any[];
	config?: NewgroundsConf;
	call: typeof call;
}

export interface NewgroundsConf {
	medalDisplayTime?: number;
	showPopUps?: boolean;
	showDescriptions: boolean;
	debug: boolean;
}
