import { NewgroundsClient } from "./client.js";
import { getCloudData, setCloudData } from "./helpers/cloud.js";
import { connect, login } from "./helpers/connect.js";
import { unlockMedal } from "./helpers/medal.js";
import { getScores, postScore } from "./helpers/scoreboard.js";
import { getUsername, getVersion, isSupporter } from "./helpers/util.js";
import { NewgroundsJS } from "./types.js";

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
    NewgroundsClient,
};

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

for (const key in newgrounds) {
    globalThis[capitalizeFirstLetter(key)] = newgrounds[key];
}

export {
    connect,
    getCloudData,
    getScores,
    getUsername,
    getVersion,
    isSupporter,
    login,
    NewgroundsClient,
    postScore,
    setCloudData,
    unlockMedal,
};

export default newgrounds;
