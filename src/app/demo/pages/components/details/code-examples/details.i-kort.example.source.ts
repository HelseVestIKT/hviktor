// Auto-generated - do not edit manually
export const DetailsIKortExampleSource = `import { Component } from '@angular/core';
import { HviCard, HviDetails, HviDetailsContent, HviDetailsSummary } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-details-i-kort-example',
  standalone: true,
  imports: [HviCard, HviDetails, HviDetailsContent, HviDetailsSummary],
  template: \`
    <hvi-card color="brand2">
      <hvi-details variant="tinted">
        <hvi-details-summary>
          <p size="md">Detaljer</p>
        </hvi-details-summary>
        <hvi-details-content>
          <p>Her er innholdet i detaljene.</p>
        </hvi-details-content>
      </hvi-details>
      <hvi-details [open]="true">
        <hvi-details-summary>
          <p size="md">Detaljer (åpen)</p>
        </hvi-details-summary>
        <hvi-details-content>
          <p>Her er innholdet i detaljene.</p>
        </hvi-details-content>
      </hvi-details>
    </hvi-card>
  \`,
})
export class DetailsIKortExampleComponent {
  
}
`;
