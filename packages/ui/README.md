# @butik/ui

Shared component catalogue — **CSS Modules + tokens** from
[`@butik/ui-tokens`](../ui-tokens), no Tailwind
([ADR-0005](../../docs/adr/0005-design-system.md#css-modules)).

## Usage

```astro
---
import Button from '@butik/ui/Button.astro';
---
<Button href="/contatti" variant="primary">Scrivici</Button>
```

Components are shipped as source `.astro` under `src/` and compiled by the
consuming app. Each component pairs with a co-located `*.module.css` that consumes
semantic tokens.

## Status

Seeded with `Button` as the pilot. Components are extracted here from
`apps/web/src/components` as they are migrated to CSS Modules (design-system
branch); the workshop surface (gallery vs Storybook) is pending
[ADR-0005 #workshop](../../docs/adr/0005-design-system.md#workshop).
