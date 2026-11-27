<div align="center">
<h1>HVIKTOR</h1>

<p><strong>Angular-komponenter basert på Digdir Designsystemet for Helse Vest IKT</strong></p>

[![npm version](https://img.shields.io/npm/v/@helsevestikt/hviktor-angular)](https://www.npmjs.com/package/@helsevestikt/hviktor-angular)
[![PR Checks](https://github.com/HelseVestIKT/hviktor/actions/workflows/pr-checks.yml/badge.svg)](https://github.com/HelseVestIKT/hviktor/actions/workflows/pr-checks.yml)
[![Publish to npm](https://github.com/HelseVestIKT/hviktor/actions/workflows/publish-npm.yml/badge.svg)](https://github.com/HelseVestIKT/hviktor/actions/workflows/publish-npm.yml)
[![Angular](https://img.shields.io/badge/Angular-17--22-dd0031)](https://angular.dev/)
[![Demo](https://img.shields.io/badge/Demo-hviktor.no-blue)](https://hviktor.no/)

<p>
  <a href="#formål">Formål</a> •
  <a href="#krav">Krav</a> •
  <a href="#struktur">Struktur</a> •
  <a href="#utvikling-av-komponenter-og-direktiver">Utvikling</a> •
  <a href="#demo-applikasjonen">Demo</a> •
  <a href="#nyttige-script">Script</a>
</p>
</div>

---

## Formål

Hviktor Angular inneholder Angular komponenter og direktiver som bygger på designsystemet.no. Målet er å beholde stil og tilgjengelighet fra originalen, samtidig som vi tilbyr kjente Angular-API-er. Enkel bruk er prioritert sammen med dokumentasjon og intellisense-støtte i IDE-er.

## Krav

- Node.js `^22.22.3 || ^24.15.0 || >=26.0.0` for utvikling i dette repoet
- npm 10+
- Angular 17–22 for biblioteket; dette repoet bruker Angular 22

## Struktur

- `projects/hviktor` – `@helsevestikt/hviktor-angular`, biblioteket der komponenter og direktiver utvikles. Blir bygget til `dist/hviktor-lib` og publiseres til npm.
- `projects/icons` – `@helsevestikt/hviktor-icons`, ikonpakken som bygges til `dist/hviktor-icons` og publiseres sammen med biblioteket.
- `src` – demoapplikasjonen som viser biblioteket og bruker bygg fra `dist/hviktor-lib`. Her kan ein lett sjå komponenter i bruk og teste endringar lokalt.
- `scripts` – hjelpescript for scaffolding og kodegenerering.

## Utvikling av komponenter og direktiver

Først og fremst prøver vi å bruke direktiv på komponenter som allerede har et html-element, f.eks. `button`. I andre tilfeller lager vi komponenter.

Selve utviklingen gjøres ved å opprette en mappe med komponent/direktiv-navnet i `projects/hviktor/src/`.
I denne mappen opprettes i hovedsak to filer:

- `komponent-navn.component.ts` – TypeScript-filen som definerer komponenten/direktivet. Ev. `direktiv-navn.directive.ts` for direktiver.
- `index.ts` – Eksporterer komponenten/direktivet for bruk i biblioteket.

```bash
npm run scaffold -- <type> <name>
```

Hvor `<type>` er enten `component` eller `directive`, og `<name>` er navnet på komponenten/direktivet (kebab-case). Navnet må ikke allerede brukes. For eksempel, for å lage en ny komponent kalt `my-component`, kjør:

```bash
npm run scaffold -- component my-component
```

Ved to-ordet komponent, f.eks. `error-summary`, brukes bindestrek som skilletegn.

Se eksempler i eksisterende komponenter/direktiver i `projects/hviktor/src/`.

Scaffold-scriptet legger automatisk til export i `projects/hviktor/src/public-api.ts`. Komponenter/direktiver som opprettes manuelt, må eksporteres der selv for å bli tilgjengelige i biblioteket.

## Byggrutine

1. Utvikle eller oppdater komponenter/direktiv i `projects/hviktor`.
2. Kjør `npm run build:lib` for å generere pakken i `dist/hviktor-lib`, og `npm run build:icons` for å generere ikonpakken i `dist/hviktor-icons`.
3. Start eller bygg demoappen (`npm start` / `npm run build`) for å verifisere endringene via den lokale pakke-referansen.

## Demo-applikasjonen

Demo-appen ligger i `src` og viser alle komponentene i biblioteket. For å legge til en ny demo-side for en komponent, bruk scaffold-scriptet:

```bash
npm run scaffold:demo -- <navn> "<beskrivelse>"
```

For eksempel:

```bash
npm run scaffold:demo -- table "Tabeller for datavisning"
npm run scaffold:demo -- spinner "Loading-indikatorer"
```

Scriptet oppretter automatisk:

- En ny mappe i `src/app/demo/pages/components/<navn>/`
- Demo-komponenten med `DemoPageComponent` og `DemoSectionComponent`
- Registrering i `demo-components.ts` (vises i sidebar)
- Route i `app.routes.ts`

Etter kjøring åpner du den genererte filen og legger til Hviktor-komponentene du vil demonstrere.

### Generere kodeeksempel

Kvar demoside kan vise kodeeksempel som syner korleis komponentane skal brukast. Bruk generer-scriptet for å automatisk lage desse eksempla:

```bash
npm run generate:examples -- <komponent-namn>
```

For eksempel:

```bash
npm run generate:examples -- avatar
```

Scriptet gjer følgjande:

1. Parserar demofila og hentar ut kvar `<app-demo-section>`-blokk
2. Genererer standalone eksempel-komponentar i `<komponent>/code-examples/`
3. Oppdaterer demofila automatisk med importar og `[code]`-bindingar

Genererte filer:

- `<komponent>.<seksjon-slug>.example.ts` – Standalone Angular-komponent
- `<komponent>.<seksjon-slug>.example.source.ts` – Kjeldekode som eksporterbar streng
- `index.ts` – Barrel-eksportar
- `manifest.ts` – Metadata om alle eksempel

#### Arbeidsflyt

1. Lag eller rediger demofila med `<app-demo-section>`-blokker
2. Kjør `npm run generate:examples -- <komponent-namn>`
3. Demoen vil no vise "Vis kode"-knappar for kvar seksjon

#### Regenerere eksempel

Viss du endrar ei demofil, køyr scriptet på nytt. Det vil:

- Overskrive eksempelfiler med oppdatert innhald
- Hoppe over dupliserte importar/bindingar i demofila

For å prosessere alle demofiler samstundes:

```bash
npm run generate:examples
```

## Nyttige script

Alle script køyrast frå root.

| Script                      | Skildring                                                       |
| --------------------------- | --------------------------------------------------------------- |
| `npm start`                 | Startar dev-server for demoappen (localhost:4200)               |
| `npm run build`             | Byggjer demoappen til `dist/hviktor-demoapp`                    |
| `npm run build:lib`         | Byggjer biblioteket til `dist/hviktor-lib`                      |
| `npm run build:icons`       | Byggjer ikonpakken til `dist/hviktor-icons`                     |
| `npm test`                  | Køyrer einingstestar (Vitest)                                   |
| `npm run test:e2e`          | Køyrer ende-til-ende-testar (Playwright)                        |
| `npm run lint`              | Køyrer ESLint                                                   |
| `npm run format`            | Formaterer kode med Prettier                                    |
| `npm run scaffold`          | Genererer ny bibliotek-komponent/direktiv                       |
| `npm run scaffold:demo`     | Opprettar ny demoside                                           |
| `npm run generate:examples` | Genererer kodeeksempel frå demoseksjonar                        |
| `npm run release`           | Bumpar versjon, committer, tagger og pusher git; CI publiserer  |
| `npm run version:check`     | Sjekkar siste versjon av `@helsevestikt/hviktor-angular` på npm |

## Kodekvalitetsverktøy

For å få full nytte av Prettier kan du følge denne oppskriften:

1. Innstaller extension Prettier - Code formatter i VS Code.
2. Gå til Workspace Settings (Ctrl + ,) og søk etter "Format"
3. Huk av "Format On Save"
4. Under "Default Formatter", velg Prettier - Code formatter

Nå vil Prettier automatisk formatere koden din hver gang du lagrer en fil.

For å få Husky til å virke, må du gjennom noen steg første gang:

1. Kjør `npm install` fra root for å installere alle avhengigheter og aktivere hooks med `prepare`.
2. Verifiser at alt er riktig ved å kjøre `git config --get core.hooksPath`. Skal returnere noe ala `.husky/_`.

- **Husky + lint-staged** kjører pre-commit på staged filer. TypeScript kjører Prettier og ESLint `--fix`; HTML, CSS, Markdown og JSON kjører Prettier. Commit blokkeres hvis formatering/fiksing feiler eller det fortsatt er lintfeil.
- **Prettier** formaterer alle prosjektfiler likt. Kjør manuelt med `npm run format` om du trenger å rydde opp før commit. Pre-commit endrer automatisk staged filer, ikke nødvendigvis hele prosjektet.
- **ESLint** fanger opp vanlige feil og stilbrudd. Lokalt kan du sjekke hele prosjektet med `npm run lint`. Pre-commit kjører ESLint med `--fix` på staged TypeScript, ikke samme sjekk som full `npm run lint`.

## Git-arbeidsflyt og CI/CD

### Branch-strategi

- **main** – beskyttet branch, inneholder kun godkjent og testet kode
- **feature/\*** – utviklingsbrancher for nye features eller bugfixes

### Utviklingsflyt

1. **Lag feature-branch fra main:**

   ```bash
   git checkout main
   git pull
   git checkout -b feature/min-nye-komponent
   ```

2. **Utvikle og commit:**

   ```bash
   # Gjør endringer i projects/hviktor
   git add .
   git commit -m "feat: add new component"
   git push -u origin feature/min-nye-komponent
   ```

3. **Opprett Pull Request:**
   - Gå til GitHub og opprett PR mot main
   - Automatisk: lint, test og build kjører
   - Få godkjenning fra minst én reviewer
   - Merge til main (squash merge anbefales)

### Publisere ny versjon til npm

Kun kode som er merget til main kan publiseres. Bruk release-scriptet som håndterer versjonering, tagging og git-push i ett steg:

1. **Sørg for at main er oppdatert:**

   ```bash
   git checkout main
   git pull
   ```

2. **Kjør release-scriptet:**
   Tips: for å sjekke siste versjon på npm, kjør `npm run version:check`.

   ```bash
   npm run release patch   # Bugfikser
   npm run release minor   # Nye komponenter/features
   npm run release major   # Breaking changes
   npm run release 1.0.0   # Eksplisitt versjon
   ```

   Scriptet oppdaterer `package.json` i begge pakkene og changelog, committer, tagger og pusher automatisk. Publisering til npm skjer i CI etter godkjenning.

3. **Godkjenn publisering:**
   - En reviewer i `npm-publish` environment må godkjenne
   - Workflowen bygger og publiserer begge pakkene automatisk til npm

Se [RELEASE.md](docs/RELEASE.md) for mer detaljer.

### Semantic Versioning

| Endring               | Bump  | Eksempel            |
| --------------------- | ----- | ------------------- |
| Breaking change i API | MAJOR | `v1.0.0` → `v2.0.0` |
| Ny komponent/feature  | MINOR | `v1.0.0` → `v1.1.0` |
| Bugfix                | PATCH | `v1.0.0` → `v1.0.1` |

### Branch Protection

Main-branchen er beskyttet med følgende regler:

- ✅ Krever pull request før merge
- ✅ Krever minst 1 godkjenning
- ✅ Krever at status checks passerer (lint, test, build)
- ✅ Blokkerer force push (unntak for repository admins)
- ✅ Blokkerer sletting
