# Softglass playground (`apps/web`)

Next.js App Router playground for the Softglass design system (tokens + UI).

## Run

From monorepo root:

```bash
npm install
npm run build:ui   # packages/ui → dist (required after UI edits)
npm run dev        # http://localhost:3000
```

Or from this package after a root install + UI build:

```bash
npm run dev
```

## What you get

- Live component demos (atoms / molecules / 1.4 sections)
- Theme switcher (Aurora / Obsidian / Mist / Pearl)
- Docs prop tables (`src/lib/docs.ts`)
- Built registry JSON under `public/r/` (`npm run registry:build` from root)

Sidebar highlights: **1.4a Disclosure & nav** · **1.4b Surface** · **1.4c Structure** · **1.4d Form polish**

## Docs

- Root [README](../../README.md)
- [Getting started](../../docs/GETTING-STARTED.md)
- [API](../../docs/API.md) · [Limitations](../../docs/LIMITATIONS.md)
- [CHANGELOG](../../CHANGELOG.md) — current **v1.4.0**
