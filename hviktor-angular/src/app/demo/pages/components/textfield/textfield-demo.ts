import { Component } from '@angular/core';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-textfield-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page title="Textfield" description="Textfield komponent">
      <app-demo-section title="Eksempel">
        <div class="flex flex-wrap gap-2">
          <!-- Legg til demo-innhold her -->
          <p>Demo for Textfield</p>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class TextfieldDemoComponent {}
