---
name: design-check
description: Audit the design/UX discipline — tokens vs raw values, AA contrast, focus/keyboard, motion, prefers-reduced-motion — and report violations with path:line. Report-only, never edits files. Use when asked to verify design-system adherence, visual/UX quality or accessibility, AND automatically as part of every code review and PR review (see CLAUDE.md).
---

# Design & UX check

Produce a **report** on how well the UI respects butik's design discipline (see
[ADR-0005](../../../docs/adr/0005-design-system.md), anchors `#css-modules`,
`#design-tokens`, `#motion`, and the
[design-approach guidance](../../../docs/guidances/design-approach.md)). Do **not**
edit files — output violations and recommended actions, ordered by severity.

Scope: `src/components/**`, `src/layouts/**`, `src/styles/**`. Pages under
`src/pages/**` are in scope only if the request includes them. `src/pages/lab/**`
is experimental — flag as `note`, not `blocker`.

## What to check

### 1. Token discipline

- **Raw values where a token exists**: in `*.module.css` and inline `style=`,
  flag colours (`#hex`, `rgb(`, `hsl(`, names like `red`/`white`) and `px` for
  spacing/radius/font-size that should use `var(--…)`. Allowed: `0`, `1px`
  borders, percentages, `currentColor`, `color-mix()` of tokens only. A recurring
  raw value with no matching token → flag as "missing token" (add the token).
- **Undefined tokens**: `var(--x)` used but not defined in the central token file
  under `src/styles/` (exclude local custom properties in the same file).

### 2. CSS strategy (migration-aware)

- ADR-0005 removes Tailwind. **During the migration**, Tailwind utility classes in
  components are `warning` (drift to clear). **After** it, they are `blocker`.
  State which phase you assume based on what `astro.config.mjs` / `package.json`
  show (Tailwind still installed → mid-migration).

### 3. Accessibility

- **AA contrast** (≥ 4.5:1 normal text, ≥ 3:1 large text/UI): compute from the
  real token hex values; report pairs below threshold.
- **Visible focus**: every interactive element has `:focus-visible` with a
  token-based outline; no `outline: none` without a replacement.
- **Keyboard**: non-native clickable elements have keyboard handling + roles;
  prefer native elements. Labels associated with controls; correct `aria-*`.

### 4. Motion

- Every animation respects `prefers-reduced-motion` (a `@media (prefers-reduced-motion: reduce)`
  fallback or a JS guard). Flag animations with no reduced-motion path.
- Motion logic lives in `src/lib/motion` / `src/components/motion`, not inlined
  ad-hoc in unrelated components.

## Output format

```
# Design & UX check

## Violations
- [severity] <rule>. Evidence: path:line. Fix: …

## Missing tokens
- <value> at path:line — recurring, add a token.

## Passing checks (brief)
- <rule>: holds.
```

Severities: **blocker** (fails AA, no focus, Tailwind post-migration), **warning**
(raw value where token exists, mid-migration drift), **note** (lab/, minor).
