import { Component } from '@angular/core';
import {
  HviButton,
  HviCard,
  HviHeading,
  HviIcon,
  HviLink,
  HviParagraph,
} from '@helsevestikt/hviktor';

@Component({
  selector: 'app-icon-demo',
  standalone: true,
  imports: [HviIcon, HviCard, HviButton, HviLink, HviHeading, HviParagraph],
  template: `
    <header class="mb-8">
      <h1 hviHeading size="xl">Icon</h1>
      <p hviParagraph>Ikoner for visuell kommunikasjon.</p>
    </header>

    <section class="mb-8">
      <h2 hviHeading size="md">Tilgjengelige ikoner</h2>
      <div class="mt-4 flex flex-wrap gap-4">
        <hvi-card>
          <hvi-icon icon="ArrowLeft"></hvi-icon>
          <p hviParagraph>ArrowLeft</p>
        </hvi-card>
        <hvi-card>
          <hvi-icon icon="ArrowUp"></hvi-icon>
          <p hviParagraph>ArrowUp</p>
        </hvi-card>
        <hvi-card>
          <hvi-icon icon="ArrowRight"></hvi-icon>
          <p hviParagraph>ArrowRight</p>
        </hvi-card>
        <hvi-card>
          <hvi-icon icon="ArrowDown"></hvi-icon>
          <p hviParagraph>ArrowDown</p>
        </hvi-card>
        <hvi-card>
          <hvi-icon icon="Person"></hvi-icon>
          <p hviParagraph>Person</p>
        </hvi-card>
        <hvi-card>
          <hvi-icon icon="ExclamationmarkTriangle"></hvi-icon>
          <p hviParagraph>ExclamationmarkTriangle</p>
        </hvi-card>
        <hvi-card>
          <hvi-icon icon="Triangle"></hvi-icon>
          <p hviParagraph>Triangle</p>
        </hvi-card>
      </div>
    </section>

    <section class="mb-8">
      <h2 hviHeading size="md">Størrelser</h2>
      <div class="mt-4 flex flex-wrap gap-4">
        <hvi-card>
          <hvi-icon icon="ArrowLeft" size="sm"></hvi-icon>
          <p hviParagraph>sm</p>
        </hvi-card>
        <hvi-card>
          <hvi-icon icon="ArrowLeft"></hvi-icon>
          <p hviParagraph>md</p>
        </hvi-card>
        <hvi-card>
          <hvi-icon icon="ArrowLeft" size="lg"></hvi-icon>
          <p hviParagraph>lg</p>
        </hvi-card>
        <hvi-card>
          <hvi-icon icon="ArrowLeft" size="xl"></hvi-icon>
          <p hviParagraph>xl</p>
        </hvi-card>
      </div>
    </section>

    <section class="mb-8">
      <h2 hviHeading size="md">Brukseksempler</h2>
      <div class="mt-4 flex flex-wrap items-center gap-4">
        <button hviButton color="brand1">
          <hvi-icon icon="ArrowLeft" ariaHidden></hvi-icon>
          Button with icon
        </button>
        <button hviButton color="brand1" variant="tertiary">
          <hvi-icon icon="ArrowLeft" ariaHidden></hvi-icon>
          Button with icon
        </button>
        <a hviLink href="#">
          <hvi-icon icon="ArrowLeft"></hvi-icon>
          Link med ikon venstre
        </a>
        <a hviLink href="#">
          Link med ikon høyre
          <hvi-icon icon="ArrowRight"></hvi-icon>
        </a>
      </div>
    </section>
  `,
})
export class IconDemoComponent {}
