/**
 * esbuild/tsup strips "use client" from bundled output.
 * Next App Router needs the directive at the top of every JS entry.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const distDir = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const entries = ["index.js", "index.mjs"];

let touched = 0;

for (const name of entries) {
  const file = join(distDir, name);
  if (!existsSync(file)) continue;

  const code = readFileSync(file, "utf8");
  if (code.startsWith('"use client"') || code.startsWith("'use client'")) {
    continue;
  }

  writeFileSync(file, `"use client";\n${code}`);
  touched += 1;
  console.log(`ensure-use-client: prepended "use client" to dist/${name}`);
}

if (touched === 0) {
  console.log("ensure-use-client: already present on all entries");
}
