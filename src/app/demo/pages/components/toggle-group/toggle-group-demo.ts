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
        <hvi-toggle-group [(value)]="selectedBasic" variant="primary" aria-label="Mailboks filter">
          <button hviToggleGroupItem value="innboks" aria>Innboks</button>
          <button hviToggleGroupItem value="utkast">Utkast</button>
          <button hviToggleGroupItem value="arkiv">Arkiv</button>
          <button hviToggleGroupItem value="sendt">Sendt</button>
        </hvi-toggle-group>
        <p hviParagraph class="mt-2">Valgt: {{ selectedBasic() }}</p>
      </app-demo-section>

      <!-- Secondary variant -->
      <app-demo-section
        title="Secondary variant"
        [code]="secondaryVariantCode"
        description="ToggleGroup med secondary variant."
      >
        <label hviLabel for="secondary-toggle">Mailboks filter:</label>
        <hvi-toggle-group
          [(value)]="selectedSecondary"
          variant="secondary"
          aria-labelledby="secondary-toggle"
        >
          <button hviToggleGroupItem value="innboks">Innboks</button>
          <button hviToggleGroupItem value="utkast">Utkast</button>
          <button hviToggleGroupItem value="arkiv">Arkiv</button>
          <button hviToggleGroupItem value="sendt">Sendt</button>
        </hvi-toggle-group>
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
            <hvi-toggle-group [(value)]="small" variant="primary" size="sm">
              <button
                hviToggleGroupItem
                value="innboks"
                aria-label="
              Innboks"
              >
                Innboks
              </button>
              <button hviToggleGroupItem value="utkast" aria-label="Utkast">Utkast</button>
              <button hviToggleGroupItem value="arkiv" aria-label="Arkiv">Arkiv</button>
            </hvi-toggle-group>
          </div>
          <div class="flex flex-col gap-2">
            <h3 hviHeading size="sm">md</h3>
            <hvi-toggle-group [(value)]="medium" variant="primary" size="md">
              <button hviToggleGroupItem value="innboks" aria-label="Innboks">Innboks</button>
              <button hviToggleGroupItem value="utkast" aria-label="Utkast">Utkast</button>
              <button hviToggleGroupItem value="arkiv" aria-label="Arkiv">Arkiv</button>
            </hvi-toggle-group>
          </div>
          <div class="flex flex-col gap-2">
            <h3 hviHeading size="sm">lg</h3>
            <hvi-toggle-group [(value)]="large" variant="primary" size="lg">
              <button hviToggleGroupItem value="innboks" aria-label="Innboks">Innboks</button>
              <button hviToggleGroupItem value="utkast" aria-label="Utkast">Utkast</button>
              <button hviToggleGroupItem value="arkiv" aria-label="Arkiv">Arkiv</button>
            </hvi-toggle-group>
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
        <hvi-toggle-group
          [(value)]="selectedIconOnly"
          variant="primary"
          aria-labelledby="icon-only-toggle"
        >
          <button
            hviToggleGroupItem
            hviTooltip="Venstrestilt"
            value="left"
            icon
            aria-label="Venstrestilt"
          >
            <hvi-icon-align-left></hvi-icon-align-left>
          </button>
          <button
            hviToggleGroupItem
            hviTooltip="Midtstilt"
            value="center"
            icon
            aria-label="Midtstilt"
          >
            <hvi-icon-align-center></hvi-icon-align-center>
          </button>
          <button
            hviToggleGroupItem
            hviTooltip="Høyrestilt"
            value="right"
            icon
            aria-label="Høyrestilt"
          >
            <hvi-icon-align-right></hvi-icon-align-right>
          </button>
        </hvi-toggle-group>
      </app-demo-section>

      <!-- Visningsvalg -->
      <app-demo-section
        title="Visningsvalg"
        [code]="visningsvalgCode"
        description="Eksempel på bruk for å veksle mellom visninger."
      >
        <label hviLabel for="view-toggle">Visning:</label>
        <hvi-toggle-group [(value)]="selectedView" variant="primary" aria-labelledby="view-toggle">
          <button hviToggleGroupItem value="liste">Liste</button>
          <button hviToggleGroupItem value="rutenett">Rutenett</button>
          <button hviToggleGroupItem value="kompakt">Kompakt</button>
        </hvi-toggle-group>
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
