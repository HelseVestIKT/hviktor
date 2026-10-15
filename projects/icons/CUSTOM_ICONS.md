# Egenutviklede ikoner

`@helsevestikt/hviktor-icons` er i hovedsak [Aksel-ikonene til Nav](https://aksel.nav.no/ikoner), men vi kan legge til egne ikoner når Aksel ikke har det vi trenger. Egenutviklede ikoner genereres med samme mal som Aksel-ikonene, så for de som bruker pakken er det ingen forskjell:

```ts
import { HviIconBold } from '@helsevestikt/hviktor-icons';
```

```html
<hvi-icon-bold size="md" />
```

Sjekk alltid [aksel.nav.no/ikoner](https://aksel.nav.no/ikoner) først. Finnes ikonet der, oppdaterer vi heller Aksel-pakken (se [UPDATING_ICONS.md](./UPDATING_ICONS.md)).

## Hvor ting ligger

| Hva                    | Hvor                                      | Hvem skriver                  |
| ---------------------- | ----------------------------------------- | ----------------------------- |
| SVG fra Figma (kilden) | `projects/icons/custom/svg/<Navn>.svg`    | Du                            |
| Kategori og nøkkelord  | `projects/icons/custom/metadata.json`     | Du                            |
| Angular-komponent      | `projects/icons/src/lib/custom/icon-*.ts` | `npm run import:custom-icons` |
| Aksel-komponenter      | `projects/icons/src/lib/components/*.ts`  | `npm run import:nav-icons`    |

Aksel-importen leser og skriver bare `lib/components`, og egenimporten bare `lib/custom`. Derfor overlever de egenutviklede ikonene alle Aksel-oppdateringer, også med `--force`. Begge skriptene skriver `index.ts` og `all-icons.ts` på nytt med ikoner fra begge mappene.

## Krav til SVG-en fra Figma

Ikonet skal se ut og oppføre seg som et Aksel-ikon:

1. **24×24-ramme.** Tegn i en frame på 24×24 px og eksporter hele framen, slik at `viewBox="0 0 24 24"`. Følg Aksel sine marger og strektykkelse, så ikonet ser ut som resten av settet.
2. **Bare fyll, ingen strek.** Bruk _Outline stroke_ på alle streker.
3. **Én form.** Marker alt og bruk _Union_ og deretter _Flatten_ (⌘E / Ctrl+E). Komponenten tegner med `fill-rule="evenodd"`, så former som overlapper uten å være slått sammen kan bli til hull.
4. **Én farge.** Fargen i SVG-en ignoreres. Ikonet bruker `currentColor` og arver tekstfargen. Gjennomsiktighet støttes ikke.
5. **Ingen tekst, bilder, masker eller gradienter.**

Skriptet validerer dette og stopper med en forklaring hvis noe ikke stemmer. En `clip-path` som Figma legger på framen, blir fjernet automatisk.

## Navngiving

Filnavnet i PascalCase bestemmer klasse, selector og filnavn, på samme måte som for Aksel-ikonene:

| SVG-fil    | Klasse        | Selector        |
| ---------- | ------------- | --------------- |
| `Bold.svg` | `HviIconBold` | `hvi-icon-bold` |

- Følg Aksel sine navnekonvensjoner: engelsk, beskrivende, og `Fill`-suffiks for fylt variant.
- Navnet kan ikke være det samme som et Aksel-ikon. Skriptet sjekker mot `@navikt/aksel-icons` og stopper hvis det finnes.
- Navnet er en del av det offentlige API-et. Å gi nytt navn eller slette et ikon er en breaking change.

## Legge til eller endre et ikon

```bash
# 1. Legg SVG-en i projects/icons/custom/svg/, f.eks. TextItalic.svg
# 2. Legg til kategori og nøkkelord i projects/icons/custom/metadata.json
npm run import:custom-icons
npm run build:icons
npm start                  # åpne /ikoner og søk på «egenutviklet»
```

`metadata.json` bruker samme kategorier som Aksel (`Interface`, `Files and application`, `Wellness` osv.), slik at ikonet havner sammen med lignende ikoner på ikonsiden:

```json
{
  "TextItalic": {
    "category": "Interface",
    "keywords": ["kursiv", "tekst", "formatering", "italic"]
  }
}
```

For å endre et ikon erstatter du SVG-en og kjører `npm run import:custom-icons` på nytt. Komponentene i `lib/custom` genereres alltid fra SVG-en, så de skal ikke redigeres manuelt.

Legg nye ikoner inn i `projects/hviktor/CHANGELOG.md` under `### @helsevestikt/hviktor-icons` → `#### Added` ved neste release.

## Hvis Aksel får et ikon med samme navn

Da beholdes vårt ikon. `import:nav-icons` hopper over Aksel-ikonet og skriver ut en advarsel, og `import:custom-icons` advarer også. Vil vi heller bruke Aksel sitt, sletter vi SVG-en og komponenten i `lib/custom`, kjører `npm run import:nav-icons` og nevner det i CHANGELOG. Hvis klassenavn og selector blir de samme, merker brukerne bare at ikonet ser annerledes ut.

## Fjerne et ikon

Skriptet sletter aldri komponenter. Slett SVG-en, oppføringen i `metadata.json` og `src/lib/custom/icon-<navn>.component.ts`, og kjør `npm run import:custom-icons`. Det er en breaking change, så ta det i en minor-release.
