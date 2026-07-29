# Softglass

**Open soft-glass design system for Next.js.**

One shared engine · four visual languages · you own the code (shadcn-style intent).

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
- **npm packages today** — `@softglass/tokens` + `@softglass/ui` with `dist` builds  
- **Not a locked theme kit** — CSS variables you can edit  

## Components (`@softglass/ui` v1)

| Layer | Component | Role |
| --- | --- | --- |
| Atom | `Button` | variant, size, rounded, look, motion, loading |
| Atom | `Input` / `Textarea` | label, hint, error, addons, look |
| Atom | `Badge` / `Avatar` | status + identity |
| Atom | `Switch` / `Checkbox` / `Radio` | soft controls |
| Atom | `Select` | custom glass dropdown |
| Atom | `Tooltip` | frost/solid/accent looks |
| Atom | `Spinner` / `Skeleton` / `Separator` | status & layout |
| Atom | `Alert` | info / success / warning / danger callout |
| Atom | `Label` / `FormField` | form composition |
| Molecule | `Card` | solid / glass / elevated |
| Molecule | `Modal` | portal, Escape, focus trap |
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

## Repo map

```
apps/web/                 Playground
packages/tokens/          CSS engine + 4 languages
packages/ui/              React components (src → dist)
registry/                 shadcn-compatible sketch
docs/GETTING-STARTED.md   Consumer 3-step guide
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

**v1.0.0 — publish-ready preparation**

- [x] Four languages as CSS tokens  
- [x] Core UI kit + look + motion  
- [x] Dual `dist` for `@softglass/ui` (ESM `.mjs` + CJS `.js`, `.d.mts`/`.d.ts`) — Radix-style  
- [x] Publish-oriented `package.json` (conditional exports, files, peerDeps+Meta, LICENSE)  
- [x] Consumer getting-started + limitations + changelog  
- [x] CI workflow (typecheck + build + pack dry-run)  
- [x] Create npm org **`softglass`** (owner = personal account)  
- [ ] First publish `@softglass/tokens` + `@softglass/ui` (manual, after GitHub)  
- [ ] GitHub public remote + tag `v1.0.0` (manual — no auto-push)  
- [ ] README hero screenshot / GIF  
- [ ] Full shadcn registry host + CLI install  

## Package naming

| Package | npm | Notes |
| --- | --- | --- |
| `@softglass/tokens` | not published yet | org `softglass` ready |
| `@softglass/ui` | not published yet | org `softglass` ready |
| `softglass` (unscoped) | free | we still use scoped packages |

CLI must be logged in as the **personal** user who owns the `softglass` org before publish.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Keep PRs focused.

## License

MIT — see [LICENSE](./LICENSE).
