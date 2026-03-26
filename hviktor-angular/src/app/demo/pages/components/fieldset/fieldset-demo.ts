import { Component } from '@angular/core';
import {
  HviField,
  HviFieldset,
  HviHeading,
  HviInput,
  HviLabel,
  HviParagraph,
} from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { FieldsetCheckboxGruppeExampleSource } from './code-examples/fieldset.checkbox-gruppe.example.source';
import { FieldsetCheckboxExampleSource } from './code-examples/fieldset.checkbox.example.source';
import { FieldsetLegendSomHeadingExampleSource } from './code-examples/fieldset.legend-som-heading.example.source';
import { FieldsetRadioGruppeExampleSource } from './code-examples/fieldset.radio-gruppe.example.source';
@Component({
  selector: 'app-fieldset-demo',
  standalone: true,
  imports: [
    DemoPageComponent,
    DemoSectionComponent,
    HviFieldset,
    HviField,
    HviInput,
    HviLabel,
    HviParagraph,
    HviHeading,
  ],
  template: `
    <app-demo-page componentId="fieldset">
      <!-- Radio-gruppe -->
      <app-demo-section
        title="Radio-gruppe"
        [code]="radioGruppeCode"
        description="Fieldset brukes ofte til å gruppere radioknapper som hører sammen."
      >
        <fieldset hviFieldset>
          <legend hviLabel weight="medium">Hvilken fjordarm bor du ved?</legend>
          <p hviParagraph>Valget vil hjelpe oss å forbedre innholdet vi viser deg.</p>
          <ds-field>
            <input hviInput type="radio" id="barsnesfjorden" name="fjord" value="barsnesfjorden" />
            <label hviLabel for="barsnesfjorden">Barsnesfjorden</label>
          </ds-field>
          <ds-field>
            <input hviInput type="radio" id="eidsfjorden" name="fjord" value="eidsfjorden" />
            <label hviLabel for="eidsfjorden">Eidsfjorden</label>
          </ds-field>
          <ds-field>
            <input hviInput type="radio" id="ingen" name="fjord" value="ingen" />
            <label hviLabel for="ingen">Ingen av de</label>
          </ds-field>
        </fieldset>
      </app-demo-section>

      <!-- Checkbox -->
      <app-demo-section
        title="Checkbox"
        [code]="checkboxCode"
        description="Det kan være scenarioer hvor et Fieldset kun har en Checkbox, basert på konteksten."
      >
        <fieldset hviFieldset>
          <legend hviLabel weight="medium">Godtar du vilkårene?</legend>
          <ds-field>
            <input hviInput type="checkbox" id="agree" value="agree" />
            <label hviLabel for="agree">Ja, jeg godtar</label>
          </ds-field>
        </fieldset>
      </app-demo-section>

      <!-- Legend som heading -->
      <app-demo-section
        title="Legend som heading"
        [code]="legendSomHeadingCode"
        description="Å bruke selve spørsmålet som overskrift er god praksis. Dette gjør det lettere for brukere med skjermleser å forstå at feltene hører til samme gruppe."
      >
        <fieldset hviFieldset>
          <legend hviLabel weight="medium">
            <h2 hviHeading>Hvor skal du reise?</h2>
          </legend>
          <ds-field>
            <input hviInput type="radio" id="oslo" name="reise" value="oslo" />
            <label hviLabel for="oslo">Oslo</label>
          </ds-field>
          <ds-field>
            <input hviInput type="radio" id="bergen" name="reise" value="bergen" />
            <label hviLabel for="bergen">Bergen</label>
          </ds-field>
          <ds-field>
            <input hviInput type="radio" id="trondheim" name="reise" value="trondheim" />
            <label hviLabel for="trondheim">Trondheim</label>
          </ds-field>
        </fieldset>
      </app-demo-section>

      <!-- Checkbox-gruppe -->
      <app-demo-section
        title="Checkbox-gruppe"
        [code]="checkboxGruppeCode"
        description="Fieldset kan også brukes til å gruppere flere checkboxer."
      >
        <fieldset hviFieldset>
          <legend hviLabel weight="medium">Hvilke interesser har du?</legend>
          <p hviParagraph>Velg alle som passer.</p>
          <ds-field>
            <input hviInput type="checkbox" id="sport" value="sport" />
            <label hviLabel for="sport">Sport og trening</label>
          </ds-field>
          <ds-field>
            <input hviInput type="checkbox" id="musikk" value="musikk" />
            <label hviLabel for="musikk">Musikk og konserter</label>
          </ds-field>
          <ds-field>
            <input hviInput type="checkbox" id="teknologi" value="teknologi" checked />
            <label hviLabel for="teknologi">Teknologi og programmering</label>
          </ds-field>
        </fieldset>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class FieldsetDemoComponent {
  readonly radioGruppeCode = FieldsetRadioGruppeExampleSource;
  readonly checkboxCode = FieldsetCheckboxExampleSource;
  readonly legendSomHeadingCode = FieldsetLegendSomHeadingExampleSource;
  readonly checkboxGruppeCode = FieldsetCheckboxGruppeExampleSource;
}
