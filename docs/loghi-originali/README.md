# Loghi originali

Sorgenti ad alta risoluzione dei loghi, conservate per eventuali operazioni
future (re-export, varianti, stampa). **Non** vengono usate direttamente dal
sito: i file effettivamente serviti sono quelli normalizzati e ottimizzati.

## `collaborazioni/`

PNG/JPG originali dei loghi partner. Le versioni normalizzate (rinominate
kebab-case, PNG trasparenti) vivono in `src/assets/logos/` e sono importate da
`src/data/partners.ts`, poi ottimizzate in WebP responsive da `<Image>` in
`src/components/home/PartnerLogos.astro`.

| Originale                          | Normalizzato in `src/assets/logos/` |
| ---------------------------------- | ----------------------------------- |
| `Comune di Milano.png`             | `comune-milano.png`                 |
| `Comune di Napoli.png`             | `comune-napoli.png`                 |
| `Comune di Brescia.png`            | `comune-brescia.png`                |
| `Comune di Cremona.png`            | `comune-cremona.png`                |
| `Comune di Pesaro.png`             | `comune-pesaro.png`                 |
| `Comune di Verona.png`             | `comune-verona.png`                 |
| `CCIAAdiCremona.png`               | `cciaa-cremona.png`                 |
| `Ministero affari esteri.png`      | `ministero-affari-esteri.png`       |
| `1 AssoConcerti.png`               | `assoconcerti.png`                  |
| `2 Assomusica.png`                 | `assomusica.png`                    |
| `3 Fimi.png`                       | `fimi.png`                          |
| `4 NuovoImaie.png`                 | `nuovo-imaie.png`                   |
| `5 SIAE.png`                       | `siae.png`                          |
| `Istituto IULM.png`                | `iulm.png`                          |
| `Istituto NAM.png`                 | `nam.png`                           |
| `Istituto SAE.png`                 | `sae.png`                           |
| `Istituto 24 business school.png`  | `24ore-business-school.png`         |

Nota: `DMO Cremona 24.JPG` e `Visit Cremona` non hanno (ancora) una
corrispondenza 1:1 — verificare prima di riusarli.

## `butik/`

Sorgenti del marchio Butik in tutte le varianti (bollo / scritta, rosso / nero,
PNG + SVG). Gli SVG `bollo-rosso` e `bollo-nero` sono già in
`src/assets/logos/` e usati da Header/Footer; le altre varianti sono qui solo
come archivio.
