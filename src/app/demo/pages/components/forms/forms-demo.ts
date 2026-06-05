import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  HviButton,
  HviFieldKit,
  HviForms,
  HviHeading,
  HviLabel,
  HviRequiredTag,
  HviSelect,
  HviTextfield,
  HviValidationKit,
  HviValidationMessages,
} from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { FormsAlleFeltErObligatoriskeExampleSource } from './code-examples/forms.alle-felt-er-obligatoriske.example.source';
import { FormsObligatoriskeOgValgfrieFeltExampleSource } from './code-examples/forms.obligatoriske-og-valgfrie-felt.example.source';
import { FormsSkjemaMedValideringOgFeiloppsummeringExampleSource } from './code-examples/forms.skjema-med-validering-og-feiloppsummering.example.source';
@Component({
  selector: 'app-forms-demo',
  standalone: true,
  imports: [
    HviForms,
    HviFieldKit,
    HviValidationKit,
    HviButton,
    HviHeading,
    HviSelect,
    HviRequiredTag,
    HviTextfield,
    HviLabel,
    DemoPageComponent,
    DemoSectionComponent,
  ],
  template: `
    <app-demo-page componentId="form">
      <app-demo-section
        title="Alle felt er obligatoriske"
        [code]="alleFeltErObligatoriskeCode"
        description="Når alle felt i skjemaet må fylles ut, vises en felles melding øverst. Denne kobles til skjemaet med aria-describedby, slik at skjermlesere leser opp meldingen når brukeren navigerer inn i skjemaet."
      >
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
          <hvi-textfield label="Passord" formControlName="password" type="password" required />
          <div class="mt-4">
            <button hviButton type="submit" variant="primary">Logg inn</button>
          </div>
        </form>
      </app-demo-section>

      <app-demo-section
        title="Obligatoriske og valgfrie felt"
        [code]="obligatoriskeOgValgfrieFeltCode"
        description="Når skjemaet har en blanding av obligatoriske og valgfrie felt, merkes hvert felt med om det må fylles ut eller er valgfritt. Brukeren ser tydelig hvilke felt som kreves."
      >
        <form hviForm #mixedForm="hviForm" [formGroup]="appointmentForm" class="max-w-md">
          <h2 hviHeading size="xs">Bestill time</h2>
          <hvi-textfield label="Navn" formControlName="name" required />
          <hvi-textfield label="E-postadresse" formControlName="email" type="email" required />
          <hvi-textfield label="Ønsket tidspunkt" formControlName="preferredTime" required />
          <hvi-textfield
            label="Kommentar"
            formControlName="comment"
            [multiline]="true"
            [rows]="3"
          />
          <div class="mt-4">
            <button hviButton type="submit" variant="primary">Bestill time</button>
          </div>
        </form>
      </app-demo-section>

      <app-demo-section
        title="Skjema med validering og feiloppsummering"
        [code]="skjemaMedValideringOgFeiloppsummeringCode"
        description="Et større skjema som viser feilmeldinger ved innsending. Feiloppsummeringen samler alle feil ett sted, slik at brukeren enkelt kan rette opp."
      >
        <form
          hviForm
          #myForm="hviForm"
          [formGroup]="contactForm"
          [focusOnInvalid]="summary"
          (hviSubmitted)="onContactFormSubmit()"
          class="max-w-2xl"
          [attr.aria-describedby]="
            myForm.requiredMode() === 'all-required' ? 'contact-required-info' : null
          "
        >
          <h2 hviHeading size="xs">Kontakt oss</h2>
          @if (myForm.requiredMode() === 'all-required') {
            <hvi-required-tag id="contact-required-info" mode="all-required" />
          }

          <fieldset hviFieldset>
            <legend hviLabel>Om deg</legend>

            <hvi-field>
              <label hviLabel for="firstName"> Fornavn <hvi-required-tag mode="required" /> </label>
              <input hviInput id="firstName" formControlName="firstName" hviControlInvalid />
              <p
                hviFieldValidation
                hviValidationMessage="firstName"
                [messages]="messages['firstName']"
              ></p>
            </hvi-field>

            <hvi-field>
              <label hviLabel for="lastName">
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
            <legend hviLabel>Kontaktinformasjon</legend>

            <hvi-field>
              <label hviLabel for="email"> E-post <hvi-required-tag mode="required" /> </label>
              <input hviInput id="email" type="email" formControlName="email" hviControlInvalid />
              <p hviFieldValidation hviValidationMessage="email" [messages]="messages['email']"></p>
            </hvi-field>

            <hvi-field>
              <label hviLabel for="phone"> Telefon <hvi-required-tag mode="optional" /> </label>
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
            <legend hviLabel>Din henvendelse</legend>

            <hvi-field>
              <label hviLabel for="subject"> Emne <hvi-required-tag mode="required" /> </label>
              <select hviSelect id="subject" formControlName="subject" hviControlInvalid>
                <option value="" disabled>Velg emne</option>
                <option value="general">Generell henvendelse</option>
                <option value="support">Teknisk support</option>
                <option value="feedback">Tilbakemelding</option>
                <option value="other">Annet</option>
              </select>
              <p
                hviFieldValidation
                hviValidationMessage="subject"
                [messages]="messages['subject']"
              ></p>
            </hvi-field>

            <hvi-field>
              <label hviLabel for="message"> Melding <hvi-required-tag mode="required" /> </label>
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
              <p
                hviFieldValidation
                hviValidationMessage="message"
                [messages]="messages['message']"
              ></p>
            </hvi-field>
          </fieldset>

          <div class="flex flex-wrap gap-2">
            <button hviButton type="submit" variant="primary">Send inn</button>
            <button hviButton type="button" variant="secondary" (click)="contactForm.reset()">
              Nullstill
            </button>
          </div>

          <hvi-error-summary
            #summary
            [form]="contactForm"
            [messages]="messages"
            showWhen="submitted"
          />
        </form>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class FormsDemoComponent {
  readonly alleFeltErObligatoriskeCode = FormsAlleFeltErObligatoriskeExampleSource;
  readonly obligatoriskeOgValgfrieFeltCode = FormsObligatoriskeOgValgfrieFeltExampleSource;
  readonly skjemaMedValideringOgFeiloppsummeringCode =
    FormsSkjemaMedValideringOgFeiloppsummeringExampleSource;

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

  onContactFormSubmit(): void {
    if (this.contactForm.valid) {
      alert('Takk for din henvendelse!');
      this.contactForm.reset();
    }
  }
}
