# Changelog

All notable changes to Softglass are documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning follows [SemVer](https://semver.org/).

## [Unreleased] — 1.1.0 (ready to ship after PR)

Minor release candidate: overlays, motion exit, registry path, form depth. npm packages still **1.0.0** until publish.

### Added

- **`Popover`** — anchored non-modal frost panel (`trigger` + children)
- **`DropdownMenu`** — action menu (`items`: item / separator / label); `Button` trigger merge
- **`Combobox`** — type-to-filter single-select (option-only, no free create)
- **`MultiSelect`** — multi value + chips, optional `maxSelected`
- **`usePresence`** — shared exit hold for open overlays
- Root **`registry.json`** + `scripts/generate-registry.mjs` + built `apps/web/public/r/*`
- Docs: [REGISTRY.md](./docs/REGISTRY.md), API / LIMITATIONS / GETTING-STARTED updates

### Changed

- **Modal / Select / DropdownMenu / Popover** — enter **and** exit motion (`data-state`)
- **Toast** — leave duration sync, bottom stack `column-reverse`, reflow transitions
- **Card** — drop `contain: layout` so absolute menus are not trapped
- **Select open** — higher stacking so menus paint above following cards
- **MultiSelect** chips — larger remove hit target; placeholder vertically centered

### Parked (not in 1.1)

- ContextMenu, DatePicker, Card tilt, label-float, Vitest/Storybook/docs site (Sprint E / 1.2)

## [1.0.0] — 2026-07-29

First public release of the soft-glass design system for Next.js.

**Shipped:** npm `@softglass/tokens` + `@softglass/ui`, GitHub [ArdaDDemir/softglass](https://github.com/ArdaDDemir/softglass) tag `v1.0.0`, README hero.

### Added

#### Packages

- **`@softglass/tokens@1.0.0`** — CSS engine + 4 languages (Aurora, Obsidian, Mist, Pearl), looks, motion recipes; `styles.css` alias; LICENSE in tarball
- **`@softglass/ui@1.0.0`** — React components with **dual** publish contract (Radix-style):
  - ESM: `dist/index.mjs` + `dist/index.d.mts`
  - CJS: `dist/index.js` + `dist/index.d.ts`
  - peers: `react` / `react-dom` ^18||^19, `@softglass/tokens` ^1; optional `@types/*`
  - `"use client"` on both JS entries for Next App Router

#### Visual languages

- Aurora Glass (default, calm pastel)
- Obsidian Gloss (dark premium)
- Mist Panel (dense frosted chrome)
- Pearl Soft (warm cream)

#### Components

- **Atoms:** Button, Input, Textarea, Badge, Avatar/AvatarGroup, Switch, Select, Checkbox, Radio/RadioGroup, Tooltip, Spinner, Separator, Skeleton, Alert, Label, FormField
- **Molecules:** Card, Modal, Toast (`ToastProvider` + `useToast`), Tabs
- **Organism:** AppShell (+ ShellNav helpers)

#### Design APIs

- **`look`** prop — visual recipe independent of semantic variant
- **`motion`** prop — per-component CSS motion recipes + `prefers-reduced-motion`

#### Tooling & docs

- Monorepo playground (`apps/web`)
- `docs/API.md`, `docs/LANGUAGES.md`, `docs/PUBLIC-MODEL.md`, `docs/LIMITATIONS.md`, `docs/GETTING-STARTED.md`
- MIT license, CI typecheck + build workflow
- Local `npm pack` dry-run scripts

### Notes

- Modal uses body portal + basic focus trap
- Select is a custom glass control (not a full Radix clone) — see LIMITATIONS
- Registry CLI path is planned; v1 ships primarily as npm packages

## [0.1.0] — unreleased foundation

Internal foundation before public numbering: token engines, core kit, playground, motion waves 0–5 (partial).
