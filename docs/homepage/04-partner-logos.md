# 04 · PartnerLogos

**File codice**: `src/components/home/PartnerLogos.astro` (nuovo)
**Sezione wireframe**: strip orizzontale di loghi dopo ProcessSteps,
prima di Numbers

## Scopo

Social proof minimale: strip di loghi clienti/partner per dare credibilità
prima delle metriche. Nel wireframe è una riga di loghi grigi, senza titoli.

## Layout & contenuto

**Marquee orizzontale infinito**: strip sottile con loghi che scorrono
continuamente da destra verso sinistra. Permette di mostrare molti partner
in poco spazio senza UX hint di scroll.

```
   ┌───────────────────────────────────────────────────────┐
   → [logo] [logo] [logo] [logo] [logo] [logo] [logo] →
   └───────────────────────────────────────────────────────┘
```

- Strip full-width, altezza contenuta (`py-10 md:py-12`).
- Loghi affiancati con `gap-6` (mobile) / `gap-8` (desktop).
- **Logo-card**: ogni logo è dentro una chip bianca arrotondata
  (`bg-white rounded-xl ring-1 ring-butik-dark/5`), a colori originali e
  opacità piena. Scelta presa dopo un test: i loghi forniti sono molto
  eterogenei (lettering orizzontali vs stemmi comunali verticali) e in
  grayscale-flat su `bg-butik-light` gli stemmi risultavano slavati e
  illeggibili. La card bianca dà contrasto, unifica le forme e rende la strip
  più leggibile e intenzionale (look da partner istituzionali).
- Animazione CSS infinita, velocità lenta (~45s per ciclo completo).
- Su mobile: stesso marquee, eventuale velocità leggermente diversa.

> **Nota sul grayscale.** Lo spec originale prevedeva `grayscale` + opacità
> 60%. È stato superato dalla scelta logo-card: vedi "Decisioni prese".

## Dati

Array hard-coded nel componente:

```ts
const partners = [
  { name: 'Comune di Milano', logo: '/logos/comune-milano.png' },
  { name: 'AssoConcerti', logo: '/logos/assoconcerti.png' },
  // ...
];
```

I file PNG vivono in `src/assets/logos/` e sono importati come asset
(`import.meta.glob` in `src/data/partners.ts`, tipo `ImageMetadata`) così che
`<Image>` di Astro li ottimizzi (responsive + formati moderni). La lista è
condivisa tra il marquee (`PartnerLogos.astro`) e la pagina `/partners`.
Sono i 18 loghi collaborazioni normalizzati (autocrop dei margini trasparenti,
altezza uniforme 120px per retina, sfondo del JPG Visit/DMO Cremona rimosso).
Asset trasparenti: la chip bianca è renderizzata via CSS, non cotta nel PNG.

**Caso speciale `visit-cremona.png`**: l'originale è arancio + testo bianco su
fondo navy. Il bianco su chip bianca sparirebbe, quindi l'asset è una versione
**monocromatica scura** (tutto appiattito su `butik-dark`, trasparente).

## Props

Opzionale: `partners?: {name, logo}[]` — se passato, sovrascrive l'hardcoded.
Default: lista interna.

## Stile

- Container: `bg-butik-light py-10 md:py-12 overflow-hidden`.
  - `overflow-hidden` è critico per nascondere i loghi che escono ai bordi.
- Track marquee: `flex w-max items-center gap-6 md:gap-8 animate-butik-marquee will-change-transform`.
- Card: `shrink-0 flex items-center justify-center bg-white rounded-xl ring-1 ring-butik-dark/5 px-6 md:px-8 h-16 md:h-20`.
- Logo dentro la card: `max-h-8 md:max-h-10 w-auto` (`loading="lazy"`, `alt=""` perché la strip è decorativa).

### Animazione CSS (in `global.css`)

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee 35s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animate-marquee {
    animation: none;
  }
}
```

Il `translateX(-50%)` funziona perché **duplichiamo i loghi** nel markup: la
track contiene `[logo1...logoN, logo1...logoN]`. A `-50%` siamo a fine del
primo set e l'animazione riparte da 0 senza salto visivo.

## Interazioni

- **Marquee**: scorre automaticamente, loop infinito.
- **Pausa on hover**: passando il mouse sulla strip il marquee si ferma
  (`animation-play-state: paused`), per dare modo di leggere i loghi.
- **Nome on hover del logo**: passando sopra una card, il nome del partner
  compare in basso alla strip, **nella stessa posizione per tutti**
  (label assoluta, `bottom-4`, centrata). Gestito via piccolo script che
  legge `data-name` dalle card.
- **Nessun click**: i loghi non sono link. L'elenco completo
  logo · nome vive nella pagina dedicata `/partners`.
- **Reduced motion**: rispettiamo `prefers-reduced-motion: reduce`,
  l'animazione si ferma e i loghi restano statici.

## Mobile

Marquee anche su mobile, identico nel comportamento ma con qualche
aggiustamento dimensionale.

- **Marquee**: stesso pattern del desktop, non collassa in griglia.
- **Logo height**: `h-8` su mobile, `h-10` da `md:`.
- **Gap tra loghi**: `gap-10 md:gap-16` (un filo più stretto su mobile).
- **Padding sezione**: `py-8 md:py-12`.
- **Velocità marquee**: invariata (`35s`), oppure leggermente più rapida
  su mobile se il loop sembra troppo lento sul viewport stretto
  (es. `25s` su `<md`).
- **Touch swipe**: l'animazione CSS non impedisce lo scroll della pagina;
  niente da fare. Su mobile non c'è hover-pause, ma è ok — il marquee
  scorre comunque a velocità leggibile.

## Decisioni prese

- **Pattern**: marquee orizzontale infinito (scelta C).
- **Comportamento mobile**: stesso marquee, non collassa in griglia.
- **Loghi**: 18 loghi collaborazioni reali (PNG normalizzati in
  `public/logos/`). Niente più placeholder.
- **Resa logo-card (no grayscale)**: ogni logo dentro una chip bianca
  arrotondata, a colori originali, opacità piena. Sostituisce il
  `grayscale + opacity-60` dello spec originale, che con stemmi comunali
  verticali e il logo Visit Cremona rendeva male su `bg-butik-light`.
- **No link**: i loghi non sono cliccabili.
- **No pausa on hover**: il marquee scorre sempre, niente interazione.
- **Niente titolo/eyebrow**: la strip è nuda.
- **Reduced motion**: l'animazione si ferma per chi ha la preferenza
  attivata, loghi statici visibili.

## Domande aperte

1. **Quanti partner**: TBD. Non blocca l'implementazione (parto con un set
   placeholder di ~10, sostituibili).
