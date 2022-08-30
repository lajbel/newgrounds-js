
declare module 'newgrounds.js' {
  /** connect with newgrounds.io */
  function connect(appID: number, cipher: string, config: any): void;
  /** unlock a medal for player */
  function unlockMedal(id: number): void;
  /** get the text of a medal */
  function getMedalText(medal: any): void;
  /** get the scores of a scoreboard */
  function getScore(id: number, user: string, period: string, social: boolean, skip: number, limit: number): void;
  /** post a score in a scoreboard */
  function postScore(id: number, value: number): void;
  /** get the username of player */
  function getUsername(): string;
  /** get the version in app settings */
  function getVersion(): string;
  /** check if player is supporter */
  function isSupporter(): string;
  /** set a cloud data */
  function setCloudData(id: number, value: any): void;
  /** get cloud data from slot */
  function getCloudData(id: number): any;
}
