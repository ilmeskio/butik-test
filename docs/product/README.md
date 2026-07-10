# Product decisions

Il **log granulare delle decisioni di prodotto e design** — un file per scelta.
È deliberatamente ciò che gli [ADR](../adr/README.md) *non* sono: gli ADR sono una
piccola fondazione tematica per partire allineati
([ADR-0001](../adr/0001-recording-decisions.md) — "un insieme piccolo e coerente…
non una lista lunga di record granulari"). Le scelte di prodotto sono tante e
frequenti, quindi hanno il loro spazio.

| Spazio | Contiene | Natura |
|---|---|---|
| [`../adr/`](../adr/README.md) | decisioni architetturali | poche, tematiche, immutabili |
| **`decisions/`** | decisioni prodotto/design (PDR) | molte, granulari, source of truth |
| [`../../reference/`](../../reference/README.md) | input grezzo (legacy, dump, prototipi) | storia read-only, in quarantena |

## Scrivere un PDR

1. Copia [`decisions/template.md`](./decisions/template.md) in
   `decisions/NNNN-titolo-kebab.md` (prossimo numero libero). Oppure lascia che la
   skill `product-decision` lo scaffoldi.
2. Tienilo corto: Contesto, Decisione, Motivazione, Conseguenze. Linka il
   materiale di `reference/` da cui parte.
3. I PDR sono **append-only** — non riscrivere una decisione accettata per farle
   dire un'altra cosa; scrivine una nuova e marca la vecchia
   `superseded by PDR-NNNN`.

Per il *come* scrivere e rivedere un PDR (inclusa la superficie di review) vedi la
[guidance product-decisions](../guidances/product-decisions.md).
