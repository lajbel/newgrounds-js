import { NewgroundsClient } from "./client";
import { call, encryptCall } from "./functions/call";
import { getCloudData, setCloudData } from "./functions/cloud";
import { connect, login } from "./functions/connect.js";
import { getMedalText, unlockMedal } from "./functions/medal";
import { render, update } from "./functions/render";
import { getScores, postScore } from "./functions/scoreboard";
import { getUsername, getVersion, isSupporter } from "./functions/util";

/**  newgrounds.js object */
const newgrounds = {
    connect,
    unlockMedal,
    getMedalText,
    getScores,
    postScore,
    update,
    render,
    getUsername,
    getVersion,
    isSupporter,
    call,
    encryptCall,
    getCloudData,
    setCloudData,
    login,
    NewgroundsClient,
};

// windows functions to use easy with scratch
globalThis.Connect = connect;
globalThis.UnlockMedal = unlockMedal;
globalThis.GetMedalText = getMedalText;
globalThis.GetScores = getScores;
globalThis.PostScore = postScore;
globalThis.update = update;
globalThis.render = render;
globalThis.GetUsername = getUsername;
globalThis.GetVersion = getVersion;
globalThis.IsSupporter = isSupporter;
globalThis.GetCloudData = getCloudData;
globalThis.SetCloudData = setCloudData;
globalThis.call = call;
globalThis.encryptCall = encryptCall;

export default newgrounds;
