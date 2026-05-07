import { Component } from '@angular/core';
import { HviTag } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-tag-farger-example',
  standalone: true,
  imports: [HviTag],
  template: `
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
  `,
})
export class TagFargerExampleComponent {}
