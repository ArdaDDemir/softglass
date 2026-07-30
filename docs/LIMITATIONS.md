# Limitations (v1.3.0)

Honest scope notes for Softglass. Read this before treating the kit like Radix / Chakra / MUI.

## What Softglass is

- Soft-glass **UI kit** for Next.js (tokens + React atoms/molecules)
- Four visual languages + brand accent overrides
- Copy-friendly / open MIT — not a locked black-box theme

## What Softglass is **not**

- A full application framework
- A pixel-perfect clone of every Radix primitive
- A data-table / form-validation / full calendar suite (v1.1+)

---

## Component limits

| Component | Current behavior | Not yet |
| --- | --- | --- |
| **Modal** | Portal + Escape + backdrop + focus trap + **enter/exit** (`data-state` presence) | Full WAI-ARIA dialog tests; scroll-lock edge cases on iOS Safari |
| **Select** | Custom listbox-ish menu, keyboard, placement auto, **body portal + flip/clamp**, **enter/exit** | Virtualization for 500+ options; native form autofill parity |
| **Combobox** | Type-to-filter single select; option-only (no free create); **body portal** | Async remote search; creatable tags; virtualization |
| **MultiSelect** | Multi value + chips; menu stays open; optional `maxSelected`; **body portal** | Select-all; filter-in-menu; paste list |
| **DatePicker** | Single ISO `YYYY-MM-DD`; solid trigger + frost panel; **day + month + year grids**; arrows / Enter / Esc; `label`/`hint`/`error`; optional `min`/`max` | Range; time; locale packs / full i18n; typing into field; **portal** (still absolute to field) |
| **DropdownMenu** | Items API, keyboard, Escape + outside, `Button` merge, **body portal + collision**, **enter/exit** | Submenus; checkbox/radio items |
| **ContextMenu** | Same `items` language; right-click + long-press; fixed at pointer; Escape + outside; **enter/exit** | Nested submenu tree; full OS parity; Floating UI-level collision |
| **Popover** | Anchored panel, Escape + outside, non-modal, **body portal + collision**, **enter/exit** | Focus trap option; arrow |
| **Tooltip** | Hover/focus delay, placements | Touch-first patterns; collision detection against viewport edges (basic only) |
| **Tabs** | Roving tabindex + arrow/Home/End keys + sliding indicator | Directional content slide; vertical orientation API polish |
| **Collapsible** | Single panel; controlled/uncontrolled; look + motion; closed = unmounted | Compound Trigger/Content API; measured height slide |
| **Accordion** | `items[]` API; single \| multiple; closed panels unmounted (perf) | Nested accordion; compound Root/Item later |
| **Breadcrumb** | `items` + `Link` reuse; last = current | Auto-collapse overflow / ellipsis middle crumbs |
| **Pagination** | Known `pageCount`; compact or numbered list | Cursor/infinite API; URL sync helpers |
| **EmptyState** | Icon / title / description / actions; solid default | Full empty-template pack / illustrations library |
| **Sheet** | left \| right \| bottom; portal + presence + focus trap | Nested sheet stack; full mobile OS bottom-sheet physics |
| **HoverCard** | openDelay / closeDelay; portal + flip | Touch-first long-press parity; arrow pointer |
| **Stepper** | steps[] + active index; optional interactive jump | Full wizard router / async step validation |
| **Toolbar** | Composition shell (flex + looks) | Dense data-grid toolbar presets |
| **List** | ListItem host; density / dividers | Virtualization / infinite scroll |
| **Stat** | label / value / hint / trend chip | Charts / sparklines |
| **Toast** | Stack + variants + auto-dismiss + leave + bottom stack reflow | Swipe-to-dismiss; action buttons API |
| **FormField** | Layout only (label/hint/error) | Schema validation; RHF/Formik adapters |
| **Progress** | Linear; looks + variants; indeterminate CSS | Buffered/secondary value |
| **CircularProgress** | Ring value / spin | Half-ring; determinate path animation suite |
| **StatusDot** | Semantic statuses + custom color + looks | Avatar corner compose helper |
| **Slider** | Single value; native range + skin; field meta | Vertical; marks / ticks API |
| **RangeSlider** | Dual thumb | Vertical; snap marks |
| **NumberInput** | Steppers; empty → `null`; looks | Locale formatting; currency mask |
| **FileField** | Local pick + name list; looks | Upload backend; full dropzone product |
| **Link** / **NavLink** | Plain `<a>` (+ active on NavLink) | Next router auto-active (wrap yourself) |
| **Chip** | Select / remove / filter / check | Multi-select store; avatar chips |
| **PasswordInput** | Show/hide | Strength meter; generator |
| **SearchInput** | Free text + clear | Command palette; async suggestions |
| **TimeInput** | Custom HH:mm Softglass UI | Timezone / seconds / range |
| **NativeDateInput** | Custom day/month/year steppers (YYYY-MM-DD) | Full calendar suite (use DatePicker) |
| **DatePicker** | Day/month/year grids; field meta | Portal body; range; locale packs |
| **Rating** | SVG stars + shell | Half-stars; custom icon sets |
| **Glass surfaces** | Frost-first (cheap); optional blur | Guaranteed WCAG on every glass+text combo |

## Accessibility & contrast

1. **Glass is chrome, not body text.** Long forms and paragraphs should sit on **solid** surfaces (`sg-surface-solid` / `Card surface="solid"`).
2. **Obsidian (dark)** can fail contrast if you put muted text on heavy frost + low accent. Prefer solid panels for dense content; test with browser contrast tools.
3. **`prefers-reduced-transparency`** flattens glass to solid tokens.
4. **`prefers-reduced-motion`** turns motion recipes off (durations → 0 / animations none).
5. Modal focus trap is intentional but simple — nested dialogs are **not** supported in v1.

## Motion system

- CSS-first recipes via `data-motion` (no Framer Motion dependency).
- **Exit** animations use presence (~200ms hold) + CSS; `motion="none"` and `prefers-reduced-motion` skip the hold.
- Do not block product work waiting for motion perfection — treat motion as delight, not contract.

## Distribution model

| Path | Status |
| --- | --- |
| npm `@softglass/tokens` + `@softglass/ui` | **1.3.0** ready (publish via **ardaddemir** only — not work) |
| shadcn-style registry CLI | Root `registry.json` + `shadcn build` → `apps/web/public/r`; GitHub install after push — see [REGISTRY.md](./REGISTRY.md) |
| Docs marketing site | Playground app in-repo; separate docs site later |

## Package name decision

- Brand: **Softglass**
- Scoped packages live on npm:
  - [`@softglass/tokens@1.3.0`](https://www.npmjs.com/package/@softglass/tokens)
  - [`@softglass/ui@1.3.0`](https://www.npmjs.com/package/@softglass/ui)
- Org: **`softglass`** — owner: personal npm **`ardaddemir`** (**not** work/Feedemy)
- Source: [github.com/ArdaDDemir/softglass](https://github.com/ArdaDDemir/softglass) · tag `v1.3.0`
- Prefer scoped packages; unscoped `softglass` is intentionally unused

## Known non-goals (still)

- Date **range** suite / full timezone engine
- DataTable
- Nested ContextMenu / DropdownMenu submenus
- Perfect Select parity with Radix Select
- Storybook / Chromatic
- More than 4 core languages

If a limitation blocks your product, open an issue with a concrete use case — don’t fork ten partial clones first.
