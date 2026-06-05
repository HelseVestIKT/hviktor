import { Component } from '@angular/core';
import { HviDivider, HviField, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-field-plassering-example',
  standalone: true,
  imports: [HviDivider, HviField, HviInput, HviLabel],
  template: `
    <div class="grid gap-2" style="max-width: 300px">
      <hr hviDivider />
      <hvi-field position="end">
        <label hviLabel for="flymodus">Flymodus</label>
        <input hviInput id="flymodus" type="checkbox" role="switch" />
      </hvi-field>
      <hr hviDivider />
      <hvi-field position="start">
        <input hviInput id="lydlos" type="checkbox" role="switch" />
        <label hviLabel for="lydlos">Lydløs</label>
      </hvi-field>
      <hr hviDivider />
    </div>
  `,
})
export class FieldPlasseringExampleComponent {
  hasEtternavnError = true;
}
