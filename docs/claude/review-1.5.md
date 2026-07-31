# Review — Softglass v1.5 branch (`feat/v1.5a-shell`)

**Mode:** local uncommitted  
**Scope:** 1.5a Shell · 1.5b Patterns · 1.5c Date range · playground  
**Date:** 2026-07-31

## Summary

Solid feature set for 1.5: AppShell depth, PageHeader, SettingsSection, CommandPalette, DatePicker range. APIs match Softglass conventions (controlled/uncontrolled, looks, smokes). Main risks: AppShell desktop detection flash, playground IA (flat sprint-labeled nav, 3k-line file), and range mode only notifying on complete pick (acceptable, document clearly). No publish-blockers beyond polish.

## Issues

### Issue 1 — Severity: bug
- File: `packages/ui/src/organisms/app-shell.tsx` (useDesktopMedia)
- Description: `isDesktop` initializes `false`, so first client paint always treats viewport as mobile — desktop sidebar unmounts until `useEffect` runs (layout flash / missing rail).
- Suggestion: Initialize from `window.matchMedia` when `typeof window !== "undefined"`, else default `true` for SSR desktop-first; or keep `null` until known and skip dual layout until measured.
- Status: **fixed**

### Issue 2 — Severity: suggestion
- File: `apps/web/src/components/playground.tsx`
- Description: ~18 flat sidebar items labeled by sprint (`1.3d`, `1.4a`…) — hard to scan; header still says “v1.5a”; overview still v1.4.0. File is ~3200 lines.
- Suggestion: Group nav (Start / Atoms / Molecules / App / Reference); product names not sprint IDs; refresh overview for 1.5; optional later split into `playground/*.tsx`.
- Status: **fixed (IA)** · file still monolithic (split deferred)

### Issue 3 — Severity: suggestion
- File: `packages/ui/src/atoms/date-picker.tsx` (range mode)
- Description: `onRangeValueChange` fires only when both ends chosen; first click is draft-only. Parent controlled state stays empty until complete — fine UX, but easy to misread as a bug.
- Suggestion: Document in docs.ts / LIMITATIONS; optional later: `onRangeDraftChange` or emit partial `{ start, end: "" }`.
- Status: open (docs note)

### Issue 4 — Severity: suggestion
- File: `packages/ui/src/molecules/command-palette.tsx`
- Description: Keyboard handler effect rebinds on every `activeIndex`/`filtered` change; `selectItem` closes over latest `exiting` but is recreated each render (OK). No global ⌘K — intentional minimal.
- Suggestion: Keep as-is for 1.5; 1.6 can add optional hotkey helper.
- Status: open (deferred)

### Issue 5 — Severity: nit
- File: `packages/ui/src/organisms/app-shell.tsx` (ShellNavItem glyph)
- Description: Collapsed glyph uses first character of string children only; ReactNode labels get `·`.
- Suggestion: Document that collapsed rail prefers `icon` prop.
- Status: open (docs)

### Issue 6 — Severity: nit
- File: registry / package versions still 1.4.0
- Description: Expected pre-publish; do not ship until version bump checklist.
- Status: open (publish gate)

## What looks good

- PageHeader looks fixed after invalid CSS vars (`--sg-surface-soft` etc.)
- Date range: swap-if-inverted, smokes pass, single mode preserved
- CommandPalette filter + groups + a11y combobox/listbox skeleton
- SettingsSection simple composition API
- DoD pattern: playground + docs + registry + vitest

## Verdict

**Approve to continue** after playground IA revise + AppShell hydration fix. Ready for 1.5.0 publish only after version bump + user approval (no auto push).
