import { Component, signal } from '@angular/core';
import { HviButton, HviTab, HviTabPanel, HviTabs } from '@helsevestikt/hviktor-angular';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { TabsGrunnleggendeBrukExampleSource } from './code-examples/tabs.grunnleggende-bruk.example.source';
import { TabsKontrollertExampleSource } from './code-examples/tabs.kontrollert.example.source';
import { TabsMedMerInnholdExampleSource } from './code-examples/tabs.med-mer-innhold.example.source';
@Component({
  selector: 'app-tabs-demo',
  standalone: true,
  imports: [HviTabs, HviTab, HviTabPanel, HviButton, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page componentId="tabs">
      <app-demo-section
        title="Grunnleggende bruk"
        [code]="grunnleggendeBrukCode"
        description="Legg på en aria-label på hvi-tabs for å beskrive hva fanene representerer. Hvis du ikke legger på en aria-label, vil det bli brukt en standardverdi (Faner) som er mindre beskrivende."
      >
        <hvi-tabs aria-label="Produktdetaljer" defaultValue="tab1">
          <hvi-tab value="tab1">Oversikt</hvi-tab>
          <hvi-tab value="tab2">Beskrivelse</hvi-tab>
          <hvi-tab value="tab3">Anmeldelser</hvi-tab>
          <hvi-tab-panel value="tab1">Innhold 1</hvi-tab-panel>
          <hvi-tab-panel value="tab2">Innhold 2</hvi-tab-panel>
          <hvi-tab-panel value="tab3">Innhold 3</hvi-tab-panel>
        </hvi-tabs>
      </app-demo-section>

      <app-demo-section
        title="Kontrollert"
        [code]="kontrollertCode"
        description="Bruk [(value)] for å styre valgt fane fra koden, for eksempel fra en knapp eller lenke inne i et panel. Verdien oppdateres også når brukeren klikker på en fane."
      >
        <p class="ds-paragraph">Valgt tab: {{ selectedTab() }}</p>
        <hvi-tabs [(value)]="selectedTab">
          <hvi-tab value="value1">Tab 1</hvi-tab>
          <hvi-tab value="value2">Tab 2</hvi-tab>
          <hvi-tab value="value3">Tab 3</hvi-tab>
          <hvi-tab-panel value="value1">
            <p class="ds-paragraph">Innhold for tab 1</p>
            <button hviButton variant="secondary" (click)="selectedTab.set('value2')">
              Gå til tab 2
            </button>
          </hvi-tab-panel>
          <hvi-tab-panel value="value2">
            <p class="ds-paragraph">Innhold for tab 2</p>
            <button hviButton variant="secondary" (click)="selectedTab.set('value3')">
              Gå til tab 3
            </button>
          </hvi-tab-panel>
          <hvi-tab-panel value="value3">
            <p class="ds-paragraph">Innhold for tab 3</p>
            <button hviButton variant="secondary" (click)="selectedTab.set('value1')">
              Tilbake til tab 1
            </button>
          </hvi-tab-panel>
        </hvi-tabs>
      </app-demo-section>

      <app-demo-section title="Med mer innhold" [code]="medMerInnholdCode">
        <hvi-tabs aria-label="Brukerinnstillinger" defaultValue="overview">
          <hvi-tab value="overview">Oversikt</hvi-tab>
          <hvi-tab value="details">Detaljer</hvi-tab>
          <hvi-tab value="settings">Innstillinger</hvi-tab>
          <hvi-tab-panel value="overview">
            <div class="ds-paragraph">
              <p>
                Dette er oversiktssiden. Her kan du se generell informasjon om emnet du ser på.
                Oversikten gir deg en rask innføring i de viktigste punktene.
              </p>
            </div>
          </hvi-tab-panel>
          <hvi-tab-panel value="details">
            <div class="ds-paragraph">
              <p>
                Her finner du mer detaljert informasjon. Denne seksjonen inneholder utdypende
                beskrivelser og tekniske detaljer som kan være nyttige for videre arbeid.
              </p>
            </div>
          </hvi-tab-panel>
          <hvi-tab-panel value="settings">
            <div class="ds-paragraph">
              <p>
                I denne seksjonen kan du konfigurere ulike innstillinger. Tilpass oppsettet etter
                dine behov og preferanser.
              </p>
            </div>
          </hvi-tab-panel>
        </hvi-tabs>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class TabsDemoComponent {
  readonly grunnleggendeBrukCode = TabsGrunnleggendeBrukExampleSource;
  readonly kontrollertCode = TabsKontrollertExampleSource;
  readonly medMerInnholdCode = TabsMedMerInnholdExampleSource;

  readonly selectedTab = signal('value1');
}
