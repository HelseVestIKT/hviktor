import { Component, signal } from '@angular/core';
import {
  HviButton,
  HviDialog,
  HviDialogBlock,
  HviHeading,
  HviParagraph,
} from '@helsevestikt/hviktor';

@Component({
  selector: 'app-dialog-demo',
  standalone: true,
  imports: [HviDialog, HviDialogBlock, HviButton, HviHeading, HviParagraph],
  template: `
    <header class="mb-8">
      <h1 hviHeading size="xl">Dialog</h1>
      <p hviParagraph>Modale dialogbokser for viktige handlinger eller informasjon.</p>
    </header>

    <section class="mb-8">
      <h2 hviHeading size="md">Standard</h2>
      <div class="mt-4 flex gap-2">
        <button hviButton type="button" aria-haspopup="dialog" (click)="toggleDialog(true)">
          Åpne dialog
        </button>
      </div>

      <dialog
        hviDialog
        id="demoDialog"
        aria-labelledby="demoDialogTitle"
        [open]="dialogOpen()"
        (openChange)="toggleDialog($event)"
      >
        <div hviDialogBlock>
          <h3 hviHeading size="md" id="demoDialogTitle">En enkel dialog</h3>
        </div>
        <div hviDialogBlock>
          <p hviParagraph size="md">
            Her kan innholdet ditt ligge. Dialogen er modal og styrt med hviDialog-direktivet.
          </p>
        </div>
        <div hviDialogBlock class="flex justify-end gap-2">
          <button hviButton variant="secondary" type="button" (click)="toggleDialog(false)">
            Lukk
          </button>
          <button hviButton type="button" (click)="toggleDialog(false)">Fortsett</button>
        </div>
      </dialog>
    </section>
  `,
})
export class DialogDemoComponent {
  readonly dialogOpen = signal(false);

  toggleDialog(nextState?: boolean): void {
    if (typeof nextState === 'boolean') {
      this.dialogOpen.set(nextState);
      return;
    }
    this.dialogOpen.update((current) => !current);
  }
}
