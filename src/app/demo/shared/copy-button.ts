import { Component, input, signal } from '@angular/core';
import { HviButton } from '@helsevestikt/hviktor-angular';
import { HviIconClipboard, HviIconClipboardCheckmark } from '@helsevestikt/hviktor-icons';

/**
 * Knapp som kopierer tekst til utklippstavlen og viser «Kopiert!» en kort stund.
 * `text` kan være en funksjon når teksten er dyr å bygge og bare trengs ved klikk.
 */
@Component({
  selector: 'app-copy-button',
  imports: [HviButton, HviIconClipboard, HviIconClipboardCheckmark],
  template: `
    <button hviButton type="button" variant="secondary" [size]="size()" (click)="copy()">
      @if (copied()) {
        <hvi-icon-clipboard-checkmark aria-hidden="true" />
        Kopiert!
      } @else {
        <hvi-icon-clipboard aria-hidden="true" />
        {{ label() }}
      }
      @if (context()) {
        <span class="sr-only"> {{ context() }}</span>
      }
    </button>
  `,
})
export class CopyButtonComponent {
  readonly text = input.required<string | (() => string)>();
  readonly label = input('Kopiér');
  /** Ekstra tekst for skjermlesere, f.eks. «import» gir «Kopiér import». */
  readonly context = input('');
  readonly size = input<'sm' | 'md' | 'lg'>('sm');

  protected readonly copied = signal(false);

  protected copy(): void {
    const value = this.text();
    const text = typeof value === 'function' ? value() : value;

    if (!navigator.clipboard?.writeText) {
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2000);
      })
      .catch((error) => {
        console.error('Kunne ikke kopiere til utklippstavlen.', error);
      });
  }
}
