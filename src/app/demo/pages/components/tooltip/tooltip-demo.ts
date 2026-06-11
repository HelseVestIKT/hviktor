import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HviButton, HviTooltip } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { TooltipIkonKnappMedTooltipExampleSource } from './code-examples/tooltip.ikon-knapp-med-tooltip.example.source';
import { TooltipPlasseringExampleSource } from './code-examples/tooltip.plassering.example.source';
import { TooltipTekstMedTooltipExampleSource } from './code-examples/tooltip.tekst-med-tooltip.example.source';

import '@helsevestikt/hviktor-icons/icon-clipboard.webcomponent';

@Component({
  selector: 'app-tooltip-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent, HviButton, HviTooltip],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <app-demo-page componentId="tooltip">
      <!-- Grunnleggende eksempel med ikon-knapp -->
      <app-demo-section
        title="Ikon-knapp med tooltip"
        [code]="ikonKnappMedTooltipCode"
        description="Bruk tooltip for å forklare hva symbolet på knappen betyr."
      >
        <div class="flex justify-center">
          <button hviButton variant="primary" icon hviTooltip="Kopier" aria-label="Kopier">
            <hvi-icon-clipboard />
          </button>
        </div>
      </app-demo-section>

      <!-- Tekst med tooltip -->
      <app-demo-section
        title="Med tekst"
        [code]="tekstMedTooltipCode"
        description="Tooltip kan brukes på tekst for å gi utfyllende informasjon."
      >
        <div class="flex justify-center">
          <span hviTooltip="Organisasjonsnummer" tabindex="0"> Org.nr. </span>
        </div>
      </app-demo-section>

      <!-- Plassering -->
      <app-demo-section
        title="Plassering"
        [code]="plasseringCode"
        description="Vurder om tooltip skal plasseres over, under eller ved siden av elementet."
      >
        <div class="flex justify-center">
          <button hviButton variant="secondary" icon hviTooltip="Kopier" tooltipPlacement="bottom" aria-label="Kopier">
            <hvi-icon-clipboard />
          </button>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class TooltipDemoComponent {
  readonly ikonKnappMedTooltipCode = TooltipIkonKnappMedTooltipExampleSource;
  readonly tekstMedTooltipCode = TooltipTekstMedTooltipExampleSource;
  readonly plasseringCode = TooltipPlasseringExampleSource;
}
