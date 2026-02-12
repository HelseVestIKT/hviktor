import { Component } from '@angular/core';
import {
  HviCard,
  HviDetails,
  HviDetailsContent,
  HviDetailsSummary,
  HviHeading,
  HviParagraph,
} from '@helsevestikt/hviktor';

@Component({
  selector: 'app-details-demo',
  standalone: true,
  imports: [HviDetails, HviDetailsSummary, HviDetailsContent, HviCard, HviHeading, HviParagraph],
  template: `
    <header class="mb-8">
      <h1 hviHeading size="xl">Details</h1>
      <p hviParagraph>Utvidbart innhold som kan vises eller skjules.</p>
    </header>

    <section class="mb-8">
      <h2 hviHeading size="md">Varianter</h2>
      <div class="mt-4 flex flex-col gap-2">
        <hvi-details variant="tinted">
          <hvi-details-summary>
            <p size="md">Detaljer (tinted)</p>
          </hvi-details-summary>
          <hvi-details-content>
            <p>Her er innholdet i detaljene.</p>
          </hvi-details-content>
        </hvi-details>

        <hvi-details>
          <hvi-details-summary>
            <p size="md">Detaljer (default)</p>
          </hvi-details-summary>
          <hvi-details-content>
            <p>Her er innholdet i detaljene.</p>
          </hvi-details-content>
        </hvi-details>
      </div>
    </section>

    <section class="mb-8">
      <h2 hviHeading size="md">I kort</h2>
      <hvi-card color="brand2">
        <hvi-details variant="tinted">
          <hvi-details-summary>
            <p size="md">Detaljer</p>
          </hvi-details-summary>
          <hvi-details-content>
            <p>Her er innholdet i detaljene.</p>
          </hvi-details-content>
        </hvi-details>
        <hvi-details [open]="true">
          <hvi-details-summary>
            <p size="md">Detaljer (åpen)</p>
          </hvi-details-summary>
          <hvi-details-content>
            <p>Her er innholdet i detaljene.</p>
          </hvi-details-content>
        </hvi-details>
      </hvi-card>
    </section>
  `,
})
export class DetailsDemoComponent {}
