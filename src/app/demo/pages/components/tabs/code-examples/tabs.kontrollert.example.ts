import { Component, signal } from '@angular/core';
import { HviButton, HviTab, HviTabPanel, HviTabs } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-tabs-kontrollert-example',
  standalone: true,
  imports: [HviButton, HviTab, HviTabPanel, HviTabs],
  template: `
    <p class="ds-paragraph">Valgt tab: {{ selectedTab() }}</p>
    <hvi-tabs [(value)]="selectedTab">
      <hvi-tab value="value1">Tab 1</hvi-tab>
      <hvi-tab value="value2">Tab 2</hvi-tab>
      <hvi-tab value="value3">Tab 3</hvi-tab>
      <hvi-tab-panel value="value1">
        <p class="ds-paragraph">Innhold for tab 1</p>
        <button hviButton variant="secondary" (click)="selectedTab.set('value2')">
          Gå til tab 2
        </button>
      </hvi-tab-panel>
      <hvi-tab-panel value="value2">
        <p class="ds-paragraph">Innhold for tab 2</p>
        <button hviButton variant="secondary" (click)="selectedTab.set('value3')">
          Gå til tab 3
        </button>
      </hvi-tab-panel>
      <hvi-tab-panel value="value3">
        <p class="ds-paragraph">Innhold for tab 3</p>
        <button hviButton variant="secondary" (click)="selectedTab.set('value1')">
          Tilbake til tab 1
        </button>
      </hvi-tab-panel>
    </hvi-tabs>
  `,
})
export class TabsKontrollertExampleComponent {
  readonly selectedTab = signal('value1');
}
