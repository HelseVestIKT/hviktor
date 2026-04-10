import { Component } from '@angular/core';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

interface Person {
  navn: string;
  epost: string;
  telefon: string;
}

@Component({
  selector: 'app-table-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page componentId="table">
      <!-- Basis eksempel -->
      <app-demo-section title="Basis" description="Enkel tabell med header, body og footer.">
      </app-demo-section>
    </app-demo-page>
  `,
})
export class TableDemoComponent {}
