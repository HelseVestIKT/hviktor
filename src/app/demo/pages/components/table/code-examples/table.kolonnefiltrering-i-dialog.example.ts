import { Component, signal } from '@angular/core';
import {
  HviButton,
  HviDialog,
  HviDialogBlock,
  HviField,
  HviFieldset,
  HviInput,
  HviLabel,
  HviTable,
  HviTableScroll,
} from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-table-kolonnefiltrering-i-dialog-example',
  standalone: true,
  imports: [
    HviButton,
    HviDialog,
    HviDialogBlock,
    HviField,
    HviFieldset,
    HviInput,
    HviLabel,
    HviTable,
    HviTableScroll,
  ],
  template: `
    <div class="mb-2 flex flex-wrap items-center gap-2">
      <button
        hviButton
        variant="secondary"
        type="button"
        aria-haspopup="dialog"
        (click)="filterDialogOpen.set(true)"
      >
        Filtrer
        @if (antallAktiveFiltre(dialogFilterTable); as antall) {
          ({{ antall }})
        }
      </button>
      <button
        hviButton
        variant="tertiary"
        type="button"
        [disabled]="!antallAktiveFiltre(dialogFilterTable)"
        (click)="dialogFilterTable.clearAllColumnFilters()"
      >
        Nullstill filtre
      </button>
    </div>
    <p class="ds-paragraph mb-2" role="status" aria-live="polite" aria-atomic="true">
      Viser {{ dialogFilterTable.totalFilteredRecords() }} av
      {{ dialogFilterTable.totalRecords() }} rader
    </p>
    <div hviTableScroll>
      <table
        hviTable
        id="dialog-filter-tabell"
        [value]="data"
        [columns]="['navn', 'epost', 'avdeling', 'stilling']"
        zebra
        #dialogFilterTable="hviTable"
      >
        <caption>
          Ansattoversikt
        </caption>
        <thead>
          <tr>
            <th scope="col">Navn</th>
            <th scope="col">E-post</th>
            <th scope="col">Avdeling</th>
            <th scope="col">Stilling</th>
          </tr>
        </thead>
        <tbody>
          @for (person of dialogFilterTable.filteredValue(); track person.id) {
            <tr>
              <td>{{ person.navn }}</td>
              <td>{{ person.epost }}</td>
              <td>{{ person.avdeling }}</td>
              <td>{{ person.stilling }}</td>
            </tr>
          } @empty {
            <tr>
              <td colspan="4">Ingen treff</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
    <dialog
      hviDialog
      title="Filtrer ansatte"
      placement="right"
      closedby="any"
      [open]="filterDialogOpen()"
      (openChange)="filterDialogOpen.set($event)"
    >
      <div hviDialogBlock>
        <fieldset hviFieldset>
          <legend hviLabel weight="medium">Avdeling</legend>
          @for (avdeling of avdelinger; track avdeling) {
            <hvi-field>
              <input
                hviInput
                type="checkbox"
                [id]="'dialog-filter-avdeling-' + $index"
                aria-controls="dialog-filter-tabell"
                [checked]="erValgt(dialogFilterTable, 'avdeling', avdeling)"
                (change)="veksleFilter(dialogFilterTable, 'avdeling', avdeling)"
              />
              <label hviLabel [for]="'dialog-filter-avdeling-' + $index">{{ avdeling }}</label>
            </hvi-field>
          }
        </fieldset>
      </div>
      <div hviDialogBlock>
        <fieldset hviFieldset>
          <legend hviLabel weight="medium">Stilling</legend>
          @for (stilling of stillinger; track stilling) {
            <hvi-field>
              <input
                hviInput
                type="checkbox"
                [id]="'dialog-filter-stilling-' + $index"
                aria-controls="dialog-filter-tabell"
                [checked]="erValgt(dialogFilterTable, 'stilling', stilling)"
                (change)="veksleFilter(dialogFilterTable, 'stilling', stilling)"
              />
              <label hviLabel [for]="'dialog-filter-stilling-' + $index">{{ stilling }}</label>
            </hvi-field>
          }
        </fieldset>
      </div>
      <div hviDialogBlock class="flex flex-wrap gap-2">
        <button hviButton type="button" (click)="filterDialogOpen.set(false)">
          Vis {{ dialogFilterTable.totalFilteredRecords() }} rader
        </button>
        <button
          hviButton
          variant="tertiary"
          type="button"
          (click)="dialogFilterTable.clearAllColumnFilters()"
        >
          Nullstill filtre
        </button>
      </div>
    </dialog>
  `,
})
export class TableKolonnefiltreringIDialogExampleComponent {
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

  filterDialogOpen = signal(false);

  /** Om en verdi er valgt i filteret for en kolonne */
  erValgt(table: HviTable<any>, felt: string, verdi: string): boolean {
    return table.getColumnFilterValue<string[]>(felt)?.includes(verdi) ?? false;
  }

  /** Legger til eller fjerner en verdi i filteret for en kolonne */
  veksleFilter(table: HviTable<any>, felt: string, verdi: string): void {
    const valgt = table.getColumnFilterValue<string[]>(felt) ?? [];
    table.setColumnFilter(
      felt,
      valgt.includes(verdi) ? valgt.filter((v) => v !== verdi) : [...valgt, verdi],
    );
  }

  /** Antall valgte filterverdier i dialogen */
  antallAktiveFiltre(table: HviTable<any>): number {
    return ['avdeling', 'stilling'].reduce(
      (sum, felt) => sum + (table.getColumnFilterValue<string[]>(felt)?.length ?? 0),
      0,
    );
  }
}
