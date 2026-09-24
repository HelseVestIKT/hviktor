import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-tooltip-ikon-knapp-med-tooltip-example',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="flex justify-center">
      <button hviButton variant="primary" icon hviTooltip="Kopier" aria-label="Kopier">
        <hvi-icon-clipboard />
      </button>
    </div>
  `,
})
export class TooltipIkonKnappMedTooltipExampleComponent {}
