import { Component } from '@angular/core';
import { HviTable } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-table-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent, HviTable],
  template: `
    <app-demo-page title="Table" description="Table komponent">
      <app-demo-section title="Eksempel">
        <div class="flex flex-wrap gap-2">
          <table hviTable>
            <caption>
              Pasientoversikt
            </caption>
            <thead>
              <tr>
                <th>Navn</th>
                <th>Fødselsdato</th>
                <th>Avdeling</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ola Nordmann</td>
                <td>15.03.1985</td>
                <td>Medisinsk avdeling</td>
                <td>Innlagt</td>
              </tr>
              <tr>
                <td>Kari Hansen</td>
                <td>22.07.1972</td>
                <td>Kirurgisk avdeling</td>
                <td>Utskrevet</td>
              </tr>
              <tr>
                <td>Per Johansen</td>
                <td>08.11.1990</td>
                <td>Akuttmottak</td>
                <td>Under behandling</td>
              </tr>
              <tr>
                <td>Anne Larsen</td>
                <td>03.05.1988</td>
                <td>Ortopedisk avdeling</td>
                <td>Innlagt</td>
              </tr>
              <tr>
                <td>Erik Olsen</td>
                <td>19.09.1965</td>
                <td>Kardiologisk avdeling</td>
                <td>Under behandling</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th colspan="3">Totalt antall pasienter</th>
                <th>5</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class TableDemoComponent {}
