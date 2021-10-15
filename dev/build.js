const esbuild = require("esbuild");

const formats = [
    { format: "iife", ext: "js",  },
	{ format: "cjs",  ext: "cjs", },
	{ format: "esm",  ext: "mjs", },
];

formats.forEach((fmt) => {
	const srcPath = "source/newgrounds.js";
	const distPath = `dist/newgrounds.${fmt.ext}`;

	console.log(`${srcPath} -> ${distPath}`);

	esbuild.buildSync({
		bundle: true,
		sourcemap: true,
		target: "es6",
		minify: true,
		keepNames: true,
		entryPoints: [ srcPath ],
		globalName: "Newgrounds",
		format: fmt.format,
		outfile: distPath,
	});
});