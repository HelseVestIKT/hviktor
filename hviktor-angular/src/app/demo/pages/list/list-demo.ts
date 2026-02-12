import { Component } from '@angular/core';
import { HviHeading, HviList, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-list-demo',
  standalone: true,
  imports: [HviList, HviHeading, HviParagraph],
  template: `
    <header class="mb-8">
      <h1 hviHeading size="xl">List</h1>
      <p hviParagraph>Ordnede og uordnede lister.</p>
    </header>

    <section class="mb-8">
      <h2 hviHeading size="md">Nummerert liste</h2>
      <ol hviList>
        <li>Første element</li>
        <li>Andre element</li>
        <li>Tredje element</li>
      </ol>
    </section>

    <section class="mb-8">
      <h2 hviHeading size="md">Punktliste</h2>
      <ul hviList>
        <li>Første element</li>
        <li>Andre element</li>
        <li>Tredje element</li>
      </ul>
    </section>
  `,
})
export class ListDemoComponent {}
