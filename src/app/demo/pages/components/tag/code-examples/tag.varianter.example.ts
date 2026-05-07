import { Component } from '@angular/core';
import { HviTag } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-tag-varianter-example',
  standalone: true,
  imports: [HviTag],
  template: `
    <div class="flex flex-wrap gap-2">
      <span hviTag variant="default">Default</span>
      <span hviTag variant="outline">Outline</span>
    </div>
  `,
})
export class TagVarianterExampleComponent {}
