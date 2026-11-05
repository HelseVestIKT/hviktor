// Auto-generated - do not edit manually
export const ToastBakgrunnsoppgaverExampleSource = `import { Component, signal } from '@angular/core';
import {
  HviAlert,
  HviButton,
  HviLink,
  HviParagraph,
  HviSpinner,
} from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-toast-bakgrunnsoppgaver-example',
  standalone: true,
  imports: [HviAlert, HviButton, HviLink, HviParagraph, HviSpinner],
  template: \`
    <div class="flex max-w-md flex-col gap-4">
      <div>
        <button
          hviButton
          type="button"
          [attr.aria-disabled]="eksport() === 'pagar' ? 'true' : null"
          (click)="startEksport()"
        >
          Eksporter rapport
        </button>
      </div>
      <div aria-live="polite">
        @if (eksport() === 'pagar') {
          <div class="flex items-center gap-2">
            <hvi-spinner label="Eksporterer" size="sm" />
            <p hviParagraph>Eksporterer rapporten. Du kan fortsette å jobbe mens du venter.</p>
          </div>
        } @else if (eksport() === 'ferdig') {
          <hvi-alert color="success" title="Rapporten er klar">
            <p hviParagraph>
              <a
                hviLink
                href="data:text/csv;charset=utf-8,Avdeling%3BAntall%0AKirurgi%3B12%0AMedisin%3B8"
                download="rapport.csv"
                >Last ned rapport.csv</a
              >
            </p>
          </hvi-alert>
        }
      </div>
    </div>
  \`,
})
export class ToastBakgrunnsoppgaverExampleComponent {
  readonly eksport = signal<'ikke-startet' | 'pagar' | 'ferdig'>('ikke-startet');

  /** Simulerer en eksport som tar litt tid. */
  startEksport(): void {
    if (this.eksport() === 'pagar') return;

    this.eksport.set('pagar');
    setTimeout(() => this.eksport.set('ferdig'), 2500);
  }
}
`;
