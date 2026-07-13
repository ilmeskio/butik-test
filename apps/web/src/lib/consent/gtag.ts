// ── Google Consent Mode — wrapper safe per gtag ───────────────────────────
// Vedi ADR-0006 (Update 2026-07-13). GTM è caricato via Consent Mode v2 dal
// BaseLayout quando `PUBLIC_GTM_ID` è impostato; l'inline script definisce
// `window.gtag`. Questo wrapper inoltra `gtag('consent','update', …)` solo se
// `window.gtag` esiste, così resta un no-op sicuro quando GTM non è configurato
// (ID assente) e non rompe il build né il runtime.
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
