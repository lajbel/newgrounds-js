// This file builds the project
import esbuild from "esbuild";
import fs from "fs";

const distDir = "dist";
const srcDir = "src";
const srcPath = "src/main.ts";

// Build all formats
const formats = [
    {
        format: "iife",
        globalName: "newgrounds",
        outfile: `${distDir}/newgrounds.js`,
        footer: {
            js: "window.NewgroundsClient = newgrounds.default",
        },
    },
    { format: "cjs", outfile: `${distDir}/newgrounds.cjs` },
    { format: "esm", outfile: `${distDir}/newgrounds.mjs` },
];

const config = {
    bundle: true,
    sourcemap: true,
    minify: true,
    keepNames: true,
    loader: {
        ".png": "dataurl",
        ".glsl": "text",
        ".mp3": "binary",
    },
    entryPoints: [srcPath],
    inject: [`lib/aes.js`],
    external: ["./newgrounds"],
};

formats.forEach((fmt) => {
    esbuild
        .build({
            ...config,
            ...fmt,
        })
        .then(() => console.log(`-> ${fmt.outfile}`));
});
