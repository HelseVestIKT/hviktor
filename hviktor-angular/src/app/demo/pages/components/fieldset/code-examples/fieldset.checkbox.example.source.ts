// Auto-generated - do not edit manually
export const FieldsetCheckboxExampleSource = `import { Component } from '@angular/core';
import { HviField, HviFieldset, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-fieldset-checkbox-example',
  standalone: true,
  imports: [HviField, HviFieldset, HviInput, HviLabel],
  template: \`
    <fieldset hviFieldset>
      <legend hviLabel weight="medium">Godtar du vilkårene?</legend>
      <hvi-field>
        <input hviInput type="checkbox" id="agree" value="agree" />
        <label hviLabel for="agree">Ja, jeg godtar</label>
      </hvi-field>
    </fieldset>
  \`,
})
export class FieldsetCheckboxExampleComponent {
  
}
`;
