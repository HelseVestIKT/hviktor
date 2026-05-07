import { Component, signal } from '@angular/core';
import { HviButton, HviDialog, HviDialogBlock, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-dialog-med-blokker-example',
  standalone: true,
  imports: [HviButton, HviDialog, HviDialogBlock, HviParagraph],
  template: `
    <button hviButton (click)="blocksOpen.set(true)">Åpne Dialog</button>

    <dialog
      title="Dialog med blokker"
      hviDialog
      [open]="blocksOpen()"
      (openChange)="blocksOpen.set($event)"
    >
      <p hviDialogBlock hviParagraph>
        Sett innhold i dialogen ved å bruke <code>hviDialogBlock</code> for hver blokk med innhold.
        Dette sikrer riktig avstand mellom innholdet og dialogens kanter.
      </p>
      <p hviDialogBlock hviParagraph size="sm">
        Bruk flere blokker for å dele opp dialogen med skillelinjer mellom seksjoner.
      </p>
      <div hviDialogBlock>
        <button hviButton variant="secondary" (click)="blocksOpen.set(false)">Lukk</button>
      </div>
    </dialog>
  `,
})
export class DialogMedBlokkerExampleComponent {
  readonly modalOpen = signal(false);
  readonly nonModalOpen = signal(false);
  readonly drawerOpen = signal(false);
  readonly formOpen = signal(false);
  readonly blocksOpen = signal(false);
  readonly backdropOpen = signal(false);
}
