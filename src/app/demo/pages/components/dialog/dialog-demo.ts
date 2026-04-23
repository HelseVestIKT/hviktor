import { Component, signal } from '@angular/core';

import { HviButton, HviDialog, HviDialogBlock } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-dialog-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent, HviButton, HviDialog, HviDialogBlock],
  template: `
    <app-demo-page componentId="dialog">
      <app-demo-section title="Modal Dialog">
        <button hviButton (click)="modalOpen.set(true)">Åpne modal Dialog</button>

        <dialog hviDialog [open]="modalOpen()" (openChange)="modalOpen.set($event)">
          <div hviDialogBlock>
            <p class="ds-paragraph" data-variant="default" data-size="sm">Bekreft endring</p>
            <h2 class="ds-heading">Er du sikker på at du vil endre søknaden?</h2>
          </div>
          <div hviDialogBlock>
            <p class="ds-paragraph" data-variant="default">
              OBS! Du bør ikke endre søknaden etter at fristen har gått ut. Hvis du endrer søknaden
              nå, er du ikke lenger med i kommende opptak. Ring kontaktsenteret på telefon 00 00 00
              00 hvis du trenger veiledning.
            </p>
          </div>
          <div hviDialogBlock>
            <div style="display:flex;gap:var(--ds-size-4);margin-top:var(--ds-size-4)">
              <button
                hviButton
                variant="primary"
                data-color="danger"
                (click)="modalOpen.set(false)"
              >
                Ja, endre
              </button>
              <button hviButton variant="secondary" (click)="modalOpen.set(false)">Avbryt</button>
            </div>
          </div>
        </dialog>
      </app-demo-section>

      <app-demo-section title="Ikke-modal Dialog">
        <button hviButton (click)="nonModalOpen.set(true)">Åpne ikke-modal Dialog</button>

        <dialog
          hviDialog
          [modal]="false"
          [open]="nonModalOpen()"
          (openChange)="nonModalOpen.set($event)"
          style="z-index:10;top:calc(100vh - 290px);left:calc(100vw - 385px);margin:0;max-width:350px"
        >
          <h2 class="ds-heading" style="margin-bottom:var(--ds-size-4)">Vi ønsker din mening</h2>
          <label class="ds-label" data-weight="medium" for="my-textarea"
            >Hvordan var din opplevelse?</label
          >
          <textarea
            class="ds-input"
            id="my-textarea"
            style="margin-bottom:var(--ds-size-6)"
          ></textarea>
          <button hviButton variant="primary" (click)="nonModalOpen.set(false)">Send inn</button>
        </dialog>
      </app-demo-section>

      <app-demo-section title="Dialog som drawer">
        <button hviButton (click)="drawerOpen.set(true)">Åpne Dialog (Bottom)</button>

        <dialog
          hviDialog
          placement="bottom"
          closedby="any"
          [open]="drawerOpen()"
          (openChange)="drawerOpen.set($event)"
          style="z-index:10"
        >
          <div hviDialogBlock>
            <p class="ds-paragraph" data-variant="default">
              This is a modal Dialog with <code>placement="bottom"</code>
            </p>
          </div>
        </dialog>
      </app-demo-section>

      <app-demo-section title="Med skjema og fokus">
        <button hviButton (click)="formOpen.set(true)">Åpne Dialog</button>

        <dialog hviDialog closedby="any" [open]="formOpen()" (openChange)="formOpen.set($event)">
          <h2 class="ds-heading" style="margin-bottom:var(--ds-size-2)">Dialog med skjema</h2>
          <div class="ds-field">
            <label class="ds-label" data-weight="medium">Navn</label>
            <div class="ds-field-affixes">
              <input class="ds-input" type="text" autofocus />
            </div>
          </div>
          <div style="display:flex;gap:var(--ds-size-4);margin-top:var(--ds-size-4)">
            <button hviButton variant="primary" (click)="formOpen.set(false)">
              Send inn skjema
            </button>
            <button hviButton variant="secondary" data-color="danger" (click)="formOpen.set(false)">
              Avbryt
            </button>
          </div>
        </dialog>
      </app-demo-section>

      <app-demo-section title="Med blokker">
        <button hviButton (click)="blocksOpen.set(true)">Åpne Dialog</button>

        <dialog hviDialog [open]="blocksOpen()" (openChange)="blocksOpen.set($event)">
          <div hviDialogBlock>
            <p class="ds-paragraph" data-variant="default" data-size="sm">Dialog subtitle</p>
            <h2 class="ds-heading">Dialog with dividers</h2>
          </div>
          <div hviDialogBlock>
            <p class="ds-paragraph" data-variant="default">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales eros justo.
            </p>
          </div>
          <div hviDialogBlock>
            <button hviButton variant="secondary" (click)="blocksOpen.set(false)">Lukk</button>
          </div>
        </dialog>
      </app-demo-section>

      <app-demo-section title="Lukk ved klikk utenfor">
        <button hviButton (click)="backdropOpen.set(true)">Åpne Dialog</button>

        <dialog
          hviDialog
          closedby="any"
          [open]="backdropOpen()"
          (openChange)="backdropOpen.set($event)"
        >
          <h2 class="ds-heading">Click outside to close</h2>
        </dialog>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class DialogDemoComponent {
  readonly modalOpen = signal(false);
  readonly nonModalOpen = signal(false);
  readonly drawerOpen = signal(false);
  readonly formOpen = signal(false);
  readonly blocksOpen = signal(false);
  readonly backdropOpen = signal(false);
}
