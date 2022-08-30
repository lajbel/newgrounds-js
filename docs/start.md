---
layout: default
title: Starting on
nav_order: 2
---

# Starting on

## Installation
### Node.JS

```
npm i newgrounds.js
```

```js
const ngio = require("newgrounds.js");

ngio.connect("55143:RrL4bDjH", "6kB/g/l9dLIdHFXLn4T69g==")")
```

### CDN

```js
import { newgrounds as ngio } from "https://cdn.jsdelivr.net/npm/newgrounds.js@3.1.0/dist/newgrounds.mjs"

ngio.connect("55143:RrL4bDjH", "6kB/g/l9dLIdHFXLn4T69g==")")
```

### HTML Tag

index.js
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<script src="https://cdn.jsdelivr.net/npm/newgrounds.js@3.1.0/dist/newgrounds.js"></script>
	<title>Document</title>
</head>
<body>
	<script>
	    newgrounds.connect("55143:RrL4bDjH", "6kB/g/l9dLIdHFXLn4T69g==")")
	</script>
</body>
</html>
```