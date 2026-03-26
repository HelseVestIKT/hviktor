import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  HviControlInvalid,
  HviField,
  HviFieldset,
  HviFieldValidation,
  HviInput,
  HviLabel,
  HviParagraph,
} from '@helsevestikt/hviktor';

@Component({
  selector: 'app-radio-med-feil-example',
  standalone: true,
  imports: [
    HviControlInvalid,
    HviField,
    HviFieldset,
    HviFieldValidation,
    HviInput,
    HviLabel,
    HviParagraph,
    ReactiveFormsModule,
  ],
  template: `
    <fieldset hviFieldset>
      <legend hviLabel weight="medium">Hvilken bydel bor du i?</legend>
      <p hviParagraph>Trondheim er delt inn i fire bydeler</p>
      <ds-field>
        <input
          hviInput
          hviControlInvalid
          type="radio"
          id="bydel-ostbyen"
          value="ostbyen"
          [formControl]="bydelControl"
        />
        <label hviLabel for="bydel-ostbyen">Østbyen</label>
      </ds-field>
      <ds-field>
        <input
          hviInput
          hviControlInvalid
          type="radio"
          id="bydel-lerkendal"
          value="lerkendal"
          [formControl]="bydelControl"
        />
        <label hviLabel for="bydel-lerkendal">Lerkendal</label>
      </ds-field>
      <ds-field>
        <input
          hviInput
          hviControlInvalid
          type="radio"
          id="bydel-heimdal"
          value="heimdal"
          [formControl]="bydelControl"
        />
        <label hviLabel for="bydel-heimdal">Heimdal</label>
      </ds-field>
      <ds-field>
        <input
          hviInput
          hviControlInvalid
          type="radio"
          id="bydel-midtbyen"
          value="midtbyen"
          [formControl]="bydelControl"
        />
        <label hviLabel for="bydel-midtbyen">Midtbyen</label>
      </ds-field>
      @if (bydelControl.invalid) {
        <span hviFieldValidation>Du må velge en bydel før du kan fortsette.</span>
      }
    </fieldset>
  `,
})
export class RadioMedFeilExampleComponent {
  bydelControl = new FormControl('', Validators.required);
}
