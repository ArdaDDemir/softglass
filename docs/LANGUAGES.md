# Softglass visual languages

One engine. Six dialects (3 light · 3 dark). Same components, different `data-softglass-theme`.

| Theme | Scheme | Mood | Best for |
| --- | --- | --- | --- |
| `aurora` | light | Calm pastel glass | SaaS, education, wellness, light dashboards |
| `mist` | light | Structural frosted chrome | Admin panels, B2B workspace, dense apps |
| `pearl` | light | Warm cream soft glass | Consumer, e-commerce, lifestyle brands |
| `obsidian` | dark | Dark glossy premium (cyan) | AI tools, music, crypto, night UIs |
| `noir` | dark | Deep black + rose | Fashion, media, premium dark products |
| `ember` | dark | Warm charcoal + amber | Night dashboards, analytics, cozy tools |

## How to switch

```html
<html data-softglass-theme="aurora">
```

Brand colors can override accent tokens without forking components:

```css
[data-softglass-theme="aurora"] {
  --sg-accent: #your-brand;
  --sg-accent-hover: #your-brand-dark;
}
```

## Shared rules (never break these)

1. Glass is accent chrome, not body copy surface.
2. Corners stay soft (`--sg-radius-*`).
3. Gloss = thin top highlight, not heavy 2010 gradients.
4. Mobile uses lower blur and fewer glass layers.
5. Respect `prefers-reduced-transparency` and `prefers-reduced-motion`.
