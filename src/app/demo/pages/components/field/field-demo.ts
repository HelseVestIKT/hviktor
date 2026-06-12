import { Component } from '@angular/core';
import {
  HviField,
  HviFieldAffix,
  HviFieldAffixes,
  HviFieldCounter,
  HviFieldDescription,
  HviFieldValidation,
  HviFieldset,
  HviInput,
  HviLabel,
  HviParagraph,
} from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { FieldAntallTegnExampleSource } from './code-examples/field.antall-tegn.example.source';
import { FieldCheckboxOgRadioExampleSource } from './code-examples/field.checkbox-og-radio.example.source';
import { FieldGrunnleggendeExampleSource } from './code-examples/field.grunnleggende.example.source';
import { FieldOutlineExampleSource } from './code-examples/field.outline.example.source';
import { FieldPrefixSuffixExampleSource } from './code-examples/field.prefix-suffix.example.source';
@Component({
  selector: 'app-field-demo',
  standalone: true,
  imports: [
    DemoPageComponent,
    DemoSectionComponent,
    HviField,
    HviFieldAffix,
    HviFieldAffixes,
    HviFieldCounter,
    HviFieldDescription,
    HviFieldValidation,
    HviFieldset,
    HviInput,
    HviLabel,
    HviParagraph,
  ],
  template: `
    <app-demo-page componentId="field">
      <!-- Grunnleggende eksempel -->
      <app-demo-section
        title="Grunnleggende"
        [code]="grunnleggendeCode"
        description="Field kobler automatisk sammen label, description og validation med feltet via riktige ARIA-attributter."
      >
        <div style="max-width: 400px">
          <hvi-field>
            <label hviLabel for="etternavn" weight="medium">Etternavn</label>
            <p hviFieldDescription>Etternavn kan ikke inneholde mellomrom</p>
            <input
              hviInput
              id="etternavn"
              type="text"
              value="Nordmann Svenske"
              [attr.aria-invalid]="hasEtternavnError || null"
              (input)="hasEtternavnError = $any($event.target).value.includes(' ')"
            />
            @if (hasEtternavnError) {
              <p hviFieldValidation>Du kan ikke ha mellomrom i etternavnet ditt</p>
            }
          </hvi-field>
        </div>
      </app-demo-section>

      <!-- Prefix/Suffix -->
      <app-demo-section
        title="Prefix/Suffix"
        [code]="prefixSuffixCode"
        description="Prefixer og suffixer er nyttige for å vise enheter, valuta eller andre typer informasjon som er relevant for feltet. Du skal ikke bruke disse alene, siden skjermlesere ikke leser dem opp."
      >
        <div style="max-width: 400px">
          <hvi-field>
            <label hviLabel for="pris" weight="medium"
              >Hvor mange kroner koster det per måned?</label
            >
            <hvi-field-affixes>
              <hvi-field-affix>NOK</hvi-field-affix>
              <input hviInput id="pris" type="text" />
              <hvi-field-affix>pr. mnd.</hvi-field-affix>
            </hvi-field-affixes>
          </hvi-field>
        </div>
      </app-demo-section>

      <!-- Antall tegn -->
      <app-demo-section
        title="Antall tegn"
        [code]="antallTegnCode"
        description="Bruk hvi-field-counter til å informere om antall tegn brukerne kan skrive i feltet. ds-field kobler automatisk telleren til input/textarea i samme field."
      >
        <div style="width: 200px">
          <hvi-field>
            <label hviLabel for="beskrivelse" weight="medium">Legg til en beskrivelse</label>
            <input hviInput id="beskrivelse" type="text" [maxLength]="10" />
            <hvi-field-counter [limit]="10" />
          </hvi-field>
        </div>
      </app-demo-section>

      <!-- Checkbox og Radio plassering -->
      <app-demo-section
        title="Checkbox og Radio"
        [code]="checkboxOgRadioCode"
        description="Position-attributtet kan også brukes med checkbox og radio for å plassere label før eller etter kontrollen."
      >
        <div class="flex flex-col gap-4">
          <hvi-field>
            <input hviInput id="aksept" type="checkbox" />
            <label hviLabel for="aksept">Jeg godtar vilkårene</label>
          </hvi-field>

          <hvi-field>
            <input hviInput id="nyhetsbrev" type="checkbox" checked />
            <label hviLabel for="nyhetsbrev">Meld meg på nyhetsbrev</label>
          </hvi-field>
        </div>
      </app-demo-section>

      <!-- Outline -->
      <app-demo-section
        title="Outline"
        [code]="outlineCode"
        description="outline-attributtet på hvi-field legger på ekstra padding og en ramme rundt valget for å skape en større klikkflate. Det er hvi-field som styrer outline – ikke selve input-elementet. Fungerer med radio, checkbox og switch."
      >
        <fieldset hviFieldset>
          <legend hviLabel weight="medium">Hvordan ønsker du å bli kontaktet?</legend>
          <p hviParagraph>Velg metoden som passer best for deg.</p>
          <hvi-field outline>
            <input hviInput type="radio" id="outline-epost" name="field-outline" value="epost" />
            <label hviLabel for="outline-epost">E-post</label>
            <span hviFieldDescription>Vi bruker e-postadressen du har oppgitt</span>
          </hvi-field>
          <hvi-field outline>
            <input hviInput type="radio" id="outline-sms" name="field-outline" value="sms" />
            <label hviLabel for="outline-sms">SMS</label>
            <span hviFieldDescription>Vi bruker telefonnummeret du har oppgitt</span>
          </hvi-field>
          <hvi-field outline>
            <input hviInput type="radio" id="outline-brev" name="field-outline" value="brev" />
            <label hviLabel for="outline-brev">Brev</label>
            <span hviFieldDescription>Levering kan ta 3–5 virkedager</span>
          </hvi-field>
        </fieldset>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class FieldDemoComponent {
  hasEtternavnError = true;

  readonly grunnleggendeCode = FieldGrunnleggendeExampleSource;
  readonly prefixSuffixCode = FieldPrefixSuffixExampleSource;
  readonly antallTegnCode = FieldAntallTegnExampleSource;
  readonly checkboxOgRadioCode = FieldCheckboxOgRadioExampleSource;
  readonly outlineCode = FieldOutlineExampleSource;
}
