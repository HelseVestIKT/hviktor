import { Component } from '@angular/core';
import { HviBadge, HviBadgePosition, HviHeading, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-badge-demo',
  standalone: true,
  imports: [HviBadge, HviBadgePosition, HviHeading, HviParagraph],
  template: `
    <header class="mb-8">
      <h1 hviHeading size="xl">Badge</h1>
      <p hviParagraph>Små indikatorer og tellere for å vise status eller antall.</p>
    </header>

    <section class="mb-8">
      <h2 hviHeading size="md">Base variant</h2>
      <div class="mt-4 flex flex-wrap items-center gap-4">
        <hvi-badge color="neutral" count="9+" variant="base"></hvi-badge>
        <hvi-badge color="danger" count="9+" variant="base"></hvi-badge>
        <hvi-badge color="info" count="9+" variant="base"></hvi-badge>
        <hvi-badge color="warning" count="9+" variant="base"></hvi-badge>
        <hvi-badge color="brand1" count="9+" variant="base"></hvi-badge>
        <hvi-badge color="brand2" count="9+" variant="base"></hvi-badge>
        <hvi-badge color="brand3" count="9+" variant="base"></hvi-badge>
        <hvi-badge color="accent" count="9+" variant="base"></hvi-badge>
      </div>
    </section>

    <section class="mb-8">
      <h2 hviHeading size="md">Tinted variant</h2>
      <div class="mt-4 flex flex-wrap items-center gap-4">
        <hvi-badge color="neutral" count="9+" variant="tinted"></hvi-badge>
        <hvi-badge color="danger" count="9+" variant="tinted"></hvi-badge>
        <hvi-badge color="info" count="9+" variant="tinted"></hvi-badge>
        <hvi-badge color="warning" count="9+" variant="tinted"></hvi-badge>
        <hvi-badge color="brand1" count="9+" variant="tinted"></hvi-badge>
        <hvi-badge color="brand2" count="9+" variant="tinted"></hvi-badge>
        <hvi-badge color="brand3" count="9+" variant="tinted"></hvi-badge>
        <hvi-badge color="accent" count="9+" variant="tinted"></hvi-badge>
      </div>
    </section>

    <section class="mb-8">
      <h2 hviHeading size="md">Status indikator</h2>
      <div class="mt-4 flex flex-wrap items-center gap-4">
        <hvi-badge color="success" variant="base"></hvi-badge>
        <p>Aktiv</p>
      </div>
    </section>

    <section class="mb-8">
      <h2 hviHeading size="md">Med posisjonering</h2>
      <div class="mt-4 flex flex-wrap items-center gap-4">
        <hvi-badge-position placement="top-left">
          <hvi-badge color="danger" count="3"></hvi-badge>
          <div class="rounded bg-(--ds-color-background-tinted) p-4">Element</div>
        </hvi-badge-position>
      </div>
    </section>
  `,
})
export class BadgeDemoComponent {}
