// ── Google Consent Mode — wrapper safe per gtag ───────────────────────────
// Vedi ADR-0006: GTM/GA non sono caricati di default. Questo wrapper inoltra
// `gtag('consent','update', …)` solo se `window.gtag` esiste già, così il
// gancio del consenso è pronto (forward-compatible) senza rompere nulla finché
// GTM non verrà installato.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function safeGtag(
  command: string,
  action: string,
  params: Record<string, string>,
): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(command, action, params);
  }
}
