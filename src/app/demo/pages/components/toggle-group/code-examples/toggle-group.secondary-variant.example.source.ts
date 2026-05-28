// Auto-generated - do not edit manually
export const ToggleGroupSecondaryVariantExampleSource = `import { Component, signal } from '@angular/core';
import { HviLabel, HviToggleGroup, HviToggleGroupItem } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-toggle-group-secondary-variant-example',
  standalone: true,
  imports: [HviLabel, HviToggleGroup, HviToggleGroupItem],
  template: \`
    <label hviLabel for="secondary-toggle">Mailboks filter:</label>
    <hvi-toggle-group
      [(value)]="selectedSecondary"
      variant="secondary"
      aria-labelledby="secondary-toggle"
    >
      <button hviToggleGroupItem value="innboks">Innboks</button>
      <button hviToggleGroupItem value="utkast">Utkast</button>
      <button hviToggleGroupItem value="arkiv">Arkiv</button>
      <button hviToggleGroupItem value="sendt">Sendt</button>
    </hvi-toggle-group>
  \`,
})
export class ToggleGroupSecondaryVariantExampleComponent {
  selectedBasic = signal('innboks');
  selectedSecondary = signal('innboks');
  selectedIconOnly = signal('left');
  selectedView = signal('liste');
  small = signal('innboks');
  medium = signal('innboks');
  large = signal('innboks');
}
`;
