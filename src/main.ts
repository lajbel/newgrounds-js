import { NewgroundsClient } from "./client.js";
import { getArtURI } from "./helpers/art.js";
import { getCloudData, setCloudData } from "./helpers/cloud.js";
import { connect, login } from "./helpers/connect.js";
import { getMedals, unlockMedal } from "./helpers/medal.js";
import { getScores, postScore } from "./helpers/scoreboard.js";
import { loadSoundID } from "./helpers/songs.js";
import {
    autoPing,
    getSession,
    getUsername,
    getVersion,
    isLoggedIn,
    isOnNewgrounds,
    isSupporter,
    ping,
} from "./helpers/util.js";
import type { NewgroundsJS } from "./types.js";

const newgrounds: NewgroundsJS = {
    connect,
    login,
    unlockMedal,
    getScores,
    getSession,
    postScore,
    getUsername,
    getVersion,
    isSupporter,
    isLoggedIn,
    getCloudData,
    setCloudData,
    isOnNewgrounds,
    NewgroundsClient,
    ping,
    autoPing,
    loadSoundID,
    getArtURI,
    getMedals,
};

export {
    autoPing,
    connect,
    getArtURI,
    getCloudData,
    getMedals,
    getScores,
    getSession,
    getUsername,
    getVersion,
    isLoggedIn,
    isOnNewgrounds,
    isSupporter,
    loadSoundID,
    login,
    NewgroundsClient,
    ping,
    postScore,
    setCloudData,
    unlockMedal,
};

export default newgrounds;
