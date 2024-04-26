import * as esbuild from "esbuild";

const srcPath = "src/main.ts";
const distDir = "dist";

const fmts = [
    {
        format: "iife",
        globalName: "newgrounds",
        outfile: `${distDir}/newgrounds.js`,
        footer: {
            js: "globalThis.newgrounds = newgrounds.default",
        },
    },
    { format: "cjs", outfile: `${distDir}/newgrounds.cjs` },
    { format: "esm", outfile: `${distDir}/newgrounds.mjs` },
];

/**
 * @type {esbuild.BuildOptions}
 */
const config = {
    bundle: true,
    sourcemap: true,
    minify: true,
    keepNames: true,
    entryPoints: [srcPath],
};

export async function build() {
    return Promise.all(fmts.map((fmt) => {
        return esbuild.build({
            ...config,
            ...fmt,
        }).then(() => console.log(`-> ${fmt.outfile}`));
    }));
}
