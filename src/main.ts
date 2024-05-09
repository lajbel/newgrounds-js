import { NewgroundsClient } from "./client.js";
import { getCloudData, setCloudData } from "./helpers/cloud.js";
import { connect, login } from "./helpers/connect.js";
import { unlockMedal } from "./helpers/medal.js";
import { getScores, postScore } from "./helpers/scoreboard.js";
import {
    getUsername,
    getVersion,
    isOnNewgrounds,
    isSupporter,
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
