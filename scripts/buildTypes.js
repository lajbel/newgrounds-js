import fs from "fs/promises";
import ts from "typescript";

const distDir = "dist";

// check if folder dist exists, if not, create it
try {
    await fs.access(distDir);
} catch (e) {
    await fs.mkdir(distDir);
}

async function writeFile(path, content) {
    await fs.writeFile(path, content);
    console.log(`-> ${path}`);
}

export async function genDTS() {
    // generate .d.ts / docs data
    const dts = await fs.readFile(`${distDir}/first.d.ts`, "utf-8");

    const f = ts.createSourceFile(
        "ts",
        dts,
        ts.ScriptTarget.Latest,
        true,
    );

    function transform(o, f) {
        for (const k in o) {
            if (o[k] == null) {
                continue;
            }
            const v = f(k, o[k]);
            if (v != null) {
                o[k] = v;
            } else {
                delete o[k];
            }
            if (typeof o[k] === "object") {
                transform(o[k], f);
            }
        }
        return o;
    }

    // transform and prune typescript ast to a format more meaningful to us
    const stmts = transform(f.statements, (k, v) => {
        switch (k) {
            case "end":
            case "flags":
            case "parent":
            case "modifiers":
            case "transformFlags":
            case "modifierFlagsCache":
                return;
            case "name":
            case "typeName":
            case "tagName":
                return v.escapedText;
            case "pos":
                return typeof v === "number" ? undefined : v;
            case "kind":
                return ts.SyntaxKind[v];
            case "questionToken":
                return true;
            case "members": {
                const members = {};
                for (const mem of v) {
                    const name = mem.name?.escapedText;
                    if (!name || name === "toString") {
                        continue;
                    }
                    if (!members[name]) {
                        members[name] = [];
                    }
                    members[name].push(mem);
                }
                return members;
            }
            case "jsDoc": {
                const doc = v[0];
                const taglist = doc.tags ?? [];
                const tags = {};
                for (const tag of taglist) {
                    const name = tag.tagName.escapedText;
                    if (!tags[name]) {
                        tags[name] = [];
                    }
                    tags[name].push(tag.comment);
                }
                return {
                    doc: doc.comment,
                    tags: tags,
                };
            }
            default:
                return v;
        }
    });

    // check if global defs are being generated
    let globalGenerated = false;

    // generate global decls for KaboomCtx members
    let globalDts = "";
    let globalDtsImport = "import { KiboomPlugin } from \"./kiboom\"\n";

    globalDts += "declare global {\n";

    for (const stmt of stmts) {
        if (stmt.name === "KiboomPlugin") {
            if (stmt.kind !== "InterfaceDeclaration") {
                throw new Error("KiboomPlugin must be an interface.");
            }
            for (const name in stmt.members) {
                globalDts += `\tconst ${name}: KiboomPlugin["${name}"]\n`;
            }
            globalGenerated = true;
        }
    }

    globalDts += "}\n";

    if (!globalGenerated) {
        throw new Error("KaboomCtx not found, failed to generate global defs.");
    }

    writeFile(`${distDir}/kiboom.d.ts`, dts);
    writeFile(`${distDir}/global.d.ts`, globalDtsImport + globalDts);
    writeFile(`${distDir}/global.js`, "");
}
