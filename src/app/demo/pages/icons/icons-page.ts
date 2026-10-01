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
  templateUrl: './icons-page.html',
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
