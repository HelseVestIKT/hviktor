import { Component } from '@angular/core';
import { HviField, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-radio-enkel-radio-example',
  standalone: true,
  imports: [HviField, HviInput, HviLabel],
  template: `
    <hvi-field>
      <input hviInput type="radio" id="single-radio" name="single" value="value" />
      <label hviLabel for="single-radio">Radio</label>
    </hvi-field>
  `,
})
export class RadioEnkelRadioExampleComponent {}
