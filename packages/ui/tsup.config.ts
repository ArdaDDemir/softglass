import { defineConfig } from "tsup";

/**
 * Publish build for @softglass/ui — same contract as Radix / Headless UI:
 * - CJS:  dist/index.js   + dist/index.d.ts
 * - ESM:  dist/index.mjs  + dist/index.d.mts
 * React stays external (peerDependency).
 * "use client" is prepended post-build (scripts/ensure-use-client.mjs).
 */
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  target: "es2020",
  splitting: false,
  external: ["react", "react-dom", "react/jsx-runtime"],
  outExtension({ format }) {
    return {
      js: format === "esm" ? ".mjs" : ".js",
    };
  },
});
