// Auto-generated - do not edit manually
export const FieldPlasseringExampleSource = `import { Component } from '@angular/core';
import { HviField, HviInput, HviLabel, HviDivider } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-field-plassering-example',
  standalone: true,
  imports: [HviField, HviInput, HviLabel, HviDivider],
  template: \`
    <div class="grid gap-2" style="max-width: 300px">
      <hr hviDivider />
      <hvi-field position="end">
        <label hviLabel for="flymodus">Flymodus</label>
        <input hviInput id="flymodus" type="checkbox" role="switch" />
      </hvi-field>
      <hr hviDivider />
      <hvi-field position="end">
        <label hviLabel for="lydlos">Lydløs</label>
        <input hviInput id="lydlos" type="checkbox" role="switch" />
      </hvi-field>
      <hr hviDivider />
    </div>
  \`,
})
export class FieldPlasseringExampleComponent {
  
}
`;
