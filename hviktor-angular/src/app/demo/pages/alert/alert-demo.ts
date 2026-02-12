import { Component } from '@angular/core';
import { HviAlert, HviHeading, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-alert-demo',
  standalone: true,
  imports: [HviAlert, HviHeading, HviParagraph],
  template: `
    <header class="mb-8">
      <h1 hviHeading size="xl">Alert</h1>
      <p hviParagraph>Varselmeldinger for å informere brukeren om viktig informasjon.</p>
    </header>

    <section class="mb-8">
      <h2 hviHeading size="md">Varianter</h2>
      <div class="mt-4 flex flex-wrap gap-2">
        <hvi-alert>Dette er en info alert</hvi-alert>
        <hvi-alert color="success">Dette er en success alert</hvi-alert>
        <hvi-alert color="warning">Dette er en warning alert</hvi-alert>
        <hvi-alert color="danger">Dette er en danger alert</hvi-alert>
      </div>
    </section>
  `,
})
export class AlertDemoComponent {}
