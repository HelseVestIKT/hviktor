import { Component } from '@angular/core';
import {
  HviField,
  HviFieldDescription,
  HviFieldset,
  HviInput,
  HviLabel,
  HviParagraph,
} from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-checkbox-outline-example',
  standalone: true,
  imports: [HviField, HviFieldDescription, HviFieldset, HviInput, HviLabel, HviParagraph],
  template: `
    <fieldset hviFieldset>
      <legend hviLabel weight="medium">Hvordan vil du helst at vi skal kontakte deg?</legend>
      <p hviParagraph>Velg alle alternativene som er relevante for deg.</p>
      <hvi-field outline>
        <input hviInput type="checkbox" id="outline-epost" value="epost" name="kontakt-outline" />
        <label hviLabel for="outline-epost">E-post</label>
        <span hviFieldDescription>Vi bruker e-postadressen du har oppgitt</span>
      </hvi-field>
      <hvi-field outline>
        <input
          hviInput
          type="checkbox"
          id="outline-telefon"
          value="telefon"
          name="kontakt-outline"
        />
        <label hviLabel for="outline-telefon">Telefon</label>
        <span hviFieldDescription>Vi ringer deg i åpningstiden</span>
      </hvi-field>
      <hvi-field outline>
        <input hviInput type="checkbox" id="outline-sms" value="sms" name="kontakt-outline" />
        <label hviLabel for="outline-sms">SMS</label>
        <span hviFieldDescription>Vi bruker telefonnummeret du har oppgitt</span>
      </hvi-field>
    </fieldset>
  `,
})
export class CheckboxOutlineExampleComponent {}
