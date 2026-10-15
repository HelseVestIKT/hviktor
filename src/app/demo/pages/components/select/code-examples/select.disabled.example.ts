import { Component } from '@angular/core';
import { HviField, HviLabel, HviSelect } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-select-disabled-example',
  standalone: true,
  imports: [HviField, HviLabel, HviSelect],
  template: `
    <hvi-field>
      <label hviLabel for="maned" weight="medium">Velg måned</label>
      <select hviSelect id="maned" width="auto" disabled>
        <option value="" disabled selected>Velg måned</option>
        <option value="1">Januar</option>
        <option value="2">Februar</option>
        <option value="3">Mars</option>
        <option value="4">April</option>
        <option value="5">Mai</option>
        <option value="6">Juni</option>
        <option value="7">Juli</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">Oktober</option>
        <option value="11">November</option>
        <option value="12">Desember</option>
      </select>
    </hvi-field>
  `,
})
export class SelectDisabledExampleComponent {}
