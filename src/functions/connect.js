import { setCrypto } from "../crypto.js";

export function connect(appID, cipher = 0, config = {}) {
    this.appID = appID;
    this.cipher = cipher;

    let ngObj = this;

    setCrypto(ngObj);

    this.medalDisplayTime = config.medalDisplayTime || 5;
    this.showPopups = config.showPopups || true; 
    this.showDescriptions = config.showDescriptions || true;
    this.debug = config.debug || false;

    this.points = [5, 10, 25, 50, 100];
    this.displayMedalQueue = [];

    const url = new URL(window.location.href);
    this.sessionID = url.searchParams.get('ngio_session_id') ?? 0;

    const scoreboardResult = this.call('ScoreBoard.getBoards', 0, 0);
    this.scoreboards = scoreboardResult?.result?.data?.scoreboards ?? [];

    const resultMedals = this.call('Medal.getList', 0, 0);
    this.medals = resultMedals?.result?.data?.medals ?? [];

    for (const medal of this.medals) {
        medal.image = new Image();
        medal.image.src = medal.icon;

        if (this.debug) medal.unlocked = 0;
    };
};