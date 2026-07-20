// ── PostHog — inizializzazione lato client, due livelli (ADR-0006, update
// 2026-07-20) ─────────────────────────────────────────────────────────────
// Livello SEMPRE ATTIVO, cookieless, legittimo interesse: pageview/pageleave
// e web vitals. `persistence: 'memory'` non scrive né cookie né localStorage,
// quindi non serve consenso (ePrivacy art. 5(3) riguarda l'accesso al
// dispositivo, non la raccolta in sé). `autocapture` resta OFF a questo
// livello: cattura il testo degli elementi, cosa che il livello sempre-attivo
// non deve toccare.
//
// Livello DIETRO CONSENSO: l'upgrade della persistenza a
// `localStorage+cookie` (identificatore persistente cross-visita) parte solo
// con l'opt-in alla categoria `analytics`. La revoca riabbassa la persistenza
// a `memory` e fa `reset()` — ma pageview/web-vitals continuano, perché non
// hanno mai avuto bisogno del consenso che si sta revocando.
//
// La chiave si legge da `PUBLIC_POSTHOG_KEY` e l'host da `PUBLIC_POSTHOG_HOST`
// (default: cloud EU). Se la chiave manca, tutto è un no-op: il sito continua a
// funzionare e a fare build senza PostHog.
import posthog from 'posthog-js';

const KEY = import.meta.env.PUBLIC_POSTHOG_KEY as string | undefined;
const HOST =
  (import.meta.env.PUBLIC_POSTHOG_HOST as string | undefined) ?? 'https://eu.i.posthog.com';

let initialized = false;

// Inizializza PostHog una sola volta, subito (se la chiave c'è) — non aspetta
// il consenso, perché il livello cookieless non ne ha bisogno. Ritorna `false`
// (e non fa nulla) se la chiave non è configurata.
function ensureInit(): boolean {
  if (initialized) return true;
  if (!KEY) return false;

  posthog.init(KEY, {
    api_host: HOST,
    // Cookieless finché non c'è opt-in: nessun cookie, nessun localStorage,
    // niente sopravvive a un reload.
    persistence: 'memory',
    // Consent-gated: cattura il testo degli elementi, resta OFF finché non
    // c'è opt-in esplicito (attivato in optInPostHog).
    autocapture: false,
    // Sempre attivi, cookieless: pageview/pageleave e web vitals.
    // 'history_change', non `true`: il sito naviga via ClientRouter di Astro
    // (soft navigation con pushState), non un caricamento di documento per
    // pagina — solo 'history_change' arma il patch di pushState/replaceState
    // di posthog-js; `true` catturerebbe solo il primo caricamento.
    capture_pageview: 'history_change',
    capture_pageleave: true,
    capture_performance: { web_vitals: true },
  });
  initialized = true;
  return true;
}

// Chiamata all'avvio (fuori dal flusso di consenso): garantisce il livello
// cookieless anche per chi non ha ancora risposto al banner.
export function initPostHogCookieless(): void {
  ensureInit();
}

// Consenso concesso: upgrade a persistenza durevole + autocapture.
export function optInPostHog(): void {
  if (!ensureInit()) return;
  posthog.set_config({ persistence: 'localStorage+cookie', autocapture: true });
}

// Consenso negato/revocato: torna al livello cookieless. Pageview e web vitals
// NON si fermano — non hanno mai avuto bisogno del consenso che si sta
// revocando; solo la persistenza durevole e l'autocapture si spengono.
export function optOutPostHog(): void {
  if (!KEY || !initialized) return;
  posthog.set_config({ persistence: 'memory', autocapture: false });
  posthog.reset();
}

// Punto d'ingresso unico per gli eventi custom. Gated esplicitamente su
// `initialized`: se il consenso non è mai stato concesso, `ensureInit()` non è
// mai girato e questa funzione è un no-op, indipendentemente da come il
// singleton di posthog-js si comporta internamente.
export function trackEvent(event: string, properties?: Record<string, unknown>): void {
  if (!initialized) return;
  posthog.capture(event, properties);
}
