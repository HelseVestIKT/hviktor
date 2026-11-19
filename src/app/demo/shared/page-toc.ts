import { Component, input } from '@angular/core';
import { HviHeading, HviLink } from '@helsevestikt/hviktor-angular';

export interface TocItem {
  id: string;
  title: string;
}

/**
 * «På denne siden» for sider som ikke bruker app-demo-page, med samme utseende.
 * Legges etter <article> i en `xl:flex xl:gap-8`-container.
 */
@Component({
  selector: 'app-page-toc',
  imports: [HviHeading, HviLink],
  template: `
    <aside
      aria-labelledby="page-toc-heading"
      class="hidden xl:sticky xl:top-24 xl:block xl:max-h-[calc(100vh-7rem)] xl:w-48 xl:shrink-0 xl:self-start xl:overflow-y-auto"
    >
      <nav aria-labelledby="page-toc-heading">
        <h2 id="page-toc-heading" hviHeading size="xs">På denne siden</h2>
        <ul role="list" class="list-none space-y-1">
          @for (item of items(); track item.id) {
            <li>
              <a
                hviLink
                color="neutral"
                [href]="'#' + item.id"
                class="block py-1 pl-3"
                (click)="scrollTo($event, item.id)"
              >
                {{ item.title }}
              </a>
            </li>
          }
        </ul>
      </nav>
    </aside>
  `,
})
export class PageTocComponent {
  readonly items = input.required<TocItem[]>();

  protected scrollTo(event: Event, id: string): void {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
