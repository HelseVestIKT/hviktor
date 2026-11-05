import { Component } from '@angular/core';
import { HviChipLabel, HviInput } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-chip-radio-example',
  standalone: true,
  imports: [HviChipLabel, HviInput],
  template: `
    <div class="flex flex-wrap gap-2">
      <label hviChip>
        <input hviInput type="radio" value="nynorsk" checked name="my-radio" />
        Nynorsk
      </label>
      <label hviChip>
        <input hviInput type="radio" value="bokmål" name="my-radio" />
        Bokmål
      </label>
    </div>
  `,
})
export class ChipRadioExampleComponent {}
