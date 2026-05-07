import { Component } from '@angular/core';
import { HviTag } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { TagFargerExampleSource } from './code-examples/tag.farger.example.source';
import { TagStorrelserExampleSource } from './code-examples/tag.storrelser.example.source';
import { TagVarianterExampleSource } from './code-examples/tag.varianter.example.source';
@Component({
  selector: 'app-tag-demo',
  standalone: true,
  imports: [HviTag, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page componentId="tag">
      <app-demo-section title="Varianter" [code]="varianterCode">
        <div class="flex flex-wrap gap-2">
          <span hviTag variant="default">Default</span>
          <span hviTag variant="outline">Outline</span>
        </div>
      </app-demo-section>

      <app-demo-section title="Størrelser" [code]="storrelserCode">
        <div class="flex flex-wrap gap-2">
          <span hviTag size="sm">Small</span>
          <span hviTag size="md">Medium (default)</span>
          <span hviTag size="lg">Large</span>
        </div>
      </app-demo-section>

      <app-demo-section title="Farger" [code]="fargerCode">
        <div class="flex flex-wrap gap-2">
          <span hviTag>Default</span>
          <span hviTag color="neutral">Neutral</span>
          <span hviTag color="danger">Danger</span>
          <span hviTag color="warning">Warning</span>
          <span hviTag color="info">Info</span>
          <span hviTag color="success">Success</span>
          <span hviTag color="accent">Accent</span>
          <span hviTag color="brand1">Brand1</span>
          <span hviTag color="brand2">Brand2</span>
          <span hviTag color="brand3">Brand3</span>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class TagDemoComponent {
  readonly varianterCode = TagVarianterExampleSource;
  readonly storrelserCode = TagStorrelserExampleSource;
  readonly fargerCode = TagFargerExampleSource;
}
