# `@softglass/ui`

React components for [Softglass](https://github.com/ArdaDDemir/softglass) — soft glass UI for Next.js.

## Install

```bash
npm install @softglass/ui @softglass/tokens
```

**Version:** **`1.9.0`** — Calendar · TimePicker · DataTable · Theme Builder ([CHANGELOG](../../CHANGELOG.md)).

**Peers:** `react` + `react-dom` ^18 || ^19, and `@softglass/tokens` **^1.9.0** (styles).

**Publish account:** npm org `softglass` via personal **`ardaddemir` only** (never work/Feedemy).

## Usage

```tsx
import "@softglass/tokens"; // or "@softglass/tokens/styles.css"
import {
  Button,
  Card,
  Accordion,
  EmptyState,
  Pagination,
} from "@softglass/ui";

<html data-softglass-theme="aurora">
  <Card surface="glass">
    <EmptyState title="No items" actions={<Button>Create</Button>} />
    <Accordion
      type="single"
      items={[{ value: "a", trigger: "FAQ", content: "Answer" }]}
    />
    <Pagination page={1} pageCount={5} onPageChange={() => {}} />
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
