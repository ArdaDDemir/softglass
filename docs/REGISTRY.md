# Softglass registry (copy path)

Softglass ships **two** ways to get code:

| Path | When to use |
| --- | --- |
| **npm** | Fast product use: `npm i @softglass/tokens @softglass/ui` |
| **Registry (shadcn CLI)** | Own the source in your app (shadcn-style copy) |

This doc is the **Sprint C** install path. npm remains the primary v1 path.

---

## How the registry is structured

| File | Role |
| --- | --- |
| [`registry.json`](../registry.json) **(repo root)** | GitHub registry entry + source of truth for items |
| [`registry/registry.json`](../registry/registry.json) | Same payload (kept in sync for older links) |
| [`scripts/generate-registry.mjs`](../scripts/generate-registry.mjs) | Regenerates both JSON files |
| `apps/web/public/r/*.json` | **Built** per-item payloads (`shadcn build`) for HTTP install / playground host |

Each UI item copies source under:

```
components/softglass/atoms|molecules|organisms/…
components/softglass/lib/cn.ts | looks.ts | motion.ts | presence.ts
```

Tokens copy under:

```
styles/softglass/**/*.css
```

Relative imports inside Softglass components stay valid after install.

---

## Host strategy (locked for Sprint C)

**Primary: public GitHub registry** (no extra server).

Requires `registry.json` at the **repository root** (done). After this branch is on GitHub:

```bash
# list items
npx shadcn@latest list ArdaDDemir/softglass

# validate remote catalog
npx shadcn@latest registry validate ArdaDDemir/softglass

# install tokens + a component (example)
npx shadcn@latest add ArdaDDemir/softglass/tokens
npx shadcn@latest add ArdaDDemir/softglass/button
```

**Secondary: built static JSON** (playground / raw URLs).

```bash
npm run registry:build
# → apps/web/public/r/{name}.json
```

When the playground (or GitHub Pages / any static host) serves that folder:

```bash
npx shadcn@latest add https://<host>/r/button.json
```

After merge to `main`, raw GitHub works too:

```text
https://raw.githubusercontent.com/ArdaDDemir/softglass/main/apps/web/public/r/button.json
```

---

## Maintainer commands

```bash
# regenerate registry.json (root + registry/)
npm run registry:generate

# schema + file-existence check
npm run registry:validate

# emit apps/web/public/r/*.json
npm run registry:build
```

Always run **generate → validate → build** after adding a component to the kit.

---

## Consumer setup notes

1. Project needs a normal `components.json` (`npx shadcn@latest init` if you do not have one).
2. Softglass components use **`sg-*` CSS classes**, not Tailwind utility soup. After copy you still need the **tokens CSS**:
   - Either install the `tokens` registry item and import `styles/softglass/index.css`
   - Or keep using `npm i @softglass/tokens` and `@import "@softglass/tokens"`
3. Set language: `<html data-softglass-theme="aurora">` (or obsidian / mist / pearl).
4. Prefer **npm packages** for day-to-day app work; use registry when you want to **fork** a component.

---

## Smoke checklist (local)

| Check | Command / action | Expected |
| --- | --- | --- |
| Validate | `npm run registry:validate` | `Registry is valid` |
| Build | `npm run registry:build` | `apps/web/public/r/button.json` exists with `content` |
| Payload targets | Open built JSON | `target` under `components/softglass/…` and `styles/softglass/…` |
| GitHub (after push) | `npx shadcn@latest list ArdaDDemir/softglass` | Item names listed |

---

## Limits (honest)

- Registry is **not** a full replacement for npm dual CJS/ESM packages.
- Complex molecules (`modal`, `toast`, `dropdown-menu`) pull `presence` + `button` via `registryDependencies` — install order: tokens → button → overlay.
- Latest shadcn CLI may prompt for a “component library” when the project has no prior init; run `shadcn init` first in empty apps.
- Submitting Softglass to the public shadcn registry **index** is optional later (not required for GitHub install).

---

## Related

- [PUBLIC-MODEL.md](./PUBLIC-MODEL.md) — phases (Phase 2 = this doc)
- [GETTING-STARTED.md](./GETTING-STARTED.md) — npm 3-step path
- [LIMITATIONS.md](./LIMITATIONS.md)
