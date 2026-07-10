---
name: consent-check
description: Verify that analytics and third-party scripts are gated by cookie consent — no tracking before consent, PostHog opt-out-by-default, GTM Google Consent Mode wired. Report-only, never edits files. Use when asked to audit consent/GDPR/analytics compliance, AND automatically as part of every code review and PR review (see CLAUDE.md).
---

# Consent & analytics check

Produce a **report** on whether third-party tracking respects
[ADR-0006](../../../docs/adr/0006-analytics-and-consent.md): opensource
provider-agnostic banner (`vanilla-cookieconsent`), **no tracking before
consent**, PostHog opt-out-by-default, Google Consent Mode wired for GTM. Do
**not** edit files.

## What to check

1. **Consent gate exists.** There is a consent module (expected `apps/web/src/lib/consent/`)
   that runs `vanilla-cookieconsent` with at least `necessary` (readOnly) and
   `analytics` categories, and it is initialised from the layout.

2. **No unconditional tracking.** Scan for third-party analytics/marketing scripts
   (PostHog, GTM, `gtag`, GA, Facebook Pixel, Hotjar, …) loaded or initialised
   **outside** a consent gate:
   - a `<script>` tag for a tracker in a layout/page with no consent guard → blocker.
   - PostHog init **without** `opt_out_capturing_by_default: true` and
     `opt_out_persistence_by_default: true` → blocker (it would capture before
     opt-in).
   - analytics activation not driven by the banner's `onConsent` / `onChange`
     callbacks (via `acceptedCategory('analytics')`) → warning.

3. **Consent Mode for Google.** If GTM/GA is present, a `safeGtag`-style wrapper
   must forward `gtag('consent','update', { analytics_storage })` gated on the
   `analytics` category. If GTM is absent, the wrapper should be a safe no-op
   (that is fine — note it, not a violation).

4. **autoClear.** The `analytics` category should `autoClear` the provider cookies
   (e.g. `^_ph_`, `ph_session` for PostHog) so revoking consent clears them.

5. **Re-open preferences.** A control (e.g. footer button) calls
   `showPreferences()` so users can change consent later (GDPR requirement).

## Output format

```
# Consent & analytics check

## Violations
- [severity] <rule>. Evidence: path:line. Fix: …

## Passing checks (brief)
- <rule>: holds (path).

## Not-yet-present (expected once analytics lands)
- <what is missing but not wrong yet>.
```

Severities: **blocker** (tracking before/without consent), **warning** (gate
present but not wired to callbacks, missing autoClear), **note** (GTM absent,
no-op wrapper). If analytics isn't implemented yet, say so plainly — absence is
not a violation, it is "not yet present".
