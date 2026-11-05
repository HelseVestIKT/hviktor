// Auto-generated - do not edit manually
export const ToastBekreftelseEtterInnsendingExampleSource = `import {
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HviAlert, HviButton, HviParagraph, HviTextfield } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-toast-bekreftelse-etter-innsending-example',
  standalone: true,
  imports: [FormsModule, HviAlert, HviButton, HviParagraph, HviTextfield],
  template: \`
    <div class="flex max-w-md flex-col gap-4">
      @if (meldingSendt()) {
        <hvi-alert #kvittering tabindex="-1" color="success" title="Meldingen er sendt">
          <p hviParagraph>
            Vi har sendt en bekreftelse til {{ epost || 'e-postadressen din' }}. Du får svar innen
            tre virkedager.
          </p>
        </hvi-alert>
        <div>
          <button hviButton variant="secondary" type="button" (click)="nyMelding()">
            Send en ny melding
          </button>
        </div>
      } @else {
        <form class="flex flex-col gap-4" (ngSubmit)="sendMelding()">
          <hvi-textfield label="E-post" type="email" name="epost" [(ngModel)]="epost" />
          <hvi-textfield label="Melding" name="melding" multiline rows="3" [(ngModel)]="melding" />
          <div>
            <button hviButton type="submit">Send melding</button>
          </div>
        </form>
      }
    </div>
  \`,
})
export class ToastBekreftelseEtterInnsendingExampleComponent {
  private readonly injector = inject(Injector);
  private readonly kvittering = viewChild('kvittering', { read: ElementRef });

  epost = '';
  melding = '';
  readonly meldingSendt = signal(false);

  sendMelding(): void {
    this.meldingSendt.set(true);
    // Flytt fokus til bekreftelsen når den er tegnet, så skjermlesere leser den opp.
    afterNextRender(() => this.kvittering()?.nativeElement.focus(), { injector: this.injector });
  }

  nyMelding(): void {
    this.epost = '';
    this.melding = '';
    this.meldingSendt.set(false);
  }
}
`;
