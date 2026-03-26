// Auto-generated - do not edit manually
export const ErrorSummaryBrukISkjemaExampleSource = `import { Component, signal } from '@angular/core';
import { HviButton, HviControlInvalid, HviErrorSummary, HviField, HviFieldValidation, HviInput, HviLabel, HviValidationMessage } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-error-summary-bruk-i-skjema-example',
  standalone: true,
  imports: [HviButton, HviControlInvalid, HviErrorSummary, HviField, HviFieldValidation, HviInput, HviLabel, HviValidationMessage],
  template: \`
    <form hviForm [formGroup]="form" [focusOnInvalid]="summary" class="grid gap-4">
      <ds-field>
        <label hviLabel for="fornavn" weight="medium">Fornavn</label>
        <input
          hviInput
          id="fornavn"
          formControlName="fornavn"
          hviControlInvalid
          aria-describedby="fornavn-validation"
        />
        <p
          hviFieldValidation
          id="fornavn-validation"
          hviValidationMessage="fornavn"
          [messages]="messages['fornavn']"
        ></p>
      </ds-field>
    
      <ds-field>
        <label hviLabel for="telefon" weight="medium">Telefon</label>
        <input
          hviInput
          id="telefon"
          type="tel"
          formControlName="telefon"
          hviControlInvalid
          aria-describedby="telefon-validation"
        />
        <p
          hviFieldValidation
          id="telefon-validation"
          hviValidationMessage="telefon"
          [messages]="messages['telefon']"
        ></p>
      </ds-field>
    
      <hvi-error-summary #summary [form]="form" [messages]="messages" showWhen="always" />
    
      <div class="flex gap-2">
        <button hviButton type="submit" variant="primary">Send inn</button>
        <button hviButton type="button" variant="secondary" (click)="form.reset()">
          Nullstill
        </button>
      </div>
    </form>
  \`,
})
export class ErrorSummaryBrukISkjemaExampleComponent {
  form = new FormGroup({
    fornavn: new FormControl('', [Validators.required, Validators.minLength(2)]),
    telefon: new FormControl('', [Validators.required, Validators.pattern(/^\\d+$/)]),
  });
  
  messages: Record<string, HviValidationMessages> = {
    fornavn: {
      required: 'Fornavn er påkrevd',
      minlength: 'Fornavn må være minst 2 tegn',
    },
    telefon: {
      required: 'Telefon er påkrevd',
      pattern: 'Telefonnummer kan kun inneholde siffer',
    },
  };
}
`;
