import { Component } from '@angular/core';
import { HviHeading, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-heading-demo',
  standalone: true,
  imports: [HviHeading, HviParagraph],
  template: `
    <header class="mb-8">
      <h1 hviHeading size="xl">Heading</h1>
      <p hviParagraph>Overskrifter i forskjellige størrelser.</p>
    </header>

    <section class="mb-8">
      <h2 hviHeading size="md">Størrelser</h2>
      <div class="mt-4 flex flex-col gap-4">
        <h1 hviHeading size="2xl">2XL Overskrift</h1>
        <h1 hviHeading size="xl">XL Overskrift</h1>
        <h2 hviHeading size="lg">LG Overskrift</h2>
        <h3 hviHeading size="md">MD Overskrift</h3>
        <h4 hviHeading size="sm">SM Overskrift</h4>
        <h5 hviHeading size="xs">XS Overskrift</h5>
      </div>
    </section>
  `,
})
export class HeadingDemoComponent {}
