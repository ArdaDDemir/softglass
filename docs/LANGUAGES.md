# Softglass visual languages

One engine. Four dialects. Same components, different `data-softglass-theme`.

| Theme | Mood | Best for |
| --- | --- | --- |
| `aurora` | Calm pastel glass | SaaS, education, wellness, light dashboards |
| `obsidian` | Dark glossy premium | AI tools, music, crypto, night UIs |
| `mist` | Structural frosted chrome | Admin panels, B2B workspace, dense apps |
| `pearl` | Warm cream soft glass | Consumer, e-commerce, lifestyle brands |

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
