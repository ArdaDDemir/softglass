# `@softglass/tokens`

CSS design tokens for [Softglass](https://github.com/ArdaDDemir/softglass).

## Install

```bash
npm install @softglass/tokens
```

**Version:** **`1.7.0`** — [npm](https://www.npmjs.com/package/@softglass/tokens) (pair with `@softglass/ui@1.7`).

**Publish account:** npm org `softglass` via personal **`ardaddemir` only** (never work/Feedemy).

## Usage

```css
@import "@softglass/tokens";
/* alias (Mantine-style): */
@import "@softglass/tokens/styles.css";
```

```html
<html data-softglass-theme="aurora">
```

Languages: `aurora` | `mist` | `pearl` | `obsidian` | `noir` | `ember`  
Dark family: `obsidian` · `noir` · `ember`

Subpath exports:

- `@softglass/tokens` / `@softglass/tokens/styles.css` — full engine
- `@softglass/tokens/base`
- `@softglass/tokens/looks`
- `@softglass/tokens/motion`
- `@softglass/tokens/aurora` (and `mist` / `pearl` / `obsidian` / `noir` / `ember`)

See `docs/LANGUAGES.md` and `docs/GETTING-STARTED.md` in the monorepo.
