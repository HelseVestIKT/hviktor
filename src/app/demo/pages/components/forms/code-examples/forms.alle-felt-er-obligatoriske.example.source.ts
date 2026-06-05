// Auto-generated - do not edit manually
export const FormsAlleFeltErObligatoriskeExampleSource = `import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { HviButton, HviFieldKit, HviForms, HviHeading, HviRequiredTag, HviTextfield, HviValidationKit, HviValidationMessages } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-forms-alle-felt-er-obligatoriske-example',
  standalone: true,
  imports: [HviButton, HviFieldKit, HviForms, HviHeading, HviRequiredTag, HviTextfield, HviValidationKit, ReactiveFormsModule],
  template: \`
    <form
      hviForm
      #allReqForm="hviForm"
      [formGroup]="loginForm"
      class="max-w-sm"
      aria-describedby="login-required-info"
    >
      <h2 hviHeading size="xs">Logg inn</h2>
      @if (allReqForm.requiredMode() === 'all-required') {
        <hvi-required-tag id="login-required-info" mode="all-required" />
      }
      <hvi-textfield label="Brukernavn" formControlName="username" required />
      <hvi-textfield
        label="Passord"
        formControlName="password"
        type="password"
        required
      />
      <div class="mt-4">
        <button hviButton type="submit" variant="primary">Logg inn</button>
      </div>
    </form>
  \`,
})
export class FormsAlleFeltErObligatoriskeExampleComponent {
  /** Innloggingsskjema – alle felt er obligatoriske */
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  
  /** Bestill time – blanding av obligatoriske og valgfrie felt */
  appointmentForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    preferredTime: new FormControl('', [Validators.required]),
    comment: new FormControl(''),
  });
  
  contactForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.pattern(/^(\\+47)?\\s?\\d{3}\\s?\\d{2}\\s?\\d{3}$/)]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500),
    ]),
  });
  
  messages: Record<string, HviValidationMessages> = {
    firstName: {
      required: 'Fornavn er påkrevd',
      minlength: 'Fornavn må være minst 2 tegn',
    },
    lastName: {
      required: 'Etternavn er påkrevd',
      minlength: 'Etternavn må være minst 2 tegn',
    },
    email: {
      required: 'E-post er påkrevd',
      email: 'Oppgi en gyldig e-postadresse',
    },
    phone: {
      pattern: 'Oppgi et gyldig norsk telefonnummer',
    },
    subject: {
      required: 'Velg et emne',
    },
    message: {
      required: 'Skriv en melding',
      minlength: 'Meldingen må være minst 10 tegn',
      maxlength: 'Meldingen kan ikke være mer enn 500 tegn',
    },
  };
  
  onContactFormSubmit(): void {
    if (this.contactForm.valid) {
      alert('Takk for din henvendelse!');
      this.contactForm.reset();
    }
  }
}
`;
