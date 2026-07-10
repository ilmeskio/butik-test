---
name: content-check
description: Check content architecture — Astro content collections vs Sitepins schema drift, and pages hardcoding editorial copy that should be content-driven. Report-only, never edits files. Use when asked to audit content/CMS alignment, AND automatically as part of every code review and PR review (see CLAUDE.md).
---

# Content architecture check

Produce a **report** on how well the content follows
[ADR-0004](../../../docs/adr/0004-content-architecture.md): content-driven pages,
Sitepins as editing surface, Astro content collections as the typed source of
truth. Do **not** edit files.

## Procedure

1. **Load the model.** Read `src/content.config.ts` (Zod collections) and every
   `.sitepins/schema/**/*.json` (Sitepins templates). Read `.sitepins/config.json`
   for the content/media roots.

2. **Schema drift (Zod ↔ Sitepins).** For each collection present in both, compare
   fields: a field required/typed in Zod but missing or differently typed in the
   Sitepins template (or vice-versa) is drift. Report as
   `collection.field — Zod: <x> vs Sitepins: <y>`.

3. **Hardcoded editorial copy.** Scan `src/pages/**/*.astro` (exclude
   `src/pages/lab/**` — experimental). Flag pages where user-facing copy
   (headings, paragraphs, CTA text, meta title/description) is written inline in
   the markup instead of coming from a content collection. Distinguish:
   - `warning` — a **new** page hardcoding copy (regression vs ADR-0004).
   - `note` — an existing hardcoded page (known debt, migration in progress).
   Structural/experimental pages (`lab/*`) are out of scope.

4. **Orphans.** Content entries with no page rendering them, or collections
   defined in Zod but absent from `.sitepins/schema` (not editable in Sitepins).

## Output format

```
# Content architecture check

## Schema drift (Zod ↔ Sitepins)
- [severity] collection.field — Zod: … vs Sitepins: … . Fix: …

## Hardcoded copy (should be content-driven)
- [severity] path:line — <what copy>. Move to collection: <which>.

## Orphans / gaps
- <entry|collection> — <issue>.

## Passing checks (brief)
- <collection>: Zod ↔ Sitepins aligned; rendered by <page>.
```

Severities: **blocker** rare here (broken build from schema mismatch),
**warning** (drift, new hardcoded page), **note** (known debt).
