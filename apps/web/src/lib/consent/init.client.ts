// ── Avvio del cookie banner ────────────────────────────────────────────────
// Wrapper attorno a CookieConsent.run(config). Vedi ADR-0006.
// `initCookieConsent()` va chiamato dal layout (a ogni astro:page-load, perché
// le view transition rimpiazzano il DOM). `showCookiePreferences()` riapre la
// modale delle preferenze dal bottone nel footer.
import * as CookieConsent from 'vanilla-cookieconsent';
import { consentConfig } from './config.client';

export function initCookieConsent(): Promise<void> {
  return CookieConsent.run(consentConfig);
}

export function showCookiePreferences(): void {
  CookieConsent.showPreferences();
}
