import { Component } from '@angular/core';
import { HviField, HviLabel, HviSelect } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-select-grunnleggende-example',
  standalone: true,
  imports: [HviField, HviLabel, HviSelect],
  template: `
    <hvi-field>
      <label hviLabel for="bostedsland" weight="medium">Velg bostedsland</label>
      <select hviSelect id="bostedsland">
        <option value="" disabled selected>Velg land</option>
        <option value="dk">Danmark</option>
        <option value="ee">Estland</option>
        <option value="fi">Finland</option>
        <option value="is">Island</option>
        <option value="lv">Latvia</option>
        <option value="lt">Litauen</option>
        <option value="no">Norge</option>
        <option value="se">Sverige</option>
      </select>
    </hvi-field>
  `,
})
export class SelectGrunnleggendeExampleComponent {}
