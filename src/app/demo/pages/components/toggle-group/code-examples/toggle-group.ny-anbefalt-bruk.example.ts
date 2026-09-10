import { Component, signal } from '@angular/core';
import { HviParagraph, HviToggleGroup, HviToggleGroupItem } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-toggle-group-ny-anbefalt-bruk-example',
  standalone: true,
  imports: [HviParagraph, HviToggleGroup, HviToggleGroupItem],
  template: `
    <hvi-toggle-group
      [(value)]="selectedRecommended"
      variant="primary"
      aria-label="Mailboks filter"
    >
      <label hviToggleGroupItem value="innboks">Innboks</label>
      <label hviToggleGroupItem value="utkast">Utkast</label>
      <label hviToggleGroupItem value="arkiv">Arkiv</label>
      <label hviToggleGroupItem value="sendt">Sendt</label>
    </hvi-toggle-group>
    <p hviParagraph class="mt-2">Valgt: {{ selectedRecommended() }}</p>
  `,
})
export class ToggleGroupNyAnbefaltBrukExampleComponent {
  selectedRecommended = signal('innboks');
}
