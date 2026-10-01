import { Component } from '@angular/core';
import { HviButton, HviTooltip } from '@helsevestikt/hviktor-angular';
import { HviIconClipboard } from '@helsevestikt/hviktor-icons';

@Component({
  selector: 'app-tooltip-plassering-example',
  standalone: true,
  imports: [HviButton, HviTooltip, HviIconClipboard],
  template: `
    <div class="flex justify-center">
      <button
        hviButton
        variant="secondary"
        icon
        hviTooltip="Kopier"
        tooltipPlacement="bottom"
        aria-label="Kopier"
      >
        <hvi-icon-clipboard />
      </button>
    </div>
  `,
})
export class TooltipPlasseringExampleComponent {}
