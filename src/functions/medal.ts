import { Newgrounds } from "../types/newgrounds";

export function unlockMedal(id: string | number): void {
	const ng: Newgrounds = this;

	if (!ng.medals || !ng.medals.find((m) => m.id == id)) return;

	const medal = this.medals.find((m) => m.id == id);

	if (medal.unlocked) return;
	medal.unlocked = true;

	this.call("Medal.unlock", { id: medal.id });
}

export function getMedalText(medal) {
	return unescape(medal.name + " (" + this.points[medal.difficulty - 1] + ")" + (this.showDescriptions ? " - " + medal.description : ""));
}
