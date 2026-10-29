// Auto-generated - do not edit manually
export const TextfieldBreddeExampleSource = `import { Component } from '@angular/core';
import { HviTextfield } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-textfield-bredde-example',
  standalone: true,
  imports: [HviTextfield],
  template: \`
    <div class="space-y-4">
      <hvi-textfield label="Postnummer" [size]="4" autocomplete="postal-code" />
      <hvi-textfield label="Telefonnummer" type="tel" [size]="10" autocomplete="tel" />
      <hvi-textfield label="Poststed" width="auto" autocomplete="address-level2" />
      <hvi-textfield label="Adresse" autocomplete="street-address" />
    </div>
  \`,
})
export class TextfieldBreddeExampleComponent {}
`;
