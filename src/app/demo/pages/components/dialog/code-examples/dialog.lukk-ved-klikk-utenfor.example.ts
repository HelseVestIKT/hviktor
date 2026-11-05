import { Component, signal } from '@angular/core';
import { HviButton, HviDialog, HviDialogBlock, HviParagraph } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-dialog-lukk-ved-klikk-utenfor-example',
  standalone: true,
  imports: [HviButton, HviDialog, HviDialogBlock, HviParagraph],
  template: `
    <button hviButton (click)="backdropOpen.set(true)">Åpne Dialog</button>

    <dialog
      hviDialog
      closedby="any"
      [open]="backdropOpen()"
      (openChange)="backdropOpen.set($event)"
    >
      <p hviDialogBlock hviParagraph>Klikk utenfor denne dialogen for å lukke den.</p>
    </dialog>
  `,
})
export class DialogLukkVedKlikkUtenforExampleComponent {
  readonly backdropOpen = signal(false);
}
