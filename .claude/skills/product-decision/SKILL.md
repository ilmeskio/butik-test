---
name: product-decision
description: Scaffold a new Product Decision Record (PDR) in docs/product/decisions/ from the template, filling context/decision/rationale from the conversation. WRITES files — asks for confirmation before creating. Use when a product/design choice has been made and should be recorded.
---

# Scaffold a Product Decision Record

WRITE skill: it creates a PDR file. **Confirm with the user before writing.**

## Procedure

1. **Gather the decision.** From the conversation (or by asking), collect: the
   product/user problem, what was chosen, why over the alternatives, and the
   consequences. Identify any `reference/` material it draws on.

2. **Pick the number.** Read `docs/product/decisions/` and take the next free
   `PDR-NNNN` (zero-padded, sequential).

3. **Scaffold from the template.** Copy `docs/product/decisions/template.md` into
   `docs/product/decisions/NNNN-short-kebab-title.md` and fill:
   - `Status: proposed` (unless already signed off → `accepted`), `Date`,
     `Reviewers`.
   - Contesto / Decisione / Motivazione / Conseguenze — concrete, short, active
     voice. One line per rejected option in Motivazione.
   - Link the prototype (a `lab/` page or screenshot) and the "before", per the
     [product-decisions guidance](../../../docs/guidances/product-decisions.md).

4. **Confirm and write.** Show the drafted content, get a yes, then write the file.
   Do **not** touch other files. Remind the user PDRs are append-only once
   accepted.

## Notes

- Keep it to one screen. A PDR is a decision record, not a spec.
- If the choice is architectural (affects the whole site, not one product flow),
  it belongs in `docs/adr/` instead — say so and stop.
