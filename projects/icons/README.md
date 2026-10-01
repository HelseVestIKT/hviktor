# Hviktor Icons

En samling med 900+ Angular-ikoner basert pa NAV Aksel.

## Installasjon

```bash
npm install @helsevestikt/hviktor-icons
```

## Funksjoner

- 900+ ikoner basert på NAV Aksel
- Standalone Angular-komponenter
- Enkeltimport av enkel-ikoner for god bundle-kontroll
- Valgfri all-icons entrypoint for rask IntelliSense i demo/playground
- Tre innebygde størrelser: `sm` (16px), `md` (24px), `lg` (32px)
- Arver farge gjennom `currentColor`
- TypeScript-typinger

## Bruk

Du kan importere enkelt-ikoner (anbefalt for produksjon), eller bruke all-icons entrypoint i demo/playground for rask utvikling. Ikonene følger automatisk tekstfargen på siden, sa de tilpasser seg for eksempel fargen i en knapp.

### Angular

```ts
import { Component } from '@angular/core';
import { HviIconAirplane, HviIconPerson } from '@helsevestikt/hviktor-icons';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [HviIconAirplane, HviIconPerson],
  template: `
    <hvi-icon-airplane size="lg"></hvi-icon-airplane>
    <hvi-icon-person size="md"></hvi-icon-person>
  `,
})
export class AppComponent {}
```

### Angular (valgfritt: alle ikoner)

Hvis du vil ha rask IntelliSense-oppslag i templates kan du importere `HVI_ALL_ICONS`
fra en egen entrypoint:

```ts
import { Component } from '@angular/core';
import { HVI_ALL_ICONS } from '@helsevestikt/hviktor-icons/all-icons';

@Component({
  standalone: true,
  imports: [...HVI_ALL_ICONS],
  template: `<hvi-icon-person />`,
})
export class AppComponent {}
```

Merk: For produksjonskode med fokus pa bundle-storrelse anbefales per-ikon imports
fra `@helsevestikt/hviktor-icons` i stedet for `HVI_ALL_ICONS`.

## Størrelse

Tre forhåndsdefinerte størrelser er tilgjengelige via `size`-attributtet:

- `size="sm"` - 16px
- `size="md"` - 24px (standard)
- `size="lg"` - 32px

```html
<hvi-icon-checkmark size="sm"></hvi-icon-checkmark>
<hvi-icon-checkmark size="md"></hvi-icon-checkmark>
<hvi-icon-checkmark size="lg"></hvi-icon-checkmark>
```

## Tilgjengelige ikoner

Alle ikoner fra NAV Aksel er tilgjengelige med navnmønsteret:

- `hvi-icon-{name}`

Eksempler:

```html
<hvi-icon-checkmark size="md"></hvi-icon-checkmark>
<hvi-icon-x-mark size="md"></hvi-icon-x-mark>
<hvi-icon-chevron-down size="sm"></hvi-icon-chevron-down>
<hvi-icon-person size="lg"></hvi-icon-person>
```

Se alle tilgjengelige ikoner på NAV Aksel:

- https://aksel.nav.no/komponenter/ikoner

## Lisens

MIT
