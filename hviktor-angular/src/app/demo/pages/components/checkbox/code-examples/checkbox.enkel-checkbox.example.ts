import { Component } from '@angular/core';
import { HviField, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-checkbox-enkel-checkbox-example',
  standalone: true,
  imports: [HviField, HviInput, HviLabel],
  template: `
    <ds-field>
      <input hviInput type="checkbox" id="simple-checkbox" />
      <label hviLabel for="simple-checkbox">Checkbox label</label>
    </ds-field>
  `,
})
export class CheckboxEnkelCheckboxExampleComponent {}
