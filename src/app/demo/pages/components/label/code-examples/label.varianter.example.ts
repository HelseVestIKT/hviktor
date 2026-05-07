import { Component } from '@angular/core';
import { HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-label-varianter-example',
  standalone: true,
  imports: [HviLabel],
  template: `
    <div class="flex flex-col gap-2">
      <label hviLabel weight="regular">Regular weight</label>
      <label hviLabel weight="medium">Medium weight</label>
      <label hviLabel weight="semibold">Semibold weight</label>
    </div>
  `,
})
export class LabelVarianterExampleComponent {}
