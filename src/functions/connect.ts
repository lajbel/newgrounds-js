import { setCrypto } from "../crypto.js";
import { Newgrounds, NewgroundsConf } from "../types/newgrounds";

export function connect(appId: string, cipher: string, config?: NewgroundsConf): void {
	const ng: Newgrounds = this;
	setCrypto(ng);

	ng.appId = appId;
	ng.cipher = cipher;

	ng.config.medalDisplayTime = config.medalDisplayTime || 5;
	ng.config.showPopUps = config.showPopUps || true;
	ng.config.showDescriptions = config.showDescriptions || true;
	ng.config.debug = config.debug || false;

	ng.displayMedalQueue = [];

	ng.sessionId = new URL(window.location.href).searchParams.get("ngio_session_id") ?? "";
	ng.scoreboards = ng.call("ScoreBoard.getBoards", 0).result?.data?.scoreboards ?? [];
	ng.medals = ng.call("Medal.getList", 0).result?.data?.medals ?? [];

	// Load medal images
	for (const medal of ng.medals) {
		medal.image = new Image();
		medal.image.src = medal.icon;

		if (ng.config.debug) medal.unlocked = false;
	}
}
