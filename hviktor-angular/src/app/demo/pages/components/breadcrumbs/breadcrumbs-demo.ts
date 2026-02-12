import { Component } from '@angular/core';
import { HviBreadcrumbs, HviHeading, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-breadcrumbs-demo',
  standalone: true,
  imports: [HviBreadcrumbs, HviHeading, HviParagraph],
  template: `
    <header class="mb-8">
      <h1 hviHeading size="xl">Breadcrumbs</h1>
      <p hviParagraph>Navigasjonssti som viser brukerens posisjon i hierarkiet.</p>
    </header>

    <section class="mb-8">
      <h2 hviHeading size="md">Standard</h2>
      <div class="mt-4 flex items-center gap-2">
        <nav
          hviBreadcrumbs
          ariaLabel="Du er her:"
          [backLink]="{
            label: 'Nivå 3',
            href: '#',
            ariaLabel: 'Tilbake til Nivå 3',
          }"
          [items]="[
            { label: 'Nivå 1', href: '#' },
            { label: 'Nivå 2', href: '#' },
            { label: 'Nivå 3', href: '#' },
            { label: 'Nivå 4', href: '#' },
          ]"
        ></nav>
      </div>
    </section>
  `,
})
export class BreadcrumbsDemoComponent {}
