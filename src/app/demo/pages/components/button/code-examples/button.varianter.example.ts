import { Component } from '@angular/core';
import { HviButton } from '@helsevestikt/hviktor-angular';
import { HviIconCog } from '@helsevestikt/hviktor-icons';

@Component({
  selector: 'app-button-varianter-example',
  standalone: true,
  imports: [HviButton, HviIconCog],
  template: `
    <div class="flex flex-wrap gap-2">
      <button hviButton icon><hvi-icon-cog /></button>
      <button hviButton loading>Loading...</button>
    </div>
  `,
})
export class ButtonVarianterExampleComponent {}
