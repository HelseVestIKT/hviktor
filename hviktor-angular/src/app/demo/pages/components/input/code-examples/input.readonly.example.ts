import { Component } from '@angular/core';
import { HviField, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-input-readonly-example',
  standalone: true,
  imports: [HviField, HviInput, HviLabel],
  template: `
    <ds-field>
      <label hviLabel for="fnr-readonly" weight="medium">Fødselsnummer</label>
      <input hviInput type="text" id="fnr-readonly" value="12345678901" readOnly />
    </ds-field>
  `,
})
export class InputReadonlyExampleComponent {}
