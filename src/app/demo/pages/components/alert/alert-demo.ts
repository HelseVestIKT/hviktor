import { Component } from '@angular/core';
import { HviAlert, HviParagraph } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';
import { AlertMedTittelExampleSource } from './code-examples/alert.med-tittel.example.source';
import { AlertUtenTittelExampleSource } from './code-examples/alert.uten-tittel.example.source';
import { AlertVarianterExampleSource } from './code-examples/alert.varianter.example.source';

@Component({
  selector: 'app-alert-demo',
  standalone: true,
  imports: [HviAlert, HviParagraph, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page componentId="alert">
      <app-demo-section title="Varianter" [code]="varianterCode">
        <div class="flex flex-wrap gap-2">
          <hvi-alert>Dette er en info alert</hvi-alert>
          <hvi-alert color="success">Dette er en success alert</hvi-alert>
          <hvi-alert color="warning">Dette er en warning alert</hvi-alert>
          <hvi-alert color="danger">Dette er en danger alert</hvi-alert>
        </div>
      </app-demo-section>
      <app-demo-section title="Med tittel" [code]="medTittelCode">
        <div class="flex flex-wrap gap-2">
          <hvi-alert title="Har du husket å bestille passtime?">
            <p hviParagraph>
              Det er lange køer for å bestille pass om dagen, det kan være lurt å bestille i god tid
              før du skal reise.
            </p>
          </hvi-alert>
        </div>
      </app-demo-section>
      <app-demo-section title="Uten tittel" [code]="utenTittelCode">
        <div class="flex flex-wrap gap-2">
          <hvi-alert color="warning">
            Vi har tekniske problemer. Vi jobber med å rette problemene.
          </hvi-alert>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class AlertDemoComponent {
  readonly varianterCode = AlertVarianterExampleSource;
  readonly medTittelCode = AlertMedTittelExampleSource;
  readonly utenTittelCode = AlertUtenTittelExampleSource;
}
