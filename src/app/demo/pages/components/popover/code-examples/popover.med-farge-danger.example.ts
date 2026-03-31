import { Component } from '@angular/core';
import { HviButton, HviParagraph, HviPopover } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-popover-med-farge-danger-example',
  standalone: true,
  imports: [HviButton, HviParagraph, HviPopover],
  template: `
    <div class="flex flex-wrap gap-4">
      <button hviButton color="danger" popovertarget="popoverDanger">Slett</button>
      <hvi-popover id="popoverDanger" color="danger">
        <p hviParagraph>Er du sikker på at du vil slette?</p>
        <div class="mt-2 flex gap-2">
          <button hviButton size="sm" color="danger">Slett</button>
          <button hviButton size="sm" variant="tertiary">Avbryt</button>
        </div>
      </hvi-popover>
    </div>
  `,
})
export class PopoverMedFargeDangerExampleComponent {}
