// Auto-generated - do not edit manually
export const CheckboxSkrivebeskyttetReadonlyExampleSource = `import { Component } from '@angular/core';
import { HviField, HviFieldset, HviInput, HviLabel, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-checkbox-skrivebeskyttet-readonly-example',
  standalone: true,
  imports: [HviField, HviFieldset, HviInput, HviLabel, HviParagraph],
  template: \`
    <fieldset hviFieldset>
      <legend hviLabel weight="medium">Hvordan vil du helst at vi skal kontakte deg?</legend>
      <p hviParagraph>Velg alle alternativene som er relevante for deg.</p>
      <ds-field>
        <input
          hviInput
          type="checkbox"
          id="readonly-epost"
          value="epost"
          name="kontakt-readonly"
          checked
          readonly
        />
        <label hviLabel for="readonly-epost">E-post</label>
      </ds-field>
      <ds-field>
        <input
          hviInput
          type="checkbox"
          id="readonly-telefon"
          value="telefon"
          name="kontakt-readonly"
          readonly
        />
        <label hviLabel for="readonly-telefon">Telefon</label>
      </ds-field>
      <ds-field>
        <input
          hviInput
          type="checkbox"
          id="readonly-sms"
          value="sms"
          name="kontakt-readonly"
          readonly
        />
        <label hviLabel for="readonly-sms">SMS</label>
      </ds-field>
    </fieldset>
  \`,
})
export class CheckboxSkrivebeskyttetReadonlyExampleComponent {
}
`;
