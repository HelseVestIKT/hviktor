# Publisering til npm

Denne guiden beskriver hvordan du publiserer en ny versjon av `@helsevestikt/hviktor-angular`.

## Flyt (changesets + git tags)

Vi bruker en **hybrid-modell**: [Changesets](https://github.com/changesets/changesets) håndterer versjonering og CHANGELOG, mens publisering trigges av git tags via eksisterende CI-workflow.

### 1. Legg til changeset på feature-branch

Når du gjør en endring som påvirker brukere, kjør:

```bash
npx changeset
```

Du blir spurt om:

- Hvilken pakke (`@helsevestikt/hviktor-angular`)
- Bump-type: `patch`, `minor` eller `major`
- En kort beskrivelse av endringen (blir del av CHANGELOG)

Dette oppretter en liten `.md`-fil i `.changeset/`. **Commit den sammen med koden.**

> **Tips:** Flere changesets kan samles opp over flere PR-er. De slås sammen ved release.

### 2. "Version Packages" PR opprettes automatisk

Når changesets merges til `main`, oppretter GitHub Action ([changesets.yml](../.github/workflows/changesets.yml)) automatisk en PR med tittel **"chore: version packages"** som:

- Bumper versjon i `projects/hviktor/package.json`
- Oppdaterer `CHANGELOG.md` med alle changeset-beskrivelsene
- Fjerner brukte changeset-filer

### 3. Merge PR → tag → publisering

Når "Version Packages" PR-en merges:

1. Changesets-action oppretter en git tag (`v<ny versjon>`)
2. Tagen trigger [publish-npm.yml](../.github/workflows/publish-npm.yml)
3. Godkjenn `npm-publish` environment i GitHub Actions
4. Pakken publiseres til npm med provenance

### 4. Verifiser

- Sjekk https://www.npmjs.com/package/@helsevestikt/hviktor-angular
- CHANGELOG oppdateres automatisk i `projects/hviktor/CHANGELOG.md`

---

## Alternativ: Direkte release (uten changesets)

For raske fikser der changeset-flyten er overkill:

```bash
npm run release patch   # 0.0.26 → 0.0.27 (bugfikser)
npm run release minor   # 0.0.26 → 0.1.0  (nye komponenter/features)
npm run release major   # 0.0.26 → 1.0.0  (breaking changes)
npm run release 1.0.0   # Eksplisitt versjonsnummer
```

> ⚠️ Ved direkte release må du oppdatere `projects/hviktor/CHANGELOG.md` manuelt.

---

## Forutsetninger

- Du er på `main`-branch (for direkte release)
- Alle endringer er committet og pushet
- Tester og lint bestått (`npm run test:all && npm run lint`)

## Semver-retningslinjer

| Type      | Når                           | Eksempel          |
| --------- | ----------------------------- | ----------------- |
| **patch** | Bugfikser, dokumentasjon      | `0.0.26 → 0.0.27` |
| **minor** | Nye komponenter, nye features | `0.0.26 → 0.1.0`  |
| **major** | Breaking changes i API        | `0.0.26 → 1.0.0`  |

### Hva er en breaking change?

- Fjerne en komponent eller direktiv
- Endre selector (f.eks. `hvi-alert` → `hviktor-alert`)
- Fjerne eller endre type på en `@Input`
- Endre default-verdi som påvirker eksisterende bruk
- Heve minimum Angular-versjon

### Hva er IKKE en breaking change?

- Legge til nye komponenter
- Legge til nye `@Input` med default-verdi
- Fikse bugs
- Forbedre ytelse
- Oppdatere interne avhengigheter
