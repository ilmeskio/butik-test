# CLAUDE.md — butik

Operational guide for working in this repo. Decisions live in `docs/`; this file
is the index and the review contract.

## What this is

butik's website — **Astro 6**, built **static** (`astro build`) and host-agnostic,
deployed today to GitHub Pages. Content is git-native via **Sitepins** + Astro
content collections. Node ≥ 24.

It's a **pnpm + turbo monorepo** (ADR-0007):

```
apps/web/            # the Astro site (@butik/web)
apps/functions/      # Cloudflare/serverless functions (@butik/functions) — added on demand
packages/ui-tokens/  # @butik/ui-tokens — design tokens (CSS custom properties)
packages/ui/         # @butik/ui — shared component catalogue (CSS Modules + tokens)
docs/ .claude/ reference/ design/   # repo-wide, at root
```

Build from root: `pnpm build` (turbo). Site-only: `pnpm --filter @butik/web build`.
`.sitepins/` stays at root, pointing at `apps/web/src/**`.

## Where decisions live

- **`docs/adr/`** — architectural decisions (few, thematic, MADR, append-only).
  Start at [`docs/adr/README.md`](docs/adr/README.md).
- **`docs/guidances/`** — recommendations, not enforced (per-feature choices like
  which serverless runtime; design vocabulary).
- **`docs/product/`** — product/design decisions (PDR, granular).
- **`reference/`** — raw input in quarantine (read-only history).

Read the ADRs before making an architectural change. Cite them by file + anchor
(e.g. `docs/adr/0005-design-system.md#css-modules`).

## Architecture rules (distilled from the ADRs)

- **Static-first, host-agnostic** (ADR-0002): no SSR adapter in
  `astro.config.mjs`. Dynamic logic = isolated client→serverless call, chosen
  per-feature (see `docs/guidances/functions.md`), never global SSR.
- **Content-driven** (ADR-0004): editorial copy lives in `apps/web/src/content/**`
  + `apps/web/src/content.config.ts`, editable via Sitepins — not hardcoded in new
  `.astro` pages. Keep Zod and `.sitepins/schema/**` in sync. Media fields use the
  `/src/assets/...` path convention so images resolve in both Astro `image()` and
  the Sitepins editor (ADR-0009); Sitepins Media Folder is set to `apps/web/src`.
- **CSS Modules + tokens** (ADR-0005): style in `*.module.css` co-located with the
  component, values from tokens in `@butik/ui-tokens`. Shared components go in
  `@butik/ui`. Tailwind is being removed — don't add new Tailwind.
  `apps/web/src/pages/lab/**` stays (experimental gallery).
- **No tracking before consent** (ADR-0006): analytics gated by
  `vanilla-cookieconsent`; PostHog opt-out-by-default; Google Consent Mode wired.
- **Monorepo** (ADR-0007): `apps/*` + `packages/*`, pnpm + turbo. Cross-package
  imports use `@butik/*`; intra-app paths use subpath imports (`#components/*`,
  `#lib/*`, `#layouts/*`, `#styles/*`, `#assets/*`), not deep relative paths.
  Functions we own go in `apps/functions`, not the site build (ADR-0002).

## Reviews (skills to run)

On every code review / PR review, run the report-only skills that apply to the
change and lead with blockers:

| Skill | Checks |
|---|---|
| `adr-check` | code vs `docs/adr/` (+ guidances); unrecorded decisions |
| `design-check` | tokens vs raw values, AA contrast, focus, motion |
| `content-check` | Zod ↔ Sitepins drift; hardcoded copy |
| `consent-check` | tracking gated by consent; opt-out-by-default; Consent Mode |
| `story-check` | shared components represented in the workshop (lab/ or Storybook) |

Write skills (ask before writing): `product-decision` (scaffold a PDR),
`design-explore` (throwaway `lab/` prototypes, incl. the ADR-0005 workshop pilot).

Read-only review personas in `.claude/agents/`: `architect` (Ada), `design-system`
(Dana), `content` (Cora), `qa` (Quinn).

## Conventions

- **Language**: everything in `docs/**` and the operational files
  (`CLAUDE.md`, `.claude/**`) is in **English**. Only `reference/**` stays in
  **Italian** — it's raw editorial input (the site copy is Italian by nature).
  Commit messages follow the repo's existing Italian convention
  (`feat(scope): …`), no `Co-Authored-By` trailers.
- **Verify before claiming**: run the build (`pnpm build`) before saying a
  change is safe; never call a check "passing" without running it.
- **Open items** (ADR-0003): linter/formatter (Biome) and `@astrojs/check` are not
  yet installed — a follow-up.
