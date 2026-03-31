// Auto-generated - do not edit manually
export const ErrorSummaryManuellModusExampleSource = `import { Component } from '@angular/core';
import { HviErrorSummary } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-error-summary-manuell-modus-example',
  standalone: true,
  imports: [HviErrorSummary],
  template: \`
    <hvi-error-summary
      showWhen="always"
      [errors]="[
        { message: 'Fødselsdato kan ikke være etter år 2005', href: '#fodselsdato' },
        { message: 'Telefonnummer kan kun inneholde siffer', href: '#telefon-manuell' },
        { message: 'E-post må være gyldig', href: '#epost-manuell' },
      ]"
    />
  \`,
})
export class ErrorSummaryManuellModusExampleComponent {
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
