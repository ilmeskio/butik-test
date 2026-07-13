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

## Update (2026-07-13): GTM enabled via Google Consent Mode v2

The original decision left GTM/GA loaded-on-demand only ("GTM/GA aren't loaded by
default; the consent hook is ready"). We now **load GTM on every page** using the
pattern documented by `vanilla-cookieconsent` for tag managers — **Google Consent
Mode v2** — because we want the tag manager in place now, not later.

- **Loading model**: an inline script in `<head>` sets
  `gtag('consent','default', { ad_storage, ad_user_data, ad_personalization,
  analytics_storage: 'denied', wait_for_update: 500 })` **before** `gtm.js` is
  requested, then loads the GTM container. No tag fires while consent is denied;
  Consent Mode gates behaviour, not the script load.
- **Container id**: read from `PUBLIC_GTM_ID` (Astro env, `PUBLIC_` required — the
  id is public by nature). If unset, GTM is not injected and the build stays
  green — same graceful-degradation contract as PostHog.
- **Consent mapping** (`config.client.ts` → `applyConsent`): the `analytics`
  category drives `analytics_storage` (and PostHog opt-in/out); the `marketing`
  category drives the three ad signals `ad_storage`, `ad_user_data`,
  `ad_personalization`. Both categories ship now so every GTM tag is enabled once
  the user consents — we no longer wait for a "future" marketing category.
- **Cookie/script audit** (follow-up, tracked as issue #22): the cookie
  lists in the banner (`autoClear` + `cookieTable`) are **provisional** — the real
  set depends on which tags are actually loaded in the GTM container. A mechanism
  must reconcile the declared cookies/scripts against what is really loaded and
  keep the banner list in sync. Until then, treat the `marketing` cookie rows as
  a best-effort placeholder.
- **Marketing section gating** (follow-up, issue #23): showing a `marketing`
  toggle while no marketing tag is actually loaded is a minor information
  mismatch. Revisit at go-live — hide the section until a real marketing tag
  exists in the container, or keep it if such tags are imminent.

### Accepted trade-off vs the original wording

The original decision's "no third-party script is loaded/activated outside the
consent gates" is relaxed for GTM: `gtm.js` itself loads before consent, but with
Consent Mode default-`denied` no storage is written and no tag fires until the
user accepts. Full script-blocking (loading `gtm.js` only after consent) was
considered and rejected in favour of Consent Mode's conversion/behaviour
modelling signals. If a stricter "zero Google contact before consent" posture is
required, switch GTM to `vanilla-cookieconsent`'s `data-category` script blocking
→ note it here.
