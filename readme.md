![ngjsbanner](banner.png)

**Newgrounds.js** is the first good and complete library for use [Newgrounds.io](https://newgrounds.io) functions and utilities for your game. The best? You can use with any framework or game engine of Javascript or web tecnologies, like [Kaboom](https://kaboomjs.com) or [Phaser](https://phaser.io)

## Features 🎁
* Functions with everything your game needs
* Ability to call the components you want
* Full [**Typescript**](http://typescriptlang.org/) Support (wip)
* Use with NPM or use the Es6 Module

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

## Credits

[Javascript Wrapper](https://github.com/KilledByAPixel/newgrounds) by [KilledByAPixel](https://github.com/KilledByAPixel) <br>
[Javascript Re-Wrapper](https://github.com/lajbel/reversion-newgrounds) by [Me](https://github.com/lajbel)
