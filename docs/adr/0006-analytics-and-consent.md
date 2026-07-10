---
status: accepted
date: 2026-07-10
tags: [analytics, consent, gdpr, posthog, gtm, cookie]
---

# ADR-0006: Analytics and consent

## Context

butik wants analytics (PostHog) and readiness for Google Tag Manager, **fully
compatible with a GDPR cookie banner** that is not tied to a provider and is
opensource. The site is static-first (ADR-0002), so consent is handled
**client-side**. We have a pattern already proven in our `monowai` repo to reuse.

## Decision

- **Cookie banner**: **`vanilla-cookieconsent` v3** (opensource,
  provider-agnostic). Configuration and init isolated in `src/lib/consent/`
  (config, init, wrapper), with a hook in the layout and a "cookie preferences"
  button in the footer.
- **Categories**: `necessary` (readOnly, always on) and `analytics` (with
  `autoClear` of the provider's cookies). Further categories (e.g. `marketing`)
  are added if and when needed.
- **No tracking before consent.** PostHog initializes with
  `opt_out_capturing_by_default: true` and `opt_out_persistence_by_default: true`.
  Consent drives `opt_in_capturing()` / `opt_out_capturing()` + `reset()` via the
  banner's `onConsent` / `onChange` callbacks.
- **Google Consent Mode** for GTM/GA: a `safeGtag` wrapper, no-op until GTM is
  loaded, that forwards `gtag('consent','update', { analytics_storage })` based on
  the `analytics` category. GTM/GA aren't loaded by default; the consent hook is
  ready.
- All logic is **client-side** (`*.client.ts` by convention), consistent with
  static-first. The `consent-check` skill verifies no third-party script is
  loaded/activated outside the consent gates.

## Alternatives considered

### A provider-bound banner (e.g. an analytics vendor's native consent)

Rejected by explicit requirement: we want an opensource, provider-independent
banner, so we can change analytics without changing consent.

### Load PostHog and activate it afterwards

Rejected: it risks tracking before consent. `opt_out_by_default` guarantees
nothing fires until the user accepts.

## Consequences

### Positive

- GDPR compliance by design; no tracking without consent.
- Consent decoupled from the provider: changing analytics doesn't touch the banner.
- Works on any static host (no server runtime required).

### Negative / accepted risks

- Consent isn't propagated server-side (not needed, but worth remembering if SSR
  is ever added).
- Two hooks (PostHog opt-in/out + Consent Mode gtag) to keep in sync.

### When to deviate (revisit triggers)

- Server-side tracking is added, or a provider that requires server-propagated
  consent → new ADR.
