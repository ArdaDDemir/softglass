# `@softglass/tokens`

CSS design tokens for [Softglass](https://github.com/ArdaDDemir/softglass).

## Install

```bash
npm install @softglass/tokens
```

## Usage

```css
@import "@softglass/tokens";
/* alias (Mantine-style): */
@import "@softglass/tokens/styles.css";
```

```html
<html data-softglass-theme="aurora">
```

Languages: `aurora` | `obsidian` | `mist` | `pearl`

Subpath exports:

- `@softglass/tokens` / `@softglass/tokens/styles.css` — full engine
- `@softglass/tokens/base`
- `@softglass/tokens/looks`
- `@softglass/tokens/motion`
- `@softglass/tokens/aurora` (and `obsidian` / `mist` / `pearl`)

See `docs/LANGUAGES.md` and `docs/GETTING-STARTED.md` in the monorepo.
