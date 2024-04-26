import { getClient } from "../helpers";
import { ScoreBoardGetScoresParams } from "../types/components";

export const getScores = async (id: number, opt: ScoreBoardGetScoresParams) => {
    const scores = await getClient()
        .call("ScoreBoard.getScores", opt);

    return scores.result?.data?.scores;
};

export const postScore = async (id: number, value: number) => {
    const scores = await getClient.call("ScoreBoard.postScore", { id, value });
};
