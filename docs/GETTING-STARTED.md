# Getting started (consumer)

Three steps to use Softglass in a **Next.js App Router** app.

> Packages are designed for npm. Until you publish, link from this monorepo or `npm pack` tarballs.

---

## 1. Install

```bash
npm install @softglass/tokens @softglass/ui
```

Peer deps: `react` and `react-dom` ≥ 18.

### Local monorepo (this repo)

```bash
npm install
npm run build:ui   # builds packages/ui → dist
npm run dev        # playground at http://localhost:3000
```

### Local tarball dry-run (before npm publish)

```bash
npm run pack:check
```

---

## 2. Import tokens + set language

In your root layout CSS (or `globals.css`):

```css
@import "@softglass/tokens";
/* same bundle, Mantine-style alias: */
/* @import "@softglass/tokens/styles.css"; */
```

On `<html>`:

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-softglass-theme="aurora">
      <body>{children}</body>
    </html>
  );
}
```

Languages: `aurora` | `obsidian` | `mist` | `pearl`

### Brand colors only

```css
[data-softglass-theme="aurora"] {
  --sg-accent: #0ea5e9;
  --sg-accent-hover: #0284c7;
}
```

Do **not** put product brand into shared language files — override in the app.

---

## 3. Use components

```tsx
"use client";

import { Button, Card, Input, ToastProvider } from "@softglass/ui";

export function Example() {
  return (
    <ToastProvider>
      <Card surface="glass" padding="lg">
        <Input label="Email" type="email" placeholder="you@brand.com" />
        <Button variant="primary" style={{ marginTop: 12 }}>
          Continue
        </Button>
      </Card>
    </ToastProvider>
  );
}
```

### Rules of thumb

| Do | Don’t |
| --- | --- |
| Glass for chrome (shell, cards, headers) | Long paragraphs on heavy blur |
| Solid surfaces for dense forms | Stack 5+ live `backdrop-filter` layers |
| One language per product surface | Mix 4 languages on one screen “for fun” |

---

## Mini App Router sketch

```tsx
// app/layout.tsx
import "@softglass/tokens";
import { ToastProvider } from "@softglass/ui";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-softglass-theme="obsidian">
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
```

```tsx
// app/page.tsx
"use client";

import { AppShell, Button, Card, CardContent, CardHeader, CardTitle } from "@softglass/ui";

export default function Page() {
  return (
    <AppShell
      header={<strong>Acme</strong>}
    >
      <Card surface="solid">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <Button>Ship</Button>
        </CardContent>
      </Card>
    </AppShell>
  );
}
```

---

## Next reads

- [LIMITATIONS.md](./LIMITATIONS.md) — what v1 does **not** claim
- [API.md](./API.md) — props map
- [LANGUAGES.md](./LANGUAGES.md) — the four dialects
- [PUBLIC-MODEL.md](./PUBLIC-MODEL.md) — open / shadcn-style intent
