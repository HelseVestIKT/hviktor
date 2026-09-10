import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import {
  HviHeading,
  HviLabel,
  HviParagraph,
  HviToggleGroup,
  HviToggleGroupItem,
  HviTooltip,
} from '@helsevestikt/hviktor-angular';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { ToggleGroupGrunnleggendeExampleSource } from './code-examples/toggle-group.grunnleggende.example.source';
import { ToggleGroupKunIkonerExampleSource } from './code-examples/toggle-group.kun-ikoner.example.source';
import { ToggleGroupNyAnbefaltBrukExampleSource } from './code-examples/toggle-group.ny-anbefalt-bruk.example.source';
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
        title="Ny anbefalt bruk (label)"
        [code]="nyAnbefaltBrukCode"
        description="Anbefalt bruk av ToggleGroup med label-elementer som toggles. Denne varianten følger oppdatert struktur i Designsystemet."
      >
        <hvi-toggle-group
          [(value)]="selectedRecommended"
          variant="primary"
          aria-label="Mailboks filter"
        >
          <label hviToggleGroupItem value="innboks">Innboks</label>
          <label hviToggleGroupItem value="utkast">Utkast</label>
          <label hviToggleGroupItem value="arkiv">Arkiv</label>
          <label hviToggleGroupItem value="sendt">Sendt</label>
        </hvi-toggle-group>
        <p hviParagraph class="mt-2">Valgt: {{ selectedRecommended() }}</p>
      </app-demo-section>

      <!-- Grunnleggende -->
      <app-demo-section
        title="Grunnleggende"
        [code]="grunnleggendeCode"
        description="Bakoverkompatibel bruk med button-elementer. For ny implementasjon anbefales seksjonen over med label-elementer."
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
          <label hviToggleGroupItem value="innboks">Innboks</label>
          <label hviToggleGroupItem value="utkast">Utkast</label>
          <label hviToggleGroupItem value="arkiv">Arkiv</label>
          <label hviToggleGroupItem value="sendt">Sendt</label>
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
            </hvi-toggle-group>
          </div>
          <div class="flex flex-col gap-2">
            <h3 hviHeading size="sm">md</h3>
            <hvi-toggle-group [(value)]="medium" variant="primary" size="md">
              <label hviToggleGroupItem value="innboks" aria-label="Innboks">Innboks</label>
              <label hviToggleGroupItem value="utkast" aria-label="Utkast">Utkast</label>
              <label hviToggleGroupItem value="arkiv" aria-label="Arkiv">Arkiv</label>
            </hvi-toggle-group>
          </div>
          <div class="flex flex-col gap-2">
            <h3 hviHeading size="sm">lg</h3>
            <hvi-toggle-group [(value)]="large" variant="primary" size="lg">
              <label hviToggleGroupItem value="innboks" aria-label="Innboks">Innboks</label>
              <label hviToggleGroupItem value="utkast" aria-label="Utkast">Utkast</label>
              <label hviToggleGroupItem value="arkiv" aria-label="Arkiv">Arkiv</label>
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
          <label hviToggleGroupItem value="liste">Liste</label>
          <label hviToggleGroupItem value="rutenett">Rutenett</label>
          <label hviToggleGroupItem value="kompakt">Kompakt</label>
        </hvi-toggle-group>
        <p hviParagraph class="mt-2">Viser innhold som: {{ selectedView() }}</p>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class ToggleGroupDemoComponent {
  readonly storrelseCode = ToggleGroupStorrelseExampleSource;
  readonly nyAnbefaltBrukCode = ToggleGroupNyAnbefaltBrukExampleSource;
  readonly grunnleggendeCode = ToggleGroupGrunnleggendeExampleSource;
  readonly secondaryVariantCode = ToggleGroupSecondaryVariantExampleSource;
  readonly kunIkonerCode = ToggleGroupKunIkonerExampleSource;
  readonly visningsvalgCode = ToggleGroupVisningsvalgExampleSource;

  selectedRecommended = signal('innboks');
  selectedBasic = signal('innboks');
  selectedSecondary = signal('innboks');
  selectedIconOnly = signal('left');
  selectedView = signal('liste');
  small = signal('innboks');
  medium = signal('innboks');
  large = signal('innboks');
}
