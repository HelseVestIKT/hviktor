// Auto-generated - do not edit manually
export const TableCustomSorteringsfunksjonExampleSource = `import { Component, signal } from '@angular/core';
import { HviSortableColumn, HviTable } from '@helsevestikt/hviktor';

export interface SortingFn<TData extends RowData> {
  (rowA: Row<TData>, rowB: Row<TData>, columnId: string): number;
}

@Component({
  selector: 'app-table-custom-sorteringsfunksjon-example',
  standalone: true,
  imports: [HviSortableColumn, HviTable],
  template: \`
    <table hviTable [value]="priorityData" #customSortTable="hviTable">
      <caption>
        Sensoroversikt med prioritetssortering
      </caption>
      <thead>
        <tr>
          <th hviSortableColumn="namn" scope="col">
            <button
              type="button"
              [attr.aria-label]="getSortLabel(customSortTable, 'namn', 'Namn')"
            >
              Namn
            </button>
          </th>
          <th hviSortableColumn="status" [sortFn]="prioritetSort" scope="col">
            <button
              type="button"
              [attr.aria-label]="getSortLabel(customSortTable, 'status', 'Status')"
            >
              Status
            </button>
          </th>
          <th hviSortableColumn="lokasjon" scope="col">
            <button
              type="button"
              [attr.aria-label]="getSortLabel(customSortTable, 'lokasjon', 'Lokasjon')"
            >
              Lokasjon
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        @for (sensor of customSortTable.filteredValue(); track sensor.id) {
          <tr>
            <td>{{ sensor.namn }}</td>
            <td>{{ sensor.status }}</td>
            <td>{{ sensor.lokasjon }}</td>
          </tr>
        }
      </tbody>
    </table>
  \`,
})
export class TableCustomSorteringsfunksjonExampleComponent {
  /** Eksempeldata for custom sortering – sensorer med ulik prioritet */
  priorityData = [
    { id: 1, namn: 'Sensor A', status: 'Aktivt varsel', lokasjon: 'Bergen' },
    { id: 2, namn: 'Sensor B', status: 'Normal', lokasjon: 'Stavanger' },
    { id: 3, namn: 'Sensor C', status: 'Varsling aktivert', lokasjon: 'Oslo' },
    { id: 4, namn: 'Sensor D', status: 'Aktivt varsel', lokasjon: 'Trondheim' },
    { id: 5, namn: 'Sensor E', status: 'Normal', lokasjon: 'Haugesund' },
    { id: 6, namn: 'Sensor F', status: 'Varsling aktivert', lokasjon: 'Førde' },
  ];
  
  /**
   * Custom komparator: Aktivt varsel (0) → Varsling aktivert (1) → Normal (2).
   * TanStack reverserer automatisk ved synkende sortering.
   */
  prioritetSort: SortingFn<unknown> = (radA, radB, columnId) => {
    const rang = (val: unknown): number => {
      if (val === 'Aktivt varsel') return 0;
      if (val === 'Varsling aktivert') return 1;
      return 2;
    };
    return rang(radA.getValue(columnId)) - rang(radB.getValue(columnId));
  };
  
  getSortLabel(table: HviTable<any>, field: string, heading: string): string {
    const dir = table.getSortDirection(field);
    if (dir === 'ascending') return \`Sorter etter \${heading} (synkende)\`;
    if (dir === 'descending') return \`Fjern sortering for \${heading}\`;
    return \`Sorter etter \${heading} (stigende)\`;
  }
}
`;
