import { Component } from '@angular/core';
import { HviField, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-input-med-feil-example',
  standalone: true,
  imports: [HviField, HviInput, HviLabel],
  template: `
    <ds-field>
      <label hviLabel for="fnr-error" weight="medium">Fødselsnummer</label>
      <input hviInput type="text" id="fnr-error" aria-invalid="true" />
    </ds-field>
  `,
})
export class InputMedFeilExampleComponent {}
