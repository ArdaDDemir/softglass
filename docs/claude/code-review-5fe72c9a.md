## Summary

v1.5 shell/patterns/range work is largely solid: AppShell collapse + mobile Sheet, PageHeader/SettingsSection, DatePicker range (swap + draft preview), and gallery rebuild look coherent and well-tested at smoke level. Theme tokens for `noir`/`ember` are wired through packages and `themes.ts`, but the pre-paint bootstrap script still only knows the old four languages, and CommandPalette keyboard highlighting diverges from selection when ungrouped and grouped items are mixed. Fix those two before treating the branch as ship-clean.

## Issues

### Issue 1 -- Severity: bug
- File: apps/web/src/components/theme-bootstrap.tsx:6
- Description: Pre-paint theme bootstrap still allowlists only `['aurora','obsidian','mist','pearl']`. Selecting Noir or Ember persists via `localStorage` / `SOFTGLASS_THEMES`, but on reload the inline script treats those ids as invalid and forces `aurora` on `<html>` until client `ThemeSwitcher` re-applies the stored theme. Users of the two new dark languages get a wrong first paint (and a visible flash) every load. This is incomplete theme wiring for the new languages.
- Suggestion: Extend the bootstrap allowlist to include `noir` and `ember` (ideally keep one shared source of truth with `SOFTGLASS_THEMES` ids, or duplicate the full six-id list in the tiny inline script). Example: `var ok=['aurora','mist','pearl','obsidian','noir','ember']`.
- Status: **fixed**

### Issue 2 -- Severity: bug
- File: packages/ui/src/molecules/command-palette.tsx:64-86,122,210-214,259-261,347-350
- Description: Keyboard/`aria-activedescendant` indexing uses `filtered` order, but the list renders via `groupItems()`, which always hoists ungrouped items before grouped ones. When a palette mixes items with and without `group`, visual `data-active` / `optionIndex` no longer match `filtered[activeIndex]`. Arrow highlight, Enter selection, and `aria-activedescendant` can point at different commands (e.g. highlight “Help”, activate “Home”). All-grouped demos/tests hide this.
- Suggestion: Derive a single flat list from the rendered group order and use it everywhere for index math:
  `const flatItems = useMemo(() => groups.flatMap((g) => g.items), [groups]);`
  Drive `activeIndex`, Enter, `aria-activedescendant`, scroll-into-view, and option `active` from `flatItems` (not raw `filtered`). Add a smoke test with one ungrouped + one grouped item.
- Status: **fixed** (+ smoke test mixed groups)

### Issue 3 -- Severity: bug
- File: packages/ui/src/organisms/app-shell.tsx:60-76,161-193
- Description: `useDesktopMedia` SSR-defaults to `true` and only reads `matchMedia` on the client. On a mobile viewport, the server HTML mounts the desktop `<aside>` rail; the client’s first render unmounts it and switches to the Sheet. That is a structural hydration mismatch for Next.js consumers (the stated target), not just a brief flash—introduced by the JS-driven mobile Sheet split (CSS alone previously collapsed the grid).
- Suggestion: Prefer a consistent first paint: e.g. defer sidebar/Sheet until after mount (`const [ready, setReady] = useState(false)`), or render both slots in a hydration-safe way (CSS-hide desktop rail under 900px without unmounting on the first pass). Document that `AppShell` needs a client-only boundary if you keep the dual-tree approach.
- Status: **fixed** (`layoutReady` gates rail/Sheet)

### Issue 4 -- Severity: suggestion
- File: apps/web/src/app/layout.tsx:19-20
- Description: Root metadata still says “Four visual languages” after shipping six (obsidian · noir · ember dark family). Same stale “four” framing remains in `docs/LIMITATIONS.md` and parts of README/API. Not a runtime break, but contradicts the gallery/tokens story and confuses install docs.
- Suggestion: Update layout description and LIMITATIONS/README language counts to six (3 light · 3 dark) in the same pass as the bootstrap fix.
- Status: **fixed**
