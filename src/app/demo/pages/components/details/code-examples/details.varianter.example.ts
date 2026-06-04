import { Component } from '@angular/core';
import { HviDetails } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-details-varianter-example',
  standalone: true,
  imports: [HviDetails],
  template: `
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
  `,
})
export class DetailsVarianterExampleComponent {}
