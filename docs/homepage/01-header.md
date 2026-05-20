# 01 · Header

**File codice**: `src/components/Header.astro` (esistente — da modificare)
**Tipo intervento**: estensione voci nav + sostituzione social → CTA

## Scopo

Navigazione globale persistente in cima a ogni pagina del sito. Nel wireframe
l'header ha più voci dell'attuale e un CTA "Lavoriamo insieme" sulla destra al
posto delle social icon.

## Layout & contenuto

```
┌─────────────────────────────────────────────────────────────────┐
│ [Logo]   Chi siamo · Servizi · Contatti · Portfolio · Blog   [CTA] │
└─────────────────────────────────────────────────────────────────┘
```

- Sticky in alto, sfondo `butik-light`, bordo bottom sottile.
- Logo a sinistra (resta come ora, dimensione invariata).
- Nav 5 voci, separate, con stato attivo `text-butik-red`, default `text-butik-dark`.
- CTA a destra: bottone pieno nero con label uppercase tracked.
- Mobile: hamburger → menu drop con stesse voci + CTA in fondo.

## Voci di nav (label → href)

| Label | Href | Esiste già la pagina? |
|---|---|---|
| Chi siamo | `/chi-siamo` | ❌ |
| Servizi | `/servizi` | ✅ |
| Contatti | `/contatti` | ❌ |
| Portfolio | `/progetti` | ✅ (la URL resta `/progetti`) |
| Blog | `/blog` | ❌ |

Le tre pagine mancanti restano 404 finché non le costruiremo. Decisione cosciente.

## Props

Nessuna. Il componente legge `Astro.url.pathname` per evidenziare la voce attiva.

## Stile

- Nav links: `font-display text-xs font-bold tracking-widest uppercase`.
- CTA destra: `bg-butik-dark text-white px-5 py-3 font-display text-xs font-bold tracking-widest uppercase hover:bg-butik-red transition-colors`.
- Hamburger: invariato come ora, ma colore `butik-dark`.

## Interazioni

- Toggle menu mobile (JS già presente).
- Hover sui link: cambio colore `butik-red`.
- View transitions: già gestito dal `ClientRouter` in `BaseLayout`.

## Cose che spariscono dal componente attuale

- Le 4 social icon (LinkedIn, Email, Instagram, Facebook) a destra → spostate
  nel Footer espanso.

## Mobile

Sotto `md` (< 768px):

- **Logo**: invariato in dimensione (h-14).
- **Nav 5 voci**: nascoste (`md:hidden` → solo mobile menu).
- **CTA "Lavoriamo insieme"**: nascosto dall'header — viene riproposto in
  fondo al drawer mobile aperto.
- **Hamburger**: `p-3` (touch target ~48px), icona `w-6 h-6`.
- **Mobile menu (drawer)**: full-width sotto l'header, sfondo bianco, voci
  in colonna con `py-4` (touch target generoso). CTA finale full-width.
- **Sticky**: resta sticky anche su mobile, l'altezza base `h-20` (80px) è
  ok per scroll lungo.
- **No social icons in header**: confermato, sono solo nel footer su tutti
  i breakpoint.

## Domande aperte

1. **Label "Portfolio" con URL `/progetti`**: confermi questo mismatch
   intenzionale (label friendly + URL stabile) oppure rinominiamo anche l'URL?
2. **CTA destra**: label "Lavoriamo insieme"? Punta a `/contatti` (404 per ora)?
3. **Voce "Network"**: nel wireframe del footer compare "Network" come link a
   sé. In header non c'è — ok lasciarlo solo nel footer?
4. **Sticky vs static**: attualmente è sticky (`sticky top-0`). Confermi?
