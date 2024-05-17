import type {
    Medal,
    SaveSlot,
    Score,
    ScoreBoard,
    Session,
} from "./objectModels";

/**
 * The period of time to get scores for.
 *
 * - "D" for daily
 * - "W" for weekly
 * - "M" for monthly
 * - "Y" for yearly
 * - "A" for all time
 */
export type Period = "D" | "W" | "M" | "Y" | "A";

export type NGIOComponent = keyof NGIOData;

export type AppStartSessionData = {
    session: Session;
};

export type AppStartSessionParams = {
    force?: boolean;
};

export type AppGetCurrentVersionData = {
    client_deprecated: boolean;
    current_version: string;
};

export type AppGetCurrentVersionParams = {
    client_version?: string;
};

export type AppLogViewParams = {
    host: string;
};

export type CloudSaveClearSlotData = {
    slot: SaveSlot;
};

export type CloudSaveClearSlotParams = {
    id: number;
};

export type CloudSaveLoadSlotData = {
    app_id: string;
    slot: SaveSlot;
};

export type CloudSaveLoadSlotParams = {
    app_id?: string;
    id: number;
};

export type CloudSaveLoadSlotsData = {
    app_id: string;
    slots: SaveSlot[];
};

export type CloudSaveLoadSlotsParams = {
    app_id?: string;
};

export type CloudSaveSetDataData = {
    slot: SaveSlot;
};

export type CloudSaveSetDataParams = {
    data: string;
    id: number;
};

export type EventLogEventData = {
    event_name: string;
};

export type EventLogEventParams = {
    event_name: string;
    host: string;
};

export type GatewayGetDatetimeData = {
    datetime: string;
    timestamp: number;
};

export type GatewayGetDatetimeParams = {};

export type GatewayGetVersionData = {
    version: string;
};

export type GatewayGetVersionParams = {};

export type GatewayPingData = {
    pong: string;
};

export type GatewayPingParams = {};

export type LoaderLoadAuthorUrlData = {
    url: string;
};

export type LoaderLoadAuthorUrlParams = {
    host: string;
    log_stat?: boolean;
    redirect?: boolean;
};

export type LoaderLoadMoreGamesData = {
    url: string;
};

export type LoaderLoadMoreGamesParams = {
    host: string;
    log_stat?: boolean;
    redirect?: boolean;
};

export type LoaderLoadNewgroundsData = {
    url: string;
};

export type LoaderLoadNewgroundsParams = {
    host: string;
    log_stat?: boolean;
    redirect?: boolean;
};

export type LoaderLoadOfficialUrlData = {
    url: string;
};

export type LoaderLoadOfficialUrlParams = {
    host: string;
    log_stat?: boolean;
    redirect?: boolean;
};

export type LoaderLoadReferralData = {
    url: string;
};

export type LoaderLoadReferralParams = {
    host: string;
    referral_name: string;
    log_stat?: boolean;
    redirect?: boolean;
};

export type MedalGetListData = {
    app_id: string;
    medals: Medal[];
};

export type MedalGetListParams = {
    app_id: string;
};

export type MedalGetMedalScoreData = {
    medal_score: number;
};

export type MedalGetMedalScoreParams = {};

export type MedalUnlockData = {
    medal: Medal;
    medal_score: number;
};

export type MedalUnlockParams = {
    id: number;
};

export type ScoreBoardGetBoardsData = {
    scoreboards: ScoreBoard[];
};

export type ScoreBoardGetBoardsParams = {};

export type ScoreBoardGetScoresData = {
    app_id: string;
    limit: number;
    period: Period;
    scoreboard: ScoreBoard;
    scores: Score[];
    social?: boolean;
    user?: any;
};

export type ScoreBoardGetScoresParams = {
    app_id?: string;
    id?: number;
    limit?: number;
    period?: Period;
    skip?: number;
    social?: boolean;
    tag?: string;
    user?: string | number;
};

export type ScoreBoardPostScoreData = {
    score: Score;
    scoreboard: ScoreBoard;
};

export type ScoreBoardPostScoreParams = {
    id: number;
    tag?: string;
    value: number;
};

function handleFactory(location) {
    return (name) => `${location}.${name}`;
}

const handles = {
    'App': handleFactory('App'),
    'CloudSave': handleFactory('CloudSave'),
    'Event': handleFactory('Event'),
    'Gateway': handleFactory('Gateway'),
    'Loader': handleFactory('Loader'),
    'Medal': handleFactory('Medal'),
    'ScoreBoard': handleFactory('ScoreBoard'),
}

export type NGIOData = {
    "App.checkSession": AppStartSessionData;
    "App.endSession": {};
    "App.getCurrentVersion": AppGetCurrentVersionData;
    "App.logView": {};
    "App.startSession": AppStartSessionData;
    "CloudSave.clearSlot": CloudSaveClearSlotData;
    "CloudSave.loadSlot": CloudSaveLoadSlotData;
    "CloudSave.loadSlots": CloudSaveLoadSlotsData;
    "CloudSave.setData": CloudSaveSetDataData;
    "Event.logEvent": EventLogEventData;
    "Gateway.getDatetime": GatewayGetDatetimeData;
    "Gateway.getVersion": GatewayGetVersionData;
    "Gateway.ping": GatewayPingData;
    "Loader.loadAuthorUrl": LoaderLoadAuthorUrlData;
    "Loader.loadMoreGames": LoaderLoadMoreGamesData;
    "Loader.loadNewgrounds": LoaderLoadNewgroundsData;
    "Loader.loadOfficialUrl": LoaderLoadOfficialUrlData;
    "Loader.loadReferral": LoaderLoadReferralData;
    "Medal.getList": MedalGetListData;
    "Medal.getMedalScore": MedalGetMedalScoreData;
    "Medal.unlock": MedalUnlockData;
    "ScoreBoard.getBoards": ScoreBoardGetBoardsData;
    "ScoreBoard.getScores": ScoreBoardGetScoresData;
    "ScoreBoard.postScore": ScoreBoardPostScoreData;
};

export type NGIOParams = {
    "App.checkSession": {};
    "App.endSession": {};
    "App.getCurrentVersion": AppGetCurrentVersionParams;
    "App.logView": AppLogViewParams;
    "App.startSession": AppStartSessionParams;
    "CloudSave.clearSlot": CloudSaveClearSlotParams;
    "CloudSave.loadSlot": CloudSaveLoadSlotParams;
    "CloudSave.loadSlots": CloudSaveLoadSlotsParams;
    "CloudSave.setData": CloudSaveSetDataParams;
    "Event.logEvent": EventLogEventParams;
    "Gateway.getDatetime": GatewayGetDatetimeParams;
    "Gateway.getVersion": GatewayGetVersionParams;
    "Gateway.ping": GatewayPingParams;
    "Loader.loadAuthorUrl": LoaderLoadAuthorUrlParams;
    "Loader.loadMoreGames": LoaderLoadMoreGamesParams;
    "Loader.loadNewgrounds": LoaderLoadNewgroundsParams;
    "Loader.loadOfficialUrl": LoaderLoadOfficialUrlParams;
    "Loader.loadReferral": LoaderLoadReferralParams;
    "Medal.getList": MedalGetListParams;
    "Medal.getMedalScore": MedalGetMedalScoreParams;
    "Medal.unlock": MedalUnlockParams;
    "ScoreBoard.getBoards": ScoreBoardGetBoardsParams;
    "ScoreBoard.getScores": ScoreBoardGetScoresParams;
    "ScoreBoard.postScore": ScoreBoardPostScoreParams;
};
