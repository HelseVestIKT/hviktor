import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HviButton,
  HviDialog,
  HviDialogBlock,
  HviHeading,
  HviInput,
  HviLink,
  HviParagraph,
  HviSearch,
  HviSearchClear,
  HviToggleGroup,
  HviToggleGroupItem,
  HviTooltip,
} from '@helsevestikt/hviktor-angular';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import { CopyButtonComponent } from '../../shared/copy-button';
import ICON_METADATA from './icon-metadata.json';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);

type IconVariant = 'stroke' | 'fill';

interface IconEntry {
  /** Aksel-navn, f.eks. `ChevronDown`. */
  name: string;
  /** URL-nøkkel, f.eks. `chevron-down`. */
  slug: string;
  className: string;
  selector: string;
  category: string;
  keywords: string[];
  variant: IconVariant;
  /** SVG-path fra komponenten, slik at siden ikke må importere alle ikonkomponentene. */
  path: string;
  searchText: string;
}

interface CategoryGroup {
  category: string;
  icons: IconEntry[];
}

const OTHER_CATEGORY = 'Other';
const XL_MEDIA_QUERY = '(min-width: 80rem)';

const ICONS: IconEntry[] = ICON_METADATA.map((meta) => ({
  ...meta,
  variant: meta.variant as IconVariant,
  slug: meta.selector.replace(/^hvi-icon-/, ''),
  searchText: [meta.name, meta.selector, meta.category, ...meta.keywords].join(' ').toLowerCase(),
})).sort((a, b) => a.name.localeCompare(b.name));

const ICONS_BY_SLUG = new Map(ICONS.map((icon) => [icon.slug, icon]));
const ICONS_BY_NAME = new Map(ICONS.map((icon) => [icon.name, icon]));

const INSTALL_CODE = 'npm install @helsevestikt/hviktor-icons';
const USAGE_CODE = [
  "import { Component } from '@angular/core';",
  "import { HviIconPerson } from '@helsevestikt/hviktor-icons';",
  '',
  '@Component({',
  "  selector: 'app-eksempel',",
  '  imports: [HviIconPerson],',
  '  template: `<hvi-icon-person size="md" />`,',
  '})',
  'export class EksempelComponent {}',
].join('\n');

function highlight(code: string, language: string): string {
  return hljs.highlight(code, { language }).value;
}

@Component({
  selector: 'app-icons-page',
  imports: [
    NgTemplateOutlet,
    CopyButtonComponent,
    HviButton,
    HviDialog,
    HviDialogBlock,
    HviHeading,
    HviInput,
    HviLink,
    HviParagraph,
    HviSearch,
    HviSearchClear,
    HviToggleGroup,
    HviToggleGroupItem,
    HviTooltip,
  ],
  template: `
    <div class="xl:flex xl:gap-8">
      <article class="min-w-0 flex-1">
        <header class="mb-6">
          <h1 hviHeading size="xl">Ikoner</h1>
          <p hviParagraph class="max-w-lg">
            {{ totalCount }} ikoner som Angular-komponenter, basert på
            <a hviLink href="https://aksel.nav.no/ikoner" target="_blank" rel="noopener noreferrer"
              >Aksel-ikonene fra Nav</a
            >. Velg et ikon for å se hvordan du bruker det.
          </p>
        </header>

        <div class="mb-6 flex flex-wrap items-end gap-4">
          <form role="search" class="min-w-64 flex-1" (submit)="$event.preventDefault()">
            <hvi-search>
              <input
                hviInput
                type="search"
                placeholder=""
                aria-label="Søk etter ikon"
                [value]="query()"
                (input)="setQuery($any($event.target).value)"
              />
              <button hviSearchClear aria-label="Tøm søk"></button>
            </hvi-search>
          </form>
          <hvi-toggle-group
            [value]="variant()"
            (valueChange)="setVariant($any($event))"
            aria-label="Variant"
            size="sm"
          >
            <button hviToggleGroupItem value="stroke">Stroke</button>
            <button hviToggleGroupItem value="fill">Fill</button>
          </hvi-toggle-group>
        </div>

        <p hviParagraph class="mb-4" aria-live="polite">
          @if (query()) {
            {{ filteredCount() }} treff på «{{ query() }}»
          } @else {
            {{ filteredCount() }} ikoner
          }
        </p>

        @for (group of groups(); track group.category) {
          <section class="mb-8" [attr.aria-labelledby]="'kategori-' + $index">
            <h2 hviHeading size="sm" class="mb-3" [id]="'kategori-' + $index">
              {{ group.category }}
            </h2>
            <ul
              class="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(3.5rem,1fr))] gap-2 p-0"
            >
              @for (icon of group.icons; track icon.slug) {
                <li>
                  <button
                    type="button"
                    class="flex aspect-square w-full items-center justify-center rounded border border-transparent transition-colors hover:bg-(--ds-color-neutral-surface-hover) aria-pressed:border-(--ds-color-neutral-border-strong) aria-pressed:bg-(--ds-color-neutral-surface-tinted)"
                    [attr.aria-label]="icon.name"
                    [attr.aria-pressed]="selected()?.slug === icon.slug"
                    [hviTooltip]="icon.name"
                    (click)="toggle(icon)"
                  >
                    <ng-container
                      [ngTemplateOutlet]="svg"
                      [ngTemplateOutletContext]="{ path: icon.path, size: 32 }"
                    />
                  </button>
                </li>
              }
            </ul>
          </section>
        } @empty {
          <p hviParagraph>Ingen ikoner matcher «{{ query() }}».</p>
        }
      </article>

      <aside
        aria-labelledby="ikon-panel-heading"
        class="hidden xl:sticky xl:top-24 xl:block xl:max-h-[calc(100vh-7rem)] xl:w-80 xl:shrink-0 xl:self-start xl:overflow-y-auto"
      >
        <ng-container
          [ngTemplateOutlet]="details"
          [ngTemplateOutletContext]="{ inDialog: false }"
        />
      </aside>
    </div>

    <dialog
      hviDialog
      [title]="selected()?.name"
      [open]="!!selected() && !isXl()"
      (openChange)="onDialogOpenChange($event)"
    >
      <div hviDialogBlock>
        <ng-container [ngTemplateOutlet]="details" [ngTemplateOutletContext]="{ inDialog: true }" />
      </div>
    </dialog>

    <!-- Samme SVG som ikonkomponentene rendrer -->
    <ng-template #svg let-path="path" let-size="size">
      <svg
        [attr.width]="size"
        [attr.height]="size"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" [attr.d]="path" />
      </svg>
    </ng-template>

    <ng-template #details let-inDialog="inDialog">
      @if (selected(); as icon) {
        <div class="grid grid-cols-[minmax(0,1fr)] gap-4">
          @if (!inDialog) {
            <h2 id="ikon-panel-heading" hviHeading size="sm">{{ icon.name }}</h2>
          }
          <div
            class="flex h-24 items-center justify-center rounded border border-(--ds-color-neutral-border-subtle)"
          >
            <ng-container
              [ngTemplateOutlet]="svg"
              [ngTemplateOutletContext]="{ path: icon.path, size: 48 }"
            />
          </div>
          <dl class="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            <dt class="font-medium">Kategori</dt>
            <dd class="m-0">{{ icon.category }}</dd>
            <dt class="font-medium">Variant</dt>
            <dd class="m-0">{{ icon.variant === 'fill' ? 'Fill' : 'Stroke' }}</dd>
            @if (icon.keywords.length) {
              <dt class="font-medium">Nøkkelord</dt>
              <dd class="m-0">{{ icon.keywords.join(', ') }}</dd>
            }
          </dl>

          <div>
            <div class="mb-1 flex items-center justify-between gap-2">
              <h3 hviHeading size="2xs">Import</h3>
              <app-copy-button [text]="importCode()" context="import" />
            </div>
            <pre
              class="m-0 overflow-x-auto"
            ><code class="hljs block whitespace-pre!" [innerHTML]="importHtml()"></code></pre>
          </div>

          <div>
            <div class="mb-1 flex items-center justify-between gap-2">
              <h3 hviHeading size="2xs">HTML</h3>
              <app-copy-button [text]="templateCode()" context="HTML" />
            </div>
            <pre
              class="m-0 overflow-x-auto"
            ><code class="hljs block whitespace-pre!" [innerHTML]="templateHtml()"></code></pre>
          </div>

          <div class="flex flex-wrap gap-2">
            @if (counterpart(); as other) {
              <button hviButton type="button" variant="secondary" size="sm" (click)="select(other)">
                Vis {{ other.variant === 'fill' ? 'Fill' : 'Stroke' }}-varianten
              </button>
            }
            @if (!inDialog) {
              <button
                hviButton
                type="button"
                variant="tertiary"
                size="sm"
                (click)="clearSelection()"
              >
                Fjern valg
              </button>
            }
          </div>
        </div>
      } @else {
        <div class="grid grid-cols-[minmax(0,1fr)] gap-4">
          <h2 id="ikon-panel-heading" hviHeading size="sm">Kom i gang</h2>
          <div>
            <div class="mb-1 flex items-center justify-between gap-2">
              <h3 hviHeading size="2xs">Installasjon</h3>
              <app-copy-button [text]="installCode" context="installasjonskommando" />
            </div>
            <pre
              class="m-0 overflow-x-auto"
            ><code class="hljs block whitespace-pre!" [innerHTML]="installHtml"></code></pre>
          </div>
          <div>
            <div class="mb-1 flex items-center justify-between gap-2">
              <h3 hviHeading size="2xs">Bruk</h3>
              <app-copy-button [text]="usageCode" context="brukseksempel" />
            </div>
            <pre
              class="m-0 overflow-x-auto"
            ><code class="hljs block whitespace-pre!" [innerHTML]="usageHtml"></code></pre>
          </div>
          <p hviParagraph>
            Ikonene arver tekstfargen og har tre størrelser: <code>sm</code> (16px),
            <code>md</code> (24px, standard) og <code>lg</code> (32px).
          </p>
        </div>
      }
    </ng-template>
  `,
})
export class IconsPage {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly totalCount = ICONS.length;
  protected readonly installCode = INSTALL_CODE;
  protected readonly usageCode = USAGE_CODE;
  protected readonly installHtml = highlight(INSTALL_CODE, 'bash');
  protected readonly usageHtml = highlight(USAGE_CODE, 'typescript');

  private readonly params = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  protected readonly isXl = this.watchMediaQuery(XL_MEDIA_QUERY);

  protected readonly query = computed(() => this.params().get('sok') ?? '');

  protected readonly selected = computed(() => {
    const slug = this.params().get('ikon');
    return slug ? (ICONS_BY_SLUG.get(slug) ?? null) : null;
  });

  protected readonly variant = computed<IconVariant>(() => {
    const value = this.params().get('variant');
    if (value === 'fill' || value === 'stroke') {
      return value;
    }
    return this.selected()?.variant ?? 'stroke';
  });

  private readonly filtered = computed(() => {
    const variant = this.variant();
    const terms = this.query().toLowerCase().split(/\s+/).filter(Boolean);
    return ICONS.filter(
      (icon) => icon.variant === variant && terms.every((term) => icon.searchText.includes(term)),
    );
  });

  protected readonly filteredCount = computed(() => this.filtered().length);

  protected readonly groups = computed<CategoryGroup[]>(() => {
    const byCategory = new Map<string, IconEntry[]>();
    for (const icon of this.filtered()) {
      const list = byCategory.get(icon.category) ?? [];
      list.push(icon);
      byCategory.set(icon.category, list);
    }
    return [...byCategory.entries()]
      .map(([category, icons]) => ({ category, icons }))
      .sort((a, b) => {
        if (a.category === OTHER_CATEGORY) return 1;
        if (b.category === OTHER_CATEGORY) return -1;
        return a.category.localeCompare(b.category);
      });
  });

  protected readonly counterpart = computed(() => {
    const icon = this.selected();
    if (!icon) {
      return null;
    }
    const otherName =
      icon.variant === 'fill' ? icon.name.replace(/Fill(ed)?$/, '') : `${icon.name}Fill`;
    return ICONS_BY_NAME.get(otherName) ?? null;
  });

  protected readonly importCode = computed(
    () => `import { ${this.selected()?.className} } from '@helsevestikt/hviktor-icons';`,
  );
  protected readonly templateCode = computed(() => `<${this.selected()?.selector} />`);
  protected readonly importHtml = computed(() => highlight(this.importCode(), 'typescript'));
  protected readonly templateHtml = computed(() => highlight(this.templateCode(), 'xml'));

  protected setQuery(value: string): void {
    this.updateParams({ sok: value.trim() ? value : null });
  }

  protected setVariant(value: IconVariant): void {
    const selected = this.selected();
    const next = selected && selected.variant !== value ? this.counterpart() : selected;
    this.updateParams({
      variant: value === 'stroke' ? null : value,
      ikon: next?.slug ?? null,
    });
  }

  protected toggle(icon: IconEntry): void {
    if (this.selected()?.slug === icon.slug) {
      this.clearSelection();
    } else {
      this.select(icon);
    }
  }

  protected select(icon: IconEntry): void {
    this.updateParams({
      ikon: icon.slug,
      variant: icon.variant === 'stroke' ? null : icon.variant,
    });
  }

  protected clearSelection(): void {
    this.updateParams({ ikon: null });
  }

  protected onDialogOpenChange(open: boolean): void {
    // Dialogen lukkes også når skjermen blir bred nok til sidepanelet; da skal valget beholdes
    if (!open && !this.isXl()) {
      this.clearSelection();
    }
  }

  private updateParams(changes: Record<string, string | null>): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: changes,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  private watchMediaQuery(query: string) {
    const mediaQuery = window.matchMedia(query);
    const matches = signal(mediaQuery.matches);
    const onChange = (event: MediaQueryListEvent) => matches.set(event.matches);
    mediaQuery.addEventListener('change', onChange);
    inject(DestroyRef).onDestroy(() => mediaQuery.removeEventListener('change', onChange));
    return matches.asReadonly();
  }
}
