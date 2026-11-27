# @helsevestikt/hviktor-angular

[![npm version](https://img.shields.io/npm/v/@helsevestikt/hviktor-angular)](https://www.npmjs.com/package/@helsevestikt/hviktor-angular)
[![license](https://img.shields.io/npm/l/@helsevestikt/hviktor-angular)](https://github.com/HelseVestIKT/hviktor/blob/main/projects/hviktor/LICENSE)

> ⚠️ **Denne pakken er under aktiv utvikling.** API-et kan endres uten forvarsel. Bruk på egen risiko i produksjon.

Angular-komponenter basert på [Digdir Designsystemet](https://designsystemet.no/) for Helse Vest IKT.

## Installasjon

### Automatisk oppsett (anbefalt)

```bash
ng add @helsevestikt/hviktor-angular
```

Dette installerer pakken og setter opp prosjektet automatisk:

- Legger til `@import '@helsevestikt/hviktor-angular/styles.css'` i stylesheet
- Spør om du vil installere og konfigurere **Tailwind CSS**. (default: Yes). Anbefales for best mulig utvikleropplevelse. Alle demoene på [helsevestikt.github.io/hviktor](https://helsevestikt.github.io/hviktor/) bruker Tailwind, så det kan være lurt å ha det installert for å følge eksemplene. Med Tailwind v4 legges også `tailwind.css` inn, så temaets farger blir Tailwind-klasser (se [Tailwind CSS](#tailwind-css)). Svarer du nei, legges Tailwind-importene inn utkommentert, klare til bruk senere.
- Spør om du vil installere **@helsevestikt/hviktor-icons** (default: Yes). Installerer ikonpakken i samme versjon som `hviktor-angular`. Ikonene importeres som Angular-komponenter der de brukes.

**Angular 17–19:** `@helsevestikt/hviktor-icons` krever Angular 20–22. Bruk `ng add @helsevestikt/hviktor-angular --no-icons` for å hoppe over ikonpakken på disse versjonene. Hviktor Angular kan brukes uten ikonpakken.

### Manuelt oppsett

```bash
npm install @helsevestikt/hviktor-angular
```

Importer stylesheet i `src/styles.css`:

```css
@import '@helsevestikt/hviktor-angular/styles.css';
```

## Tema

Pakken leveres med Helse Vest IKT sitt eget tema, bygget med [Designsystemets Temabygger](https://theme.designsystemet.no/). Temaet følger med `styles.css` — du trenger ikke gjøre noe ekstra.

Fonten **Albert Sans** følger også med pakken som webfont, så du trenger verken å installere den lokalt eller laste den fra et CDN.

### Fonten lastes ikke på IIS eller Azure App Service (Windows)

Webfonten er en `.woff2`-fil som appen din leverer selv. IIS leverer bare filtyper den har en MIME-type for, og svarer 404 på resten. Da faller siden tilbake til en systemfont (typisk Segoe UI) uten noen feilmelding. Lokalt ser alt riktig ut, så feilen viser seg først etter deploy.

Legg til MIME-typen i `web.config`:

```xml
<configuration>
  <system.webServer>
    <staticContent>
      <remove fileExtension=".woff2" />
      <mimeMap fileExtension=".woff2" mimeType="font/woff2" />
    </staticContent>
  </system.webServer>
</configuration>
```

Ta med `<remove>`. Har serveren allerede en MIME-type for `.woff2`, gir en ny `<mimeMap>` uten `<remove>` feilen _duplicate collection entry_, og da svarer IIS med 500 for alle statiske filer, ikke bare fonten.

Du kan sjekke at fonten lastes i fanen Network i utviklerverktøyene: filen `albert-sans-*.woff2` skal ha status 200. Linux App Service, Azure Static Web Apps og nginx leverer `.woff2` uten ekstra oppsett.

### Farger og størrelser

Temaet definerer fargene `accent`, `brand1`, `brand2`, `brand3` og `neutral`, i tillegg til systemfargene `info`, `success`, `warning` og `danger`.

```html
<button hviButton color="brand1">Knapp i merkevarefarge</button>

<div data-color-scheme="dark">
  <!-- Mørk fargemodus. Verdier: light | dark | auto -->
</div>

<div data-size="sm">
  <!-- Størrelsesmodus for elementet og alle etterkommere. Verdier: sm | md | lg -->
</div>
```

Merk at `data-color` arves nedover, men må settes på nytt dersom du endrer `data-color-scheme`. Komponenter som `HviAlert`, `HviValidationMessage` og `HviErrorSummary` bruker alltid sine egne systemfarger.

### Bruke temaet uten resten av pakken

Temaets CSS-variabler er også tilgjengelig alene, for eksempel hvis du bruker `@digdir/designsystemet-css` direkte. Temaet må importeres **etter** Designsystemets CSS:

```css
@import '@digdir/designsystemet-css';
@import '@helsevestikt/hviktor-angular/theme.css';
```

## Tailwind CSS

Pakken har en Tailwind v4-fil som gjør fargene, skyggene, radiusene og tekststørrelsene i temaet om til Tailwind-klasser. Da kan du skrive klasser i stedet for `var(--ds-…)`:

```html
<!-- Før -->
<div
  style="background-color: var(--ds-color-background-tinted); border-bottom: 1px solid var(--ds-color-border-subtle)"
>
  <!-- Etter -->
  <div class="bg-background-tinted border-border-subtle border-b"></div>
</div>
```

### Oppsett

Krever Tailwind CSS v4. Kjører du `ng add` og svarer ja til Tailwind, settes alt opp for deg. Tar du i bruk Tailwind senere, kan du kjøre `ng add @helsevestikt/hviktor-angular` på nytt, eller endre importene i `src/styles.css` selv til denne rekkefølgen:

```css
@import '@helsevestikt/hviktor-angular/tailwind.css';
@import '@helsevestikt/hviktor-angular/styles.css';
@import 'tailwindcss';
```

Rekkefølgen betyr noe. `tailwind.css` må stå først, fordi den bestemmer rekkefølgen på CSS-lagene: Tailwinds reset kommer før Designsystemet, og Tailwind-klassene kommer etter. Da kan en Tailwind-klasse overstyre stilen til en komponent, for eksempel `class="mt-4"` på en `hviButton`.

Installer utvidelsen [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) i VS Code. Den foreslår klassene mens du skriver, og viser fargen ved siden av.

### Klassene

Navnene er de samme som i CSS-variablene, uten `--ds-color-`:

| CSS-variabel                              | Tailwind-klasse (eksempler)                          |
| ----------------------------------------- | ---------------------------------------------------- |
| `--ds-color-background-tinted`            | `bg-background-tinted`                               |
| `--ds-color-border-subtle`                | `border-border-subtle`                               |
| `--ds-color-text-subtle`                  | `text-text-subtle`                                   |
| `--ds-color-neutral-surface-hover`        | `hover:bg-neutral-surface-hover`                     |
| `--ds-color-brand1-base-default`          | `text-brand1-base-default`, `bg-brand1-base-default` |
| `--ds-shadow-md`, `--ds-border-radius-md` | `shadow-md`, `rounded-md`                            |
| `--ds-body-sm-font-size`                  | `text-sm` (også `text-md` og `text-lg`)              |

Klasser uten fargenavn, som `bg-background-tinted`, følger nærmeste `data-color`. De bytter også farge med `data-color-scheme`, akkurat som variablene:

```html
<section data-color="brand1">
  <div class="bg-background-tinted border-border-subtle border-b">Grønn bakgrunn</div>
</section>
```

Vil du ha en bestemt farge uansett `data-color`, tar du med fargenavnet: `bg-accent-background-tinted`.

Avstander (`p-4`, `gap-2`, `w-12` osv.) bruker Designsystemets avstander `--ds-size-*` for tallene 0–15, 18, 22, 26 og 30, så de blir større eller mindre med `data-size`. Andre tall, som `p-16`, bruker Tailwinds egen skala.

Se alle klassene med eksempler på [hviktor.no/tailwind](https://hviktor.no/tailwind).

Tailwind v3 kan brukes med de vanlige `@tailwind`-direktivene, men `tailwind.css`-temaet krever v4. Uten Tailwind kan du fortsatt bruke `var(--ds-…)` som før.

## Bruk

Importer komponentene du trenger direkte i standalone-komponenter:

```typescript
import { Component } from '@angular/core';
import { HviButton } from '@helsevestikt/hviktor-angular';

@Component({
  imports: [HviButton],
  template: `<button hviButton>Klikk meg</button>`,
})
export class MyComponent {}
```

## Dokumentasjon

Se [helsevestikt.github.io/hviktor](https://helsevestikt.github.io/hviktor/) for tilgjengelige komponenter, eksempler og API-dokumentasjon.

## Krav

- Angular 17–22
- Node.js-versjonen som kreves av den installerte Angular-versjonen; med Angular 22 kreves Node `^22.22.3 || ^24.15.0 || >=26.0.0`

## Endringslogg

Se [CHANGELOG.md](https://github.com/HelseVestIKT/hviktor/blob/main/projects/hviktor/CHANGELOG.md) for alle versjonsendringer.

## Bidra

Se [CONTRIBUTING.md](https://github.com/HelseVestIKT/hviktor/blob/main/CONTRIBUTING.md) for utviklingsprosess og retningslinjer.

## Lisens

[MIT](./LICENSE)
