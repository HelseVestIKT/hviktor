import { Component, computed, input } from '@angular/core';
import { HviHeading, HviLink, HviLogo, HviParagraph, HviTag } from '@helsevestikt/hviktor';
import { DEMO_COMPONENTS, designSystemUrl } from '../demo-components';

/**
 * Wrapper-komponent for demo-sider.
 * Tar inn `componentId` og slår opp navn og beskrivelse fra DEMO_COMPONENTS.
 */
@Component({
  selector: 'app-demo-page',
  standalone: true,
  imports: [HviHeading, HviParagraph, HviLink, HviLogo, HviTag],
  template: `
    <article>
      <header class="mb-8">
        <div class="flex items-center gap-3">
          <h1 hviHeading size="xl">{{ name() }}</h1>
          @if (codeTested()) {
            <hvi-tag size="sm" color="info">Kode testet ✓</hvi-tag>
          }
          @if (a11yTested()) {
            <hvi-tag size="sm" color="brand2">A11y testet ✓</hvi-tag>
          }
        </div>
        @if (isHvi()) {
          <div class="mb-2 flex items-center gap-2">
            <hvi-logo company="dots" size="sm" aria-hidden="true" />
            <p hviParagraph>Denne komponenten er laget av oss.</p>
          </div>
        }
        @if (dsHref()) {
          <a
            hviLink
            [href]="dsHref()"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-2 inline-flex items-center gap-1.5"
          >
            <img src="assets/ds.svg" alt="" class="size-5" />
            Se {{ name() }} i Designsystemet
          </a>
        }
        <p hviParagraph class="max-w-lg">{{ description() }}</p>
      </header>
      <ng-content />
    </article>
  `,
})
export class DemoPageComponent {
  componentId = input.required<string>();

  /** Slår opp komponent-konfigurasjon fra DEMO_COMPONENTS basert på componentId. */
  private component = computed(() => DEMO_COMPONENTS.find((c) => c.id === this.componentId()));

  /** Komponentens visningsnavn. */
  name = computed(() => this.component()?.name ?? this.componentId());

  /** Komponentens beskrivelse. */
  description = computed(() => this.component()?.description ?? '');

  /** Computed: om komponenten er en Hviktor-egen komponent. */
  isHvi = computed(() => this.component()?.hvi ?? false);

  /** Computed DS-lenke basert på komponentens id. */
  dsHref = computed(() => {
    const comp = this.component();
    return comp?.ds ? designSystemUrl(comp.id) : null;
  });

  /** Om komponenten har beståtte enhetstester. */
  codeTested = computed(() => this.component()?.codeTested ?? false);

  /** Om komponenten har beståtte A11y-tester. */
  a11yTested = computed(() => this.component()?.a11yTested ?? false);
}
