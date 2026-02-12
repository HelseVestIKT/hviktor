import { Component } from '@angular/core';
import { HviHeading, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-paragraph-demo',
  standalone: true,
  imports: [HviHeading, HviParagraph],
  template: `
    <header class="mb-8">
      <h1 hviHeading size="xl">Paragraph</h1>
      <p hviParagraph>Avsnitt for løpende tekst.</p>
    </header>

    <section class="mb-8">
      <h2 hviHeading size="md">Størrelser</h2>
      <div class="mt-4 flex flex-col gap-4">
        <p hviParagraph size="lg">
          Large paragraph - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <p hviParagraph size="md">
          Medium paragraph (default) - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <p hviParagraph size="sm">
          Small paragraph - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </section>
  `,
})
export class ParagraphDemoComponent {}
