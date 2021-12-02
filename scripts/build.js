const esbuild = require("esbuild");
const ts = require("typescript");

const formats = [
    { format: "iife", ext: "js",  },
	{ format: "cjs",  ext: "cjs", },
	{ format: "esm",  ext: "mjs", },
];

formats.forEach((fmt) => {
	const srcPath = "source/newgrounds.ts";
	const distPath = `dist/newgrounds.${fmt.ext}`;

	console.log(`${srcPath} -> ${distPath}`);

	esbuild.buildSync({
		bundle: true,
		sourcemap: false,
		target: "es6",
		minify: true,
		keepNames: true,
		entryPoints: [ srcPath ],
		globalName: "newgrounds",
		format: fmt.format,
		outfile: distPath,
	});
});