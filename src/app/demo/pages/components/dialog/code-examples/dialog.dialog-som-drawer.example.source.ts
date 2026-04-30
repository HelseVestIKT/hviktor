// Auto-generated - do not edit manually
export const DialogDialogSomDrawerExampleSource = `import { Component, signal } from '@angular/core';
import { HviButton, HviDialog, HviDialogBlock, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-dialog-dialog-som-drawer-example',
  standalone: true,
  imports: [HviButton, HviDialog, HviDialogBlock, HviParagraph],
  template: \`
    <p hviParagraph size="sm">
      Drawer får automatisk <code>aria-label="Informasjonspanel"</code> når du bruker
      <code>placement</code> ulik <code>center</code>, men du kan fortsatt overstyre med
      egne aria-attributter ved behov.
    </p>
    <button hviButton (click)="drawerOpen.set(true)">Åpne Dialog (Bottom)</button>
    
    <dialog
      hviDialog
      placement="bottom"
      closedby="any"
      [open]="drawerOpen()"
      (openChange)="drawerOpen.set($event)"
    >
      <div hviDialogBlock>
        <p hviParagraph>
          Dette er en modal dialog med <code>placement="bottom"</code>. Tilgjengelige
          plasseringer er <code>top</code>, <code>bottom</code>, <code>left</code>,
          <code>right</code> og <code>center</code>.
        </p>
      </div>
    </dialog>
  \`,
})
export class DialogDialogSomDrawerExampleComponent {
  readonly modalOpen = signal(false);
  readonly nonModalOpen = signal(false);
  readonly drawerOpen = signal(false);
  readonly formOpen = signal(false);
  readonly blocksOpen = signal(false);
  readonly backdropOpen = signal(false);
}
`;
