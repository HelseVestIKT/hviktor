// Auto-generated - do not edit manually
export const FieldPrefixSuffixExampleSource = `import { Component } from '@angular/core';
import { HviField, HviFieldAffix, HviFieldAffixes, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-field-prefix-suffix-example',
  standalone: true,
  imports: [HviField, HviFieldAffix, HviFieldAffixes, HviInput, HviLabel],
  template: \`
    <hvi-field>
      <label hviLabel for="pris" weight="medium">Hvor mange kroner koster det per måned?</label>
      <hvi-field-affixes>
        <hvi-field-affix>NOK</hvi-field-affix>
        <input hviInput id="pris" type="text" />
        <hvi-field-affix>pr. mnd.</hvi-field-affix>
      </hvi-field-affixes>
    </hvi-field>
  \`,
})
export class FieldPrefixSuffixExampleComponent {
  
}
`;
