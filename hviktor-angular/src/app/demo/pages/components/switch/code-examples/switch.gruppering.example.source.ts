// Auto-generated - do not edit manually
export const SwitchGrupperingExampleSource = `import { Component } from '@angular/core';
import { HviField, HviFieldset, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-switch-gruppering-example',
  standalone: true,
  imports: [HviField, HviFieldset, HviInput, HviLabel],
  template: \`
    <fieldset hviFieldset>
      <legend hviLabel weight="medium">Skru av/på lys</legend>
      <ds-field>
        <input hviInput type="checkbox" role="switch" id="switch-stue" checked />
        <label hviLabel for="switch-stue">Stue</label>
      </ds-field>
      <ds-field>
        <input hviInput type="checkbox" role="switch" id="switch-kjokken" />
        <label hviLabel for="switch-kjokken">Kjøkken</label>
      </ds-field>
      <ds-field>
        <input hviInput type="checkbox" role="switch" id="switch-bad" />
        <label hviLabel for="switch-bad">Bad</label>
      </ds-field>
      <ds-field>
        <input
          hviInput
          type="checkbox"
          role="switch"
          id="switch-soverom"
          readOnly
          aria-describedby="switch-soverom-desc"
        />
        <label hviLabel for="switch-soverom">Soverom</label>
        <div data-field="description" id="switch-soverom-desc">
          Får ikke kontakt med lyspærene
        </div>
      </ds-field>
    </fieldset>
  \`,
})
export class SwitchGrupperingExampleComponent {
  
}
`;
