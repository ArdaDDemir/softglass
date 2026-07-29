# Contributing

Softglass is meant to stay **public, focused, and soft**.

## Ground rules

1. **One concern per PR** — one component family **or** one language tweak, not both mixed with build tooling.
2. **No client brand colors** in shared tokens. Use brand override slots (`--sg-accent*`).
3. **Glass = chrome.** Prefer solid for long-form content defaults.
4. **Respect reduced motion / reduced transparency** tokens and media queries.
5. **Scope discipline** — if it is not in the active task list, open an issue / todo note instead of sneaking it in.

## Local setup

```bash
npm install
npm run build:ui
npm run dev
```

- Playground: `apps/web`
- Tokens: `packages/tokens`
- Components: `packages/ui`

### Checks before you open a PR

```bash
npm run typecheck
npm run build
npm run pack:check
```

## Package versions

`@softglass/tokens` and `@softglass/ui` share the same **major.minor** for a release train (e.g. both `1.0.0`). Bump both when shipping a public release.

## Language changes

- Edit only the theme file under `packages/tokens/src/themes/`
- Keep structure tokens (`base.css`) language-agnostic
- Document mood shifts in `docs/LANGUAGES.md`

## Component changes

- Follow existing atom / molecule / organism folders
- Export from `packages/ui/src/index.ts`
- Rebuild UI (`npm run build:ui`) so playground `dist` stays in sync
- Note a11y limits in `docs/LIMITATIONS.md` when you know them

## What not to land in v1 PRs

- DatePicker / DataTable / mega menus
- Framer Motion dependency
- Extra languages beyond the core four without discussion

Thanks for keeping the glass soft and the scope sharp.
