import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import {
  HviButton,
  HviInput,
  HviLabel,
  HviMultiSelect,
  HviPagination,
  HviSearch,
  HviSearchClear,
  HviSortableColumn,
  HviTable,
} from '@helsevestikt/hviktor';
import '@helsevestikt/hviktor-icons/icon-chevron-down.webcomponent';
import '@helsevestikt/hviktor-icons/icon-chevron-right.webcomponent';

@Component({
  selector: 'app-table-komplett-eksempel-example',
  standalone: true,
  imports: [
    HviButton,
    HviInput,
    HviLabel,
    HviMultiSelect,
    HviPagination,
    HviSearch,
    HviSearchClear,
    HviSortableColumn,
    HviTable,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <form
      class="mb-1"
      role="search"
      aria-label="Søk i komplett tabell"
      (submit)="$event.preventDefault()"
      aria-controls="komplett-tabell"
    >
      <label hviLabel for="komplett-sok">Søk</label>
      <p class="ds-paragraph" id="komplett-sok-beskrivelse">
        Søk etter navn, e-post, avdeling eller stilling
      </p>
      <hvi-search>
        <input
          hviInput
          id="komplett-sok"
          type="search"
          aria-describedby="komplett-sok-beskrivelse"
          (input)="fullTable.filterGlobal($any($event.target).value)"
        />
        <button hviSearchClear type="reset" aria-label="Tøm søk"></button>
      </hvi-search>
    </form>
    <p class="ds-paragraph mt-1 mb-3" role="status" aria-live="polite" aria-atomic="true">
      Viser {{ fullTable.totalFilteredRecords() }} av {{ fullTable.totalRecords() }} rader
    </p>
    <table
      hviTable
      id="komplett-tabell"
      [value]="data"
      [columns]="['navn', 'epost', 'avdeling', 'stilling']"
      [globalFilterFields]="['navn', 'epost', 'avdeling', 'stilling']"
      paginator
      [rows]="rowsPerPage()"
      zebra
      hover
      border
      stickyHeader
      #fullTable="hviTable"
    >
      <caption>
        Ansattoversikt
      </caption>
      <thead>
        <tr>
          <th scope="col" style="width: 3rem"><span class="sr-only">Utvid</span></th>
          <th hviSortableColumn="navn" scope="col">
            <button type="button" [attr.aria-label]="getSortLabel(fullTable, 'navn', 'Navn')">
              Navn
            </button>
          </th>
          <th hviSortableColumn="avdeling" scope="col">
            <button
              type="button"
              [attr.aria-label]="getSortLabel(fullTable, 'avdeling', 'Avdeling')"
            >
              Avdeling
            </button>
          </th>
          <th hviSortableColumn="stilling" scope="col">
            <button
              type="button"
              [attr.aria-label]="getSortLabel(fullTable, 'stilling', 'Stilling')"
            >
              Stilling
            </button>
          </th>
        </tr>
        <tr>
          <td><span class="sr-only">Filter</span></td>
          <td width="30%">
            <hvi-multi-select
              [options]="navnOptions"
              placeholder="Alle"
              searchPlaceholder="Søk navn..."
              aria-label="Filtrer på navn"
              aria-controls="komplett-tabell"
              (selectionChange)="fullTable.setColumnFilter('navn', $event)"
            />
          </td>
          <td width="30%">
            <hvi-multi-select
              [options]="avdelingOptions"
              placeholder="Alle"
              searchPlaceholder="Søk avdeling..."
              aria-label="Filtrer på avdeling"
              aria-controls="komplett-tabell"
              (selectionChange)="fullTable.setColumnFilter('avdeling', $event)"
            />
          </td>
          <td width="30%">
            <hvi-multi-select
              [options]="stillingOptions"
              placeholder="Alle"
              searchPlaceholder="Søk stilling..."
              aria-label="Filtrer på stilling"
              aria-controls="komplett-tabell"
              (selectionChange)="fullTable.setColumnFilter('stilling', $event)"
            />
          </td>
        </tr>
      </thead>
      <tbody>
        @for (person of fullTable.paginatedValue(); track person.id) {
          <tr>
            <td>
              <button
                hviButton
                variant="tertiary"
                (click)="fullTable.toggleExpanded(person)"
                [attr.aria-expanded]="fullTable.isExpanded(person)"
                [attr.aria-controls]="'komplett-detalj-' + person.id"
                [ariaLabel]="
                  fullTable.isExpanded(person)
                    ? 'Skjul detaljer om ' + person.navn
                    : 'Vis detaljer om ' + person.navn
                "
              >
                @if (fullTable.isExpanded(person)) {
                  <hvi-icon-chevron-down />
                } @else {
                  <hvi-icon-chevron-right />
                }
              </button>
            </td>
            <td>{{ person.navn }}</td>
            <td>{{ person.avdeling }}</td>
            <td>{{ person.stilling }}</td>
          </tr>
          @if (fullTable.isExpanded(person)) {
            <tr [id]="'komplett-detalj-' + person.id">
              <td colspan="4">
                <div class="flex gap-8 py-2 pl-12">
                  <dl>
                    <dt>E-post</dt>
                    <dd>{{ person.epost }}</dd>
                  </dl>
                  <dl>
                    <dt>Telefon</dt>
                    <dd>{{ person.telefon }}</dd>
                  </dl>
                </div>
              </td>
            </tr>
          }
        } @empty {
          <tr>
            <td colspan="4">Ingen treff</td>
          </tr>
        }
      </tbody>
    </table>
    <div class="mt-4 flex items-center justify-end">
      <hvi-pagination
        aria-label="Sidenavigering for tabell"
        aria-controls="komplett-tabell"
        [totalItems]="fullTable.totalFilteredRecords()"
        [pageSize]="rowsPerPage()"
        [currentPage]="fullTable.currentPage()"
        (currentPageChange)="fullTable.goToPage($event)"
      />
    </div>
  `,
})
export class TableKomplettEksempelExampleComponent {
  data = [
    {
      id: 1,
      navn: 'Ola Nordmann',
      epost: 'ola@helse-vest.no',
      avdeling: 'IT',
      telefon: '991 12 345',
      stilling: 'Utvikler',
    },
    {
      id: 2,
      navn: 'Kari Hansen',
      epost: 'kari@helse-vest.no',
      avdeling: 'HR',
      telefon: '992 23 456',
      stilling: 'Rådgiver',
    },
    {
      id: 3,
      navn: 'Per Olsen',
      epost: 'per@helse-vest.no',
      avdeling: 'IT',
      telefon: '993 34 567',
      stilling: 'Teamleder',
    },
    {
      id: 4,
      navn: 'Lise Johansen',
      epost: 'lise@helse-vest.no',
      avdeling: 'Økonomi',
      telefon: '994 45 678',
      stilling: 'Controller',
    },
    {
      id: 5,
      navn: 'Erik Berg',
      epost: 'erik@helse-vest.no',
      avdeling: 'IT',
      telefon: '995 56 789',
      stilling: 'Arkitekt',
    },
    {
      id: 6,
      navn: 'Anna Lie',
      epost: 'anna@helse-vest.no',
      avdeling: 'HR',
      telefon: '996 67 890',
      stilling: 'Leder',
    },
    {
      id: 7,
      navn: 'Jonas Vik',
      epost: 'jonas@helse-vest.no',
      avdeling: 'Økonomi',
      telefon: '997 78 901',
      stilling: 'Analytiker',
    },
    {
      id: 8,
      navn: 'Maria Dahl',
      epost: 'maria@helse-vest.no',
      avdeling: 'IT',
      telefon: '998 89 012',
      stilling: 'Tester',
    },
    {
      id: 9,
      navn: 'Thomas Strand',
      epost: 'thomas@helse-vest.no',
      avdeling: 'Ledelse',
      telefon: '999 90 123',
      stilling: 'Direktør',
    },
    {
      id: 10,
      navn: 'Ingrid Moe',
      epost: 'ingrid@helse-vest.no',
      avdeling: 'IT',
      telefon: '990 01 234',
      stilling: 'Designer',
    },
    {
      id: 11,
      navn: 'Bjørn Haugen',
      epost: 'bjorn@helse-vest.no',
      avdeling: 'Økonomi',
      telefon: '991 11 111',
      stilling: 'Revisor',
    },
    {
      id: 12,
      navn: 'Silje Aas',
      epost: 'silje@helse-vest.no',
      avdeling: 'HR',
      telefon: '992 22 222',
      stilling: 'Rekrutterer',
    },
  ];
  avdelinger = ['IT', 'HR', 'Økonomi', 'Ledelse'];
  stillinger = [
    'Utvikler',
    'Rådgiver',
    'Teamleder',
    'Controller',
    'Arkitekt',
    'Leder',
    'Analytiker',
    'Tester',
    'Direktør',
    'Designer',
    'Revisor',
    'Rekrutterer',
  ];

  navnOptions = this.data.map((p) => ({ label: p.navn, value: p.navn }));
  avdelingOptions = this.avdelinger.map((a) => ({ label: a, value: a }));
  stillingOptions = this.stillinger.map((s) => ({ label: s, value: s }));

  rowsPerPage = signal(5);

  getSortLabel(table: HviTable<any>, field: string, heading: string): string {
    const dir = table.getSortDirection(field);
    if (dir === 'ascending') return `Sorter etter ${heading} (synkende)`;
    if (dir === 'descending') return `Fjern sortering for ${heading}`;
    return `Sorter etter ${heading} (stigende)`;
  }
}
