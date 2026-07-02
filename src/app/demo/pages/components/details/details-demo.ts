import { Component } from '@angular/core';
import { HviCard, HviDetails, HviLink, HviParagraph } from '@helsevestikt/hviktor-angular';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { DetailsIKortExampleSource } from './code-examples/details.i-kort.example.source';
import { DetailsVarianterExampleSource } from './code-examples/details.varianter.example.source';
@Component({
  selector: 'app-details-demo',
  standalone: true,
  imports: [HviDetails, HviCard, DemoPageComponent, DemoSectionComponent, HviParagraph, HviLink],
  template: `
    <app-demo-page componentId="details">
      <app-demo-section title="Standard" [code]="varianterCode">
        <details hviDetails>
          <summary>Hvem kan registrere seg i Frivillighetsregisteret?</summary>
          <div>
            <p>
              For å kunne bli registrert i Frivillighetsregisteret, må organisasjonen drive
              frivillig virksomhet. Det er bare foreninger, stiftelser og aksjeselskap som kan
              registreres. Virksomheten kan ikke dele ut midler til fysiske personer. Virksomheten
              må ha et styre.
            </p>
          </div>
        </details>
      </app-demo-section>

      <app-demo-section title="I kort" [code]="iKortCode">
        <p>
          Du kan bruke details i eit kort for å få ramme rundt innhaldet. Dette passar i tilfeller
          der details ikkje dekkjer heile sida, eller når det berre er ei rad.
        </p>
        <div class="flex flex-col gap-4">
          <hvi-card>
            <details hviDetails variant="tinted">
              <summary>Hvordan får jeg tildelt et jegernummer?</summary>
              <div>
                Du vil automatisk få tildelt jegernummer og bli registrert i Jegerregisteret når du
                har bestått jegerprøven.
              </div>
            </details>
            <details hviDetails variant="tinted">
              <summary>Jeg har glemt jegernummeret mitt. Hvor finner jeg dette?</summary>
              <div>
                <p hviParagraph>
                  Du kan finne dette ved å logge inn på
                  <a hviLink href="https://minjegerside.brreg.no/">Min side</a>
                </p>
              </div>
            </details>
          </hvi-card>

          <hvi-card color="brand1">
            <details hviDetails>
              <summary>Vedlegg</summary>
              <div>Vedlegg 1, vedlegg 2, vedlegg 3</div>
            </details>
          </hvi-card>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class DetailsDemoComponent {
  readonly varianterCode = DetailsVarianterExampleSource;
  readonly iKortCode = DetailsIKortExampleSource;
}
