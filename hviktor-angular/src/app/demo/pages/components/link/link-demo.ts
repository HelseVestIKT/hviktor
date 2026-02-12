import { Component } from '@angular/core';
import { HviHeading, HviLink, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-link-demo',
  standalone: true,
  imports: [HviLink, HviHeading, HviParagraph],
  template: `
    <header class="mb-8">
      <h1 hviHeading size="xl">Link</h1>
      <p hviParagraph>Lenker for navigasjon og eksterne ressurser.</p>
    </header>

    <section class="mb-8">
      <h2 hviHeading size="md">Varianter</h2>
      <div class="mt-4 flex flex-wrap items-center gap-4">
        <a hviLink href="#" color="neutral">Neutral link</a>
        <a hviLink href="#" target="_blank" rel="noopener noreferrer">Ekstern link</a>
      </div>
    </section>
  `,
})
export class LinkDemoComponent {}
