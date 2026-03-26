// Auto-generated - do not edit manually
export const RadioGrupperingExampleSource = `import { Component } from '@angular/core';
import { HviField, HviFieldDescription, HviFieldset, HviInput, HviLabel, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-radio-gruppering-example',
  standalone: true,
  imports: [HviField, HviFieldDescription, HviFieldset, HviInput, HviLabel, HviParagraph],
  template: \`
    <fieldset hviFieldset>
      <legend hviLabel weight="medium">Hvordan ønsker du at vi kontakter deg?</legend>
      <p hviParagraph>
        Velg metoden som passer best for deg. Vi bruker dette kun til å sende viktig informasjon
        om saken din.
      </p>
      <ds-field>
        <input hviInput type="radio" id="kontakt-epost" name="kontakt" value="epost" />
        <label hviLabel for="kontakt-epost">E-post</label>
        <span hviFieldDescription
          >Vi bruker e-postadressen du har oppgitt tidligere (navn&#64;epost.no)</span
        >
      </ds-field>
      <ds-field>
        <input hviInput type="radio" id="kontakt-sms" name="kontakt" value="sms" />
        <label hviLabel for="kontakt-sms">SMS</label>
        <span hviFieldDescription
          >Vi bruker telefonnummeret du har oppgitt tidligere (99 99 99 99)</span
        >
      </ds-field>
      <ds-field>
        <input hviInput type="radio" id="kontakt-brev" name="kontakt" value="brev" />
        <label hviLabel for="kontakt-brev">Brev</label>
        <span hviFieldDescription
          >Levering kan ta 3-5 virkedager, avhengig av posttjenesten.</span
        >
      </ds-field>
    </fieldset>
  \`,
})
export class RadioGrupperingExampleComponent {
}
`;
