// ── Configurazione cookie banner (vanilla-cookieconsent v3) ────────────────
// Vedi ADR-0006 (docs/adr/0006-analytics-and-consent.md).
// Categorie: `necessary` (readOnly, sempre attiva) e `analytics` (PostHog, con
// autoClear dei cookie del provider). I callback onConsent/onChange collegano il
// consenso a Google Consent Mode (safeGtag) e a PostHog (opt-in/opt-out).
import type CookieConsent from 'vanilla-cookieconsent';
import { acceptedCategory } from 'vanilla-cookieconsent';
import { optInPostHog, optOutPostHog } from '#lib/analytics/posthog.client';
import { safeGtag } from './gtag';

// Applica lo stato del consenso `analytics` sia a Consent Mode sia a PostHog.
function applyAnalyticsConsent(): void {
  const granted = acceptedCategory('analytics');
  safeGtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
  });
  if (granted) optInPostHog();
  else optOutPostHog();
}

export const consentConfig: CookieConsent.CookieConsentConfig = {
  revision: 1,

  // Barra in basso, non un box centrale.
  guiOptions: {
    consentModal: { layout: 'bar', position: 'bottom' },
  },

  onConsent: () => {
    applyAnalyticsConsent();
  },

  onChange: ({ changedCategories }) => {
    if (changedCategories.includes('analytics')) {
      applyAnalyticsConsent();
    }
  },

  categories: {
    necessary: { enabled: true, readOnly: true },
    analytics: {
      autoClear: {
        // Cookie PostHog: `_ph_*` / `ph_*`.
        cookies: [{ name: /^_?ph_/ }, { name: 'ph_*' }],
      },
    },
  },

  language: {
    default: 'it',
    translations: {
      it: {
        consentModal: {
          title: 'Utilizziamo i cookie',
          description:
            'Usiamo strumenti di analisi per capire come viene usato il sito e migliorarlo. Nessun tracciamento parte senza il tuo consenso. Dettagli nella <a href="/privacy#cookie">Cookie Policy</a>.',
          acceptAllBtn: 'Accetta tutti',
          acceptNecessaryBtn: 'Rifiuta',
          showPreferencesBtn: 'Gestisci preferenze',
        },
        preferencesModal: {
          title: 'Preferenze cookie',
          acceptAllBtn: 'Accetta tutti',
          acceptNecessaryBtn: 'Rifiuta tutti',
          savePreferencesBtn: 'Salva preferenze',
          closeIconLabel: 'Chiudi',
          // Link alla policy in fondo al modal preferenze.
          footer:
            '<a href="/privacy">Privacy &amp; Cookie Policy</a> · <a href="/termini">Termini di utilizzo</a>',
          sections: [
            {
              title: 'Cookie necessari',
              description:
                'Essenziali per il funzionamento del sito. Sono sempre attivi e non possono essere disattivati.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Analisi utilizzo',
              description:
                "PostHog — statistiche aggregate e anonime su come viene usato il sito, per migliorarlo.",
              linkedCategory: 'analytics',
              cookieTable: {
                headers: {
                  name: 'Cookie',
                  duration: 'Durata',
                  description: 'Descrizione',
                },
                body: [
                  {
                    name: '_ph_* / ph_*',
                    duration: '1 anno',
                    description: 'Analisi aggregata del comportamento di navigazione (PostHog).',
                  },
                ],
              },
            },
          ],
        },
      },
    },
  },
};
