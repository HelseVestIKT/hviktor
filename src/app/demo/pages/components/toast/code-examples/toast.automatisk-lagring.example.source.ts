// Auto-generated - do not edit manually
export const ToastAutomatiskLagringExampleSource = `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HviParagraph, HviTextfield } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-toast-automatisk-lagring-example',
  standalone: true,
  imports: [FormsModule, HviParagraph, HviTextfield],
  template: \`
    <div class="flex max-w-md flex-col gap-2">
      <hvi-textfield
        label="Notat"
        description="Notatet lagres automatisk mens du skriver."
        name="notat"
        multiline
        rows="4"
        [(ngModel)]="notat"
        (ngModelChange)="notatEndret()"
      />
      <p hviParagraph size="sm" role="status">{{ lagringsstatus() }}</p>
    </div>
  \`,
})
export class ToastAutomatiskLagringExampleComponent {
  notat = '';
  readonly lagringsstatus = signal('Alle endringer er lagret');
  private lagreTimer?: ReturnType<typeof setTimeout>;

  notatEndret(): void {
    clearTimeout(this.lagreTimer);
    this.lagringsstatus.set('Lagrer …');
    this.lagreTimer = setTimeout(() => {
      const tid = new Date().toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' });
      this.lagringsstatus.set(\`Lagret kl. \${tid}\`);
    }, 1000);
  }
}
`;
