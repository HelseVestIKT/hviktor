// Auto-generated - do not edit manually
export const SwitchOutlineExampleSource = `import { Component } from '@angular/core';
import { HviField, HviFieldDescription, HviFieldset, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-switch-outline-example',
  standalone: true,
  imports: [HviField, HviFieldDescription, HviFieldset, HviInput, HviLabel],
  template: \`
    <fieldset hviFieldset>
      <legend hviLabel weight="medium">Varsler</legend>
      <hvi-field outline>
        <input hviInput type="checkbox" role="switch" id="outline-switch-epost" />
        <label hviLabel for="outline-switch-epost">E-postvarsler</label>
        <span hviFieldDescription>Få varsler på e-post</span>
      </hvi-field>
      <hvi-field outline>
        <input hviInput type="checkbox" role="switch" id="outline-switch-sms" />
        <label hviLabel for="outline-switch-sms">SMS-varsler</label>
        <span hviFieldDescription>Få varsler på SMS</span>
      </hvi-field>
      <hvi-field outline>
        <input hviInput type="checkbox" role="switch" id="outline-switch-push" checked />
        <label hviLabel for="outline-switch-push">Push-varsler</label>
        <span hviFieldDescription>Få varsler i appen</span>
      </hvi-field>
    </fieldset>
  \`,
})
export class SwitchOutlineExampleComponent {
  
}
`;
