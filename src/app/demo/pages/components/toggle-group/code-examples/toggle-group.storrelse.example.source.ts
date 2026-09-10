// Auto-generated - do not edit manually
export const ToggleGroupStorrelseExampleSource = `import { Component, signal } from '@angular/core';
import { HviHeading, HviToggleGroup, HviToggleGroupItem } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-toggle-group-storrelse-example',
  standalone: true,
  imports: [HviHeading, HviToggleGroup, HviToggleGroupItem],
  template: \`
    <div class="flex flex-row flex-wrap gap-4">
      <div class="flex flex-col gap-2">
        <h3 hviHeading size="sm">sm</h3>
        <hvi-toggle-group [(value)]="small" variant="primary" size="sm">
          <label
            hviToggleGroupItem
            value="innboks"
            aria-label="
          Innboks"
          >
            Innboks
          </label>
          <label hviToggleGroupItem value="utkast" aria-label="Utkast">Utkast</label>
          <label hviToggleGroupItem value="arkiv" aria-label="Arkiv">Arkiv</label>
        </hvi-toggle-group>
      </div>
      <div class="flex flex-col gap-2">
        <h3 hviHeading size="sm">md</h3>
        <hvi-toggle-group [(value)]="medium" variant="primary" size="md">
          <label hviToggleGroupItem value="innboks" aria-label="Innboks">Innboks</label>
          <label hviToggleGroupItem value="utkast" aria-label="Utkast">Utkast</label>
          <label hviToggleGroupItem value="arkiv" aria-label="Arkiv">Arkiv</label>
        </hvi-toggle-group>
      </div>
      <div class="flex flex-col gap-2">
        <h3 hviHeading size="sm">lg</h3>
        <hvi-toggle-group [(value)]="large" variant="primary" size="lg">
          <label hviToggleGroupItem value="innboks" aria-label="Innboks">Innboks</label>
          <label hviToggleGroupItem value="utkast" aria-label="Utkast">Utkast</label>
          <label hviToggleGroupItem value="arkiv" aria-label="Arkiv">Arkiv</label>
        </hvi-toggle-group>
      </div>
    </div>
  \`,
})
export class ToggleGroupStorrelseExampleComponent {
  selectedBasic = signal('innboks');
  selectedSecondary = signal('innboks');
  selectedIconOnly = signal('left');
  selectedView = signal('liste');
  small = signal('innboks');
  medium = signal('innboks');
  large = signal('innboks');
}
`;
