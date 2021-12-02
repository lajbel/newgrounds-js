import { Newgrounds } from "../types/newgrounds";
import { Score, GetScoreConf } from "../types/score";

export function getScores(c: GetScoreConf): Score[] {
	const ng: Newgrounds = this;

	if (!ng.scoreboards || !ng.scoreboards.find((b) => b.id == c.id)) return;
	const board = ng.scoreboards.find((b) => b.id == c.id);

	const scoreForSearch: GetScoreConf = {
		id: c.id,
		user: c.user ?? null,
		skip: c.skip ?? 0,
		limit: c.limit ?? 10,
		period: c.period ?? "A",
		social: c.social ?? false,
		tag: c.tag ?? null,
	};

	const scores = ng.call("ScoreBoard.getScores", scoreForSearch);
	return scores.result?.data?.scores;
}

export function postScore(id, value) {
	if (!this.scoreboards || !this.scoreboards.find((b) => b.id == id)) return;

	const board = this.scoreboards.find((b) => b.id == id);

	this.call("ScoreBoard.postScore", { id: board.id, value });
}
