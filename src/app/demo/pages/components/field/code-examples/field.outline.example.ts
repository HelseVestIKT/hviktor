import { Component } from '@angular/core';
import {
  HviField,
  HviFieldDescription,
  HviFieldset,
  HviInput,
  HviLabel,
  HviParagraph,
} from '@helsevestikt/hviktor';

@Component({
  selector: 'app-field-outline-example',
  standalone: true,
  imports: [HviField, HviFieldDescription, HviFieldset, HviInput, HviLabel, HviParagraph],
  template: `
    <fieldset hviFieldset>
      <legend hviLabel weight="medium">Hvordan ønsker du å bli kontaktet?</legend>
      <p hviParagraph>Velg metoden som passer best for deg.</p>
      <hvi-field outline>
        <input hviInput type="radio" id="outline-epost" name="field-outline" value="epost" />
        <label hviLabel for="outline-epost">E-post</label>
        <span hviFieldDescription>Vi bruker e-postadressen du har oppgitt</span>
      </hvi-field>
      <hvi-field outline>
        <input hviInput type="radio" id="outline-sms" name="field-outline" value="sms" />
        <label hviLabel for="outline-sms">SMS</label>
        <span hviFieldDescription>Vi bruker telefonnummeret du har oppgitt</span>
      </hvi-field>
      <hvi-field outline>
        <input hviInput type="radio" id="outline-brev" name="field-outline" value="brev" />
        <label hviLabel for="outline-brev">Brev</label>
        <span hviFieldDescription>Levering kan ta 3–5 virkedager</span>
      </hvi-field>
    </fieldset>
  `,
})
export class FieldOutlineExampleComponent {
  hasEtternavnError = true;
}
