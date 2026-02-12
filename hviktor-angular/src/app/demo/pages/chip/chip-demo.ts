import { Component } from '@angular/core';
import {
  HviChipButton,
  HviChipLabel,
  HviFieldKit,
  HviHeading,
  HviParagraph,
} from '@helsevestikt/hviktor';

@Component({
  selector: 'app-chip-demo',
  standalone: true,
  imports: [HviChipButton, HviChipLabel, HviFieldKit, HviHeading, HviParagraph],
  template: `
    <header class="mb-8">
      <h1 hviHeading size="xl">Chip</h1>
      <p hviParagraph>Kompakte elementer for valg, filtrering og visning av informasjon.</p>
    </header>

    <section class="mb-8">
      <h2 hviHeading size="md">Radio</h2>
      <div class="mt-4 flex flex-wrap gap-2">
        <label hviChip>
          <input hviInput type="radio" value="nynorsk" checked name="my-radio" />
          Nynorsk
        </label>
        <label hviChip>
          <input hviInput type="radio" value="bokmål" name="my-radio" />
          Bokmål
        </label>
      </div>
    </section>

    <section class="mb-8">
      <h2 hviHeading size="md">Checkbox</h2>
      <div class="mt-4 flex flex-wrap gap-2">
        <label hviChip>
          <input hviInput type="checkbox" />
          Nynorsk
        </label>
      </div>
    </section>

    <section class="mb-8">
      <h2 hviHeading size="md">Button</h2>
      <div class="mt-4 flex flex-wrap gap-2">
        <button hviChip>Tøm alle filtre</button>
      </div>
    </section>

    <section class="mb-8">
      <h2 hviHeading size="md">Button (removable)</h2>
      <div class="mt-4 flex flex-wrap gap-2">
        <button hviChip removable="true" aria-label="Slett Norge">Norge</button>
      </div>
    </section>
  `,
})
export class ChipDemoComponent {}
