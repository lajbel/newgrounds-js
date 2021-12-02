import { User } from "./user";

export interface Score {
	formatted_value: string;
	tag: string;
	user: User;
	value: number;
}

export interface GetScoreConf {
	id: string;
	user?: string | number;
	skip?: number;
	limit?: number;
	period?: "D" | "W" | "M" | "Y" | "A";
	social?: boolean;
	tag?: string;
}

export interface Scoreboard {
	name?: string;
	id?: string | number;
}
