> **Consigliata, non enforced.** Come scrivere e rivedere le decisioni di prodotto
> (PDR). Le decisioni vivono in [`../product/`](../product/README.md); qui sta il
> *come*.

# Product decisions

Le scelte di prodotto/design sono molte e frequenti: hanno il loro log granulare
in `docs/product/decisions/` (PDR), separato dai pochi ADR tematici.

## Scrivere un PDR

1. Copia [`../product/decisions/template.md`](../product/decisions/template.md) in
   `NNNN-titolo-kebab.md`, oppure lascia che la skill `product-decision` lo
   scaffoldi.
2. Tienilo corto: Contesto, Decisione, Motivazione, Conseguenze. Linka il
   materiale di `reference/` da cui parte.
3. I PDR sono **append-only**: non riscrivere una decisione accettata; scrivine una
   nuova e marca la vecchia `superseded by PDR-NNNN`.

## Rivedere un PDR (con stakeholder non tecnici)

Il `.md` è la source of truth. La **superficie di review** dipende dalla scelta di
workshop componenti ancora aperta in
[ADR-0005](../adr/0005-design-system.md#workshop):

- se si sceglie la **gallery Astro** → il PDR si rivede su una pagina `lab/` che
  affianca prototipo e "prima";
- se si sceglie **Storybook** → una pagina `Product/*` che importa il markdown e
  lo renderizza accanto al prototipo.

Finché il workshop non è deciso, allega al PDR un link diretto al prototipo (pagina
`lab/` o screenshot) così lo stakeholder rivede senza leggere markdown.
