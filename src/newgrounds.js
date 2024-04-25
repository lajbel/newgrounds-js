import { connect } from "./functions/connect.js";
import { unlockMedal, getMedalText } from "./functions/medal";
import { postScore, getScores } from "./functions/scoreboard";
import { update, render } from "./functions/render";
import { getUsername, getVersion, isSupporter } from "./functions/util";
import { encryptCall, call } from "./functions/call";
import { getCloudData, setCloudData } from "./functions/cloud";

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
};

// windows functions to use easy with scratch
window.Connect = connect;
window.UnlockMedal = unlockMedal;
window.GetMedalText = getMedalText;
window.GetScores = getScores;
window.PostScore = postScore;
window.update = update;
window.render = render;
window.GetUsername = getUsername;
window.GetVersion = getVersion;
window.IsSupporter = isSupporter;
window.GetCloudData = getCloudData
window.SetCloudData = setCloudData;
window.call = call;
window.encryptCall = encryptCall;

module.exports = newgrounds;
