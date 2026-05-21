// Auto-generated - do not edit manually
export const ToggleGroupSecondaryVariantExampleSource = `import { Component, signal } from '@angular/core';
import { HviToggleGroup, HviToggleGroupItem } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-toggle-group-secondary-variant-example',
  standalone: true,
  imports: [HviToggleGroup, HviToggleGroupItem],
  template: \`
    <hvi-toggle-group [(value)]="selectedSecondary" variant="secondary">
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
