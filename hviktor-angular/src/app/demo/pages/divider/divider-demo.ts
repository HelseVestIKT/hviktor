import { Component } from '@angular/core';
import { HviDivider, HviHeading, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-divider-demo',
  standalone: true,
  imports: [HviDivider, HviHeading, HviParagraph],
  template: `
    <header class="mb-8">
      <h1 hviHeading size="xl">Divider</h1>
      <p hviParagraph>Skillelinjer for å separere innhold visuelt.</p>
    </header>

    <section class="mb-8">
      <h2 hviHeading size="md">Standard</h2>
      <div class="mt-4 flex flex-col gap-4">
        <p hviParagraph>Innhold over skillelinjen</p>
        <hr hviDivider />
        <p hviParagraph>Innhold under skillelinjen</p>
      </div>
    </section>
  `,
})
export class DividerDemoComponent {}
