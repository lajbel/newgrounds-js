![ngjsbanner](assets/newgrounds.js.png)

Newgrounds.js is the definitive library for connecting your game to the Newgrounds.io API.

## Features 🎁

- 🚀 Intuitive usage
- 📖 Full documented with guides and examples.
- 🌟 You can use the wrapper functions `unlockMedal` or make your own requests with `NewgroundsClient.call`
- 📦 Async/Await by default
- 📜 Full Typescript support
- 🍜 ESM and CommonJS support

## Installation 📦

You can install the package using your favorite node package manager.

```bash
npm i newgrounds.js
```

Also can use the CDN to include the library in your project.

```html
<script src="https://cdn.jsdelivr.net/npm/newgrounds.js/dist/newgrounds.js"></script>
```

## Example 📝

```js
import ng from "newgrounds.js";

// Connect to your project
await ng.connect("533327:b6GaR8Eb", "ivuwzsfewkqñwacRQ==");

// Request user login
await ng.login();

// Start using NG.io
await ng.unlockMedal(129521);
await ng.postScore(12052012, 50);
```

## Credits 🙏

- [Newgrounds.io](https://newgrounds.io) API
- [Javascript Wrapper](https://github.com/KilledByAPixel/newgrounds) by [KilledByAPixel](https://github.com/KilledByAPixel), used as the base for this library.
