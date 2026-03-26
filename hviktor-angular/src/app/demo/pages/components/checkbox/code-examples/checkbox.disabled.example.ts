import { Component } from '@angular/core';
import { HviField, HviFieldset, HviInput, HviLabel, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-checkbox-disabled-example',
  standalone: true,
  imports: [HviField, HviFieldset, HviInput, HviLabel, HviParagraph],
  template: `
    <fieldset hviFieldset>
      <legend hviLabel weight="medium">Hvordan vil du helst at vi skal kontakte deg?</legend>
      <p hviParagraph>Velg alle alternativene som er relevante for deg.</p>
      <ds-field>
        <input
          hviInput
          type="checkbox"
          id="disabled-epost"
          value="epost"
          name="kontakt-disabled"
          checked
          disabled
        />
        <label hviLabel for="disabled-epost">E-post</label>
      </ds-field>
      <ds-field>
        <input
          hviInput
          type="checkbox"
          id="disabled-telefon"
          value="telefon"
          name="kontakt-disabled"
          disabled
        />
        <label hviLabel for="disabled-telefon">Telefon</label>
      </ds-field>
      <ds-field>
        <input
          hviInput
          type="checkbox"
          id="disabled-sms"
          value="sms"
          name="kontakt-disabled"
          disabled
        />
        <label hviLabel for="disabled-sms">SMS</label>
      </ds-field>
    </fieldset>
  `,
})
export class CheckboxDisabledExampleComponent {}
