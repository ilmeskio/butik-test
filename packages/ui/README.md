# @butik/ui

Shared component catalogue — **React islands** (`.tsx`) styled with **CSS Modules
+ tokens** from [`@butik/ui-tokens`](../ui-tokens), no Tailwind
([ADR-0005](../../docs/adr/0005-design-system.md#css-modules),
[ADR-0008](../../docs/adr/0008-component-authoring-and-storybook.md)).

## Usage

```astro
---
import Button from '@butik/ui/Button';
---
<Button href="/contatti" variant="primary">Scrivici</Button>
```

Components are shipped as source `.tsx` under `src/` and consumed by the site via
`@astrojs/react`. Presentational components render to **static HTML at build time**
(no client directive, no shipped JS); add a client directive only when a component
needs interactivity. Each component pairs with a co-located `*.module.css` that
consumes semantic tokens.

## Workshop (Storybook)

The catalogue is authored and reviewed in **Storybook** (`@storybook/react-vite`):

```sh
pnpm --filter @butik/ui storybook        # dev server on :6006
pnpm --filter @butik/ui build-storybook  # static build (storybook-static/)
```

Stories live co-located with components (`src/*.stories.tsx`);
`.storybook/preview` loads `@butik/ui-tokens/tokens.css` so specimens render with
the site's tokens. Storybook is a dev tool only — it never runs in the site build.

## Status

Seeded with `Button` as the pilot. Components are extracted here from
`apps/web/src/components` as they are migrated to React islands + CSS Modules
(design-system branch).
