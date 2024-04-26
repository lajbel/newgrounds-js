import { NewgroundsClient } from "./client.js";
import { getCloudData, setCloudData } from "./helpers/cloud.js";
import { connect, login } from "./helpers/connect.js";
import { unlockMedal } from "./helpers/medal.js";
import { getScores, postScore } from "./helpers/scoreboard.js";
import { getUsername, getVersion, isSupporter } from "./helpers/util.js";

/**  newgrounds.js object */
const newgrounds = {
    connect,
    unlockMedal,
    getScores,
    postScore,

    getUsername,
    getVersion,
    isSupporter,
    getCloudData,
    setCloudData,
    login,
    NewgroundsClient,
};

// windows functions to use easy with scratch
// TODO: Automate
globalThis.Connect = connect;
globalThis.UnlockMedal = unlockMedal;
globalThis.GetScores = getScores;
globalThis.PostScore = postScore;
globalThis.GetUsername = getUsername;
globalThis.GetVersion = getVersion;
globalThis.IsSupporter = isSupporter;
globalThis.GetCloudData = getCloudData;
globalThis.SetCloudData = setCloudData;

export default newgrounds;
