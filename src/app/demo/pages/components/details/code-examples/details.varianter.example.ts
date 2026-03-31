import { Component } from '@angular/core';
import { HviDetails, HviDetailsContent, HviDetailsSummary } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-details-varianter-example',
  standalone: true,
  imports: [HviDetails, HviDetailsContent, HviDetailsSummary],
  template: `
    <div class="flex flex-col gap-2">
      <hvi-details variant="tinted">
        <hvi-details-summary>
          <p size="md">Detaljer (tinted)</p>
        </hvi-details-summary>
        <hvi-details-content>
          <p>Her er innholdet i detaljene.</p>
        </hvi-details-content>
      </hvi-details>

      <hvi-details>
        <hvi-details-summary>
          <p size="md">Detaljer (default)</p>
        </hvi-details-summary>
        <hvi-details-content>
          <p>Her er innholdet i detaljene.</p>
        </hvi-details-content>
      </hvi-details>
    </div>
  `,
})
export class DetailsVarianterExampleComponent {}
