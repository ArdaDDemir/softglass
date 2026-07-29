# `@softglass/ui`

React components for [Softglass](https://github.com/ArdaDDemir/softglass) — soft glass UI for Next.js.

## Install

```bash
npm install @softglass/ui @softglass/tokens
```

**Peers:** `react` + `react-dom` ^18 || ^19, and `@softglass/tokens` ^1 (styles).

## Usage

```tsx
import "@softglass/tokens"; // or "@softglass/tokens/styles.css"
import { Button, Card, Input } from "@softglass/ui";

<html data-softglass-theme="aurora">
  <Card surface="glass">
    <Input label="Email" />
    <Button>Save</Button>
  </Card>
</html>
```

## Package shape (publish contract)

Same dual layout as Radix / Headless UI:

| Condition | File |
| --- | --- |
| `import` (ESM) | `dist/index.mjs` + `dist/index.d.mts` |
| `require` (CJS) | `dist/index.js` + `dist/index.d.ts` |

Tarball: `dist/`, `README.md`, `LICENSE` only.

See monorepo docs: `docs/GETTING-STARTED.md`, `docs/API.md`, `docs/LIMITATIONS.md`.
