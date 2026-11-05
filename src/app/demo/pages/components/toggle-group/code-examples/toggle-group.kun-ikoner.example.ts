import { Component, signal } from '@angular/core';
import {
  HviLabel,
  HviToggleGroup,
  HviToggleGroupItem,
  HviTooltip,
} from '@helsevestikt/hviktor-angular';
import {
  HviIconAlignCenter,
  HviIconAlignLeft,
  HviIconAlignRight,
} from '@helsevestikt/hviktor-icons';

@Component({
  selector: 'app-toggle-group-kun-ikoner-example',
  standalone: true,
  imports: [
    HviIconAlignCenter,
    HviIconAlignLeft,
    HviIconAlignRight,
    HviLabel,
    HviToggleGroup,
    HviToggleGroupItem,
    HviTooltip,
  ],
  template: `
    <label hviLabel for="icon-only-toggle">Tekstjustering:</label>
    <hvi-toggle-group
      [(value)]="selectedIconOnly"
      variant="primary"
      aria-labelledby="icon-only-toggle"
    >
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
    </hvi-toggle-group>
  `,
})
export class ToggleGroupKunIkonerExampleComponent {
  selectedIconOnly = signal('left');
}
