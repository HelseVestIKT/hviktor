import { Component } from '@angular/core';
import { HviField, HviFieldCounter, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-field-antall-tegn-example',
  standalone: true,
  imports: [HviField, HviFieldCounter, HviInput, HviLabel],
  template: `
    <ds-field>
      <label hviLabel for="beskrivelse" weight="medium">Legg til en beskrivelse</label>
      <input hviInput id="beskrivelse" type="text" [maxLength]="10" />
      <hvi-field-counter [limit]="10" />
    </ds-field>
  `,
})
export class FieldAntallTegnExampleComponent {}
