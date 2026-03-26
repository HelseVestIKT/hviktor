// Auto-generated - do not edit manually
export const FieldPlasseringExampleSource = `import { Component } from '@angular/core';
import { HviField, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-field-plassering-example',
  standalone: true,
  imports: [HviField, HviInput, HviLabel],
  template: \`
    <div class="flex flex-col gap-4">
      <ds-field position="end">
        <label hviLabel for="flymodus" weight="medium">Flymodus</label>
        <input hviInput id="flymodus" type="checkbox" role="switch" />
      </ds-field>
    
      <ds-field position="start">
        <input hviInput id="bluetooth" type="checkbox" role="switch" checked />
        <label hviLabel for="bluetooth" weight="medium">Bluetooth</label>
      </ds-field>
    </div>
  \`,
})
export class FieldPlasseringExampleComponent {
  
}
`;
