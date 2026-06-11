import { Component } from '@angular/core';
import { HviTooltip } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-tooltip-tekst-med-tooltip-example',
  standalone: true,
  imports: [HviTooltip],
  template: `
    <div class="flex justify-center">
      <span hviTooltip="Organisasjonsnummer" tabindex="0"> Org.nr. </span>
    </div>
  `,
})
export class TooltipTekstMedTooltipExampleComponent {}
