import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { HviField, HviFieldDescription, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-checkbox-enkel-checkbox-example',
  standalone: true,
  imports: [HviField, HviFieldDescription, HviInput, HviLabel],
  template: `
    <hvi-field>
      <input hviInput type="checkbox" id="simple-checkbox" />
      <label hviLabel for="simple-checkbox">Checkbox label</label>
      <div hviFieldDescription>Description</div>
    </hvi-field>
  `,
})
export class CheckboxEnkelCheckboxExampleComponent {
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
