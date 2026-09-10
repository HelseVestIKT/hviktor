// Auto-generated - do not edit manually
export const ToggleGroupSecondaryVariantExampleSource = `import { Component, signal } from '@angular/core';
import { HviLabel, HviToggleGroup, HviToggleGroupItem } from '@helsevestikt/hviktor-angular';

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
      <label hviToggleGroupItem value="innboks">Innboks</label>
      <label hviToggleGroupItem value="utkast">Utkast</label>
      <label hviToggleGroupItem value="arkiv">Arkiv</label>
      <label hviToggleGroupItem value="sendt">Sendt</label>
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
