// Auto-generated - do not edit manually
export const FieldCheckboxOgRadioExampleSource = `import { Component } from '@angular/core';
import { HviField, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-field-checkbox-og-radio-example',
  standalone: true,
  imports: [HviField, HviInput, HviLabel],
  template: \`
    <div class="flex flex-col gap-4">
      <hvi-field>
        <input hviInput id="aksept" type="checkbox" />
        <label hviLabel for="aksept">Jeg godtar vilkårene</label>
      </hvi-field>
    
      <hvi-field>
        <input hviInput id="nyhetsbrev" type="checkbox" checked />
        <label hviLabel for="nyhetsbrev">Meld meg på nyhetsbrev</label>
      </hvi-field>
    </div>
  \`,
})
export class FieldCheckboxOgRadioExampleComponent {
  
}
`;
