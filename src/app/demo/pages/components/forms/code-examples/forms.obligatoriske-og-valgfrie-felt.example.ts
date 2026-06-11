import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HviButton, HviForms, HviHeading, HviTextfield } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-forms-obligatoriske-og-valgfrie-felt-example',
  standalone: true,
  imports: [HviButton, HviForms, HviHeading, HviTextfield, ReactiveFormsModule],
  template: `
    <form hviForm #mixedForm="hviForm" [formGroup]="appointmentForm" class="max-w-md">
      <h2 hviHeading size="xs">Bestill time</h2>
      <hvi-textfield label="Navn" formControlName="name" required />
      <hvi-textfield label="E-postadresse" formControlName="email" type="email" required />
      <hvi-textfield label="Ønsket tidspunkt" formControlName="preferredTime" required />
      <hvi-textfield label="Kommentar" formControlName="comment" [multiline]="true" [rows]="3" />
      <div class="mt-4">
        <button hviButton type="submit" variant="primary">Bestill time</button>
      </div>
    </form>
  `,
})
export class FormsObligatoriskeOgValgfrieFeltExampleComponent {
  /** Bestill time – blanding av obligatoriske og valgfrie felt */
  appointmentForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    preferredTime: new FormControl('', [Validators.required]),
    comment: new FormControl(''),
  });
}
