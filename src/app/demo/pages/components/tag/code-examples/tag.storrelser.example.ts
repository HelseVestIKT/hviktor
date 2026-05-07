import { Component } from '@angular/core';
import { HviTag } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-tag-storrelser-example',
  standalone: true,
  imports: [HviTag],
  template: `
    <div class="flex flex-wrap gap-2">
      <span hviTag size="sm">Small</span>
      <span hviTag size="md">Medium (default)</span>
      <span hviTag size="lg">Large</span>
    </div>
  `,
})
export class TagStorrelserExampleComponent {}
