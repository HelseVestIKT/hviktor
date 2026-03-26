import { Component } from '@angular/core';
import { HviField, HviFieldset, HviInput, HviLabel, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-radio-horisontal-plassering-example',
  standalone: true,
  imports: [HviField, HviFieldset, HviInput, HviLabel, HviParagraph],
  template: `
    <fieldset hviFieldset>
      <legend hviLabel weight="medium">Kontaktes på e-post?</legend>
      <p hviParagraph>Bekreft om du ønsker å bli kontaktet per e-post.</p>
      <div class="flex gap-4">
        <ds-field>
          <input hviInput type="radio" id="epost-ja" name="epost-kontakt" value="ja" />
          <label hviLabel for="epost-ja">Ja</label>
        </ds-field>
        <ds-field>
          <input hviInput type="radio" id="epost-nei" name="epost-kontakt" value="nei" />
          <label hviLabel for="epost-nei">Nei</label>
        </ds-field>
      </div>
    </fieldset>
  `,
})
export class RadioHorisontalPlasseringExampleComponent {}
