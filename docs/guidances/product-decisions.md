> **Recommended, not enforced.** How to write and review product decisions (PDRs).
> The decisions live in [`../product/`](../product/README.md); this is the *how*.

# Product decisions

Product/design choices are many and frequent: they get their own granular log in
`docs/product/decisions/` (PDRs), separate from the few thematic ADRs.

## Writing a PDR

1. Copy [`../product/decisions/template.md`](../product/decisions/template.md) to
   `NNNN-short-kebab-title.md`, or let the `product-decision` skill scaffold it.
2. Keep it short: Context, Decision, Rationale, Consequences. Link the
   `reference/` material it draws on.
3. PDRs are **append-only**: don't rewrite an accepted decision; write a new one
   and mark the old `superseded by PDR-NNNN`.

## Reviewing a PDR (with non-technical stakeholders)

The `.md` is the source of truth. The **review surface** is Storybook: the
workshop question ADR-0005 left open was settled by
[ADR-0008](../adr/0008-component-authoring-and-storybook.md), which supersedes
`ADR-0005#workshop`.

Review a PDR next to the component it is about, in the published Storybook —
Chromatic publishes a browsable build per branch, so a stakeholder can open the
prototype without running anything locally. Link that build from the PDR.

`lab/` pages remain available for throwaway explorations that have no component
in the catalogue yet (a whole-page layout, a direction not yet extracted).
