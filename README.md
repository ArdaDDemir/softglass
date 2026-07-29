# Softglass

**Open soft-glass design system for Next.js.**

One shared engine · four visual languages · you own the code (shadcn-style intent).

![Softglass — soft glass UI kit hero](./docs/assets/hero.svg)

<!-- Hero is hand-authored SVG (docs/assets/hero.svg), not AI-generated. -->


> **Pitch (one line):** Soft glass UI kit with four dialects — pick a language, recolor the brand, ship.

| Language | ID | Mood |
| --- | --- | --- |
| Aurora Glass | `aurora` | Calm pastel glass — default, eye-friendly |
| Obsidian Gloss | `obsidian` | Dark premium glass |
| Mist Panel | `mist` | Structural frosted chrome for dense apps |
| Pearl Soft | `pearl` | Warm cream glass for consumer brands |

## What it is (and is not)

| Is | Is not |
| --- | --- |
| Soft-glass **kit** (tokens + React components) | Full Chakra / MUI / Ant replacement |
| MIT + editable CSS variables | Locked closed theme SaaS |
| Next.js App Router first | Framework-agnostic mega-suite (yet) |
| `look` + `motion` design props | Animation playground product |

See [docs/LIMITATIONS.md](./docs/LIMITATIONS.md) for honest v1 boundaries.

## Consumer install (3 steps)

```bash
npm install @softglass/tokens @softglass/ui
```

```css
/* globals.css */
@import "@softglass/tokens";
```

```tsx
// layout: set language
<html data-softglass-theme="aurora">

// any client component
import { Button, Card, Input } from "@softglass/ui";

<Card surface="glass">
  <Input label="Email" />
  <Button>Continue</Button>
</Card>
```

Full walkthrough: [docs/GETTING-STARTED.md](./docs/GETTING-STARTED.md)

**Live packages**

- [`@softglass/tokens`](https://www.npmjs.com/package/@softglass/tokens) · [`@softglass/ui`](https://www.npmjs.com/package/@softglass/ui)
- Repo: [github.com/ArdaDDemir/softglass](https://github.com/ArdaDDemir/softglass) · tag `v1.2.0` (when published)

### Brand override (colors only)

```css
[data-softglass-theme="aurora"] {
  --sg-accent: #0ea5e9;
  --sg-accent-hover: #0284c7;
}
```

## Why Softglass exists

Most projects need the **same soft UI grammar** (rounded, glossy, translucent, calm) but not the **same colors**. Softglass separates:

1. **Engine** — radius, spacing, type, glass structure, atoms  
2. **Language** — surface recipes (opacity, blur, gloss, shadows)  
3. **Brand** — accent / semantic color overrides  

So you do not rebuild UI per project. You pick a language and recolor.

## Public model (like shadcn)

- **MIT** license — use, fork, ship commercially  
- **Copy ownership path** — registry sketch in `registry/` (CLI install later)  
- **npm packages today** — `@softglass/tokens` + `@softglass/ui` with dual CJS/ESM `dist`  
- **Not a locked theme kit** — CSS variables you can edit  

## Components (`@softglass/ui` v1)

| Layer | Component | Role |
| --- | --- | --- |
| Atom | `Button` | variant, size, rounded, look, motion, loading |
| Atom | `Input` / `Textarea` | label, hint, error, addons, look |
| Atom | `Badge` / `Avatar` | status + identity |
| Atom | `Switch` / `Checkbox` / `Radio` | soft controls |
| Atom | `Select` | custom glass dropdown |
| Atom | `Combobox` | type-to-filter single select — *1.1 Sprint D* |
| Atom | `MultiSelect` | multi value + chips — *1.1 Sprint D* |
| Atom | `Tooltip` | frost/solid/accent looks |
| Atom | `Spinner` / `Skeleton` / `Separator` | status & layout |
| Atom | `Alert` | info / success / warning / danger callout |
| Atom | `Label` / `FormField` | form composition |
| Molecule | `Card` | solid / glass / elevated |
| Molecule | `Modal` | portal, Escape, focus trap |
| Molecule | `DropdownMenu` | action menu (items API) — *1.1 Sprint A* |
| Molecule | `Popover` | anchored content panel — *1.1 Sprint A* |
| Molecule | `Toast` | provider + hook |
| Molecule | `Tabs` | pill / underline / segmented + keyboard |
| Organism | `AppShell` | header + optional sidebar |

```tsx
import { Button, Card, Input, AppShell } from "@softglass/ui";

<html data-softglass-theme="obsidian">
  <AppShell header={<>…</>} sidebar={<>…</>}>
    <Card surface="glass">
      <Button>Ship</Button>
      <Input label="Email" />
    </Card>
  </AppShell>
</html>
```

## This repo (playground)

```bash
npm install
npm run build:ui   # packages/ui → dist (required once / after UI edits)
npm run dev        # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Build UI then start playground |
| `npm run build` | UI + Next production build |
| `npm run typecheck` | UI TypeScript |
| `npm run pack:check` | `npm pack --dry-run` for both packages |
| `npm run registry:validate` | Generate + validate `registry.json` |
| `npm run registry:build` | Emit `apps/web/public/r/*.json` |

## Repo map

```
apps/web/                 Playground
packages/tokens/          CSS engine + 4 languages
packages/ui/              React components (src → dist)
registry.json             GitHub / shadcn registry entry (root)
registry/                 Synced catalog + notes
apps/web/public/r/        Built registry items (`npm run registry:build`)
docs/assets/hero.svg      README hero (hand-drawn SVG)
docs/GETTING-STARTED.md   Consumer 3-step guide
docs/REGISTRY.md          shadcn CLI / copy path
docs/API.md               Props map
docs/LIMITATIONS.md       Honest v1 limits
docs/LANGUAGES.md         Dialect guide
CHANGELOG.md              Release notes
CONTRIBUTING.md           PR rules
```

## Design rules (non-negotiable)

1. **Glass = chrome**, solid = long content (forms, tables, paragraphs)  
2. **No sharp corners** — soft radius scale  
3. **Gloss = thin top highlight**, not heavy skeuomorphic buttons  
4. **Mobile**: lower blur, fewer stacked glass layers  
5. Respect `prefers-reduced-transparency` and `prefers-reduced-motion`  

## Status

**v1.2.0 — ready to publish** (local release branch; npm/tag when you approve)

- [x] Four languages as CSS tokens  
- [x] Core UI kit + look + motion  
- [x] Dual `dist` for `@softglass/ui` (ESM `.mjs` + CJS `.js`, `.d.mts`/`.d.ts`)  
- [x] Publish-oriented `package.json` (conditional exports, files, peerDeps+Meta, LICENSE)  
- [x] Consumer getting-started + limitations + changelog  
- [x] CI workflow (typecheck + **test** + build + pack dry-run)  
- [x] npm org **`softglass`**  
- [x] Published **`@softglass/tokens@1.1.0`** + **`@softglass/ui@1.1.0`** (live until 1.2 publish)  
- [x] GitHub public repo + tag **`v1.1.0`** ([ArdaDDemir/softglass](https://github.com/ArdaDDemir/softglass))  
- [x] README hero visual  
- [x] shadcn registry path — root `registry.json` + `npm run registry:build` + [docs/REGISTRY.md](./docs/REGISTRY.md)  
- [x] v1.1 kit: Popover, DropdownMenu, Combobox, MultiSelect, exit motion  
- [x] v1.2 kit: ContextMenu, DatePicker (day/month/year), Vitest smokes, overlay body portals  

## Package naming

| Package | npm | Notes |
| --- | --- | --- |
| [`@softglass/tokens`](https://www.npmjs.com/package/@softglass/tokens) | **1.2.0** (pending publish) | CSS engine + 4 languages |
| [`@softglass/ui`](https://www.npmjs.com/package/@softglass/ui) | **1.2.0** (pending publish) | React components (peer: react, tokens ^1.2) |
| `softglass` (unscoped) | unused | we ship **scoped** packages only |

Install:

```bash
npm install @softglass/tokens @softglass/ui
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Keep PRs focused.

## License

MIT — see [LICENSE](./LICENSE).
