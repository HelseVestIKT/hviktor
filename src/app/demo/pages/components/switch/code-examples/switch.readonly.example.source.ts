// Auto-generated - do not edit manually
export const SwitchReadonlyExampleSource = `import { Component } from '@angular/core';
import { HviField, HviFieldDescription, HviInput, HviLabel } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-switch-readonly-example',
  standalone: true,
  imports: [HviField, HviFieldDescription, HviInput, HviLabel],
  template: \`
    <hvi-field>
      <input hviInput type="checkbox" role="switch" id="readonly-switch-varsler" checked readOnly />
      <label hviLabel for="readonly-switch-varsler">Driftsvarsler</label>
      <span hviFieldDescription>Aktivert av administratoren din</span>
    </hvi-field>
  \`,
})
export class SwitchReadonlyExampleComponent {
  
}
`;
