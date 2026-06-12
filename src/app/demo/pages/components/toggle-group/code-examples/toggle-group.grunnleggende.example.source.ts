// Auto-generated - do not edit manually
export const ToggleGroupGrunnleggendeExampleSource = `import { Component, signal } from '@angular/core';
import { HviParagraph, HviToggleGroup, HviToggleGroupItem } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-toggle-group-grunnleggende-example',
  standalone: true,
  imports: [HviParagraph, HviToggleGroup, HviToggleGroupItem],
  template: \`
    <fieldset hviToggleGroup variant="primary" aria-label="Mailboks filter">
      <label hviToggleGroupItem value="innboks" aria-label="Innboks">Innboks</label>
      <label hviToggleGroupItem value="utkast" aria-label="Utkast">Utkast</label>
      <label hviToggleGroupItem value="arkiv" aria-label="Arkiv">Arkiv</label>
      <label hviToggleGroupItem value="sendt" aria-label="Sendt">Sendt</label>
    </fieldset>
    <p hviParagraph class="mt-2">Valgt: {{ selectedBasic() }}</p>
  \`,
})
export class ToggleGroupGrunnleggendeExampleComponent {
  selectedBasic = signal('innboks');
  selectedSecondary = signal('innboks');
  selectedIconOnly = signal('left');
  selectedView = signal('liste');
  small = signal('innboks');
  medium = signal('innboks');
  large = signal('innboks');
}
`;
