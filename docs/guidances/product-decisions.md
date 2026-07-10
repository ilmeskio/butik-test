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

The `.md` is the source of truth. The **review surface** depends on the
still-open component-workshop choice in
[ADR-0005](../adr/0005-design-system.md#workshop):

- if the **Astro gallery** is chosen → the PDR is reviewed on a `lab/` page that
  puts the prototype next to the "before";
- if **Storybook** is chosen → a `Product/*` page that imports the markdown and
  renders it next to the prototype.

Until the workshop is decided, attach a direct link to the prototype (a `lab/` page
or a screenshot) to the PDR, so the stakeholder can review without reading markdown.
