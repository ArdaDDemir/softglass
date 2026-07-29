# Softglass registry source

Canonical **`registry.json` lives at the repo root** (required for [GitHub registries](https://ui.shadcn.com/docs/registry/github)).

This folder keeps a **synced copy** (`registry.json`) plus maintainer notes.

```bash
# from monorepo root
npm run registry:generate   # rewrite root + this copy
npm run registry:validate
npm run registry:build      # apps/web/public/r/*.json
```

Consumer docs: [docs/REGISTRY.md](../docs/REGISTRY.md).
