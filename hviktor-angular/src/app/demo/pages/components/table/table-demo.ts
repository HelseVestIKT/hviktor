import { Component } from '@angular/core';
import { HviButton, HviInput, HviSortableColumn, HviTable } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

interface Person {
  navn: string;
  epost: string;
  telefon: string;
}

@Component({
  selector: 'app-table-demo',
  standalone: true,
  imports: [
    DemoPageComponent,
    DemoSectionComponent,
    HviTable,
    HviSortableColumn,
    HviInput,
    HviButton,
  ],
  template: `
    <app-demo-page
      title="Table"
      description="Table brukes for å vise strukturert informasjon på en ryddig og oversiktlig måte. Tabeller kan gjøre det enklere for brukerne å skanne og sammenligne informasjon."
    >
      <!-- Basis eksempel -->
      <app-demo-section title="Basis" description="Enkel tabell med header, body og footer.">
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
          </tbody>
          <tfoot>
            <tr>
              <th colspan="3">Totalt antall pasienter</th>
              <th>3</th>
            </tr>
          </tfoot>
        </table>
      </app-demo-section>

      <!-- Zebrastriper -->
      <app-demo-section
        title="Zebrastriper"
        description="Bruk zebra for annenhver rad med alternativ bakgrunnsfarge."
      >
        <table hviTable zebra>
          <caption>
            Antall søknader per måned
          </caption>
          <thead>
            <tr>
              <th>Måned</th>
              <th>2023</th>
              <th>2024</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Januar</th>
              <td>1 230</td>
              <td>1 450</td>
            </tr>
            <tr>
              <th scope="row">Februar</th>
              <td>980</td>
              <td>1 120</td>
            </tr>
            <tr>
              <th scope="row">Mars</th>
              <td>1 150</td>
              <td>1 300</td>
            </tr>
          </tbody>
        </table>
      </app-demo-section>

      <!-- Med border -->
      <app-demo-section
        title="Med border"
        description="Bruk border for å legge til en synlig kant rundt tabellen."
      >
        <table hviTable border>
          <thead>
            <tr>
              <th>Header 1</th>
              <th>Header 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cell 1</td>
              <td>Cell 2</td>
            </tr>
            <tr>
              <td>Cell 3</td>
              <td>Cell 4</td>
            </tr>
          </tbody>
        </table>
      </app-demo-section>

      <!-- Hover -->
      <app-demo-section title="Hover" description="Bruk hover for å gi rader en hover-effekt.">
        <table hviTable hover>
          <thead>
            <tr>
              <th>Navn</th>
              <th>Avdeling</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ola Nordmann</td>
              <td>Medisinsk avdeling</td>
              <td>Innlagt</td>
            </tr>
            <tr>
              <td>Kari Hansen</td>
              <td>Kirurgisk avdeling</td>
              <td>Utskrevet</td>
            </tr>
            <tr>
              <td>Per Johansen</td>
              <td>Akuttmottak</td>
              <td>Under behandling</td>
            </tr>
          </tbody>
        </table>
      </app-demo-section>

      <!-- Søk og sortering -->
      <app-demo-section
        title="Søk og sortering"
        description="Kombiner søk og sortering for full funksjonalitet. Bruk filterGlobal() for å søke på tvers av kolonner."
      >
        <div style="margin-bottom: 1rem; display: flex; gap: 1rem; align-items: center;">
          <input
            hviInput
            type="search"
            placeholder="Søk i navn, epost eller telefon..."
            #searchInput
            (input)="searchTable.filterGlobal(searchInput.value)"
            style="flex: 1; max-width: 300px;"
          />
          <button hviButton (click)="searchTable.clear(); searchInput.value = ''">Nullstill</button>
        </div>
        <table
          hviTable
          hover
          [value]="persons"
          [globalFilterFields]="['navn', 'epost', 'telefon']"
          #searchTable="hviTable"
        >
          <thead>
            <tr>
              <th hviSortableColumn="navn">
                <button>Navn</button>
              </th>
              <th>Epost</th>
              <th hviSortableColumn="telefon">
                <button>Telefon</button>
              </th>
            </tr>
          </thead>
          <tbody>
            @for (person of searchTable.filteredValue(); track person.epost) {
              <tr>
                <td>{{ person.navn }}</td>
                <td>{{ person.epost }}</td>
                <td>{{ person.telefon }}</td>
              </tr>
            } @empty {
              <tr>
                <td colspan="3" style="text-align: center;">Ingen treff</td>
              </tr>
            }
          </tbody>
        </table>
        <p
          style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--ds-color-neutral-text-subtle);"
        >
          Viser {{ searchTable.totalFilteredRecords() }} av {{ searchTable.totalRecords() }} rader
        </p>
      </app-demo-section>

      <!-- Tall i tabell -->
      <app-demo-section
        title="Tall i tabell"
        description="Når det er tall som skal sammenlignes, plasser tallene til høyre i tabellfeltet."
      >
        <table hviTable style="table-layout: fixed; font-variant-numeric: tabular-nums;">
          <caption>
            Antall søknader per måned
          </caption>
          <thead>
            <tr>
              <th scope="col">Måned</th>
              <th scope="col" style="text-align: right;">2023</th>
              <th scope="col" style="text-align: right;">2024</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Januar</th>
              <td style="text-align: right;">1 230</td>
              <td style="text-align: right;">1 450</td>
            </tr>
            <tr>
              <th scope="row">Februar</th>
              <td style="text-align: right;">980</td>
              <td style="text-align: right;">1 120</td>
            </tr>
            <tr>
              <th scope="row">Mars</th>
              <td style="text-align: right;">1 150</td>
              <td style="text-align: right;">1 300</td>
            </tr>
          </tbody>
        </table>
      </app-demo-section>

      <!-- Kombinert -->
      <app-demo-section
        title="Kombinert"
        description="Du kan kombinere flere varianter for å tilpasse tabellen til dine behov."
      >
        <table hviTable zebra border hover>
          <caption>
            Pasientoversikt med alle varianter
          </caption>
          <thead>
            <tr>
              <th>Navn</th>
              <th>Avdeling</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ola Nordmann</td>
              <td>Medisinsk avdeling</td>
              <td>Innlagt</td>
            </tr>
            <tr>
              <td>Kari Hansen</td>
              <td>Kirurgisk avdeling</td>
              <td>Utskrevet</td>
            </tr>
            <tr>
              <td>Per Johansen</td>
              <td>Akuttmottak</td>
              <td>Under behandling</td>
            </tr>
          </tbody>
        </table>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class TableDemoComponent {
  // Data for sorteringseksempel - det er alt som trengs!
  persons: Person[] = [
    { navn: 'Lise Nordmann', epost: 'lise@nordmann.no', telefon: '22345678' },
    { navn: 'Kari Nordmann', epost: 'kari@nordmann.no', telefon: '87654321' },
    { navn: 'Ola Nordmann', epost: 'ola@nordmann.no', telefon: '32345678' },
    { navn: 'Per Nordmann', epost: 'per@nordmann.no', telefon: '12345678' },
  ];
}
