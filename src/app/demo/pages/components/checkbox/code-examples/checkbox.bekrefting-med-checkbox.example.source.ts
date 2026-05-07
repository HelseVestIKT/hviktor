// Auto-generated - do not edit manually
export const CheckboxBekreftingMedCheckboxExampleSource = `import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HviField, HviFieldset, HviInput, HviLabel, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-checkbox-bekrefting-med-checkbox-example',
  standalone: true,
  imports: [HviField, HviFieldset, HviInput, HviLabel, HviParagraph],
  template: \`
    <fieldset hviFieldset>
      <legend hviLabel weight="medium">Bekreft at du er over 18 år</legend>
      <p hviParagraph>
        For at vi skal kunne sende deg opplysningen du ber om, må du bekrefte at du er myndig.
      </p>
      <hvi-field>
        <input hviInput type="checkbox" id="age-confirm" value="samtykke" />
        <label hviLabel for="age-confirm">Jeg bekrefter at jeg er over 18 år</label>
      </hvi-field>
    </fieldset>
  \`,
})
export class CheckboxBekreftingMedCheckboxExampleComponent {}
`;
