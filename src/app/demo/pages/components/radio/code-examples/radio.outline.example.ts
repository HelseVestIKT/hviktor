import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  HviField,
  HviFieldDescription,
  HviFieldset,
  HviInput,
  HviLabel,
  HviParagraph,
} from '@helsevestikt/hviktor';

@Component({
  selector: 'app-radio-outline-example',
  standalone: true,
  imports: [HviField, HviFieldDescription, HviFieldset, HviInput, HviLabel, HviParagraph],
  template: `
    <fieldset hviFieldset>
      <legend hviLabel weight="medium">Hvordan ønsker du at vi kontakter deg?</legend>
      <p hviParagraph>
        Velg metoden som passer best for deg. Vi bruker dette kun til å sende viktig informasjon om
        saken din.
      </p>
      <hvi-field outline>
        <input hviInput type="radio" id="outline-epost" name="outline-kontakt" value="epost" />
        <label hviLabel for="outline-epost">E-post</label>
        <span hviFieldDescription
          >Vi bruker e-postadressen du har oppgitt tidligere (navn&#64;epost.no)</span
        >
      </hvi-field>
      <hvi-field outline>
        <input hviInput type="radio" id="outline-sms" name="outline-kontakt" value="sms" />
        <label hviLabel for="outline-sms">SMS</label>
        <span hviFieldDescription
          >Vi bruker telefonnummeret du har oppgitt tidligere (99 99 99 99)</span
        >
      </hvi-field>
      <hvi-field outline>
        <input hviInput type="radio" id="outline-brev" name="outline-kontakt" value="brev" />
        <label hviLabel for="outline-brev">Brev</label>
        <span hviFieldDescription>Levering kan ta 3–5 virkedager, avhengig av posttjenesten.</span>
      </hvi-field>
    </fieldset>
  `,
})
export class RadioOutlineExampleComponent {
  bydelControl = new FormControl('', Validators.required);
}
