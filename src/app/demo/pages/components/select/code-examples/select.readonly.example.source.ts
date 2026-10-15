// Auto-generated - do not edit manually
export const SelectReadonlyExampleSource = `import { Component } from '@angular/core';
import { HviField, HviFieldDescription, HviLabel, HviSelect } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-select-readonly-example',
  standalone: true,
  imports: [HviField, HviFieldDescription, HviLabel, HviSelect],
  template: \`
    <hvi-field>
      <label hviLabel for="behandlingssted" weight="medium">Behandlingssted</label>
      <span hviFieldDescription>Bestemt ut fra henvisningen din</span>
      <select hviSelect id="behandlingssted" width="auto" readOnly>
        <option value="">Velg behandlingssted</option>
        <option value="forde">Førde sentralsjukehus</option>
        <option value="haraldsplass">Haraldsplass diakonale sykehus</option>
        <option value="haugesund">Haugesund sjukehus</option>
        <option value="haukeland" selected>Haukeland universitetssjukehus</option>
        <option value="stavanger">Stavanger universitetssjukehus</option>
        <option value="stord">Stord sjukehus</option>
        <option value="voss">Voss sjukehus</option>
      </select>
    </hvi-field>
  \`,
})
export class SelectReadonlyExampleComponent {
  
}
`;
