import { NewgroundsClient } from "./client.js";
import { getCloudData, setCloudData } from "./helpers/cloud.js";
import { loadSoundID } from "./helpers/songs.js";
import { connect, login } from "./helpers/connect.js";
import { unlockMedal } from "./helpers/medal.js";
import { getScores, postScore } from "./helpers/scoreboard.js";
import {
    autoPing,
    getUsername,
    getVersion,
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
    postScore,
    getUsername,
    getVersion,
    isSupporter,
    getCloudData,
    setCloudData,
    isOnNewgrounds,
    NewgroundsClient,
    ping,
    autoPing,
    loadSoundID,
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
