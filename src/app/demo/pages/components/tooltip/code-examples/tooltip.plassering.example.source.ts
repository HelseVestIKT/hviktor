// Auto-generated - do not edit manually
export const TooltipPlasseringExampleSource = `import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HviButton, HviTooltip } from '@helsevestikt/hviktor';
import '@helsevestikt/hviktor-icons/icon-clipboard.webcomponent';

@Component({
  selector: 'app-tooltip-plassering-example',
  standalone: true,
  imports: [HviButton, HviTooltip],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div class="flex justify-center">
      <button hviButton variant="secondary" hviTooltip="Kopier" tooltipPlacement="bottom">
        <hvi-icon-clipboard />
      </button>
    </div>
  \`,
})
export class TooltipPlasseringExampleComponent {
  
}
`;
