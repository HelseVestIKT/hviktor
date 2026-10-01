# Oppdatere ikonene

Ikonene i `@helsevestikt/hviktor-icons` er generert fra [Aksel-ikonene til Nav](https://aksel.nav.no/ikoner). SVG-filene og metadataene (kategorier og nøkkelord) hentes fra npm-pakken [`@navikt/aksel-icons`](https://www.npmjs.com/package/@navikt/aksel-icons), som er en devDependency i rot-`package.json`. Du trenger altså ikke laste ned zip-filen fra Aksel.

Alle kommandoer kjøres fra repo-roten.

## 1. Hent nyeste versjon av Aksel-ikonene

```bash
npm install -D @navikt/aksel-icons@latest
```

## 2. Importer nye ikoner

```bash
npm run import:nav-icons
```

Skriptet ([scripts/import-nav-icons-from-svg.js](../../scripts/import-nav-icons-from-svg.js)) gjør følgende:

1. Leser alle SVG-er i `node_modules/@navikt/aksel-icons/dist/svg`.
2. Lager én komponent per nytt ikon i `src/lib/components/`. Eksisterende ikoner røres ikke.
3. Skriver `src/index.ts` og `src/all-icons.ts` på nytt slik at alle ikonene eksporteres.
4. Kjører `npm run generate:icon-metadata`, som oppdaterer `src/app/demo/pages/icons/icon-metadata.json` for ikonsiden i demoappen.

### Navngiving

Aksel-navnet i PascalCase bestemmer alt annet:

| Aksel-fil            | Klasse                  | Selector                   | Fil                                 |
| -------------------- | ----------------------- | -------------------------- | ----------------------------------- |
| `ChevronDown.svg`    | `HviIconChevronDown`    | `hvi-icon-chevron-down`    | `icon-chevron-down.component.ts`    |
| `XMark.svg`          | `HviIconXMark`          | `hvi-icon-x-mark`          | `icon-x-mark.component.ts`          |
| `Buildings2Fill.svg` | `HviIconBuildings2Fill` | `hvi-icon-buildings2-fill` | `icon-buildings2-fill.component.ts` |

### Valg

| Kommando                                  | Hva den gjør                                                                 |
| ----------------------------------------- | ---------------------------------------------------------------------------- |
| `npm run import:nav-icons -- --force`     | Oppdaterer også SVG-path i eksisterende ikoner hvis Aksel har tegnet dem om. |
| `npm run import:nav-icons -- <svg-mappe>` | Leser SVG-er fra en annen mappe, f.eks. en utpakket zip fra Aksel.           |
| `npm run import:nav-icons -- --entries`   | Skriver bare `index.ts` og `all-icons.ts` på nytt.                           |
| `npm run generate:icon-metadata`          | Oppdaterer bare metadataene til ikonsiden i demoappen.                       |

`--force` endrer bare path-dataene, aldri klassenavn eller selector, så det er ikke en breaking change.

## 3. Se over og test

```bash
git status                # nye icon-*.component.ts, endret index.ts, all-icons.ts og icon-metadata.json
npm run build:icons
npm start                 # åpne /ikoner og søk opp de nye ikonene
```

Sjekk at:

- antallet på `/ikoner` stemmer med antallet ikoner på [aksel.nav.no/ikoner](https://aksel.nav.no/ikoner),
- de nye ikonene ligger under riktig kategori og ikke under «Other». «Other» betyr at ikonet mangler i metadataene til `@navikt/aksel-icons`, og skriptet skriver det ut som advarsel.

## 4. Dokumenter endringen

Legg de nye ikonene inn i `projects/hviktor/CHANGELOG.md` under `### @helsevestikt/hviktor-icons` → `#### Added` ved neste release. Ikonpakken releases sammen med `hviktor-angular`, se [docs/RELEASE.md](../../docs/RELEASE.md).

## Hvis Aksel fjerner eller gir nytt navn til et ikon

Skriptet sletter aldri ikoner. Et ikon som er fjernet hos Aksel blir liggende hos oss til det slettes manuelt, og et ikon med nytt navn dukker opp som et nytt ikon ved siden av det gamle. Begge deler er breaking changes for de som bruker pakken, så vurder dem i forbindelse med en minor-release og nevn dem i CHANGELOG.
