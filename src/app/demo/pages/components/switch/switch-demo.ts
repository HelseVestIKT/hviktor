import { Component } from '@angular/core';
import {
  HviDivider,
  HviField,
  HviFieldDescription,
  HviFieldset,
  HviInput,
  HviLabel,
} from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { SwitchGrunnleggendeExampleSource } from './code-examples/switch.grunnleggende.example.source';
import { SwitchGrupperingExampleSource } from './code-examples/switch.gruppering.example.source';
import { SwitchHoyrejustertExampleSource } from './code-examples/switch.hoyrejustert.example.source';
import { SwitchOutlineExampleSource } from './code-examples/switch.outline.example.source';
@Component({
  selector: 'app-switch-demo',
  standalone: true,
  imports: [
    DemoPageComponent,
    DemoSectionComponent,
    HviField,
    HviFieldDescription,
    HviFieldset,
    HviInput,
    HviLabel,
    HviDivider,
  ],
  template: `
    <app-demo-page componentId="switch">
      <!-- Grunnleggende -->
      <app-demo-section
        title="Grunnleggende"
        [code]="grunnleggendeCode"
        description="En enkel switch med label."
      >
        <hvi-field>
          <input hviInput type="checkbox" role="switch" id="basic-switch" />
          <label hviLabel for="basic-switch">Switch</label>
        </hvi-field>
      </app-demo-section>

      <!-- Gruppering -->
      <app-demo-section
        title="Gruppering"
        [code]="grupperingCode"
        description="Bruk Fieldset for å gruppere flere Switch-komponenter sammen."
      >
        <fieldset hviFieldset>
          <legend hviLabel weight="medium">Skru av/på lys</legend>
          <hvi-field>
            <input hviInput type="checkbox" role="switch" id="switch-stue" checked />
            <label hviLabel for="switch-stue">Stue</label>
          </hvi-field>
          <hvi-field>
            <input hviInput type="checkbox" role="switch" id="switch-kjokken" />
            <label hviLabel for="switch-kjokken">Kjøkken</label>
          </hvi-field>
          <hvi-field>
            <input hviInput type="checkbox" role="switch" id="switch-bad" />
            <label hviLabel for="switch-bad">Bad</label>
          </hvi-field>
          <hvi-field>
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
          </hvi-field>
        </fieldset>
      </app-demo-section>

      <!-- Høyrejustert -->
      <app-demo-section
        title="Høyrejustert"
        [code]="hoyrejustertCode"
        description="Noen ganger kan det være nyttig å høyrejustere Switch, for eksempel når den er plassert i en tabell eller et fast oppsett."
      >
        <div style="flex-direction: column; width: 100%; max-width: 380px;">
          <hr hviDivider aria-hidden="true" />
          <hvi-field position="end" style="align-items: center; padding: var(--ds-size-2) 0;">
            <label hviLabel weight="medium" for="switch-flymodus">Flymodus</label>
            <input hviInput type="checkbox" role="switch" id="switch-flymodus" />
          </hvi-field>
          <hr hviDivider aria-hidden="true" />
          <hvi-field position="end" style="align-items: center; padding: var(--ds-size-2) 0;">
            <label hviLabel weight="medium" for="switch-lydlos">Lydløs</label>
            <input hviInput type="checkbox" role="switch" id="switch-lydlos" />
          </hvi-field>
          <hr hviDivider aria-hidden="true" />
        </div>
      </app-demo-section>
      <!-- Outline -->
      <app-demo-section
        title="Outline"
        [code]="outlineCode"
        description="outline-attributtet legges på hvi-field – ikke på selve input-elementet. Det gir ekstra padding og en ramme rundt hvert valg for å skape en større klikkflate."
      >
        <fieldset hviFieldset>
          <legend hviLabel weight="medium">Varsler</legend>
          <hvi-field outline>
            <input hviInput type="checkbox" role="switch" id="outline-switch-epost" />
            <label hviLabel for="outline-switch-epost">E-postvarsler</label>
            <span hviFieldDescription>Få varsler på e-post</span>
          </hvi-field>
          <hvi-field outline>
            <input hviInput type="checkbox" role="switch" id="outline-switch-sms" />
            <label hviLabel for="outline-switch-sms">SMS-varsler</label>
            <span hviFieldDescription>Få varsler på SMS</span>
          </hvi-field>
          <hvi-field outline>
            <input hviInput type="checkbox" role="switch" id="outline-switch-push" checked />
            <label hviLabel for="outline-switch-push">Push-varsler</label>
            <span hviFieldDescription>Få varsler i appen</span>
          </hvi-field>
        </fieldset>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class SwitchDemoComponent {
  readonly grunnleggendeCode = SwitchGrunnleggendeExampleSource;
  readonly grupperingCode = SwitchGrupperingExampleSource;
  readonly hoyrejustertCode = SwitchHoyrejustertExampleSource;
  readonly outlineCode = SwitchOutlineExampleSource;
}
