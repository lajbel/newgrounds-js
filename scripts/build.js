import { buildSync } from "esbuild";

const formats = [
    { format: "iife", ext: "js" },
    { format: "cjs", ext: "cjs" },
    { format: "esm", ext: "mjs" },
];

let define = {};

formats.forEach((fmt) => {
    const srcPath = "src/newgrounds.js";
    const distPath = `dist/newgrounds.${fmt.ext}`;

    console.log(`${srcPath} -> ${distPath}`);

    if (fmt.ext === "cjs") {
        define["window"] = "global";
    }

    buildSync({
        bundle: true,
        sourcemap: true,
        target: "es6",
        minify: true,
        keepNames: true,
        entryPoints: [srcPath],
        globalName: "newgrounds",
        format: fmt.format,
        outfile: distPath,
        define,
    });
});
