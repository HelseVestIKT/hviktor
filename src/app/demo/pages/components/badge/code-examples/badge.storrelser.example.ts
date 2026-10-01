import { Component } from '@angular/core';
import { HviBadge } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-badge-storrelser-example',
  standalone: true,
  imports: [HviBadge],
  template: `
    <div class="flex flex-wrap items-center gap-2" role="group">
      <hvi-badge color="danger" count="9+" aria-label="9+" size="sm"></hvi-badge>
      <hvi-badge color="danger" count="9+" aria-label="9+" size="md"></hvi-badge>
      <hvi-badge color="danger" count="9+" aria-label="9+" size="lg"></hvi-badge>
    </div>
  `,
})
export class BadgeStorrelserExampleComponent {}
