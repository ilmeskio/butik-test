---
status: accepted
date: 2026-07-10
tags: [build, tooling, astro, node, og]
---

# ADR-0003: Build and tooling

## Context

We need to fix the build stack and tools, so skills and reviews know what to take
for granted. The repo's current state is already coherent; this ADR puts it on
record and names the few open gaps.

## Decision

- **Framework**: Astro 6 (static `astro build`, see
  [ADR-0002](./0002-runtime-and-delivery.md)). Content in MDX via `@astrojs/mdx`.
- **Build runtime**: Node ≥ 24 (`engines` in `package.json`), package manager
  **npm** (`package-lock.json`, `npm ci` in CI).
- **Import aliases**: subpath imports in `package.json` (`#components/*`,
  `#lib/*`, `#layouts/*`, `#styles/*`, `#assets/*`). New code uses these instead
  of long relative paths.
- **Open Graph**: cards generated at **build-time** with `satori` +
  `@resvg/resvg-js` (endpoint `src/pages/og/[...path].png.ts`). They stay
  build-time, consistent with static-first.
- **Deploy**: GitHub Actions → GitHub Pages (`deploy-pages.yml`), `SITE` injected
  at build. The host is replaceable (ADR-0002).

### Open (to be decided, not yet fixed)

- **Formatter/linter**: the repo currently has no Biome/ESLint/Prettier. Proposal:
  adopt **Biome** (as in our other repos) with a `PostToolUse` hook on Write/Edit.
  Not introduced in this ADR, to keep the foundation branch free of build changes;
  it will be a later ADR/commit.
- **Type-check**: `@astrojs/check` is not installed. Same reasoning: add it
  together with the linter.

## Alternatives considered

### pnpm instead of npm

Used in our other monorepos. Rejected here: butik is a single package, not a
monorepo, and the npm lockfile is already in place. No gain that justifies the
migration.

## Consequences

### Positive

- Minimal stack, one package, no tooling that isn't needed.
- OG and build stay deterministic and static.

### Negative / accepted risks

- Without a linter/type-check in CI, quality depends on review until the "Open"
  item is closed.

### When to deviate (revisit triggers)

- The project grows to multiple packages → consider a monorepo (pnpm workspace)
  with a new ADR.
