// Auto-generated - do not edit manually
export const FieldAntallTegnExampleSource = `import { Component } from '@angular/core';
import { HviField, HviFieldCounter, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-field-antall-tegn-example',
  standalone: true,
  imports: [HviField, HviFieldCounter, HviInput, HviLabel],
  template: \`
    <div style="width: 200px">
      <hvi-field>
        <label hviLabel for="beskrivelse" weight="medium">Legg til en beskrivelse</label>
        <input hviInput id="beskrivelse" type="text" [maxLength]="10" />
        <hvi-field-counter [limit]="10" />
      </hvi-field>
    </div>
  \`,
})
export class FieldAntallTegnExampleComponent {
  
}
`;
