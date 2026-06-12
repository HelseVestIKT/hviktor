import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { HviLabel, HviToggleGroup, HviToggleGroupItem, HviTooltip } from '@helsevestikt/hviktor';
import '@helsevestikt/hviktor-icons/icon-align-center.webcomponent';
import '@helsevestikt/hviktor-icons/icon-align-left.webcomponent';
import '@helsevestikt/hviktor-icons/icon-align-right.webcomponent';

@Component({
  selector: 'app-toggle-group-kun-ikoner-example',
  standalone: true,
  imports: [HviLabel, HviToggleGroup, HviToggleGroupItem, HviTooltip],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <label hviLabel for="icon-only-toggle">Tekstjustering:</label>
    <fieldset hviToggleGroup variant="primary" aria-labelledby="icon-only-toggle">
      <label
        hviToggleGroupItem
        hviTooltip="Venstrestilt"
        value="left"
        icon
        aria-label="Venstrestilt"
      >
        <hvi-icon-align-left></hvi-icon-align-left>
      </label>
      <label hviToggleGroupItem hviTooltip="Midtstilt" value="center" icon aria-label="Midtstilt">
        <hvi-icon-align-center></hvi-icon-align-center>
      </label>
      <label hviToggleGroupItem hviTooltip="Høyrestilt" value="right" icon aria-label="Høyrestilt">
        <hvi-icon-align-right></hvi-icon-align-right>
      </label>
    </fieldset>
  `,
})
export class ToggleGroupKunIkonerExampleComponent {
  selectedBasic = signal('innboks');
  selectedSecondary = signal('innboks');
  selectedIconOnly = signal('left');
  selectedView = signal('liste');
  small = signal('innboks');
  medium = signal('innboks');
  large = signal('innboks');
}
