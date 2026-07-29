# Limitations (v1.0.0)

Honest scope notes for Softglass. Read this before treating the kit like Radix / Chakra / MUI.

## What Softglass is

- Soft-glass **UI kit** for Next.js (tokens + React atoms/molecules)
- Four visual languages + brand accent overrides
- Copy-friendly / open MIT — not a locked black-box theme

## What Softglass is **not**

- A full application framework
- A pixel-perfect clone of every Radix primitive
- A data-table / date-picker / form-validation suite (v1.1+)

---

## Component limits

| Component | Current behavior | Not yet |
| --- | --- | --- |
| **Modal** | Portal + Escape + backdrop close + basic **focus trap** + focus restore | Full WAI-ARIA dialog pattern tests; scroll-lock edge cases on iOS Safari; exit animation |
| **Select** | Custom listbox-ish menu, keyboard (arrows/Home/End/Enter/Space/Escape), placement auto | Virtualization for 500+ options; multi-select; typeahead search; native form autofill parity |
| **Tooltip** | Hover/focus delay, placements | Touch-first patterns; collision detection against viewport edges (basic only) |
| **Tabs** | Roving tabindex + arrow/Home/End keys + sliding indicator | Directional content slide; vertical orientation API polish |
| **Toast** | Stack + variants + auto-dismiss | Swipe-to-dismiss; action buttons API; stacked motion choreography |
| **FormField** | Layout only (label/hint/error) | Schema validation; RHF/Formik adapters |
| **Glass surfaces** | Frost-first (cheap); optional blur | Guaranteed WCAG contrast on every glass+text combo without solid surfaces |

## Accessibility & contrast

1. **Glass is chrome, not body text.** Long forms and paragraphs should sit on **solid** surfaces (`sg-surface-solid` / `Card surface="solid"`).
2. **Obsidian (dark)** can fail contrast if you put muted text on heavy frost + low accent. Prefer solid panels for dense content; test with browser contrast tools.
3. **`prefers-reduced-transparency`** flattens glass to solid tokens.
4. **`prefers-reduced-motion`** turns motion recipes off (durations → 0 / animations none).
5. Modal focus trap is intentional but simple — nested dialogs are **not** supported in v1.

## Motion system

- CSS-first recipes via `data-motion` (no Framer Motion dependency).
- **Exit** animations for Modal/Select are incomplete (enter is wired).
- Do not block product work waiting for motion perfection — treat motion as delight, not contract.

## Distribution model

| Path | Status |
| --- | --- |
| npm `@softglass/tokens` + `@softglass/ui` | **Published 1.0.0** |
| shadcn-style registry CLI | Sketch only (`registry/registry.json`) — not a full install path yet |
| Docs marketing site | Playground app in-repo; separate docs site later |

## Package name decision

- Brand: **Softglass**
- Scoped packages live on npm:
  - [`@softglass/tokens@1.0.0`](https://www.npmjs.com/package/@softglass/tokens)
  - [`@softglass/ui@1.0.0`](https://www.npmjs.com/package/@softglass/ui)
- Org: **`softglass`** (owner: personal npm account)
- Source: [github.com/ArdaDDemir/softglass](https://github.com/ArdaDDemir/softglass) · tag `v1.0.0`
- Prefer scoped packages; unscoped `softglass` is intentionally unused

## Known non-goals for v1

- DatePicker, Combobox, DropdownMenu, DataTable
- Perfect Select parity with Radix Select
- Storybook / Chromatic
- More than 4 core languages

If a limitation blocks your product, open an issue with a concrete use case — don’t fork ten partial clones first.
