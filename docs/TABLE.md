# Table (`hviTable`) og sortering (`hviSortableColumn`)

Table-direktivet wrapper en vanlig HTML `<table>` med Designsystemets styling og et kraftig API for sortering, filtrering, paginering og radekspansjon. Under panseret brukes TanStack Table.

## Grunnleggende bruk

```html
<table hviTable zebra border hover>
  <thead>
    <tr>
      <th>Navn</th>
      <th>Avdeling</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ola</td>
      <td>IT</td>
    </tr>
  </tbody>
</table>
```

### Attributter for styling

| Attributt      | Beskrivelse                             |
| -------------- | --------------------------------------- |
| `zebra`        | Annenhver rad med alternativ bakgrunn   |
| `border`       | Avrundet kant rundt tabellen            |
| `hover`        | Hover-effekt på rader                   |
| `stickyHeader` | Header fester seg til toppen ved scroll |

## Datadrevet tabell

Gi tabellen en `[value]` med data og bruk `#table="hviTable"` for å referere til API-et i templaten.

```html
<table hviTable [value]="personer" #table="hviTable">
  <thead>
    <tr>
      <th>Navn</th>
      <th>E-post</th>
    </tr>
  </thead>
  <tbody>
    @for (person of table.filteredValue(); track person.id) {
    <tr>
      <td>{{ person.navn }}</td>
      <td>{{ person.epost }}</td>
    </tr>
    }
  </tbody>
</table>
```

### Inputs

| Input                  | Type                               | Default      | Beskrivelse                                         |
| ---------------------- | ---------------------------------- | ------------ | --------------------------------------------------- |
| `[value]`              | `T[]`                              | `[]`         | Data som vises i tabellen                           |
| `[columns]`            | `string[]`                         | auto-detect  | Eksplisitte kolonnenavn (nødvendig for nested felt) |
| `[globalFilterFields]` | `string[]`                         | alle felter  | Felter som globalt søk filtrerer på                 |
| `[rowId]`              | `string \| ((item: T) => unknown)` | `'id'`       | Felt/funksjon som gir unik rad-ID                   |
| `[rows]`               | `number`                           | `10`         | Antall rader per side (med paginering)              |
| `[sortField]`          | `string`                           | —            | Initialt sorteringsfelt                             |
| `[sortOrder]`          | `number`                           | —            | `1` = stigende, `-1` = synkende                     |
| `paginator`            | `boolean`                          | `false`      | Aktiver paginering                                  |
| `[expandMode]`         | `'single' \| 'multiple'`           | `'multiple'` | Om flere rader kan ekspanderes samtidig             |

### Outputs

| Output                | Type             | Beskrivelse                     |
| --------------------- | ---------------- | ------------------------------- |
| `(sortChange)`        | `TableSortEvent` | Emitteres ved sorteringsendring |
| `(pageChange)`        | `TablePageEvent` | Emitteres ved sideendring       |
| `(currentPageChange)` | `number`         | Nåværende side (1-basert)       |

### Offentlige metoder og computed-signaler

| Metode / signal             | Returtype       | Beskrivelse                                           |
| --------------------------- | --------------- | ----------------------------------------------------- |
| `filteredValue()`           | `T[]`           | Filtrert og sortert data (uten paginering)            |
| `paginatedValue()`          | `T[]`           | Paginert + filtrert + sortert data                    |
| `totalFilteredRecords()`    | `number`        | Antall rader etter filtrering                         |
| `totalRecords()`            | `number`        | Totalt antall rader                                   |
| `currentPage()`             | `number`        | Nåværende side (1-basert)                             |
| `pageCount()`               | `number`        | Totalt antall sider                                   |
| `filterGlobal(value)`       | `void`          | Sett globalt søkefilter                               |
| `clearFilter()`             | `void`          | Nullstill globalt søk                                 |
| `setColumnFilter(field, v)` | `void`          | Sett filter for en kolonne                            |
| `clearAllColumnFilters()`   | `void`          | Fjern alle kolonnefiltre                              |
| `sort(field)`               | `void`          | Sykler sortering: none → asc → desc → none            |
| `getSortDirection(field)`   | `SortDirection` | Hent sorteringsretning for et felt                    |
| `toggleExpanded(item)`      | `void`          | Åpne/lukke utvidet rad                                |
| `isExpanded(item)`          | `boolean`       | Sjekk om en rad er ekspandert                         |
| `collapseAll()`             | `void`          | Lukk alle ekspanderte rader                           |
| `goToPage(page)`            | `void`          | Gå til side (1-basert)                                |
| `clear()`                   | `void`          | Nullstill alt (sortering, filtre, paginering, expand) |

---

## Sortering med `hviSortableColumn`

Legg `hviSortableColumn="feltnavn"` på en `<th>` for å gjøre kolonnen sorterbar. Direktivet kommuniserer automatisk med parent `hviTable`.

```html
<table hviTable [value]="data" #table="hviTable">
  <thead>
    <tr>
      <th hviSortableColumn="navn" scope="col">
        <button type="button">Navn</button>
      </th>
      <th hviSortableColumn="avdeling" scope="col">
        <button type="button">Avdeling</button>
      </th>
    </tr>
  </thead>
  <tbody>
    @for (person of table.filteredValue(); track person.id) {
    <tr>
      <td>{{ person.navn }}</td>
      <td>{{ person.avdeling }}</td>
    </tr>
    }
  </tbody>
</table>
```

Sorteringssyklus ved klikk: **ingen → stigende → synkende → ingen**.

`aria-sort` settes automatisk på `<th>` (`none`, `ascending`, `descending`).

> **Viktig:** `<button>` inni `<th>` er påkrevd — direktivet lytter på klikk og reagerer kun hvis target er en `<button>` (eller et element inni en).

### Custom sorteringsfunksjon (`[sortFn]`)

Standard sorterer tekst med norsk locale (`localeCompare('nb')`), tall numerisk, og datoer kronologisk. For avanserte behov kan du gi en kolonne en egen komparator via `[sortFn]`.

```ts
import type { SortingFn } from '@helsevestikt/hviktor';

// Prioritet: aktivt varsel (0) → varsling aktivert (1) → resten (2)
prioritetSort: SortingFn<unknown> = (radA, radB, columnId) => {
  const rang = (val: unknown): number => {
    if (val === 'Aktivt varsel') return 0;
    if (val === 'Varsling aktivert') return 1;
    return 2;
  };
  return rang(radA.getValue(columnId)) - rang(radB.getValue(columnId));
};
```

```html
<th hviSortableColumn="status" [sortFn]="prioritetSort" scope="col">
  <button type="button">Status</button>
</th>
```

TanStack håndterer reversering automatisk — komparatoren trenger kun å definere stigende rekkefølge.

`SortingFn` er re-eksportert fra `@helsevestikt/hviktor` slik at du slipper en direkte TanStack-import.

### Inputs på `hviSortableColumn`

| Input               | Type                 | Beskrivelse                      |
| ------------------- | -------------------- | -------------------------------- |
| `hviSortableColumn` | `string` (required)  | Feltnavn kolonnen sorterer etter |
| `[sortFn]`          | `SortingFn<unknown>` | Valgfri custom komparator        |

---

## Radekspansjon

Bruk `toggleExpanded()` og `isExpanded()` for å vise/skjule ekstra innhold under en rad.

```html
<table hviTable [value]="data" hover #table="hviTable">
  <thead>
    <tr>
      <th style="width: 3rem"><span class="sr-only">Utvid</span></th>
      <th>Navn</th>
      <th>Avdeling</th>
    </tr>
  </thead>
  <tbody>
    @for (person of table.filteredValue(); track person.id) {
    <tr>
      <td>
        <button
          hviButton
          variant="tertiary"
          (click)="table.toggleExpanded(person)"
          [attr.aria-expanded]="table.isExpanded(person)"
          [attr.aria-controls]="'detalj-' + person.id"
        >
          @if (table.isExpanded(person)) { ▼ } @else { ▶ }
        </button>
      </td>
      <td>{{ person.navn }}</td>
      <td>{{ person.avdeling }}</td>
    </tr>
    @if (table.isExpanded(person)) {
    <tr [id]="'detalj-' + person.id">
      <td colspan="3">Ekstra innhold her</td>
    </tr>
    } }
  </tbody>
</table>
```

### Enkeltmodus (`expandMode="single"`)

Med `expandMode="single"` kan bare **én rad** være åpen om gangen. Å åpne en ny rad lukker den forrige automatisk.

```html
<table hviTable [value]="data" expandMode="single" #table="hviTable">
  <!-- ... samme mønster som over -->
</table>
```

Default er `'multiple'` — alle eksisterende tabeller er upåvirket.

---

## Globalt søk

```html
<input type="search" (input)="table.filterGlobal($any($event.target).value)" />

<table hviTable [value]="data" [globalFilterFields]="['navn', 'epost']" #table="hviTable">
  <!-- ... -->
</table>
```

## Kolonnefiltrering

```ts
// Enkeltverdi
table.setColumnFilter('avdeling', 'IT');

// Flervalg (array)
table.setColumnFilter('avdeling', ['IT', 'HR']);

// Nullstill
table.clearAllColumnFilters();
```

## Paginering

```html
<table hviTable [value]="data" paginator [rows]="5" #table="hviTable">
  <tbody>
    @for (person of table.paginatedValue(); track person.id) {
    <!-- Bruk paginatedValue() i stedet for filteredValue() -->
    }
  </tbody>
</table>

<hvi-pagination
  [totalItems]="table.totalFilteredRecords()"
  [pageSize]="5"
  [currentPage]="table.currentPage()"
  (currentPageChange)="table.goToPage($event)"
/>
```

---

## Imports

```ts
import {
  HviTable,
  HviSortableColumn,
  type SortingFn,
  type SortDirection,
  type TableSortEvent,
  type TablePageEvent,
} from '@helsevestikt/hviktor';

@Component({
  imports: [HviTable, HviSortableColumn],
  // ...
})
```
