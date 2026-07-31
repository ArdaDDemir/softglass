# Changelog

All notable changes to Softglass are documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning follows [SemVer](https://semver.org/).

## [Unreleased]

## [1.7.0] — 2026-07-31

Minor release: **DataTable** (sort · selection · virtualization), Component Studio gallery, product list recipe.

**Ship:** npm `@softglass/tokens@1.7.0` + `@softglass/ui@1.7.0`, GitHub tag `v1.7.0`  
**Accounts:** gh **ArdaDDemir** · npm **ardaddemir** only (not work/Feedemy).

### Added (DataTable)

- **`DataTable`** — sort, row selection (`none` / `single` / `multiple`), sticky header, density, looks, loading skeletons, empty state
- Compounds: `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`
- **`Checkbox` `indeterminate`** (select-all mixed state)
- **`getRowLabel`** for selection accessibility
- **`virtualized`** — native spacer windowing (`estimateRowHeight` · `maxHeight` · `overscan`); no extra deps
- Tokens: `sg-data-table*` / `sg-table*` / spacer rows
- Studio: `#library/datatable` + 1k-row virtualized showcase
- Gallery **App** page: product list recipe (PageHeader + filter + DataTable + Pagination)

### Added (gallery — Component Studio)

- **Component Studio** inside Softglass Gallery Library (`#library/<id>`)
- Shared **ComponentStudio** chrome: back · live stage · controls · showcase strips · docs prop table
- Hash routing: `#library` list · `#library/button` (etc.) detail; `hashchange` supported
- Live playgrounds for **all** `COMPONENT_DOCS` exports (atoms, fields, molecules, overlays, shell, DataTable)

### Docs / quality

- API + LIMITATIONS for DataTable virtualization bounds
- Registry entry `data-table`
- `@softglass/ui` peer: `@softglass/tokens` **^1.7.0**

### Deferred / not in 1.7.0

- Variable row height virtualization; cell edit; column resize
- Theme builder SaaS, Storybook farm, marketing site

## [1.5.0] — 2026-07-31

Minor release: **organism shell, product patterns, date range, six languages, Softglass Gallery.**

**Ship:** npm `@softglass/tokens@1.5.0` + `@softglass/ui@1.5.0`, GitHub tag `v1.5.0`  
**Accounts:** gh **ArdaDDemir** · npm **ardaddemir** only (not work/Feedemy).

### Added (1.5a — Shell)

- **`AppShell`** — desktop collapsible rail; mobile left **Sheet** nav; `layoutReady` hydration-safe media
- **`AppShellMenuButton`** · **`AppShellCollapseButton`** · **`useAppShell`**
- **`ShellNavItem`** — optional `icon`; collapsed glyph fallback
- **`PageHeader`** — title / description / breadcrumbs / actions; looks plain|soft|solid|glass
- Tokens: `--sg-sidebar-width-collapsed`, page-header chrome, collapsed rail styles

### Added (1.5b — Patterns)

- **`SettingsSection`** — title / description / actions / form body; looks soft|solid|glass|plain
- **`CommandPalette`** — minimal search + list + keyboard select (substring filter; groups); flat render-order index

### Added (1.5c — Quality)

- **`DatePicker` `mode="range"`** — start/end ISO; swap if inverted; in-range highlight
- Softglass **Gallery** playground (paginated, mobile-first tour)
- API + LIMITATIONS refresh

### Added (languages)

- **`noir`** — Noir Velvet (dark · rose)
- **`ember`** — Ember Dusk (dark · amber)
- Six languages total: 3 light · 3 dark (`obsidian` · `noir` · `ember`)

### Docs / quality

- Theme bootstrap allowlist includes all six languages
- Registry expanded; Vitest smokes for shell, palette, range
- `@softglass/ui` peer: `@softglass/tokens` **^1.5.0**

### Deferred / not in 1.5.0

- DataTable, full fuzzy command palette, dual-month calendar, TimePicker suite
- Theme builder SaaS, Storybook farm

## [1.4.0] — 2026-07-30

Minor release: **molecule set** — disclosure/nav, surface, structure, form/overlay polish.

**Ship:** npm `@softglass/tokens@1.4.0` + `@softglass/ui@1.4.0`, GitHub tag `v1.4.0`  
**Accounts:** gh **ArdaDDemir** · npm **ardaddemir** only (not work/Feedemy).

### Added (1.4a — Disclosure & nav)

- **`Collapsible`** — single panel; controlled/uncontrolled; looks soft/solid/glass/outline/ghost
- **`Accordion`** — `items[]` API; type single | multiple; same looks
- **`Breadcrumb`** — path trail; reuses `Link`; looks plain/soft/pill
- **`Pagination`** — page / pageCount; compact + numbered; looks soft/solid/ghost/glass

### Added (1.4b — Surface)

- **`EmptyState`** — icon / title / description / actions; solid default
- **`Sheet`** — edge panel (Drawer alias in docs); side left | right | bottom; portal + presence + focus trap
- **`HoverCard`** — delayed preview (Popover family); openDelay / closeDelay; body portal

### Added (1.4c — Structure)

- **`Stepper`** — steps[] + activeStep; looks soft/solid/outline/**dots**/**pills**
- **`Toolbar`** — composition shell + Group / Spacer / Separator; looks soft/solid/glass/ghost/accent
- **`List`** — ListItem host; density; dividers; looks soft/solid/outline/ghost/inset
- **`Stat`** — KPI tile; label/value/hint/trend; looks solid/soft/glass/outline/accent

### Changed (1.4d — Form polish)

- **`DatePicker`** — panel **body-portaled** with flip/clamp (Select language; no longer absolute to field only)
- **`MultiSelect`** — **filter-in-menu** (default on)
- **`Combobox`** — async skeleton: `onSearch` + `loading` / `loadingMessage`

### Docs / quality

- Playground sections: 1.4a Disclosure & nav · 1.4b Surface · 1.4c Structure · 1.4d Form polish
- `docs/API.md` + `LIMITATIONS.md` updated (portal shipped; range still deferred)
- Registry expanded (~79 items); Vitest smokes for new molecules + polish paths
- `@softglass/ui` peer: `@softglass/tokens` **^1.4.0**

### Deferred / not in 1.4.0

- DataTable, full Command palette, Menubar, nested modals
- Date **range**, creatable Combobox chaos, Calendar/Month/Year extract
- Framer Motion, theme builder SaaS, Storybook farm

## [1.3.0] — 2026-07-30

Minor release: atom layer close-out — feedback, form, chrome, Should + Nice atoms.

**Shipped:** npm `@softglass/tokens@1.3.0` + `@softglass/ui@1.3.0`, GitHub tag `v1.3.0` (account: **ArdaDDemir** / npm **ardaddemir** only).

### Added (Must — 1.3a–c)

- **`Progress`** — linear value / indeterminate; sizes; looks soft/solid/glass/accent/striped; semantic variants
- **`StatusDot`** — online/busy/offline/away + custom color; looks soft/solid/outline/glow
- **`Slider`** — single value; min/max/step; field meta; looks
- **`NumberInput`** — steppers; empty → `null`; soft pill shell + looks
- **`FileField`** — solid/soft/dashed/ghost pickers; local file list (no upload)
- **`Link`**, **`Chip`** (selectable/removable + filter/check variants), **`CloseButton`**
- **`PasswordInput`**, **`SearchInput`**, **`VisuallyHidden`**

### Added (Should — 1.3d)

- **`CircularProgress`**, **`SegmentedControl`**, **`Kbd`**, **`Code`**, **`SkipLink`**
- **`PinInput`**, **`NavLink`**, **`ListItem`**, **`CharacterCount`**, **`Fieldset`**
- **`Icon`** (wrapper only), **`Image`** (fallback), **`Meter`**, **`CopyButton`**
- **`TimeInput`** — custom Softglass HH:mm (not OS picker)
- **`ClientOnly`**, **`ScrollArea`**, **`Rating`** (SVG stars + shell), **`AspectRatio`**

### Added (Nice — 1.3e)

- **`RangeSlider`**, **`ToggleGroup`**, **`CountBadge`**
- **`ColorSwatch`**, **`ColorInput`**
- **`Highlight`**, **`Truncate`**, **`LiveRegion`** (visible Softglass banner)
- **`NativeDateInput`** — custom day/month/year steppers (YYYY-MM-DD; not OS date chrome)
- **`Text`**, **`Heading`** (lightweight; not a full typography kit)

### Changed

- Playground sections for 1.3a–e; expanded `docs/API.md` + `LIMITATIONS.md`
- Registry generator includes new atoms (`registry.json` ~68 items)
- Vitest smokes expanded for new controls
- `@softglass/ui` peer: `@softglass/tokens` **^1.3.0**

### Deferred / not in 1.3.0

- DatePicker extract (Calendar / Month / Year) — refactor-only; still on DatePicker
- Date **range** suite, Storybook/docs marketing site, theme builder, DataTable
- Icon pack, full typography system

## [1.2.0] — 2026-07-29

Minor release: ContextMenu, DatePicker, Vitest smoke suite, overlay portals.

**Shipped:** npm `@softglass/tokens@1.2.0` + `@softglass/ui@1.2.0`, GitHub tag `v1.2.0`.

### Added

- **`ContextMenu`** — right-click + long-press; same `items` language as DropdownMenu; pointer-fixed panel; enter/exit
- **`DatePicker`** — single ISO `YYYY-MM-DD`; solid trigger + frost calendar; day / month / year grids; keyboard; field meta; optional `min`/`max`
- **Vitest smoke suite** (`packages/ui`) — Button, Combobox filter, MultiSelect chip remove, `usePresence`; root `npm test` + CI step
- Shared **floating portal** helpers (`floating.ts`, `useFloatingPortal`)

### Changed

- **Select / Combobox / MultiSelect / DropdownMenu / Popover** — panels portaled to `document.body` with fixed positioning, top/bottom flip, left/right viewport clamp, scroll/resize reposition
- Docs: API, LIMITATIONS, registry entries for ContextMenu + DatePicker
- CI runs unit smoke tests before build

### Not in 1.2 (parked)

- Date range / time / locale packs
- DatePicker portal (still absolute to field)
- Nested menu subtrees, Storybook/docs site, theme builder (1.3+)

## [1.1.0] — 2026-07-29

Minor release: overlays, motion exit, registry path, form depth.

**Shipped:** npm `@softglass/tokens@1.1.0` + `@softglass/ui@1.1.0`, GitHub tag `v1.1.0`.

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
