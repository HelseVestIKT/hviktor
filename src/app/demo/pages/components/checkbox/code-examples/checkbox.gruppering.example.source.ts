// Auto-generated - do not edit manually
export const CheckboxGrupperingExampleSource = `import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HviField, HviFieldset, HviInput, HviLabel, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-checkbox-gruppering-example',
  standalone: true,
  imports: [HviField, HviFieldset, HviInput, HviLabel, HviParagraph],
  template: \`
    <fieldset hviFieldset>
      <legend hviLabel weight="medium">Hvordan vil du helst at vi skal kontakte deg?</legend>
      <p hviParagraph>Velg alle alternativene som er relevante for deg.</p>
      <hvi-field>
        <input hviInput type="checkbox" id="group-epost" value="epost" name="kontakt" />
        <label hviLabel for="group-epost">E-post</label>
      </hvi-field>
      <hvi-field>
        <input hviInput type="checkbox" id="group-telefon" value="telefon" name="kontakt" />
        <label hviLabel for="group-telefon">Telefon</label>
      </hvi-field>
      <hvi-field>
        <input hviInput type="checkbox" id="group-sms" value="sms" name="kontakt" />
        <label hviLabel for="group-sms">SMS</label>
      </hvi-field>
    </fieldset>
  \`,
})
export class CheckboxGrupperingExampleComponent {}
`;
