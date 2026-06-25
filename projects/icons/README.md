# Hviktor Icons

En samling med 900+ ikoner som rene Web Components som fungerer i alle rammeverk: Angular, React, Vue, Blazor eller vanilla JavaScript.

## Installasjon

```bash
npm install @helsevestikt/hviktor-icons
```

## Funksjoner

- 900+ ikoner basert på NAV Aksel
- Rene Web Components (ingen avhengighet til rammeverk)
- Fungerer i Angular, React, Vue, Blazor og vanilla JS
- Tre innebygde størrelser: `sm` (16px), `md` (24px), `lg` (32px)
- Arver farge gjennom `currentColor`
- TypeScript typinger + `custom-elements.json`

## Bruk

Du kan enten laste inn hele kodepakken (900+ ikoner), eller hente inn kun de ikonene du skal bruke i løsningen. Ikonene følger automatisk tekstfargen på siden, så de tilpasser seg for eksempel fargen i en knapp.

### Angular

```ts
// Importerer hele ikon-biblioteket:
import '@helsevestikt/hviktor-icons';
// eller importer ett og ett ikon:
import '@helsevestikt/hviktor-icons/icon-airplane.webcomponent';
import '@helsevestikt/hviktor-icons/icon-person.webcomponent';

import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-root',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <hvi-icon-airplane size="lg"></hvi-icon-airplane>
    <hvi-icon-person size="md"></hvi-icon-person>
  `,
})
export class AppComponent {}
```

### Blazor / vanlig HTML

```html
<script type="module">
  import '@helsevestikt/hviktor-icons';
</script>

<hvi-icon-airplane size="lg"></hvi-icon-airplane>
<hvi-icon-person size="md"></hvi-icon-person>
```

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
