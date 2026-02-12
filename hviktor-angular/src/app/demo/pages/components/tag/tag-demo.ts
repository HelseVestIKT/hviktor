import { Component } from '@angular/core';
import { HviHeading, HviParagraph, HviTag } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-tag-demo',
  standalone: true,
  imports: [HviTag, HviHeading, HviParagraph],
  template: `
    <header class="mb-8">
      <h1 hviHeading size="xl">Tag</h1>
      <p hviParagraph>Merkelapper for kategorisering og status.</p>
    </header>

    <section class="mb-8">
      <h2 hviHeading size="md">Varianter</h2>
      <div class="mt-4 flex flex-wrap gap-2">
        <hvi-tag variant="default">Default</hvi-tag>
        <hvi-tag variant="outline">Outline</hvi-tag>
      </div>
    </section>

    <section class="mb-8">
      <h2 hviHeading size="md">Størrelser</h2>
      <div class="mt-4 flex flex-wrap gap-2">
        <hvi-tag size="sm">Small</hvi-tag>
        <hvi-tag size="md">Medium (default)</hvi-tag>
        <hvi-tag size="lg">Large</hvi-tag>
      </div>
    </section>

    <section class="mb-8">
      <h2 hviHeading size="md">Farger</h2>
      <div class="mt-4 flex flex-wrap gap-2">
        <hvi-tag>Default</hvi-tag>
        <hvi-tag color="neutral">Neutral</hvi-tag>
        <hvi-tag color="danger">Danger</hvi-tag>
        <hvi-tag color="warning">Warning</hvi-tag>
        <hvi-tag color="info">Info</hvi-tag>
        <hvi-tag color="success">Success</hvi-tag>
        <hvi-tag color="accent">Accent</hvi-tag>
        <hvi-tag color="brand1">Brand1</hvi-tag>
        <hvi-tag color="brand2">Brand2</hvi-tag>
        <hvi-tag color="brand3">Brand3</hvi-tag>
      </div>
    </section>
  `,
})
export class TagDemoComponent {}
