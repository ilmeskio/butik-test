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

Review a PDR next to the component it is about, in the published Storybook.
Chromatic publishes a browsable build on every PR **and on every merge to
`main`**, so there is always a current catalogue to point at — not only a
snapshot of some branch that has since been deleted:

- while the decision is open → link the **PR build** from the PDR. It shows the
  proposal, and Chromatic's UI Review lets a stakeholder comment on the visual
  change without touching the repo (this is what the `main` build enables:
  UI Review needs two builds to produce a changeset);
- once merged → the **`main` build** is the catalogue as it stands, and is what
  a later reader of the PDR should be sent to.

`lab/` pages remain available for throwaway explorations that have no component
in the catalogue yet (a whole-page layout, a direction not yet extracted).
