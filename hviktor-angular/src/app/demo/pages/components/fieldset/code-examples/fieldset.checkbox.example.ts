import { Component } from '@angular/core';
import { HviField, HviFieldset, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-fieldset-checkbox-example',
  standalone: true,
  imports: [HviField, HviFieldset, HviInput, HviLabel],
  template: `
    <fieldset hviFieldset>
      <legend hviLabel weight="medium">Godtar du vilkårene?</legend>
      <ds-field>
        <input hviInput type="checkbox" id="agree" value="agree" />
        <label hviLabel for="agree">Ja, jeg godtar</label>
      </ds-field>
    </fieldset>
  `,
})
export class FieldsetCheckboxExampleComponent {}
