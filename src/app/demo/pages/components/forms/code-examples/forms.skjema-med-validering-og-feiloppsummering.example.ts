import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  HviButton,
  HviFieldKit,
  HviForm,
  HviForms,
  HviHeading,
  HviLabel,
  HviRequiredTag,
  HviSelect,
  HviValidationKit,
  HviValidationMessages,
} from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-forms-skjema-med-validering-og-feiloppsummering-example',
  standalone: true,
  imports: [
    HviButton,
    HviFieldKit,
    HviForms,
    HviHeading,
    HviLabel,
    HviRequiredTag,
    HviSelect,
    HviValidationKit,
  ],
  template: `
    <form
      hviForm
      #myForm="hviForm"
      [formGroup]="contactForm"
      [focusOnInvalid]="summary"
      (hviSubmitted)="onContactFormSubmit()"
      [attr.aria-describedby]="
        myForm.requiredMode() === 'all-required' ? 'contact-required-info' : null
      "
    >
      <h2 hviHeading size="xs" id="contact-heading">Kontakt oss</h2>
      @if (myForm.requiredMode() === 'all-required') {
        <hvi-required-tag id="contact-required-info" mode="all-required" />
      }

      <fieldset hviFieldset class="max-w-xs">
        <legend hviLabel>Om deg</legend>

        <hvi-field>
          <label hviLabel for="firstName"> Fornavn <hvi-required-tag mode="required" /> </label>
          <input hviInput id="firstName" formControlName="firstName" hviControlInvalid required />
          <p
            hviFieldValidation
            hviValidationMessage="firstName"
            [messages]="messages['firstName']"
          ></p>
        </hvi-field>

        <hvi-field>
          <label hviLabel for="lastName"> Etternavn <hvi-required-tag mode="required" /> </label>
          <input hviInput id="lastName" formControlName="lastName" hviControlInvalid required />
          <p
            hviFieldValidation
            hviValidationMessage="lastName"
            [messages]="messages['lastName']"
          ></p>
        </hvi-field>
      </fieldset>

      <fieldset hviFieldset>
        <legend hviLabel>Kontaktinformasjon</legend>

        <hvi-field class="max-w-sm">
          <label hviLabel for="email"> E-post <hvi-required-tag mode="required" /> </label>
          <input
            hviInput
            id="email"
            type="email"
            formControlName="email"
            hviControlInvalid
            required
          />
          <p hviFieldValidation hviValidationMessage="email" [messages]="messages['email']"></p>
        </hvi-field>

        <hvi-field class="max-w-3xs">
          <label hviLabel for="phone"> Telefon <hvi-required-tag mode="optional" /> </label>
          <span hviFieldDescription>Format: +47 000 00 000</span>
          <input
            hviInput
            id="phone"
            type="tel"
            formControlName="phone"
            hviControlInvalid
            class="max-w-xs"
          />
          <p hviFieldValidation hviValidationMessage="phone" [messages]="messages['phone']"></p>
        </hvi-field>
      </fieldset>

      <fieldset hviFieldset>
        <legend hviLabel>Din henvendelse</legend>

        <hvi-field class="max-w-xs">
          <label hviLabel for="subject"> Emne <hvi-required-tag mode="required" /> </label>
          <select hviSelect id="subject" formControlName="subject" hviControlInvalid required>
            <option value="" disabled>Velg emne</option>
            <option value="general">Generell henvendelse</option>
            <option value="support">Teknisk support</option>
            <option value="feedback">Tilbakemelding</option>
            <option value="other">Annet</option>
          </select>
          <p hviFieldValidation hviValidationMessage="subject" [messages]="messages['subject']"></p>
        </hvi-field>

        <hvi-field class="max-w-lg">
          <label hviLabel for="message"> Melding <hvi-required-tag mode="required" /> </label>
          <span hviFieldDescription>Beskriv det du lurer på</span>
          <textarea
            hviInput
            id="message"
            formControlName="message"
            hviControlInvalid
            required
            rows="5"
            maxlength="500"
          ></textarea>
          <hvi-field-counter [limit]="500" />
          <p hviFieldValidation hviValidationMessage="message" [messages]="messages['message']"></p>
        </hvi-field>
      </fieldset>

      <div class="mt-6 flex flex-wrap gap-2">
        <button hviButton type="submit" variant="primary">Send inn</button>
        <button hviButton type="button" variant="secondary" (click)="resetContactForm()">
          Nullstill
        </button>
      </div>

      <hvi-error-summary #summary [form]="contactForm" [messages]="messages" showWhen="submitted" />
    </form>
  `,
})
export class FormsSkjemaMedValideringOgFeiloppsummeringExampleComponent {
  @ViewChild('myForm') myForm?: HviForm;

  contactForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.pattern(/^(\+47)?\s?\d{3}\s?\d{2}\s?\d{3}$/)]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500),
    ]),
  });

  messages: Record<string, HviValidationMessages> = {
    firstName: {
      required: 'Fyll inn fornavn',
      minlength: 'Fornavn må være minst 2 tegn',
    },
    lastName: {
      required: 'Fyll inn etternavn',
      minlength: 'Etternavn må være minst 2 tegn',
    },
    email: {
      required: 'Fyll inn e-postadresse',
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
      this.myForm?.reset();
    }
  }

  resetContactForm(): void {
    this.contactForm.reset();
    this.myForm?.reset();
  }
}
