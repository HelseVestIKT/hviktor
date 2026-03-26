import { Component } from '@angular/core';
import { HviField, HviFieldset, HviInput, HviLabel, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-fieldset-radio-gruppe-example',
  standalone: true,
  imports: [HviField, HviFieldset, HviInput, HviLabel, HviParagraph],
  template: `
    <fieldset hviFieldset>
      <legend hviLabel weight="medium">Hvilken fjordarm bor du ved?</legend>
      <p hviParagraph>Valget vil hjelpe oss å forbedre innholdet vi viser deg.</p>
      <ds-field>
        <input hviInput type="radio" id="barsnesfjorden" name="fjord" value="barsnesfjorden" />
        <label hviLabel for="barsnesfjorden">Barsnesfjorden</label>
      </ds-field>
      <ds-field>
        <input hviInput type="radio" id="eidsfjorden" name="fjord" value="eidsfjorden" />
        <label hviLabel for="eidsfjorden">Eidsfjorden</label>
      </ds-field>
      <ds-field>
        <input hviInput type="radio" id="ingen" name="fjord" value="ingen" />
        <label hviLabel for="ingen">Ingen av de</label>
      </ds-field>
    </fieldset>
  `,
})
export class FieldsetRadioGruppeExampleComponent {}
