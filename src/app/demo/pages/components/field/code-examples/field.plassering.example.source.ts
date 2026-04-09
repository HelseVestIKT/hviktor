// Auto-generated - do not edit manually
export const FieldPlasseringExampleSource = `import { Component } from '@angular/core';
import { HviField, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-field-plassering-example',
  standalone: true,
  imports: [HviField, HviInput, HviLabel],
  template: \`
    <div class="flex flex-col gap-4">
      <hvi-field position="end">
        <label hviLabel for="flymodus" weight="medium">Flymodus</label>
        <input hviInput id="flymodus" type="checkbox" role="switch" />
      </hvi-field>
    
      <hvi-field position="start">
        <input hviInput id="bluetooth" type="checkbox" role="switch" checked />
        <label hviLabel for="bluetooth" weight="medium">Bluetooth</label>
      </hvi-field>
    </div>
  \`,
})
export class FieldPlasseringExampleComponent {
  
}
`;
