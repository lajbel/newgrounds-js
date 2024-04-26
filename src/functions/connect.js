export function connect(appID, cipher = 0, config = {}) {
    this.appID = appID;
    this.cipher = cipher;

    this.medalDisplayTime = config.medalDisplayTime || 5;
    this.showPopups = config.showPopups || true;
    this.showDescriptions = config.showDescriptions || true;
    this.debug = config.debug || false;

    this.points = [5, 10, 25, 50, 100];
    this.displayMedalQueue = [];

    const url = new URL(globalThis.location.href);
    this.sessionID = url.searchParams.get("ngio_session_id") ?? null;

    if (!this.sessionID) {
        const sessionStarted = this.call("App.startSession");
        this.sessionID = sessionStarted.result.data.session.id;
    }

    const scoreboardResult = this.call("ScoreBoard.getBoards", 0, 0);
    this.scoreboards = scoreboardResult?.result?.data?.scoreboards ?? [];

    const resultMedals = this.call("Medal.getList", 0, 0);
    this.medals = resultMedals?.result?.data?.medals ?? [];

    for (const medal of this.medals) {
        medal.image = new Image();
        medal.image.src = medal.icon;

        if (this.debug) medal.unlocked = 0;
    }
}

export function login() {
    const checkedSession = this.call("App.checkSession");

    if (!checkedSession?.result?.data?.session?.user) {
        const passportUrl = checkedSession.result.data.session.passport_url;

        globalThis.open(passportUrl, "Newgrounds Passport", "height=600,width=800");
    }

    const checkInterval = setInterval(() => {
        const checkedSession = this.call("App.checkSession");

        if (checkedSession?.result?.data?.session?.user) {
            console.log("User logged in!");
            clearInterval(checkInterval);
        }
    }, 6000);
}
