import { Component } from '@angular/core';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-search-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page
      title="Search"
      description="Search lar brukere raskt finne relevant innhold på et nettsted eller i en applikasjon. Komponenten består av et søkefelt, med eller uten en søkeknapp."
    >
      <app-demo-section title="Eksempel"> </app-demo-section>
    </app-demo-page>
  `,
})
export class SearchDemoComponent {}
