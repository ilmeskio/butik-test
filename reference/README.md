# Reference

Materiale grezzo in **quarantena**: input da cui partono le decisioni, non codice o
documentazione viva. Sola lettura, storia. Non è la source of truth di niente —
lo sono gli [ADR](../docs/adr/README.md), le [guidance](../docs/guidances/README.md)
e i [PDR](../docs/product/README.md).

## Cosa vive qui

- **`copy/`** — copy editoriale sorgente (`site-copy-source.md`). È l'**input**
  della migrazione a content collection: la source of truth finale è
  `src/content/**`, editabile via Sitepins ([ADR-0004](../docs/adr/0004-content-architecture.md)).
  Finché le pagine non sono tutte content-driven, questo file resta il riferimento.
- **`loghi-originali/collaborazioni/`** — loghi partner **originali grezzi**. Le
  versioni usate dal sito (rinominate, ottimizzate) stanno in `src/assets/logos/`;
  questi sono gli originali da cui derivano, tenuti come archivio.

## Materiale di riferimento che vive altrove

Per non rompere link/asset, alcuni riferimenti restano nella loro sede storica ma
sono a tutti gli effetti reference:

- `design/relume-ref/` — kit Relume di partenza per il wireframe.
- `design/branding/` — loghi butik ufficiali (usati anche come branding vivo).

Quando un PDR o un ADR cita del materiale, linka il file (qui o dove risiede) —
così la catena "da cosa siamo partiti → cosa abbiamo deciso" resta leggibile.
