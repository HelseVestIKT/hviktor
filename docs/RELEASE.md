# Publisering til npm

Denne guiden beskriver hvordan du publiserer en ny versjon av `@helsevestikt/hviktor-angular` og `@helsevestikt/hviktor-icons`.

Pakkene releases alltid sammen og har **samme versjonsnummer**, på samme måte som Digdir gjør med `@digdir/designsystemet-*`. En pakke uten endringer får likevel ny versjon.

## Forutsetninger

- Du er på `main`-branch
- Alle endringer er committet og pushet
- Tester og lint bestått (`npm run test:all && npm run lint`)
- Du har push-tilgang til repoet

## Publiser med release-scriptet (anbefalt)

Release-scriptet synkroniserer versjonen i begge `package.json`-filene med git tag automatisk:

```bash
npm run release patch   # 0.0.23 → 0.0.24 (bugfikser)
npm run release minor   # 0.0.23 → 0.1.0  (nye komponenter/features)
npm run release major   # 0.0.23 → 1.0.0  (breaking changes)
npm run release 1.0.0   # Eksplisitt versjonsnummer
```

Har pakkene ulik versjon, må du oppgi en eksplisitt versjon.

Scriptet gjør følgende:

1. Verifiserer at du er på `main` med rent working directory
2. Puller siste endringer
3. Oppdaterer versjon i `projects/hviktor/package.json` og `projects/icons/package.json`
4. Legger inn en mal i `projects/hviktor/CHANGELOG.md` og åpner den for redigering
5. Committer endringen (`chore: release v<versjon>`)
6. Oppretter git tag (`v<versjon>`)
7. Pusher commit og tag til origin

CI-workflowen (`publish-npm.yml`) kjøres automatisk:

1. Verifiserer at tagen er på main-branch
2. Bygger ikonpakken, biblioteket og schematics
3. Publiserer `@helsevestikt/hviktor-icons` og deretter `@helsevestikt/hviktor-angular` til npm (krever godkjenning i `npm-publish` environment). Ikonene publiseres først fordi `ng add` installerer ikonene med samme versjon.
4. Oppretter GitHub Release med teksten fra CHANGELOG

## CHANGELOG

Én felles `projects/hviktor/CHANGELOG.md` med én seksjon per pakke:

```md
## [0.4.0] – 2026-10-01

### @helsevestikt/hviktor-angular

#### Added

- ...

### @helsevestikt/hviktor-icons

Ingen endringer i denne releasen.
```

Tomme underseksjoner fjernes automatisk, og en pakke uten endringer får teksten «Ingen endringer i denne releasen.».

## Etter publisering

1. **Godkjenn i GitHub** — Gå til Actions → "Publish to npm" → Godkjenn `npm-publish` environment
2. **Verifiser på npm** — Sjekk https://www.npmjs.com/package/@helsevestikt/hviktor-angular og https://www.npmjs.com/package/@helsevestikt/hviktor-icons
3. **Sjekk GitHub Release** — Teksten hentes fra [CHANGELOG.md](../projects/hviktor/CHANGELOG.md)

## Manuelt (hvis release-scriptet ikke brukes)

Hvis du av en eller annen grunn ikke kan bruke release-scriptet:

```bash
# 1. Oppdater versjon i begge package.json
(cd projects/hviktor && npm version <versjon> --no-git-tag-version)
(cd projects/icons && npm version <versjon> --no-git-tag-version)

# 2. Commit
git add projects/hviktor/package.json projects/icons/package.json projects/hviktor/CHANGELOG.md
git commit -m "chore: release v<versjon>"

# 3. Tag
git tag v<versjon>

# 4. Push
git push origin main
git push origin v<versjon>
```

> ⚠️ **Viktig:** Husk å oppdatere BEGGE `package.json`-filene og git tag. Hvis de er usynkroniserte, bruk release-scriptet som håndterer alt automatisk.

## Semver-retningslinjer

| Type      | Når                           | Eksempel          |
| --------- | ----------------------------- | ----------------- |
| **patch** | Bugfikser, dokumentasjon      | `0.0.23 → 0.0.24` |
| **minor** | Nye komponenter, nye features | `0.0.23 → 0.1.0`  |
| **major** | Breaking changes i API        | `0.0.23 → 1.0.0`  |

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
