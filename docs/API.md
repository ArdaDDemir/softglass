# Softglass API reference (v1.0.0)

Import once in your app root:

```tsx
import "@softglass/tokens";
// <html data-softglass-theme="aurora|obsidian|mist|pearl">
import { Button, Card, Input } from "@softglass/ui";
```

## Setup

| Step | What |
| --- | --- |
| 1 | Import `@softglass/tokens` (CSS engine + 4 languages) |
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
| Avatar | `circle` `rounded` `soft` |
| Tooltip | `frost` `solid` `accent` |
| Card | `flat` `raised` `outline` `glow` |

## `motion` prop (interaction recipes)

Parallel to `look`: each control has a **component-specific** motion menu. Set via `motion="…"` → `data-motion`. CSS-first (`motion-recipes.css`). All recipes stop under `prefers-reduced-motion`.

| Component | motion options | Default |
| --- | --- | --- |
| Button | `none` `lift` `press` `sheen` `ripple` | `lift` |
| Checkbox | `none` `pop` `draw` `fade-in` `bounce` | `pop` |
| Radio | `none` `pop` `dot-scale` `ring-expand` | `pop` |
| Switch | `none` `snap` `spring` `elastic` | `spring` |
| Input / Textarea | `none` `ring` `underline-grow` `glow` | `ring` |
| Select (menu) | `none` `fade` `scale` `slide-down` | `scale` |
| Tooltip | `none` `fade` `scale` `slide` | `scale` |
| Badge | `none` `pulse` `pop-in` `shimmer` | `none` |
| Avatar | `none` `lift` `ring-pulse` `status-ping` | `lift` |
| Tabs | `none` `fade` `slide` | **`slide`** |
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
| `Switch` | `checked` `onCheckedChange` `label` `hint` |
| `Modal` | `open` `onOpenChange` `title` `description` `footer` `size` |
| `Toast` | `toast({ title, description, variant, duration })` via `useToast` |
| `Tabs` | `value` `defaultValue` `onValueChange` + Trigger/Content `value` |
| `Avatar` | `src` `fallback` `size` |
| `Checkbox` | `checked` `onCheckedChange` `label` `hint` |
| `Radio` / `RadioGroup` | `value` `onValueChange` `name` + child `value` |
| `Textarea` | `label` `hint` `error` `size` `autoSize` |
| `Tooltip` | `content` `placement` `delayMs` `children` |
| `Alert` | `variant` `title` `icon` `children` |
| `Skeleton` | `width` `height` `circle` `rounded` |
| `Spinner` | `size` `label` |
| `Separator` | `orientation` `decorative` |
| `Label` | `requiredMark` `htmlFor` |
| `FormField` | `label` `hint` `error` `htmlFor` `requiredMark` |
| `AppShell` | `header` `sidebar` `children` |

Full prop lists live in `apps/web/src/lib/docs.ts` and the Docs UI.
