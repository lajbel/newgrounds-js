function renderMedal(context, id, x, y, h, alpha = .5) {
    if (!this.medals || !this.medals.find(m => m.id == id)) return;

    context.save();
    context.fillStyle = "#fff";
    context.strokeStyle = "#000";
    context.shadowColor = "#000";
    context.textBaseline = "middle";
    context.textAlign = "left";
    context.font = (h / 2) + "px impact";
    context.lineWidth = h / 35;
    context.shadowBlur = h / 5;
    context.globalAlpha = alpha;

    const medal = this.medals.find(m => m.id == id);

    context.drawImage(medal.image, x, y, h, h);
    context.strokeRect(x, y, h, h);

    const points = this.points[medal.difficulty - 1];
    const text = this.getMedalText(medal);
    context.lineWidth = Math.max(1, h / 26);
    context.strokeText(text, x + h * 1.2, y + h / 2);
    context.fillText(text, x + h * 1.2, y + h / 2);
    context.restore();
}

export function update(delta) {
    if (this.displayMedalQueue?.length) {
        const medal = this.displayMedalQueue[0];
        medal.time += delta;

        if (medal.time > this.medalDisplayTime) this.displayMedalQueue.shift();
    }
}

export function render(context, size = 50) {
    if (this.displayMedalQueue?.length) {
        const medal = this.displayMedalQueue[0];
        const slideOnPecent = medal.time < 1 ? 1 - medal.time : 0;
        const alpha = medal.time > this.medalDisplayTime - 1 ? this.medalDisplayTime - medal.time : 1;

        const y = context.canvas.height + slideOnPecent * size * 1.5;
        renderMedal(context, medal.index, 0, y - size, size, alpha);
    }
}
