// Auto-generated - do not edit manually
export const CheckboxMedFeilExampleSource = `import { Component } from '@angular/core';
import { ReactiveFormsModule, AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { HviControlInvalid, HviField, HviFieldValidation, HviFieldset, HviInput, HviLabel, HviParagraph } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-checkbox-med-feil-example',
  standalone: true,
  imports: [HviControlInvalid, HviField, HviFieldValidation, HviFieldset, HviInput, HviLabel, HviParagraph, ReactiveFormsModule],
  template: \`
    <fieldset hviFieldset [formGroup]="contactForm">
      <legend hviLabel weight="medium">Hvordan vil du helst at vi skal kontakte deg?</legend>
      <p hviParagraph>Velg alle alternativene som er relevante for deg.</p>
      <hvi-field>
        <input
          hviInput
          hviControlInvalid
          type="checkbox"
          id="error-epost"
          formControlName="epost"
        />
        <label hviLabel for="error-epost">E-post</label>
      </hvi-field>
      <hvi-field>
        <input
          hviInput
          hviControlInvalid
          type="checkbox"
          id="error-telefon"
          formControlName="telefon"
        />
        <label hviLabel for="error-telefon">Telefon</label>
      </hvi-field>
      <hvi-field>
        <input
          hviInput
          hviControlInvalid
          type="checkbox"
          id="error-sms"
          formControlName="sms"
        />
        <label hviLabel for="error-sms">SMS</label>
      </hvi-field>
      @if (contactForm.invalid) {
        <p hviFieldValidation>Du må velge minst to alternativ</p>
      }
    </fieldset>
  \`,
})
export class CheckboxMedFeilExampleComponent {
  minCheckedValidator(min: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const group = control as FormGroup;
      const checked = Object.values(group.controls).filter((c) => c.value === true).length;
      return checked >= min ? null : { minChecked: { required: min, actual: checked } };
    };
  }
  
  contactForm = new FormGroup(
    {
      epost: new FormControl(true),
      telefon: new FormControl(false),
      sms: new FormControl(false),
    },
    { validators: this.minCheckedValidator(2) },
  );
}
`;
