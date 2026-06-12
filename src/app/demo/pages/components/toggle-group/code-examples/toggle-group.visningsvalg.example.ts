import { Component, signal } from '@angular/core';
import { HviLabel, HviParagraph, HviToggleGroup, HviToggleGroupItem } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-toggle-group-visningsvalg-example',
  standalone: true,
  imports: [HviLabel, HviParagraph, HviToggleGroup, HviToggleGroupItem],
  template: `
    <label hviLabel for="view-toggle">Visning:</label>
    <fieldset hviToggleGroup variant="primary" aria-labelledby="view-toggle">
      <label hviToggleGroupItem value="liste">Liste</label>
      <label hviToggleGroupItem value="rutenett">Rutenett</label>
      <label hviToggleGroupItem value="kompakt">Kompakt</label>
    </fieldset>
    <p hviParagraph class="mt-2">Viser innhold som: {{ selectedView() }}</p>
  `,
})
export class ToggleGroupVisningsvalgExampleComponent {
  selectedBasic = signal('innboks');
  selectedSecondary = signal('innboks');
  selectedIconOnly = signal('left');
  selectedView = signal('liste');
  small = signal('innboks');
  medium = signal('innboks');
  large = signal('innboks');
}
