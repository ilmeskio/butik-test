---
name: design-explore
description: Scaffold 2-3 throwaway visual directions for a component or page as lab/ prototypes, so a direction can be chosen on real code before formalising it. WRITES files (under apps/web/src/pages/lab/) — asks for confirmation first. Use when exploring a visual direction or running the workshop-surface pilot from ADR-0005.
---

# Explore visual directions (throwaway prototypes)

WRITE skill: it creates prototype pages under `apps/web/src/pages/lab/`. **Confirm before
writing.** These are throwaway — meant to be compared, then most deleted.

## Procedure

1. **Frame the exploration.** What component/page, what is the open question
   (layout? density? motion? — or, for the ADR-0005 pilot: *gallery vs Storybook*).
   Agree on 2-3 distinct directions, not variations of one.

2. **Scaffold prototypes.** Create `apps/web/src/pages/lab/<topic>-<a|b|c>.astro` (or an
   index that shows them side by side). Each direction is self-contained and
   labelled with what it commits to and the trade-off. Use CSS Modules + tokens
   per [ADR-0005](../../../docs/adr/0005-design-system.md) so the pilot reflects
   the real target stack, not Tailwind.

3. **For the workshop pilot specifically:** direction A = formalised `lab/`
   gallery (index + variants + states of a real component); direction B = a
   Storybook setup (`.storybook/` + one `*.stories.*` for the same component on a
   framework island). Make the cost of each visible in code.

4. **Confirm, write, and record the trade-off.** After the user picks, note the
   decision — a PDR (via `product-decision`) for a product/visual choice, or a new
   ADR / amendment to ADR-0005 for the workshop surface. Then delete the losing
   prototypes (keep `lab/` clean).

## Notes

- Prototypes are disposable: don't wire them into navigation or share components
  with production unless the direction wins.
- Keep `lab/` uncluttered — prune after deciding.
