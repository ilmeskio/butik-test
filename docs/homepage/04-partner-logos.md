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
- Loghi affiancati con `gap-12` o `gap-16`.
- Tutti grayscale (filtro CSS), opacità ~60%.
- Animazione CSS infinita, velocità lenta (~30-40s per ciclo completo).
- Su mobile: stesso marquee, eventuale velocità leggermente diversa.

## Dati

Array hard-coded nel componente:

```ts
const partners = [
  { name: 'Comune di Milano', logo: '/logos/comune-milano.svg' },
  { name: 'Milano Music Week', logo: '/logos/mmw.svg' },
  // ...
];
```

I file SVG vivono in `public/logos/` (cartella da creare).

**Per la prima implementazione**: uso 6-8 placeholder grigi (`div` con bordo
e testo "Logo") finché non hai i loghi reali. Funziona come tappabuchi.

## Props

Opzionale: `partners?: {name, logo}[]` — se passato, sovrascrive l'hardcoded.
Default: lista interna.

## Stile

- Container: `bg-butik-light py-10 md:py-12 overflow-hidden`.
  - `overflow-hidden` è critico per nascondere i loghi che escono ai bordi.
- Track marquee: `flex w-max gap-12 md:gap-16 animate-marquee will-change-transform`.
- Logo: `h-8 md:h-10 w-auto opacity-60 grayscale shrink-0`.
- Placeholder loghi (mentre non hai gli SVG reali): `shrink-0 border border-butik-dark/20 px-6 py-3 text-xs font-display tracking-widest uppercase text-butik-dark/40`.

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
- **Nessuna pausa on hover**: il movimento è costante. La strip è puramente
  decorativa, non interattiva.
- **Nessun click**: i loghi non sono link.
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
- **Loghi**: per ora **placeholder** (box bordato con nome partner). Gli SVG
  reali arriveranno in seguito.
- **No link**: i loghi non sono cliccabili.
- **No pausa on hover**: il marquee scorre sempre, niente interazione.
- **Niente titolo/eyebrow**: la strip è nuda.
- **Reduced motion**: l'animazione si ferma per chi ha la preferenza
  attivata, loghi statici visibili.

## Domande aperte

1. **Quanti partner**: TBD. Non blocca l'implementazione (parto con un set
   placeholder di ~10, sostituibili).
