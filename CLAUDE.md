# CLAUDE.md — butik

Operational guide for working in this repo. Decisions live in `docs/`; this file
is the index and the review contract.

## What this is

butik's website — **Astro 6**, built **static** (`astro build`) and host-agnostic,
deployed today to GitHub Pages. Content is git-native via **Sitepins** + Astro
content collections. Node ≥ 24, npm.

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
- **Content-driven** (ADR-0004): editorial copy lives in `src/content/**` +
  `src/content.config.ts`, editable via Sitepins — not hardcoded in new `.astro`
  pages. Keep Zod and `.sitepins/schema/**` in sync.
- **CSS Modules + tokens** (ADR-0005): style in `*.module.css` co-located with the
  component, values from tokens in `src/styles/`. Tailwind is being removed —
  don't add new Tailwind. `src/pages/lab/**` stays (experimental gallery).
- **No tracking before consent** (ADR-0006): analytics gated by
  `vanilla-cookieconsent`; PostHog opt-out-by-default; Google Consent Mode wired.
- **Imports** (ADR-0003): use subpath imports (`#components/*`, `#lib/*`,
  `#layouts/*`, `#styles/*`, `#assets/*`), not deep relative paths.

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

- **Language**: ADRs (`docs/adr/**`) and operational files for the agent
  (`CLAUDE.md`, `.claude/skills/**`, `.claude/agents/**`) are in **English**.
  Guidances (`docs/guidances/**`) and PDRs (`docs/product/**`) are in **Italian**
  (team/stakeholder-facing). Commit messages follow the repo's existing Italian
  convention (`feat(scope): …`), no `Co-Authored-By` trailers.
- **Verify before claiming**: run the build (`npm run build`) before saying a
  change is safe; never call a check "passing" without running it.
- **Open items** (ADR-0003): linter/formatter (Biome) and `@astrojs/check` are not
  yet installed — a follow-up.
