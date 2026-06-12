// Auto-generated - do not edit manually
export const ToggleGroupSecondaryVariantExampleSource = `import { Component, signal } from '@angular/core';
import { HviLabel, HviToggleGroup, HviToggleGroupItem } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-toggle-group-secondary-variant-example',
  standalone: true,
  imports: [HviLabel, HviToggleGroup, HviToggleGroupItem],
  template: \`
    <label hviLabel for="secondary-toggle">Mailboks filter:</label>
    <fieldset hviToggleGroup variant="secondary" aria-labelledby="secondary-toggle">
      <label hviToggleGroupItem value="innboks">Innboks</label>
      <label hviToggleGroupItem value="utkast">Utkast</label>
      <label hviToggleGroupItem value="arkiv">Arkiv</label>
      <label hviToggleGroupItem value="sendt">Sendt</label>
    </fieldset>
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
