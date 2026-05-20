# 11 · Footer

**File codice**: `src/components/Footer.astro` (esistente — da riscrivere)
**Sezione wireframe**: footer in basso

## Scopo

Footer ricco con info aziendali, social, e navigazione di servizio. Sostituisce
l'attuale footer rosso-minimal con uno chiaro a 2 colonne più bottom bar.

## Layout & contenuto

```
   ┌──────────────────────────────────────────────────────────┐
   │                                                          │
   │   [Logo]                  Chi siamo       Network        │
   │                           Servizi         Contattaci     │
   │   Butik s.r.l.            Portfolio       Sostienici     │
   │   Impresa Sociale         Formats         Transparency   │
   │   Via Plinio 14, ...      Blog                           │
   │   P. IVA 10429130965                                     │
   │                                                          │
   │   PEC & EMAIL                                            │
   │   butik@legalmail.it · info@wearebutik.it                │
   │                                                          │
   │   [FB] [IG] [LinkedIn] [YouTube]                         │
   │                                                          │
   ├──────────────────────────────────────────────────────────┤
   │ © 2026 Butik. Tutti i diritti riservati.                 │
   │                Privacy · Termini · Cookie settings       │
   └──────────────────────────────────────────────────────────┘
```

- Container box bordato (`border border-butik-dark/15`) interno alla sezione.
- Sezione full-width con sfondo `butik-light`.
- Bottom bar separata da divider.

## Contenuto (dal wireframe)

### Colonna info (sinistra)

- Logo
- **Butik s.r.l. Impresa Sociale**
- Via Plinio 14, 20129 Milano - Italy
- P. IVA 10429130965
- Sezione "PEC & EMAIL":
  - `butik@legalmail.it`
  - `info@wearebutik.com`
- Social icons: Facebook, Instagram, LinkedIn, YouTube, Spotify

### Colonna link 1

- Chi siamo (`/chi-siamo`)
- Servizi (`/servizi`)
- Portfolio (`/progetti`)
- Formats (`/formats`)
- Blog (`/blog`)

### Colonna link 2

- Network (`/network`)
- Contattaci (`/contatti`)
- Sostienici (`/sostienici`)
- Transparency (`/transparency`)

### Bottom bar

- Sinistra: `© 2026 Butik. Tutti i diritti riservati.`
- Destra: Privacy policy · Termini di utilizzo · Cookie settings

## Props

Nessuna.

## Stile

- Footer: `bg-butik-light text-butik-dark py-16`.
- Inner box: `max-w-7xl mx-auto px-6 border border-butik-dark/15 p-10`.
- Grid: `grid md:grid-cols-3 gap-12`.
- Logo: come header (stesso size).
- Indirizzo / P.IVA: `font-sans text-sm text-butik-dark/70`.
- "PEC & EMAIL" label: `font-display text-xs font-bold tracking-widest uppercase`.
- Email links: `font-sans text-sm text-butik-dark underline hover:text-butik-red`.
- Social: SVG icon `w-5 h-5 text-butik-dark hover:text-butik-red`.
- Colonne link: title `font-display text-xs tracking-widest uppercase` + lista `font-sans text-sm text-butik-dark hover:text-butik-red`.
- Bottom bar: `border-t border-butik-dark/10 mt-8 pt-6 flex flex-col md:flex-row md:justify-between gap-3 text-xs text-butik-dark/50`.

## Interazioni

Solo hover su link e icon.

## Cosa cambia rispetto a oggi

| Oggi | Wireframe |
|---|---|
| Sfondo `butik-red`, testo bianco | Sfondo `butik-light`, testo nero |
| Solo intestazione + social text-link + ©  | 3 colonne ricche + bottom bar |
| Social come testo | Social come icone SVG |
| 4 social | 5 social: aggiunto **Spotify** |

## Mobile

Sotto `md` (< 768px):

- **Layout**: 3 colonne collassano in **stack verticale** (`grid-cols-1 md:grid-cols-3`).
- **Ordine blocchi**:
  1. Logo + ragione sociale + indirizzo + P.IVA
  2. PEC & EMAIL
  3. Social icons
  4. Colonna link 1 (Chi siamo, Servizi, Portfolio, Formats, Blog)
  5. Colonna link 2 (Network, Contattaci, Sostienici, Transparency)
- **Colonne link**: su mobile diventano 2 affiancate (`grid-cols-2` interno) per
  non occupare 9 righe consecutive di link. Su `md`+ tornano 2 colonne separate
  nella griglia principale.
- **Inner box padding**: `p-6` (vs `p-10` desktop).
- **Social icons**: allineate a sinistra come gli altri elementi (non
  centrate), `gap-4`.
- **Bottom bar**: `flex-col gap-3` su mobile (`md:flex-row md:justify-between`).
  Copyright sopra, link Privacy/Termini/Cookie sotto (con `flex-wrap gap-x-4`).
- **Touch target link**: `py-2` su ogni voce della lista di servizio per
  garantire 44px verticali.

## Decisioni prese

- **Email**: `info@wearebutik.com` (confermato `.com`).
- **Social**: aggiunto Spotify (totale 5: Facebook, Instagram, LinkedIn, YouTube, Spotify).
- **URL social** verranno forniti dall'utente in seguito.

## Domande aperte

1. **Le 4 pagine "Formats / Network / Sostienici / Transparency"** non
   esistono. Le linko comunque (404) o le ometto?
2. **Privacy / Termini / Cookie settings**: ci sono pagine reali o sono
   placeholder?
3. **Bottom bar con bordo**: il wireframe lo mostra separato. Confermi il
   divider line.
