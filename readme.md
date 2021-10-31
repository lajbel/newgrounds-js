# JavaScript Wrapper for Newgrounds.io V3

This is a Javascript Library for use the [Newgrounds.io](https://newgrounds.io) functions for your games, like medals or scoreboards!!!

## Example

```js
const newgrounds = require("newgrounds.js");

newgrounds.connect("533327:b6GaR8Eb", "ivuwzsfewkqñwacRQ==");

newgrounds.unlockMedal(129521);
newgrounds.postScore(12052012, 50);
```

## Install

npm: `npm i newgrounds.js` <br>
cdn: [jsdelivr](https://cdn.jsdelivr.net/npm/newgrounds.js@latest/dist/newgrounds.mjs) or [unpkg](https://unpkg.com/newgrounds.js@latest/dist/newgrounds.mjs)

## TODO

* Typescript Support
* Medal/Scoreboard name support for functions

## Credits

[Javascript Wrapper](https://github.com/KilledByAPixel/newgrounds) by [KilledByAPixel](https://github.com/KilledByAPixel) <br>
[Javascript Re-Wrapper](https://github.com/lajbel/reversion-newgrounds) by [Me](https://github.com/lajbel)