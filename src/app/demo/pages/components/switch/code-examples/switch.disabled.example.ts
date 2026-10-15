import { Component } from '@angular/core';
import { HviField, HviFieldDescription, HviInput, HviLabel } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-switch-disabled-example',
  standalone: true,
  imports: [HviField, HviFieldDescription, HviInput, HviLabel],
  template: `
    <hvi-field>
      <input hviInput type="checkbox" role="switch" id="disabled-switch-sms" disabled />
      <label hviLabel for="disabled-switch-sms">SMS-varsler</label>
      <span hviFieldDescription>Legg til et mobilnummer for å aktivere SMS-varsler</span>
    </hvi-field>
  `,
})
export class SwitchDisabledExampleComponent {}
