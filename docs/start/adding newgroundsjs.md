---
layout: default
title: Adding Newgrounds.js
parent: Start Guide
nav_order: 2
---

# Adding Newgrounds.js

We will start loading Newgrounds.js module

index.html:

```html
<head>
    <script src="https://cdn.jsdelivr.net/npm/newgrounds.js/dist/newgrounds.js"></script>
</head>

<body>
    <script src="main.js"></script>
</body>
```

Now we have the main class exported to our global scope

main.js:

```js
NewgroundsClient(); // OK
```

## Connect with your ng project
