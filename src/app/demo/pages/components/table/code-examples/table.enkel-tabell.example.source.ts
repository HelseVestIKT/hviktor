// Auto-generated - do not edit manually
export const TableEnkelTabellExampleSource = `import { Component, signal } from '@angular/core';
import { HviTable, HviTableScroll } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-table-enkel-tabell-example',
  standalone: true,
  imports: [HviTable, HviTableScroll],
  template: \`
    <div hviTableScroll>
      <table hviTable>
        <caption>
          Prosjektstatus
        </caption>
        <thead>
          <tr>
            <th scope="col">Prosjekt</th>
            <th scope="col">Status</th>
            <th scope="col">Frist</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Designsystem</td>
            <td>Aktiv</td>
            <td>2026-06-01</td>
          </tr>
          <tr>
            <td>Migrering</td>
            <td>Planlagt</td>
            <td>2026-09-15</td>
          </tr>
          <tr>
            <td>Dokumentasjon</td>
            <td>Aktiv</td>
            <td>2026-05-01</td>
          </tr>
        </tbody>
      </table>
    </div>
  \`,
})
export class TableEnkelTabellExampleComponent {
}
`;
