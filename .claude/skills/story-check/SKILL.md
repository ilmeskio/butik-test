---
name: story-check
description: Check that shared components are represented in the component workshop (the lab/ gallery today, Storybook if adopted) with their variants and states. Report-only, never edits files. Use when asked to audit component-catalogue coverage, AND as part of code/PR review when components change (see CLAUDE.md).
---

# Component workshop coverage check

Produce a **report** on whether shared components are showcased in the workshop.
The workshop surface is **not yet decided** — [ADR-0005](../../../docs/adr/0005-design-system.md#workshop)
leaves it between an Astro-native `lab/` gallery and Storybook, to be resolved by
a `design-explore` pilot. **Detect which surface exists** and check against it; do
not assume Storybook.

## Procedure

1. **Detect the workshop.** If `.storybook/` or `*.stories.*` files exist →
   Storybook. Otherwise the surface is the `src/pages/lab/**` gallery (today's
   reality). Say which you found.

2. **Enumerate shared components.** List `src/components/**/*.astro` (and any
   framework island components), excluding one-off page-local pieces.

3. **Map coverage.** For each shared component, find whether it appears in the
   workshop (a story file, or a `lab/` page that renders it). Report:
   - **Uncovered** — shared component with no workshop presence.
   - **Thin** — present but only one state/variant while the component clearly has
     more (e.g. a card with `featured`/`draft` variants shown in only one).

4. **Stale** — workshop entries referencing components that no longer exist.

## Output format

```
# Workshop coverage (surface: lab/ gallery | Storybook)

## Uncovered shared components
- path — no workshop entry. Add: <lab page | story>.

## Thin coverage
- path — shows <state>; missing <variants/states>.

## Stale entries
- workshop-path — references removed component.

## Covered (brief)
- path → <workshop location>.
```

Severities: **warning** (uncovered shared component), **note** (thin, stale).
Keep it a coverage map, not a redesign. Once the workshop decision lands, update
this skill's detection to match.
