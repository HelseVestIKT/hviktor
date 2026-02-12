import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HviHeading } from '@helsevestikt/hviktor';
import { DEMO_COMPONENTS } from '../demo-components';

@Component({
  selector: 'app-demo-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, HviHeading],
  template: `
    <div class="flex min-h-screen">
      <aside
        class="fixed h-screen w-60 overflow-y-auto border-r border-[var(--ds-color-border-subtle)] bg-[var(--ds-color-background-default)] py-6"
      >
        <a
          routerLink="/"
          class="mb-4 block border-b border-[var(--ds-color-border-subtle)] px-6 pb-6 text-inherit no-underline"
        >
          <h1 hviHeading size="md">Hviktor</h1>
        </a>
        <nav>
          <ul class="m-0 list-none p-0">
            @for (component of components; track component.id) {
              <li>
                <a
                  [routerLink]="['/komponenter', component.id]"
                  routerLinkActive="active"
                  class="block px-6 py-2 text-sm text-[var(--ds-color-text-neutral-default)] no-underline transition-colors hover:bg-[var(--ds-color-background-tinted)] [&.active]:bg-[var(--ds-color-brand1-background-subtle)] [&.active]:font-medium [&.active]:text-[var(--ds-color-brand1-text-default)]"
                >
                  {{ component.name }}
                </a>
              </li>
            }
          </ul>
        </nav>
      </aside>
      <main class="ml-60 max-w-[calc(100%-240px)] flex-1 px-12 py-8">
        <router-outlet />
      </main>
    </div>
  `,
})
export class DemoLayoutComponent {
  components = DEMO_COMPONENTS;
}
