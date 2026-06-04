import { Component } from '@angular/core';
import { HviCard, HviDetails, HviLink, HviParagraph } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-details-i-kort-example',
  standalone: true,
  imports: [HviCard, HviDetails, HviParagraph, HviLink],
  template: `
    <hvi-card>
      <details hviDetails variant="tinted">
        <summary>Hvordan får jeg tildelt et jegernummer?</summary>
        <div>
          Du vil automatisk få tildelt jegernummer og bli registrert i Jegerregisteret når du har
          bestått jegerprøven.
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
  `,
})
export class DetailsIKortExampleComponent {}
