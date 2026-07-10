# @butik/ui-tokens

Design tokens as CSS custom properties — the single source of truth for butik's
visual vocabulary ([ADR-0005](../../docs/adr/0005-design-system.md#design-tokens)).

## Usage

```ts
// once, in the base layout of a consumer app
import '@butik/ui-tokens/tokens.css';
```

Then consume via `var(--…)` in CSS Modules — prefer the semantic names
(`--color-bg`, `--color-fg`, `--color-accent`) over raw primitives.

During the Tailwind→CSS Modules migration these coexist with the Tailwind
`@theme` in `apps/web/src/styles/global.css`; once the migration lands, this file
is the only token source.
