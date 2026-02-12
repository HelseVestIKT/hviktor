import { Component } from '@angular/core';
import { HviButton, HviCard, HviCardBlock, HviHeading, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-card-demo',
  standalone: true,
  imports: [HviCard, HviCardBlock, HviButton, HviHeading, HviParagraph],
  template: `
    <header class="mb-8">
      <h1 hviHeading size="xl">Card</h1>
      <p hviParagraph>Kort for gruppering av relatert innhold.</p>
    </header>

    <section class="mb-8">
      <h2 hviHeading size="md">Standard</h2>
      <div class="mt-4 flex flex-wrap gap-4">
        <hvi-card maxWidth="320px">
          <h2 hviHeading>Lykkeland Barnehage</h2>
          <p hviParagraph>
            Lykkeland Barneskole er ein trygg og inkluderande nærskule der leik, læring og
            nysgjerrigheit går hand i hand.
          </p>
          <p hviParagraph size="sm">Solslett kommune</p>
        </hvi-card>
      </div>
    </section>

    <section class="mb-8">
      <h2 hviHeading size="md">Med farge og blokker</h2>
      <div class="mt-4 flex flex-wrap gap-4">
        <hvi-card color="accent" variant="tinted" maxWidth="320px">
          <div hviCardBlock>
            <video controls width="100%">
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            </video>
          </div>
          <div hviCardBlock>
            <h3 hviHeading>Se en film</h3>
            <p hviParagraph>En veldig, veldig, veldig gøy film!</p>
            <button hviButton variant="secondary">Handling</button>
          </div>
        </hvi-card>
      </div>
    </section>
  `,
})
export class CardDemoComponent {}
