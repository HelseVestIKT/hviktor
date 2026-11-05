// Auto-generated - do not edit manually
export const FormsAlleFeltErObligatoriskeExampleSource = `import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  HviButton,
  HviFieldKit,
  HviForms,
  HviHeading,
  HviRequiredTag,
  HviTextfield,
  HviValidationKit,
} from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-forms-alle-felt-er-obligatoriske-example',
  standalone: true,
  imports: [
    HviButton,
    HviFieldKit,
    HviForms,
    HviHeading,
    HviRequiredTag,
    HviTextfield,
    HviValidationKit,
  ],
  template: \`
    <form
      hviForm
      #allReqForm="hviForm"
      [formGroup]="loginForm"
      class="max-w-sm"
      aria-describedby="login-required-info"
    >
      <h2 hviHeading size="xs" id="login-heading">Logg inn</h2>
      @if (allReqForm.requiredMode() === 'all-required') {
        <hvi-required-tag id="login-required-info" mode="all-required" />
      }
      <hvi-textfield label="Brukernavn" formControlName="username" required />
      <hvi-textfield label="Passord" formControlName="password" type="password" required />
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
}
`;
