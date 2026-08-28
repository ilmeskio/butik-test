// ── Icone della sezione "Il nostro metodo" ────────────────────────────────
// Il copy delle tappe è content-driven (ADR-0004): vive nella collezione
// `pagine` (entry `servizi`, array `metodo`). Qui resta solo il vocabolario
// delle icone line-style — config di design, passata come prop al componente
// dalla pagina che lo usa (vedi MetodoIcon.astro).

export type MetodoIconName =
  | 'ascolto'
  | 'co-progettazione'
  | 'protagonismo'
  | 'formazione'
  | 'eventi';
