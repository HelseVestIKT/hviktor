import { Component } from '@angular/core';
import { HviCard, HviDetails } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { DetailsIKortExampleSource } from './code-examples/details.i-kort.example.source';
import { DetailsVarianterExampleSource } from './code-examples/details.varianter.example.source';
@Component({
  selector: 'app-details-demo',
  standalone: true,
  imports: [HviDetails, HviCard, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page componentId="details">
      <app-demo-section title="Varianter" [code]="varianterCode">
        <div class="flex flex-col gap-2">
          <details hviDetails variant="tinted">
            <summary>Detaljer (tinted)</summary>
            <div>
              <p>Her er innholdet i detaljene.</p>
            </div>
          </details>

          <details hviDetails>
            <summary>Detaljer (default)</summary>
            <div>
              <p>Her er innholdet i detaljene.</p>
            </div>
          </details>
        </div>
      </app-demo-section>

      <app-demo-section title="I kort" [code]="iKortCode">
        <hvi-card color="brand2">
          <details hviDetails variant="tinted">
            <summary>Detaljer</summary>
            <div>
              <p>Her er innholdet i detaljene.</p>
            </div>
          </details>
          <details hviDetails [open]="true">
            <summary>Detaljer (åpen)</summary>
            <div>
              <p>Her er innholdet i detaljene.</p>
            </div>
          </details>
        </hvi-card>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class DetailsDemoComponent {
  readonly varianterCode = DetailsVarianterExampleSource;
  readonly iKortCode = DetailsIKortExampleSource;
}
