import { Component } from '@angular/core';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-field-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page title="Field" description="Field komponent">
      <app-demo-section title="Eksempel">
        <div class="flex flex-wrap gap-2">
          <!-- Legg til demo-innhold her -->
          <p>Demo for Field</p>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class FieldDemoComponent {}
