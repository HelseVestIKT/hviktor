import { Component } from '@angular/core';
import { HviField, HviFieldDescription, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-checkbox-enkel-checkbox-example',
  standalone: true,
  imports: [HviField, HviFieldDescription, HviInput, HviLabel],
  template: `
    <hvi-field>
      <input hviInput type="checkbox" id="simple-checkbox" />
      <label hviLabel for="simple-checkbox">Checkbox label</label>
      <div hviFieldDescription>Description</div>
    </hvi-field>
  `,
})
export class CheckboxEnkelCheckboxExampleComponent {}
