import { Component } from '@angular/core';
import { HviField, HviFieldset, HviInput, HviLabel, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-checkbox-gruppering-example',
  standalone: true,
  imports: [HviField, HviFieldset, HviInput, HviLabel, HviParagraph],
  template: `
    <fieldset hviFieldset>
      <legend hviLabel weight="medium">Hvordan vil du helst at vi skal kontakte deg?</legend>
      <p hviParagraph>Velg alle alternativene som er relevante for deg.</p>
      <ds-field>
        <input hviInput type="checkbox" id="group-epost" value="epost" name="kontakt" />
        <label hviLabel for="group-epost">E-post</label>
      </ds-field>
      <ds-field>
        <input hviInput type="checkbox" id="group-telefon" value="telefon" name="kontakt" />
        <label hviLabel for="group-telefon">Telefon</label>
      </ds-field>
      <ds-field>
        <input hviInput type="checkbox" id="group-sms" value="sms" name="kontakt" />
        <label hviLabel for="group-sms">SMS</label>
      </ds-field>
    </fieldset>
  `,
})
export class CheckboxGrupperingExampleComponent {}
