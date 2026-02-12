import { Component } from '@angular/core';
import { HviHeading, HviLabel, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-label-demo',
  standalone: true,
  imports: [HviLabel, HviHeading, HviParagraph],
  template: `
    <header class="mb-8">
      <h1 hviHeading size="xl">Label</h1>
      <p hviParagraph>Etiketter for skjemaelementer og annen tekst.</p>
    </header>

    <section class="mb-8">
      <h2 hviHeading size="md">Varianter</h2>
      <div class="mt-4 flex flex-col gap-2">
        <label hviLabel>Standard label</label>
        <label hviLabel weight="medium">Medium weight label</label>
        <label hviLabel weight="semibold">Semibold label</label>
      </div>
    </section>
  `,
})
export class LabelDemoComponent {}
