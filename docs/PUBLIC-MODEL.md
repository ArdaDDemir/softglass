# Public distribution model

Softglass is designed to be **open to everyone**, in the same spirit as [shadcn/ui](https://ui.shadcn.com):

| shadcn idea | Softglass equivalent |
| --- | --- |
| You own the code | Registry / copy into your app |
| CSS variables for theme | `@softglass/tokens` + `data-softglass-theme` |
| Compose primitives | Atomic atoms → molecules → organisms |
| Open registry | `registry/registry.json` (expand over time) |
| MIT | MIT |

## Phases

### Phase 0 — Foundation

- Token package (`packages/tokens`)
- Six languages (3 light · 3 dark)
- Playground app
- Registry sketch

### Phase 1 — Atoms

Ship first components as source files:

- Button, Input, Badge, Card (solid + glass), Avatar  
- Document props + a11y  
- Each item listed in `registry/`

### Phase 2 — Registry install *(v1.1 Sprint C — done in tree)*

- Root [`registry.json`](../registry.json) for **GitHub registry** (`ArdaDDemir/softglass/<item>`)
- Built static items: `apps/web/public/r/*.json` (`npm run registry:build`)
- Docs: [REGISTRY.md](./REGISTRY.md)
- Optional later: submit to shadcn public registry index  

### Phase 3 — Docs site

- Language gallery  
- Live token playground  
- Copy-paste snippets  
- Brand override cookbook  

## What we will not do

- Force a closed npm-only component library where users cannot edit source  
- Put brand colors of one client into the shared default tokens  
- Make glass the surface for all text (accessibility trap)  

## Brand vs language

- **Language** = Aurora / Obsidian / Mist / Pearl (shared public dialects)  
- **Brand** = override `--sg-accent*` (and optional neutrals) per product  

Communities can add **community languages** later under a clear contribution process; core four stay stable.
