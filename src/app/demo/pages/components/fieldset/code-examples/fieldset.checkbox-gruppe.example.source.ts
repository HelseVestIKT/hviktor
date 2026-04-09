// Auto-generated - do not edit manually
export const FieldsetCheckboxGruppeExampleSource = `import { Component } from '@angular/core';
import { HviField, HviFieldset, HviInput, HviLabel, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-fieldset-checkbox-gruppe-example',
  standalone: true,
  imports: [HviField, HviFieldset, HviInput, HviLabel, HviParagraph],
  template: \`
    <fieldset hviFieldset>
      <legend hviLabel weight="medium">Hvilke interesser har du?</legend>
      <p hviParagraph>Velg alle som passer.</p>
      <hvi-field>
        <input hviInput type="checkbox" id="sport" value="sport" />
        <label hviLabel for="sport">Sport og trening</label>
      </hvi-field>
      <hvi-field>
        <input hviInput type="checkbox" id="musikk" value="musikk" />
        <label hviLabel for="musikk">Musikk og konserter</label>
      </hvi-field>
      <hvi-field>
        <input hviInput type="checkbox" id="teknologi" value="teknologi" checked />
        <label hviLabel for="teknologi">Teknologi og programmering</label>
      </hvi-field>
    </fieldset>
  \`,
})
export class FieldsetCheckboxGruppeExampleComponent {
  
}
`;
