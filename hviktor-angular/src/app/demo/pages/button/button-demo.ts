import { Component } from '@angular/core';
import { HviButton, HviHeading, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [HviButton, HviHeading, HviParagraph],
  template: `
    <header class="mb-8">
      <h1 hviHeading size="xl">Button</h1>
      <p hviParagraph>Knapper for handlinger og interaksjoner.</p>
    </header>

    <section class="mb-8">
      <h2 hviHeading size="md">Variant</h2>
      <div class="mt-4 flex flex-wrap gap-2">
        <button hviButton>Primary (default)</button>
        <button hviButton variant="secondary">Secondary</button>
        <button hviButton variant="tertiary">Tertiary</button>
      </div>
    </section>

    <section class="mb-8">
      <h2 hviHeading size="md">Color</h2>
      <div class="mt-4 flex flex-wrap gap-2">
        <button hviButton color="brand1">Brand1</button>
        <button hviButton color="brand2">Brand2</button>
        <button hviButton color="brand3">Brand3</button>
        <button hviButton color="neutral">Neutral</button>
        <button hviButton color="danger">Danger</button>
      </div>
    </section>

    <section class="mb-8">
      <h2 hviHeading size="md">Size</h2>
      <div class="mt-4 flex flex-wrap gap-2">
        <button hviButton size="sm">Small</button>
        <button hviButton size="md">Medium (Default)</button>
        <button hviButton size="lg">Large</button>
      </div>
    </section>

    <section class="mb-8">
      <h2 hviHeading size="md">Varianter</h2>
      <div class="mt-4 flex flex-wrap gap-2">
        <button hviButton icon>⚙️</button>
        <button hviButton loading>Loading...</button>
        <button hviButton fullWidth>Full Width</button>
      </div>
    </section>
  `,
})
export class ButtonDemoComponent {}
