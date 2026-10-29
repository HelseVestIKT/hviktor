import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  HviButton,
  HviField,
  HviLabel,
  HviSelect,
  HviTextfield,
} from '@helsevestikt/hviktor-angular';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { TextfieldBreddeExampleSource } from './code-examples/textfield.bredde.example.source';
import { TextfieldGrunnleggendeExampleSource } from './code-examples/textfield.grunnleggende.example.source';
import { TextfieldMedPrefiksOgSuffiksExampleSource } from './code-examples/textfield.med-prefiks-og-suffiks.example.source';
import { TextfieldMedTellerExampleSource } from './code-examples/textfield.med-teller.example.source';
import { TextfieldPakrevdeOgValgfrieFeltExampleSource } from './code-examples/textfield.pakrevde-og-valgfrie-felt.example.source';
import { TextfieldToveisbindingExampleSource } from './code-examples/textfield.toveisbinding.example.source';
import { TextfieldTypeExampleSource } from './code-examples/textfield.type.example.source';

export type HviTextfieldType =
  | 'number'
  | 'hidden'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'month'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

@Component({
  selector: 'app-textfield-demo',
  standalone: true,
  imports: [
    DemoPageComponent,
    DemoSectionComponent,
    HviTextfield,
    HviField,
    HviLabel,
    FormsModule,
    HviSelect,
    HviButton,
  ],
  template: `
    <app-demo-page componentId="textfield">
      <!-- Grunnleggende -->
      <app-demo-section
        title="Grunnleggende"
        [code]="grunnleggendeCode"
        description="Et enkelt tekstfelt med label."
      >
        <hvi-textfield label="Label"></hvi-textfield>
      </app-demo-section>

      <!-- Med prefiks og suffiks -->
      <app-demo-section
        title="Med prefiks og suffiks"
        [code]="medPrefiksOgSuffiksCode"
        description="Prefikser og suffikser er nyttige for å vise enheter, valuta eller annen informasjon som er relevant for feltet. De kobles til feltet med aria-describedby slik at skjermlesere leser dem opp, men samme informasjon skal også stå i ledeteksten."
      >
        <hvi-textfield
          label="Hvor mange kroner koster det per måned?"
          prefix="NOK"
          suffix="pr. mnd"
        ></hvi-textfield>
      </app-demo-section>

      <!-- Med teller -->
      <app-demo-section
        title="Med teller"
        [code]="medTellerCode"
        description="Bruk counterLimit for å informere om antall tegn brukerne kan skrive i feltet."
      >
        <hvi-textfield
          label="Hvor mange kroner koster det per måned?"
          [counterLimit]="10"
        ></hvi-textfield>
      </app-demo-section>

      <!-- Bredde -->
      <app-demo-section
        title="Bredde"
        [code]="breddeCode"
        description="Tilpass bredden etter hva brukerne skal skrive inn: kort bredde for postnummer og telefonnummer, bredere for stedsnavn. Ulik bredde gjør det lettere å navigere i skjemaer med mange felt. Bruk size for å angi bredden i antall tegn, eller width med verdien auto for feltets naturlige bredde. Uten disse fyller feltet hele bredden."
      >
        <div class="space-y-4">
          <hvi-textfield label="Postnummer" [size]="4" autocomplete="postal-code" />
          <hvi-textfield label="Telefonnummer" type="tel" [size]="10" autocomplete="tel" />
          <hvi-textfield label="Poststed" width="auto" autocomplete="address-level2" />
          <hvi-textfield label="Adresse" autocomplete="street-address" />
        </div>
      </app-demo-section>

      <!-- Påkrevde og valgfrie felt -->
      <app-demo-section
        title="Påkrevde og valgfrie felt"
        [code]="pakrevdeOgValgfrieFeltCode"
        description="Det er lovpålagt å markere påkrevde felt. Bruk requiredMode for å vise en RequiredTag ved siden av label. Når textfield brukes i et hviForm med FormGroup, settes requiredMode automatisk."
      >
        <div class="space-y-4">
          <hvi-textfield label="Hvor bor du?" requiredMode="required" required></hvi-textfield>
          <hvi-textfield label="Kommentar" requiredMode="optional"></hvi-textfield>
        </div>
      </app-demo-section>

      <!-- Type -->
      <app-demo-section
        title="Type"
        [code]="typeCode"
        description="Siden Textfield er basert på native input, kan du bruke de fleste type-verdiene input støtter. Velg en type i nedtrekksmenyen for å se resultatet."
      >
        <div class="flex gap-2">
          <hvi-field>
            <label hviLabel for="type-select" weight="medium">Velg type</label>
            <select hviSelect id="type-select" [(ngModel)]="selectedType">
              @for (type of types; track type) {
                <option [value]="type" [selected]="type === selectedType">{{ type }}</option>
              }
            </select>
          </hvi-field>

          <hvi-textfield
            [label]="'type=&quot;' + selectedType + '&quot;'"
            [type]="selectedType"
          ></hvi-textfield>
        </div>
      </app-demo-section>

      <!-- Toveisbinding -->
      <app-demo-section
        title="Toveisbinding"
        [code]="toveisbindingCode"
        description="Verdien kan bindes med ngModel, formControlName eller [(value)]. Feltet oppdateres også når verdien settes programmatisk."
      >
        <div class="space-y-4">
          <hvi-textfield label="Navn" [(value)]="navn" />
          <p>Verdi: {{ navn() || 'tom' }}</p>
          <button hviButton variant="secondary" (click)="navn.set('Kari Nordmann')">
            Sett verdi utenfra
          </button>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class TextfieldDemoComponent {
  readonly grunnleggendeCode = TextfieldGrunnleggendeExampleSource;
  readonly medPrefiksOgSuffiksCode = TextfieldMedPrefiksOgSuffiksExampleSource;
  readonly medTellerCode = TextfieldMedTellerExampleSource;
  readonly breddeCode = TextfieldBreddeExampleSource;
  readonly pakrevdeOgValgfrieFeltCode = TextfieldPakrevdeOgValgfrieFeltExampleSource;
  readonly typeCode = TextfieldTypeExampleSource;
  readonly toveisbindingCode = TextfieldToveisbindingExampleSource;

  readonly navn = signal('');

  readonly types: HviTextfieldType[] = [
    'number',
    'hidden',
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'month',
    'password',
    'search',
    'tel',
    'text',
    'time',
    'url',
    'week',
  ];

  selectedType: HviTextfieldType = 'text';
}
