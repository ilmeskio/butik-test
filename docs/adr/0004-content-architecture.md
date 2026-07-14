---
status: accepted
date: 2026-07-10
tags: [content, sitepins, content-collections, cms]
---

# ADR-0004: Content architecture

## Context

butik's content must be editable by the team without touching code, but without
binding to an external CMS with vendor lock-in. **Sitepins** is already integrated
(`.sitepins/config.json`, schemas for `progetti` and `servizi`) — a **git-native**
CMS: it edits files in the repo, no external database. The `progetti` and
`servizi` collections are already typed with Zod in `src/content.config.ts`.

Today, though, many pages are **hardcoded** in `.astro` (`index`, `chi-siamo`,
`contatti`, `partners`, …): their copy lives in the markup and isn't editable from
Sitepins.

## Decision

**Content is content-driven; Sitepins is the editing surface, Astro content
collections are the typed source of truth.**

- Every editorial piece (copy, images, metadata) lives in `src/content/**` as
  Markdown/MDX with YAML frontmatter, validated by a Zod schema in
  `src/content.config.ts`.
- Every collection has a matching **Sitepins schema** in `.sitepins/schema/**`.
  Zod and Sitepins schemas must stay aligned (the `content-check` skill watches for
  drift).
- **Media paths** follow the `/src/assets/...` convention so images resolve both in
  Astro `image()` and the Sitepins editor — see
  [ADR-0009](./0009-sitepins-media-paths.md).
- **MDX bodies & Sitepins.** Sitepins edits Markdown, so `import` lines in an MDX
  body leak into the editor as loose paragraphs (fragile) while JSX is preserved as
  a code block. **`progetti`** bodies are therefore kept import-free: the image
  components (`ImageBlock`/`ImageCarousel`/`ImageLeft`/`ImageRight`) are provided
  globally via `<Content components={{…}} />` and take a **string `src`**
  (`/src/assets/…`) resolved to an optimized asset by `#lib/media` (`resolveAsset`
  + `import.meta.glob`). Their prose is Sitepins-editable. **`servizi`** are a
  different shape — page compositions built from domain components with inline
  `export const` data — so they stay **dev-authored** (edited in code; only their
  frontmatter is Sitepins-editable).
- **Goal (in progress, dedicated branch):** move today's hardcoded pages to be
  content-driven, so the whole site is manageable from Sitepins. Purely structural
  pages (e.g. the experimental `lab/*`) may stay in code.
- No external CMS with a database: content stays in git, versioned with the code.

## Alternatives considered

### External headless CMS (Contentful, Sanity, …)

Rejected: vendor lock-in, one more service to run, and content leaves git.
Sitepins gives an editing UI while staying git-native.

### Leave pages hardcoded

Rejected as the end state: the team can't edit copy without a dev. Acceptable only
for structural/experimental pages.

## Consequences

### Positive

- Content versioned with code, reviewed via PR, zero backend.
- Strong typing (Zod) → content errors caught at build-time.

### Negative / accepted risks

- Two schemas to keep aligned (Zod ↔ Sitepins).
- Migrating the hardcoded pages is incremental work, not immediate.

### When to deviate (revisit triggers)

- The content model outgrows flat collections (complex relations, extensive
  multi-language localization) → consider a different data layer.
