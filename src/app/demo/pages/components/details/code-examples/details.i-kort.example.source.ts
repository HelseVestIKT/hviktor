// Auto-generated - do not edit manually
export const DetailsIKortExampleSource = `import { Component } from '@angular/core';
import { HviCard, HviDetails } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-details-i-kort-example',
  standalone: true,
  imports: [HviCard, HviDetails],
  template: \`
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
  \`,
})
export class DetailsIKortExampleComponent {
  
}
`;
