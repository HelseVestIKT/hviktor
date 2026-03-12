import { Component } from '@angular/core';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-required-tag-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page componentId="required-tag">
      <app-demo-section title="Eksempel">
        <div class="flex flex-wrap gap-2">
          <!-- Legg til demo-innhold her -->
          <p>Demo for RequiredTag</p>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class RequiredTagDemoComponent {}
