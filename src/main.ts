import { NewgroundsClient } from "./client.js";
import { getArtURI } from "./helpers/art.js";
import { getCloudData, setCloudData } from "./helpers/cloud.js";
import { connect, login } from "./helpers/connect.js";
import { unlockMedal } from "./helpers/medal.js";
import { getScores, postScore } from "./helpers/scoreboard.js";
import { loadSoundID } from "./helpers/songs.js";
import {
    autoPing,
    getUsername,
    getVersion,
    isOnNewgrounds,
    isSupporter,
    isLoggedIn,
    ping,
} from "./helpers/util.js";
import type { NewgroundsJS } from "./types.js";

const newgrounds: NewgroundsJS = {
    connect,
    login,
    unlockMedal,
    getScores,
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
};

export {
    connect,
    getCloudData,
    getScores,
    getUsername,
    getVersion,
    isOnNewgrounds,
    isSupporter,
    login,
    NewgroundsClient,
    postScore,
    setCloudData,
    unlockMedal,
};

export default newgrounds;
