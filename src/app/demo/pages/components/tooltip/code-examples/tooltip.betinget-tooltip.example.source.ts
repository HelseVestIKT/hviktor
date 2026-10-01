// Auto-generated - do not edit manually
export const TooltipBetingetTooltipExampleSource = `import { Component, signal, WritableSignal } from '@angular/core';
import { HviButton, HviField, HviInput, HviLabel, HviTooltip } from '@helsevestikt/hviktor-angular';
import { HviIconClipboard } from '@helsevestikt/hviktor-icons';

@Component({
  selector: 'app-tooltip-betinget-tooltip-example',
  standalone: true,
  imports: [HviButton, HviField, HviInput, HviLabel, HviTooltip, HviIconClipboard],
  template: \`
    <div class="flex justify-center">
      <button
        hviButton
        variant="secondary"
        icon
        [hviTooltip]="visTooltip() ? 'Kopier' : ''"
        tooltipPlacement="bottom"
        aria-label="Kopier"
      >
        <hvi-icon-clipboard />
      </button>
    </div>
    <hvi-field class="mt-4 flex justify-center">
      <input
        hviInput
        type="checkbox"
        role="switch"
        id="tooltip-toggle"
        [checked]="visTooltip()"
        (change)="toggleTooltip()"
      />
      <label hviLabel for="tooltip-toggle">Vis tooltip</label>
    </hvi-field>
  \`,
})
export class TooltipBetingetTooltipExampleComponent {
  visTooltip: WritableSignal<boolean> = signal(false);
  
  toggleTooltip(): void {
    this.visTooltip.set(!this.visTooltip());
  }
}
`;
