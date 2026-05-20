# 05 · Numbers

**File codice**: `src/components/home/Numbers.astro` (nuovo)
**Sezione wireframe**: "Il nostro lavoro genera valore misurabile nei
territori dove operiamo"

## Scopo

Sezione metriche aggregate: numeri grandi che dimostrano scala e impatto.
Tipico bloc di credibilità post-loghi.

## Layout & contenuto

Sezione **compatta a due strip** su desktop, separate da un piccolo divider
con label "Milano Music Week". La prima strip racconta i numeri aggregati di
Butik; la seconda è dedicata a MMW, il prodotto bandiera.

```
   ┌──────────────────────────────────────────────────────┐
   │   (eyebrow opz)                                      │
   │                                                      │
   │   30+    15+    10+    5+    1000+                   │
   │   prog.  terr.  fin.   perc.  giovani formati        │
   │                                                      │
   │   ─── Milano Music Week ──────────────────           │
   │                                                      │
   │              2                70K+                   │
   │           edizioni       persone raggiunte           │
   └──────────────────────────────────────────────────────┘
```

- **Strip 1** (Butik generale): 5 metriche in riga unica su `lg:`
  (`lg:grid-cols-5`).
- **Divider**: linea sottile + eyebrow `text-butik-green` "Milano Music Week"
  (oppure label centrata sopra la strip MMW — vedi stile).
- **Strip 2** (MMW): 2 metriche, allineate al centro o a sinistra
  (`lg:grid-cols-2 max-w-2xl`).
- Padding verticale ridotto (`py-16 lg:py-20`).
- Numeri: `text-4xl lg:text-5xl` (~36-48px).
- Label sotto ciascun numero, corta (1-3 parole).

## Dati

### Strip 1 — Butik generale (5 metriche)

| Valore | Label |
|---|---|
| 30+ | progetti |
| 15+ | territori |
| 10+ | finanziamenti |
| 5+ | percorsi formativi |
| 1000+ | giovani formati |

### Strip 2 — Milano Music Week (2 metriche)

| Valore | Label |
|---|---|
| 2 | edizioni |
| 70K+ | persone raggiunte |

In questa strip non serve esplicitare "MMW" sulle singole metriche: il
contesto è già dato dal divider/etichetta della sezione.

Eventuali numeri MMW aggiuntivi (es. partner coinvolti, eventi, format):
vedi domanda 1.

## Props

Opzionale: `metrics?: {value, label}[]`. Default: array interno.

## Stile

- Container: `bg-butik-dark text-white py-16 lg:py-20`.
- Eyebrow sezione (opzionale): `font-display text-xs font-bold tracking-widest uppercase text-butik-green mb-3`.
- Nessun H2.

### Strip 1 (Butik)

- Grid: `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4`.

### Divider MMW

- Wrapper: `mt-12 lg:mt-16 pt-10 lg:pt-12 border-t border-white/15`.
- Label "Milano Music Week": `font-display text-xs font-bold tracking-widest uppercase text-butik-green mb-8 text-center`.

### Strip 2 (MMW) — centrata

- Grid: `grid grid-cols-2 gap-6 lg:gap-12 max-w-xl mx-auto text-center`.
- Numeri e label centrati orizzontalmente dentro la cella.

### Numeri e label (entrambe le strip)

- Numero: `font-heading text-4xl lg:text-5xl font-black text-butik-green leading-none`.
- Label: `font-sans text-xs lg:text-sm text-white/70 mt-2 leading-snug`.

## Interazioni

Nessuna. Solo display.

Eventuale animazione futura: count-up animato on scroll (out of scope ora).

## Mobile

Sotto `lg` (< 1024px) entrambe le strip collassano:

- **Strip 1 (5 metriche)**:
  - `< sm`: `grid-cols-2` (2 col × 3 righe; l'ultima cella a sinistra).
  - `sm`-`lg`: `grid-cols-3` (3 col × 2 righe; 5° elemento a sinistra in
    seconda riga).
  - `lg+`: `grid-cols-5` (riga unica).
- **Strip 2 (2 metriche MMW)**:
  - Tutti i breakpoint: `grid-cols-2`. Restano affiancate anche su mobile
    (sono solo 2, non serve stack).
- **Divider**: invariato (linea + label). Spaziatura `mt-10` sotto la strip 1.
- **Numero**: `text-4xl lg:text-5xl` (~36px mobile, ~48px desktop).
- **Label**: `text-xs lg:text-sm`. Su mobile può crescere un filo
  (`text-sm`) se serve respiro.
- **H2** (se presente): `text-2xl md:text-3xl lg:text-4xl`, `mb-8 lg:mb-12`.
- **Padding sezione**: `py-12 md:py-16 lg:py-20`.
- **Allineamento**: numeri e label a sinistra (sia desktop che mobile).

## Decisioni prese

- **Sfondo**: `butik-dark` (#071108), testo bianco.
- **Colore numeri**: `butik-green` (#d2ff28).
- **Label compatte** (1-3 parole).
- **Struttura a due strip**: strip Butik (5 metriche) + strip MMW (2 metriche),
  separate da divider con etichetta "Milano Music Week".
- **Strip MMW**: 2 numeri (2 edizioni, 70K+ persone raggiunte), **centrata**
  (`mx-auto`).
- **H2**: nessuno. La sezione è una strip pura di numeri senza titolo.
  Eventuale eyebrow piccolo opzionale.

## Domande aperte

Nessuna. Pronto per implementazione.
