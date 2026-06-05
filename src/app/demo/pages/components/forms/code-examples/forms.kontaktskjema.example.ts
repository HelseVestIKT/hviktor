import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  HviButton,
  HviFieldKit,
  HviForms,
  HviHeading,
  HviRequiredTag,
  HviSelect,
  HviValidationKit,
  HviValidationMessages,
} from '@helsevestikt/hviktor';

@Component({
  selector: 'app-forms-kontaktskjema-example',
  standalone: true,
  imports: [
    HviButton,
    HviFieldKit,
    HviForms,
    HviHeading,
    HviRequiredTag,
    HviSelect,
    HviValidationKit,
    ReactiveFormsModule,
  ],
  template: `
    <form
      hviForm
      #myForm="hviForm"
      [formGroup]="contactForm"
      [focusOnInvalid]="summary"
      (hviSubmitted)="onSubmit()"
      class="max-w-2xl"
      aria-describedby="contact-required-info"
    >
      <h2 hviHeading size="xs">Kontakt oss</h2>
      @if (myForm.requiredMode() === 'all-required') {
        <hvi-required-tag id="contact-required-info" mode="all-required" />
      }

      <fieldset hviFieldset>
        <legend hviLabel weight="medium">Om deg</legend>

        <hvi-field>
          <label hviLabel for="firstName" weight="medium">
            Fornavn <hvi-required-tag mode="required" />
          </label>
          <input hviInput id="firstName" formControlName="firstName" hviControlInvalid />
          <p
            hviFieldValidation
            hviValidationMessage="firstName"
            [messages]="messages['firstName']"
          ></p>
        </hvi-field>

        <hvi-field>
          <label hviLabel for="lastName" weight="medium">
            Etternavn <hvi-required-tag mode="required" />
          </label>
          <input hviInput id="lastName" formControlName="lastName" hviControlInvalid />
          <p
            hviFieldValidation
            hviValidationMessage="lastName"
            [messages]="messages['lastName']"
          ></p>
        </hvi-field>
      </fieldset>

      <fieldset hviFieldset>
        <legend hviLabel weight="medium">Kontaktinformasjon</legend>

        <hvi-field>
          <label hviLabel for="email" weight="medium">
            E-post <hvi-required-tag mode="required" />
          </label>
          <input hviInput id="email" type="email" formControlName="email" hviControlInvalid />
          <p hviFieldValidation hviValidationMessage="email" [messages]="messages['email']"></p>
        </hvi-field>

        <hvi-field>
          <label hviLabel for="phone" weight="medium">
            Telefon <hvi-required-tag mode="optional" />
          </label>
          <input
            hviInput
            id="phone"
            type="tel"
            formControlName="phone"
            hviControlInvalid
            placeholder="+47 000 00 000"
          />
          <p hviFieldValidation hviValidationMessage="phone" [messages]="messages['phone']"></p>
        </hvi-field>
      </fieldset>

      <fieldset hviFieldset>
        <legend hviLabel weight="medium">Din henvendelse</legend>

        <hvi-field>
          <label hviLabel for="subject" weight="medium">
            Emne <hvi-required-tag mode="required" />
          </label>
          <select hviSelect id="subject" formControlName="subject" hviControlInvalid>
            <option value="" disabled>Velg emne</option>
            <option value="general">Generell henvendelse</option>
            <option value="support">Teknisk support</option>
            <option value="feedback">Tilbakemelding</option>
            <option value="other">Annet</option>
          </select>
          <p hviFieldValidation hviValidationMessage="subject" [messages]="messages['subject']"></p>
        </hvi-field>

        <hvi-field>
          <label hviLabel for="message" weight="medium">
            Melding <hvi-required-tag mode="required" />
          </label>
          <span hviFieldDescription>Beskriv det du lurer på</span>
          <textarea
            hviInput
            id="message"
            formControlName="message"
            hviControlInvalid
            rows="5"
            maxlength="500"
          ></textarea>
          <hvi-field-counter [limit]="500" />
          <p hviFieldValidation hviValidationMessage="message" [messages]="messages['message']"></p>
        </hvi-field>
      </fieldset>

      <div class="my-4 flex flex-wrap gap-2">
        <button hviButton type="submit" variant="primary">Send inn</button>
        <button hviButton type="button" variant="secondary" (click)="contactForm.reset()">
          Nullstill
        </button>
      </div>

      <hvi-error-summary #summary [form]="contactForm" [messages]="messages" showWhen="submitted" />
    </form>
  `,
})
export class FormsKontaktskjemaExampleComponent {
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

  onSubmit(): void {
    if (this.contactForm.valid) {
      alert('Takk for din henvendelse!');
      this.contactForm.reset();
    }
  }
}
