import { connect } from "./functions/connect.js";
import { unlockMedal, getMedalText } from "./functions/medal.js";
import { postScore, getScores } from "./functions/scoreboard.js";
import { update, render } from "./functions/render.js";
import { username, version, isSupporter } from "./functions/util.js";
import { encryptCall, call } from "./functions/call.js";

const newgrounds = {
    connect: connect,
    unlockMedal: unlockMedal,
    getMedalText: getMedalText,
    getScores: getScores,
    postScore: postScore,
    update: update,
    render: render,
    username: username,
    version: version,
    isSuporter: isSupporter,
    call: call,
    encryptCall: encryptCall
};

module.exports = newgrounds;