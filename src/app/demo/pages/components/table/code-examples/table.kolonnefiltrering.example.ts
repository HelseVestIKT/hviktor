import { Component, signal } from '@angular/core';
import {
  HviButton,
  HviInput,
  HviLabel,
  HviSuggestion,
  HviSuggestionDatalist,
  HviSuggestionOption,
  HviTable,
} from '@helsevestikt/hviktor';

@Component({
  selector: 'app-table-kolonnefiltrering-example',
  standalone: true,
  imports: [
    HviButton,
    HviInput,
    HviLabel,
    HviSuggestion,
    HviSuggestionDatalist,
    HviSuggestionOption,
    HviTable,
  ],
  template: `
    <div class="mb-4 flex flex-wrap gap-4">
      <div>
        <label hviLabel>Filtrer på navn</label>
        <hvi-suggestion>
          <input
            hviInput
            type="text"
            placeholder="Velg navn..."
            (change)="colFilterTable.setColumnFilter('navn', $any($event.target).value)"
          />
          <del aria-label="Tøm" hidden=""></del>
          <hvi-suggestion-datalist>
            @for (person of data; track person.id) {
              <hvi-suggestion-option [label]="person.navn" [value]="person.navn">
                {{ person.navn }}
              </hvi-suggestion-option>
            }
          </hvi-suggestion-datalist>
        </hvi-suggestion>
      </div>
      <div>
        <label hviLabel>Filtrer på avdeling</label>
        <hvi-suggestion [multiple]="true">
          <input
            hviInput
            type="text"
            placeholder="Velg avdelinger..."
            (change)="colFilterTable.setColumnFilter('avdeling', $any($event.target).value)"
          />
          <del aria-label="Tøm" hidden=""></del>
          <hvi-suggestion-datalist>
            @for (avdeling of avdelinger; track avdeling) {
              <hvi-suggestion-option [label]="avdeling" [value]="avdeling">
                {{ avdeling }}
              </hvi-suggestion-option>
            }
          </hvi-suggestion-datalist>
        </hvi-suggestion>
      </div>
      <div>
        <label hviLabel>Filtrer på stilling</label>
        <hvi-suggestion>
          <input
            hviInput
            type="text"
            placeholder="Velg stilling..."
            (change)="colFilterTable.setColumnFilter('stilling', $any($event.target).value)"
          />
          <del aria-label="Tøm" hidden=""></del>
          <hvi-suggestion-datalist>
            @for (stilling of stillinger; track stilling) {
              <hvi-suggestion-option [label]="stilling" [value]="stilling">
                {{ stilling }}
              </hvi-suggestion-option>
            }
          </hvi-suggestion-datalist>
        </hvi-suggestion>
      </div>
    </div>
    <table
      hviTable
      [value]="data"
      [columns]="['navn', 'epost', 'avdeling', 'stilling']"
      zebra
      #colFilterTable="hviTable"
    >
      <thead>
        <tr>
          <th>Navn</th>
          <th>Avdeling</th>
          <th>Stilling</th>
        </tr>
      </thead>
      <tbody>
        @for (person of colFilterTable.filteredValue(); track person.id) {
          <tr>
            <td>{{ person.navn }}</td>
            <td>{{ person.avdeling }}</td>
            <td>{{ person.stilling }}</td>
          </tr>
        } @empty {
          <tr>
            <td colspan="3">Ingen treff</td>
          </tr>
        }
      </tbody>
    </table>
    <button
      hviButton
      variant="tertiary"
      class="mt-2"
      (click)="colFilterTable.clearAllColumnFilters()"
    >
      Nullstill filtre
    </button>
  `,
})
export class TableKolonnefiltreringExampleComponent {
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
  rowsPerPage = signal(5);
}
