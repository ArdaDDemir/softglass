# Softglass API reference (v1.7.0)

Import once in your app root:

```tsx
import "@softglass/tokens";
// <html data-softglass-theme="aurora|mist|pearl|obsidian|noir|ember">
import { Button, Card, Input } from "@softglass/ui";
```

## Setup

| Step | What |
| --- | --- |
| 1 | Import `@softglass/tokens` (CSS engine + 6 languages) |
| 2 | Set `data-softglass-theme` on `<html>` |
| 3 | Import components from `@softglass/ui` |
| 4 | For toast: wrap with `<ToastProvider>` |

Brand override (colors only):

```css
[data-softglass-theme="aurora"] {
  --sg-accent: #0ea5e9;
  --sg-accent-hover: #0284c7;
}
```

## `look` prop (design types)

Most components accept a **`look`** prop — visual language independent of semantic `variant`.

| Component | looks |
| --- | --- |
| Button | `solid` `soft` `glass` `gradient` `neon` |
| Radio / RadioGroup | `dot` `card` `chip` |
| Checkbox | `box` `card` `pill` |
| Switch | `track` `ios` `minimal` |
| Badge | `soft` `solid` `outline` `glow` |
| Input / Textarea | `solid` `underline` `filled` `ghost` |
| Select | `solid` `soft` `glass` `gradient` |
| Tabs | `pill` `underline` `segmented` |
| Collapsible / Accordion | `soft` `solid` `glass` `outline` `ghost` |
| Breadcrumb | `plain` `soft` `pill` |
| Pagination | `soft` `solid` `ghost` `glass` |
| EmptyState | `solid` `soft` `outline` |
| Stepper | `soft` `solid` `outline` `dots` `pills` |
| Toolbar | `soft` `solid` `glass` `ghost` `accent` |
| List | `soft` `solid` `outline` `ghost` `inset` |
| DataTable | `soft` `solid` `glass` `outline` `ghost` |
| Stat | `solid` `soft` `glass` `outline` `accent` |
| Avatar | `circle` `rounded` `soft` |
| Tooltip | `frost` `solid` `accent` |
| Card | `flat` `raised` `outline` `glow` |
| Slider | `soft` `solid` `glass` `accent` |
| NumberInput | `soft` `solid` `outline` `ghost` |
| FileField | `solid` `soft` `dashed` `ghost` |
| Progress | `soft` `solid` `glass` `accent` `striped` |
| StatusDot | `soft` `solid` `outline` `glow` |
| Link | `accent` `muted` `subtle` `underline` |
| Chip | `soft` `solid` `outline` `glass` `glow` |
| CloseButton | `ghost` `soft` `solid` `danger` |
| PasswordInput / SearchInput | `soft` `solid` `glass` `outline` `ghost` |
| CircularProgress | `soft` `solid` `glass` `accent` |
| SegmentedControl | `soft` `solid` `outline` `glass` |
| Kbd | `soft` `solid` `outline` `glass` |
| Code | `soft` `solid` `accent` `muted` |
| SkipLink | `solid` `soft` `outline` `glass` |
| PinInput | `solid` `soft` `outline` `glass` |
| NavLink | `soft` `solid` `underline` `pill` |
| ListItem | `soft` `solid` `outline` `ghost` |
| CopyButton | `soft` `solid` `outline` `ghost` |
| CharacterCount | `soft` `solid` `muted` `danger` |

## `motion` prop (interaction recipes)

Parallel to `look`: each control has a **component-specific** motion menu. Set via `motion="…"` → `data-motion`. CSS-first (`motion-recipes.css`). All recipes stop under `prefers-reduced-motion`.

**Exit (v1.1 Sprint B):** overlays keep the node mounted briefly (`data-state="closed"` / toast `data-leaving`) so exit keyframes can finish. `motion="none"` unmounts immediately.

| Component | motion options | Default |
| --- | --- | --- |
| Button | `none` `lift` `press` `sheen` `ripple` | `lift` |
| Checkbox | `none` `pop` `draw` `fade-in` `bounce` | `pop` |
| Radio | `none` `pop` `dot-scale` `ring-expand` | `pop` |
| Switch | `none` `snap` `spring` `elastic` | `spring` |
| Input / Textarea | `none` `ring` `underline-grow` `glow` | `ring` |
| Select / DatePicker (panel) | `none` `fade` `scale` `slide-down` | `scale` |
| Popover / DropdownMenu / ContextMenu | `none` `fade` `scale` `slide-down` | `scale` |
| Tooltip | `none` `fade` `scale` `slide` | `scale` |
| Badge | `none` `pulse` `pop-in` `shimmer` | `none` |
| Avatar | `none` `lift` `ring-pulse` `status-ping` | `lift` |
| Tabs | `none` `fade` `slide` | **`slide`** |
| Collapsible / Accordion | `none` `fade` `height` | **`height`** |
| Sheet | `none` `slide` `fade` | **`slide`** |
| HoverCard | `none` `fade` `scale` `slide-down` | **`scale`** |
| Modal | `none` `scale` `fade` `slide-up` | `scale` |
| Toast | `none` `slide-in` `pop` | `slide-in` |
| Card | `none` `lift` `glow-pulse` | `lift` |

```tsx
<Tabs look="pill" motion="slide" defaultValue="a">…</Tabs>
<Button motion="press">Save</Button>
<Checkbox motion="draw" label="Accept" />
```

## Performance notes

- Card/glass surfaces use **frost** (opaque, cheap) by default.
- Pass `blur` on `Card` only when you truly need live backdrop blur.
- Avoid stacking many blurred layers on one screen.

## Components

See the live **Docs** tab in the playground for prop tables.

### Quick map

| Component | Key props |
| --- | --- |
| `Button` | `variant` `size` `rounded` `loading` `fullWidth` `leftIcon` `rightIcon` `iconOnly` |
| `Input` | `label` `hint` `error` `requiredMark` `size` `leftAddon` `rightAddon` `fullWidth` |
| `Badge` | `variant` `size` `dot` |
| `Card` | `surface` `blur` `padding` `hoverable` `clickable` `as` |
| `Select` | `options` `value` `onValueChange` `placeholder` `size` `label` `hint` `error` |
| `Combobox` | `options` `onSearch` `loading` `filterOption` `emptyMessage` |
| `MultiSelect` | `options` `value[]` `filterable` `filterPlaceholder` `maxSelected` |
| `DatePicker` | `mode` single\|range · single: `value` `onValueChange` · range: `rangeValue` `onRangeValueChange` · `min` `max` `placement` — **body portal** |
| `Switch` | `checked` `onCheckedChange` `label` `hint` |
| `Modal` | `open` `onOpenChange` `title` `description` `footer` `size` |
| `DropdownMenu` | `trigger` `items` `placement` `align` `motion` `open` `onOpenChange` |
| `ContextMenu` | `children` `items` `motion` `longPressMs` `open` `onOpenChange` |
| `Popover` | `trigger` `children` `placement` `align` `motion` `open` `onOpenChange` |
| `Toast` | `toast({ title, description, variant, duration })` via `useToast` |
| `Tabs` | `value` `defaultValue` `onValueChange` + Trigger/Content `value` |
| `Collapsible` | `open` `defaultOpen` `onOpenChange` `trigger` `look` `motion` |
| `Accordion` | `items[]` `type` `value` `defaultValue` `onValueChange` `collapsible` `look` |
| `Breadcrumb` | `items[{ label, href? }]` `look` `separator` `size` |
| `Pagination` | `page` `pageCount` `onPageChange` `compact` `siblingCount` `look` |
| `EmptyState` | `icon` `title` `description` `actions` `look` `size` |
| `Sheet` | `open` `onOpenChange` `title` `side` `motion` `footer` |
| `HoverCard` | `trigger` `children` `openDelay` `closeDelay` `placement` |
| `Stepper` | `steps[]` `activeStep` `orientation` `interactive` `look` |
| `Toolbar` | `look` `align` + `ToolbarGroup` / `ToolbarSpacer` |
| `List` | `look` `density` `dividers` `as` (hosts ListItem) |
| `DataTable` | `data` `columns` `look` `density` `stickyHeader` `loading` `empty*` `selectionMode` `selectedIds` `getRowLabel` `sort` `clientSort` `virtualized` `maxHeight` `estimateRowHeight` `overscan` + `Table*` |
| `Stat` | `label` `value` `hint` `trend` `trendLabel` `look` |
| `Avatar` | `src` `fallback` `size` |
| `Checkbox` | `checked` `onCheckedChange` `indeterminate` `label` `hint` `look` `motion` |
| `Radio` / `RadioGroup` | `value` `onValueChange` `name` + child `value` |
| `Textarea` | `label` `hint` `error` `size` `autoSize` |
| `Tooltip` | `content` `placement` `delayMs` `children` |
| `Alert` | `variant` `title` `icon` `children` |
| `Skeleton` | `width` `height` `circle` `rounded` |
| `Spinner` | `size` `label` |
| `Progress` | `value` `max` `size` `look` `variant` `label` |
| `StatusDot` | `status` `look` `color` `size` `pulse` `label` |
| `Slider` | `value` `onValueChange` `min` `max` `step` `look` `label` `hint` `error` |
| `NumberInput` | `value` `onValueChange` `min` `max` `step` `look` `label` `hint` `error` |
| `FileField` | `files` `onFilesChange` `multiple` `look` `label` `hint` `error` |
| `Link` | `href` `external` `look` |
| `Chip` | `selected` `onSelectedChange` `removable` `onRemove` `look` |
| `CloseButton` | `size` `label` |
| `PasswordInput` | `revealed` `onRevealedChange` `label` `hint` `error` |
| `SearchInput` | `value` `onValueChange` `clearable` `label` `hint` `error` |
| `VisuallyHidden` | `children` `as` |
| `CircularProgress` | `value` `max` `size` `look` `variant` `showValue` `label` |
| `SegmentedControl` | `options` `value` `onValueChange` `look` `size` |
| `Kbd` | `children` `size` `look` |
| `Code` | `children` `block` `look` |
| `SkipLink` | `href` `look` `placement` `alwaysVisible` |
| `PinInput` | `length` `value` `onValueChange` `onComplete` `look` `mask` |
| `NavLink` | `href` `active` `look` `leading` |
| `ListItem` | `title` `description` `leading` `trailing` `look` `selected` |
| `CopyButton` | `value` `look` `copiedLabel` `onCopied` |
| `CharacterCount` | `value` `max` `look` |
| `Fieldset` | `legend` `look` `density` |
| `Icon` | `children` `size` `look` `label` |
| `Image` | `src` `fallback` `look` `fit` `aspectRatio` |
| `Meter` | `value` `min` `max` `look` `variant` `label` |
| `TimeInput` | `value` `onValueChange` `look` `hourCycle` `minuteStep` `label` |
| `ClientOnly` | `children` `fallback` |
| `ScrollArea` | `maxHeight` `look` `orientation` |
| `Rating` | `value` `onValueChange` `look` `color` `showValue` `caption` `clearable` |
| `AspectRatio` | `ratio` `children` |
| `RangeSlider` | `value: [min,max]` `onValueChange` `look` |
| `ToggleGroup` | `options` `type` `value` `onValueChange` `look` |
| `CountBadge` | `count` `max` `look` `hideZero` |
| `ColorSwatch` | `color` `selected` `look` |
| `ColorInput` | `value` `onValueChange` `look` |
| `Highlight` | `look` `children` |
| `Truncate` | `lines` `children` |
| `LiveRegion` | `look` `title` `politeness` `visuallyHidden` `hideWhenEmpty` |
| `NativeDateInput` | `value` `onValueChange` `look` `min` `max` (custom DD/Mon/YYYY UI) |
| `Text` / `Heading` | `tone` `size` `level` |
| `Separator` | `orientation` `decorative` |
| `Label` | `requiredMark` `htmlFor` |
| `FormField` | `label` `hint` `error` `htmlFor` `requiredMark` |
| `AppShell` | `header` `sidebar` `children` `collapsed` `defaultCollapsed` `onCollapsedChange` `mobileNavOpen` `defaultMobileNavOpen` `onMobileNavOpenChange` `mobileNavTitle` |
| `AppShellMenuButton` | mobile hamburger (context; desktop hidden) |
| `AppShellCollapseButton` | desktop rail toggle (context; mobile hidden) |
| `ShellNavItem` | `href` `active` `icon` `children` |
| `PageHeader` | `title` `description` `breadcrumbs` `actions` `look` `size` `breadcrumbLook` |
| `SettingsSection` | `title` `description` `actions` `children` `look` `density` |
| `CommandPalette` | `open` `onOpenChange` `items` `onSelect` `placeholder` `emptyMessage` `label` |

Full prop lists live in `apps/web/src/lib/docs.ts` and the Docs UI.
