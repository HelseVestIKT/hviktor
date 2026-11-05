// Auto-generated - do not edit manually
export const ErrorSummaryManuellModusExampleSource = `import { Component } from '@angular/core';
import { HviErrorSummary, HviForms } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-error-summary-manuell-modus-example',
  standalone: true,
  imports: [HviErrorSummary, HviForms],
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
export class ErrorSummaryManuellModusExampleComponent {}
`;
