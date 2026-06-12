import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import {
  HviHeading,
  HviLabel,
  HviParagraph,
  HviToggleGroup,
  HviToggleGroupItem,
  HviTooltip,
} from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { ToggleGroupGrunnleggendeExampleSource } from './code-examples/toggle-group.grunnleggende.example.source';
import { ToggleGroupKunIkonerExampleSource } from './code-examples/toggle-group.kun-ikoner.example.source';
import { ToggleGroupSecondaryVariantExampleSource } from './code-examples/toggle-group.secondary-variant.example.source';
import { ToggleGroupStorrelseExampleSource } from './code-examples/toggle-group.storrelse.example.source';
import { ToggleGroupVisningsvalgExampleSource } from './code-examples/toggle-group.visningsvalg.example.source';

import '@helsevestikt/hviktor-icons/icon-align-center.webcomponent';
import '@helsevestikt/hviktor-icons/icon-align-left.webcomponent';
import '@helsevestikt/hviktor-icons/icon-align-right.webcomponent';
@Component({
  selector: 'app-toggle-group-demo',
  standalone: true,
  imports: [
    DemoPageComponent,
    DemoSectionComponent,
    HviToggleGroup,
    HviToggleGroupItem,
    HviParagraph,
    HviHeading,
    HviTooltip,
    HviLabel,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <app-demo-page componentId="toggle-group">
      <!-- Grunnleggende -->
      <app-demo-section
        title="Grunnleggende"
        [code]="grunnleggendeCode"
        description="En enkel toggle group med tekst-knapper. Hvis du ikke har en tilhørende label til toggleGroup, så må du legge til en aria-label på toggleGroup for å forklare hva valgene representerer."
      >
        <fieldset
          hviToggleGroup
          [value]="selectedBasic()"
          (valueChange)="selectedBasic.set($event)"
          variant="primary"
          aria-label="Mailboks filter"
        >
          <label hviToggleGroupItem value="innboks" aria-label="Innboks">Innboks</label>
          <label hviToggleGroupItem value="utkast" aria-label="Utkast">Utkast</label>
          <label hviToggleGroupItem value="arkiv" aria-label="Arkiv">Arkiv</label>
          <label hviToggleGroupItem value="sendt" aria-label="Sendt">Sendt</label>
        </fieldset>
        <p hviParagraph class="mt-2">Valgt: {{ selectedBasic() }}</p>
      </app-demo-section>

      <!-- Secondary variant -->
      <app-demo-section
        title="Secondary variant"
        [code]="secondaryVariantCode"
        description="ToggleGroup med secondary variant."
      >
        <label hviLabel for="secondary-toggle">Mailboks filter:</label>
        <fieldset hviToggleGroup variant="secondary" aria-labelledby="secondary-toggle">
          <label hviToggleGroupItem value="innboks" aria-label="Innboks">Innboks</label>
          <label hviToggleGroupItem value="utkast" aria-label="Utkast">Utkast</label>
          <label hviToggleGroupItem value="arkiv" aria-label="Arkiv">Arkiv</label>
          <label hviToggleGroupItem value="sendt" aria-label="Sendt">Sendt</label>
        </fieldset>
      </app-demo-section>

      <!-- Størrelse -->
      <app-demo-section
        title="Størrelse"
        [code]="storrelseCode"
        description="Eksempel på ulike størrelser av ToggleGroup. Standard er md. Bruk size-attributtet for å endre størrelsen."
      >
        <div class="flex flex-row flex-wrap gap-4">
          <div class="flex flex-col gap-2">
            <h3 hviHeading size="sm">sm</h3>
            <fieldset hviToggleGroup variant="primary" size="sm">
              <label
                hviToggleGroupItem
                value="innboks"
                aria-label="
              Innboks"
              >
                Innboks
              </label>
              <label hviToggleGroupItem value="utkast" aria-label="Utkast">Utkast</label>
              <label hviToggleGroupItem value="arkiv" aria-label="Arkiv">Arkiv</label>
            </fieldset>
          </div>
          <div class="flex flex-col gap-2">
            <h3 hviHeading size="sm">md</h3>
            <fieldset hviToggleGroup variant="primary" size="md">
              <label hviToggleGroupItem value="innboks" aria-label="Innboks">Innboks</label>
              <label hviToggleGroupItem value="utkast" aria-label="Utkast">Utkast</label>
              <label hviToggleGroupItem value="arkiv" aria-label="Arkiv">Arkiv</label>
            </fieldset>
          </div>
          <div class="flex flex-col gap-2">
            <h3 hviHeading size="sm">lg</h3>
            <fieldset hviToggleGroup variant="primary" size="lg">
              <label hviToggleGroupItem value="innboks" aria-label="Innboks">Innboks</label>
              <label hviToggleGroupItem value="utkast" aria-label="Utkast">Utkast</label>
              <label hviToggleGroupItem value="arkiv" aria-label="Arkiv">Arkiv</label>
            </fieldset>
          </div>
        </div>
      </app-demo-section>

      <!-- Kun ikoner (med tekst som placeholder) -->
      <app-demo-section
        title="Kun ikoner"
        [code]="kunIkonerCode"
        description="ToggleGroup med kun ikoner. Bruk icon-attributtet for å style knappene som kun-ikon. ToggleGroup med kun ikoner må ha tooltip og aria-label"
      >
        <label hviLabel for="icon-only-toggle">Tekstjustering:</label>
        <fieldset hviToggleGroup variant="primary" aria-labelledby="icon-only-toggle">
          <label
            hviToggleGroupItem
            hviTooltip="Venstrestilt"
            value="left"
            icon
            aria-label="Venstrestilt"
          >
            <hvi-icon-align-left></hvi-icon-align-left>
          </label>
          <label
            hviToggleGroupItem
            hviTooltip="Midtstilt"
            value="center"
            icon
            aria-label="Midtstilt"
          >
            <hvi-icon-align-center></hvi-icon-align-center>
          </label>
          <label
            hviToggleGroupItem
            hviTooltip="Høyrestilt"
            value="right"
            icon
            aria-label="Høyrestilt"
          >
            <hvi-icon-align-right></hvi-icon-align-right>
          </label>
        </fieldset>
      </app-demo-section>

      <!-- Visningsvalg -->
      <app-demo-section
        title="Visningsvalg"
        [code]="visningsvalgCode"
        description="Eksempel på bruk for å veksle mellom visninger."
      >
        <label hviLabel for="view-toggle">Visning:</label>
        <fieldset
          hviToggleGroup
          variant="primary"
          aria-labelledby="view-toggle"
          [value]="selectedView()"
          (valueChange)="selectedView.set($event)"
        >
          <label hviToggleGroupItem value="liste">Liste</label>
          <label hviToggleGroupItem value="rutenett">Rutenett</label>
          <label hviToggleGroupItem value="kompakt">Kompakt</label>
        </fieldset>
        <p hviParagraph class="mt-2">Viser innhold som: {{ selectedView() }}</p>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class ToggleGroupDemoComponent {
  readonly storrelseCode = ToggleGroupStorrelseExampleSource;
  readonly grunnleggendeCode = ToggleGroupGrunnleggendeExampleSource;
  readonly secondaryVariantCode = ToggleGroupSecondaryVariantExampleSource;
  readonly kunIkonerCode = ToggleGroupKunIkonerExampleSource;
  readonly visningsvalgCode = ToggleGroupVisningsvalgExampleSource;

  selectedBasic = signal('innboks');
  selectedSecondary = signal('innboks');
  selectedIconOnly = signal('left');
  selectedView = signal('liste');
  small = signal('innboks');
  medium = signal('innboks');
  large = signal('innboks');
}
