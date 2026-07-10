---
status: accepted
date: 2026-07-10
tags: [design-system, components, react, storybook, workshop, ui]
supersedes: 0005-design-system.md#workshop
---

# ADR-0008: Component authoring and Storybook workshop

Supersedes the **[#workshop](./0005-design-system.md#workshop)** section of
ADR-0005, which left the catalogue surface open (gallery vs Storybook) and leaned
toward an Astro-native gallery.

## Context

ADR-0005 deferred the choice of the **component workshop** to a comparative pilot
run in the design-system branch. The pilot produced a concrete Astro-native
gallery under `apps/web/src/pages/lab/workshop` and a written trade-off note. Its
recommendation leaned toward the gallery, on the grounds that the shared catalogue
(`@butik/ui`) was authored in `.astro` and Storybook has no first-class `.astro`
support.

That recommendation hinged on `.astro` staying the **authoring format** for shared
components. The team has now reconsidered that premise: it wants the shared
catalogue authored in a format with a mature workshop and testing ecosystem, and
consistent with the framework the rest of the team already uses. That reframes the
question — if the components are framework islands, Storybook's lack of `.astro`
support stops being a drawback.

## Decision

- **`@butik/ui` components are authored as React islands** (`.tsx`), styled with
  CSS Modules + tokens from `@butik/ui-tokens` exactly as before (ADR-0005
  [#css-modules](./0005-design-system.md#css-modules) /
  [#design-tokens](./0005-design-system.md#design-tokens) are unchanged). React was
  chosen over Svelte/Vue/Solid for **consistency with the team's stack**.
- **The workshop surface is Storybook** (`@storybook/react-vite`), scoped to
  `packages/ui`. Stories live co-located with components
  (`src/*.stories.tsx`); `.storybook/preview` imports `@butik/ui-tokens/tokens.css`
  so specimens render with the site's visual vocabulary.
- **The site consumes the islands via `@astrojs/react`.** Presentational
  components render to **static HTML at build time** (no client directive, no
  shipped JS); a client directive is added only when a component needs
  interactivity. This keeps the static-first posture of ADR-0002 intact — no SSR
  adapter.
- **Storybook is a dev tool only.** It has its own build (`build-storybook`) and
  never participates in `pnpm --filter @butik/web build`.
- The `lab/workshop` pages are demoted to a lightweight in-site preview of the
  React Button plus a historical note of the trade-off; `story-check` now tracks
  coverage against Storybook.

## Alternatives considered

### Astro-native gallery (the pilot's recommendation)

Rejected as the primary workshop. It has zero drift and no second runtime, but no
first-class interactive controls/args, autodocs, or a11y / visual-regression
addons, and it required hand-written variant × state matrices. With React islands
adopted, Storybook's ecosystem outweighs the gallery's simplicity. The gallery
survives, trimmed, as an in-site smoke test.

### Keep components as `.astro`

Rejected: `.astro` has no first-class Storybook support and no framework-agnostic
component testing story. The team preferred a widely-supported island format.

### A different island framework (Svelte / Vue / Solid)

Rejected for now: all are Storybook-supported, but React matches the team's
existing stack, minimising onboarding cost. Revisit only if the team's stack
shifts.

## Consequences

### Positive

- Interactive controls/knobs, autodocs, and an addon ecosystem (interaction tests,
  a11y, visual regression) for the catalogue.
- The component in a story **is** the component the site ships — no gallery-vs-real
  drift.
- Tokens stay the single visual source of truth, shared by site and Storybook.

### Negative / accepted risks

- A **second build/runtime** (Storybook) to maintain and update, plus a **React**
  dependency in the site and the `@butik/ui` package.
- Shared components are **no longer pure `.astro`**; contributors author `.tsx`
  islands. App-level page composition stays `.astro` (e.g. `CtaBanner` remains an
  app `.astro` component — not everything migrates to React).
- The island runtime is opt-in per component; forgetting that a component is an
  island (and needs a client directive for interactivity) is a new footgun.

### When to deviate (revisit triggers)

- The team's stack moves away from React → reconsider the island framework with a
  new ADR.
- Storybook's maintenance cost outweighs its value for a still-small catalogue →
  reconsider a lighter surface.
