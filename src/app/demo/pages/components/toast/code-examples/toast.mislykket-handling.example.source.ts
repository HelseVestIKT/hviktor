// Auto-generated - do not edit manually
export const ToastMislykketHandlingExampleSource = `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HviAlert, HviButton, HviParagraph, HviTextfield } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-toast-mislykket-handling-example',
  standalone: true,
  imports: [FormsModule, HviAlert, HviButton, HviParagraph, HviTextfield],
  template: \`
    <div class="flex max-w-md flex-col gap-4">
      <hvi-textfield label="Telefonnummer" type="tel" name="telefon" [(ngModel)]="telefon" />
      <div>
        <button
          hviButton
          type="button"
          [loading]="lagrer()"
          [attr.aria-disabled]="lagrer() ? 'true' : null"
          (click)="lagreTelefon()"
        >
          Lagre
        </button>
      </div>
      @if (lagringFeilet()) {
        <hvi-alert color="danger" title="Vi klarte ikke å lagre telefonnummeret">
          <p hviParagraph>
            Det skyldes et midlertidig problem hos oss. Nummeret du skrev inn, er ikke borte. Prøv å
            lagre igjen om litt.
          </p>
        </hvi-alert>
      }
    </div>
  \`,
})
export class ToastMislykketHandlingExampleComponent {
  telefon = '';
  readonly lagrer = signal(false);
  readonly lagringFeilet = signal(false);

  /** Simulerer et kall som feiler. I en ekte app ville dette vært en \`HttpClient\`-forespørsel. */
  lagreTelefon(): void {
    if (this.lagrer()) return;

    this.lagringFeilet.set(false);
    this.lagrer.set(true);
    setTimeout(() => {
      this.lagrer.set(false);
      this.lagringFeilet.set(true);
    }, 800);
  }
}
`;
