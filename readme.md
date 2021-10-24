# JavaScript Wrapper for Newgrounds.io V3

This is a Javascript Library for use the [Newgrounds.io](https://newgrounds.io) functions for your games, like medals or scoreboards!!!

## Example

```js
const newgrounds = require("newgrounds.js");

newgrounds.init("221592:52192", "fas1234klleal21542as/==");

newgrounds.unlockMedal(129521);
newgrounds.postScore(12052012, 50);
```

## Functions

`unlockMedal(id)`: Get the medal with the `id` <br>
`postScores(id, score)`: Post `score` in the scoreboard with the `id` <br>
`getScores(id, user, period, social, skip, limit)`: [Score Object](http://www.newgrounds.io/help/objects/#score) - Return a Scores Object] 
`username()`: Get the username of the newgrounds session <br>
`version()`: Get the version of the newgrounds game <br>
`isSupporter()`: Get boolean of supporter user  <br>
`call(component, parameters?)`: Call any component of [Newgrounds.io](https://newgrounds.io) 

## Install

npm: `npm i newgrounds.js` <br>
script: `<script src="https://cdn.jsdelivr.net/npm/newgrounds.js@latest/dist/newgrounds.js"></script>` <br>
cdn: [jsdelivr](https://cdn.jsdelivr.net/npm/newgrounds.js@latest/dist/newgrounds.mjs) or [unpkg](https://unpkg.com/newgrounds.js@latest/dist/newgrounds.mjs)

## TODO

* Typescript Support

## Credits

[Javascript Wrapper](https://github.com/KilledByAPixel/newgrounds) by [KilledByAPixel](https://github.com/KilledByAPixel) <br>
[Javascript Re-Wrapper](https://github.com/lajbel/reversion-newgrounds) by [Me](https://github.com/lajbel)