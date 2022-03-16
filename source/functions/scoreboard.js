export function getScores(id, user=0, period="A", social=0, skip=0, limit=10) {
    if(!this.scoreboards || !this.scoreboards.find(b => b.id == id)) return;
            
    const board = this.scoreboards.find(b => b.id == id);
    const scores = this.call('ScoreBoard.getScores',  {id:board.id, user, period, social, skip, limit}, 0);

    return scores.result?.data?.scores;
};

export function postScore(id, value) {
    if(!this.scoreboards || !this.scoreboards.find(b => b.id == id)) return;
            
    const board = this.scoreboards.find(b => b.id == id);

    this.call('ScoreBoard.postScore', {id:board.id, value});
};