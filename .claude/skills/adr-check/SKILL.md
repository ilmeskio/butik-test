---
name: adr-check
description: Assess the codebase against the ADRs in docs/adr/ (and the recommendations in docs/guidances/) and report misalignments plus decisions that should be recorded as a new/updated ADR. Report-only — never edits files. Use when asked to check ADR alignment, find architectural drift, or audit decisions, AND automatically as part of every code review and PR review (see CLAUDE.md).
---

# ADR alignment assessment

Produce a **report** comparing the code against the recorded architecture
decisions. Do **not** edit files, create ADRs, or apply fixes — output findings
and recommended actions only.

## Procedure

1. **Load the decisions.** Read `docs/adr/README.md` (the index) and the `## `
   sections of each `docs/adr/NNNN-*.md`. Skim `docs/guidances/` too: those are
   recommendations, not fixed decisions — `functions.md` in particular describes
   per-feature choices, so it is not "violable" the way an ADR is.

2. **Derive the check matrix at runtime — do not hardcode it.** The ADR set
   evolves. For each `accepted` ADR, turn its `## Decision` into checkable rules;
   skip `deprecated`/`superseded` and follow the supersede link. Tie every rule
   back to the ADR file, never to a number recited from memory.

3. **Scan for violations.** butik has no arch-test/Biome layer yet
   ([ADR-0003](../../../docs/adr/0003-build-and-tooling.md) leaves linting open),
   so search the sources directly. Concrete rules that exist today:
   - **ADR-0002 (static-first):** no SSR adapter in `astro.config.mjs`
     (`output: 'server'`/`'hybrid'` or an `adapter:` would violate it); dynamic
     logic must be an isolated client→serverless call, not request-time SSR.
   - **ADR-0003 (imports):** new code uses subpath imports (`#components/*`, …),
     not deep relative paths.
   - **ADR-0004 (content):** editorial copy lives in `src/content/**` +
     `src/content.config.ts`, not hardcoded in new `.astro` pages (existing
     hardcoded pages are known debt, tracked — flag *new* ones).
   - **ADR-0005 (CSS Modules):** after the migration, Tailwind classes in
     components are violations; during it, flag remaining Tailwind as drift.
   - **ADR-0006 (consent):** covered in depth by `consent-check` — cross-reference.
   Record each hit as `path:line` with a one-line explanation.

4. **Find unrecorded decisions.** Flag architecture-level choices in the code not
   covered by any ADR — a new top-level dependency that shapes the architecture, a
   new cross-cutting pattern, an intentional deviation. Propose the ADR to write
   (title + one-line rationale) following `docs/adr/template.md`.

## Output format

```
# ADR assessment

## Violations of existing ADRs
- [severity] ADR-NNNN — <rule>. Evidence: path:line. Recommended action: …

## Unrecorded decisions (ADRs to create)
- <proposed title> — <why it needs an ADR>. Suggested status: proposed.

## Passing checks (brief)
- ADR-NNNN — <rule>: holds.
```

Severities: **blocker** (violates an accepted ADR in shipped code), **warning**
(drift or partial), **note** (worth a decision, not yet wrong). Lead with
blockers. End clean if nothing to fix.
