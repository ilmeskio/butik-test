// ── PostHog — inizializzazione lato client, opt-out-by-default ─────────────
// Vedi ADR-0006 (docs/adr/0006-analytics-and-consent.md): nessun tracciamento
// prima del consenso. PostHog viene caricato in modo pigro: `init()` avviene
// solo quando l'utente concede la categoria `analytics` (optIn). Finché il
// consenso non è concesso, la libreria non viene nemmeno inizializzata, quindi
// non parte alcuna richiesta di rete.
//
// La chiave si legge da `PUBLIC_POSTHOG_KEY` e l'host da `PUBLIC_POSTHOG_HOST`
// (default: cloud EU). Se la chiave manca, tutto è un no-op: il sito continua a
// funzionare e a fare build senza PostHog.
import posthog from 'posthog-js';

const KEY = import.meta.env.PUBLIC_POSTHOG_KEY as string | undefined;
const HOST =
  (import.meta.env.PUBLIC_POSTHOG_HOST as string | undefined) ?? 'https://eu.i.posthog.com';

let initialized = false;

// Inizializza PostHog una sola volta. Ritorna `false` (e non fa nulla) se la
// chiave non è configurata, così i chiamanti possono uscire in sicurezza.
function ensureInit(): boolean {
  if (initialized) return true;
  if (!KEY) return false;

  posthog.init(KEY, {
    api_host: HOST,
    // Nessuna cattura né persistenza finché non c'è consenso esplicito.
    opt_out_capturing_by_default: true,
    opt_out_persistence_by_default: true,
  });
  initialized = true;
  return true;
}

// Consenso concesso: carica PostHog (se non già fatto) e attiva la cattura.
export function optInPostHog(): void {
  if (!ensureInit()) return;
  posthog.opt_in_capturing();
}

// Consenso negato/revocato: disattiva la cattura e azzera lo stato locale.
// Se PostHog non è mai stato inizializzato (utente che rifiuta subito) non c'è
// nulla da ripulire — la libreria non è stata caricata.
export function optOutPostHog(): void {
  if (!KEY || !initialized) return;
  posthog.opt_out_capturing();
  posthog.reset();
}

// Cattura un evento nominato. No-op se PostHog non è inizializzato o il
// consenso non è stato concesso (opt_out_capturing_by_default garantisce che
// anche in questo caso non vengano inviate richieste di rete).
export function captureEvent(
  name: string,
  properties?: Record<string, unknown>,
): void {
  if (!initialized) return;
  posthog.capture(name, properties);
}
