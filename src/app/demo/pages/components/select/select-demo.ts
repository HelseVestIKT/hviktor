import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  HviField,
  HviFieldDescription,
  HviHeading,
  HviLabel,
  HviLink,
  HviList,
  HviParagraph,
  HviSelect,
} from '@helsevestikt/hviktor-angular';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { SelectBreddeExampleSource } from './code-examples/select.bredde.example.source';
import { SelectDisabledExampleSource } from './code-examples/select.disabled.example.source';
import { SelectGrunnleggendeExampleSource } from './code-examples/select.grunnleggende.example.source';
import { SelectGrupperingExampleSource } from './code-examples/select.gruppering.example.source';
import { SelectReadonlyExampleSource } from './code-examples/select.readonly.example.source';
@Component({
  selector: 'app-select-demo',
  standalone: true,
  imports: [
    DemoPageComponent,
    DemoSectionComponent,
    RouterLink,
    HviField,
    HviFieldDescription,
    HviHeading,
    HviLabel,
    HviLink,
    HviList,
    HviParagraph,
    HviSelect,
  ],
  template: `
    <app-demo-page componentId="select">
      <!-- Grunnleggende -->
      <app-demo-section
        title="Grunnleggende"
        [code]="grunnleggendeCode"
        description="Select skal alltid ha en label. Det første alternativet er en ledetekst som ikke kan velges, og som vises frem til brukeren har valgt et alternativ."
      >
        <hvi-field>
          <label hviLabel for="bostedsland" weight="medium">Velg bostedsland</label>
          <select hviSelect id="bostedsland">
            <option value="" disabled selected>Velg land</option>
            <option value="dk">Danmark</option>
            <option value="ee">Estland</option>
            <option value="fi">Finland</option>
            <option value="is">Island</option>
            <option value="lv">Latvia</option>
            <option value="lt">Litauen</option>
            <option value="no">Norge</option>
            <option value="se">Sverige</option>
          </select>
        </hvi-field>
      </app-demo-section>

      <div class="mb-8 flex flex-col gap-4">
        <p hviParagraph><strong>Bruk select når</strong></p>
        <ul hviList>
          <li>brukeren skal velge ett alternativ fra en liste med mange alternativer</li>
          <li>du trenger en kompakt måte å vise mange alternativer på</li>
        </ul>

        <p hviParagraph><strong>Unngå select når</strong></p>
        <ul hviList>
          <li>
            det er få alternativer og god plass. Da er det enklere for brukeren med
            <a hviLink routerLink="/komponenter/radio">Radio</a>
          </li>
          <li>brukeren skal navigere mellom sider eller deler av en løsning</li>
          <li>
            brukeren skal kunne velge flere alternativer. Bruk heller
            <a hviLink routerLink="/komponenter/checkbox">Checkbox</a> eller
            <a hviLink routerLink="/komponenter/suggestion">Suggestion</a>
          </li>
        </ul>
      </div>

      <h2 hviHeading size="md">Retningslinjer</h2>
      <div class="mb-8 flex max-w-3xl flex-col gap-4">
        <p hviParagraph>
          Bruk select når brukeren skal velge mellom 7 eller flere alternativer. Når det er færre
          alternativer, er det enklere for brukeren å se alle valgene samtidig med
          <a hviLink routerLink="/komponenter/radio">Radio</a>. Prøv gjerne å stille spørsmål som
          gjør at du kan ha færre alternativer.
        </p>
        <p hviParagraph>
          Select følger operativsystemets standarder, og fungerer derfor godt både på mobil og med
          skjermleser. Trenger brukeren å søke i eller filtrere alternativene, bør du heller bruke
          <a hviLink routerLink="/komponenter/suggestion">Suggestion</a>.
        </p>
        <ul hviList>
          <li>
            Sorter alternativene alfabetisk, med mindre det er en god grunn til å gjøre noe annet.
          </li>
          <li>
            Hold ledeteksten kort, helst på én linje. Bruk innarbeidede formuleringer som «Velg
            avdeling» for kjente kategorier, og et spørsmål når temaet er mindre kjent.
          </li>
          <li>Hold alternativene så korte som mulig, og bruk samme form på alle.</li>
        </ul>
      </div>

      <!-- Bredde -->
      <app-demo-section
        title="Bredde"
        [code]="breddeCode"
        description="Med width='auto' tilpasser select bredden etter det lengste alternativet, i stedet for å fylle tilgjengelig plass."
      >
        <hvi-field>
          <label hviLabel for="fylke" weight="medium">Hvilket fylke bor du i?</label>
          <select hviSelect id="fylke" width="auto">
            <option value="" disabled selected>Velg fylke</option>
            <option value="agder">Agder</option>
            <option value="akershus">Akershus</option>
            <option value="buskerud">Buskerud</option>
            <option value="finnmark">Finnmark</option>
            <option value="innlandet">Innlandet</option>
            <option value="more-og-romsdal">Møre og Romsdal</option>
            <option value="nordland">Nordland</option>
            <option value="oslo">Oslo</option>
            <option value="rogaland">Rogaland</option>
            <option value="telemark">Telemark</option>
            <option value="troms">Troms</option>
            <option value="trondelag">Trøndelag</option>
            <option value="vestfold">Vestfold</option>
            <option value="vestland">Vestland</option>
            <option value="ostfold">Østfold</option>
          </select>
        </hvi-field>
      </app-demo-section>

      <!-- Gruppering -->
      <app-demo-section
        title="Gruppering"
        [code]="grupperingCode"
        description="Bruk optgroup for å dele lange lister inn i kategorier. Det gjør det enklere å få oversikt og finne riktig alternativ."
      >
        <hvi-field>
          <label hviLabel for="avdeling" weight="medium">Velg avdeling</label>
          <select hviSelect id="avdeling" width="auto">
            <option value="" disabled selected>Velg avdeling</option>
            <optgroup label="Haukeland universitetssjukehus">
              <option value="hus-barn">Barne- og ungdomsklinikken</option>
              <option value="hus-kvinne">Kvinneklinikken</option>
              <option value="hus-medisin">Medisinsk klinikk</option>
              <option value="hus-ortopedi">Ortopedisk klinikk</option>
            </optgroup>
            <optgroup label="Voss sjukehus">
              <option value="voss-akutt">Akuttmottak</option>
              <option value="voss-fodsel">Fødeavdeling</option>
              <option value="voss-kirurgi">Kirurgisk avdeling</option>
              <option value="voss-medisin">Medisinsk avdeling</option>
            </optgroup>
          </select>
        </hvi-field>
      </app-demo-section>

      <!-- ReadOnly -->
      <app-demo-section
        title="ReadOnly"
        [code]="readonlyCode"
        description="Bruk readOnly når du vil vise en forhåndsvalgt verdi som brukeren ikke kan endre, for eksempel når verdien er bestemt av systemet eller i et tidligere steg."
      >
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
      </app-demo-section>

      <!-- Disabled -->
      <app-demo-section
        title="Disabled"
        [code]="disabledCode"
        description="Unngå å deaktivere select hvis du kan. Brukeren forstår ikke alltid hvorfor feltet ikke er tilgjengelig, og deaktiverte felt har lav kontrast. Vurder om feltet trengs, om readOnly passer bedre, eller om informasjonen kan vises som tekst."
      >
        <hvi-field>
          <label hviLabel for="maned" weight="medium">Velg måned</label>
          <select hviSelect id="maned" width="auto" disabled>
            <option value="" disabled selected>Velg måned</option>
            <option value="1">Januar</option>
            <option value="2">Februar</option>
            <option value="3">Mars</option>
            <option value="4">April</option>
            <option value="5">Mai</option>
            <option value="6">Juni</option>
            <option value="7">Juli</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">Oktober</option>
            <option value="11">November</option>
            <option value="12">Desember</option>
          </select>
        </hvi-field>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class SelectDemoComponent {
  readonly grunnleggendeCode = SelectGrunnleggendeExampleSource;
  readonly breddeCode = SelectBreddeExampleSource;
  readonly grupperingCode = SelectGrupperingExampleSource;
  readonly readonlyCode = SelectReadonlyExampleSource;
  readonly disabledCode = SelectDisabledExampleSource;
}
