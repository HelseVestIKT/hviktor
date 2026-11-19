import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  HviField,
  HviHeading,
  HviInput,
  HviLabel,
  HviLink,
  HviParagraph,
  HviSearch,
  HviSearchClear,
  HviSelect,
  HviTable,
  HviTableScroll,
  HviToggleGroup,
  HviToggleGroupItem,
} from '@helsevestikt/hviktor-angular';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import { PageTocComponent, TocItem } from '../../shared/page-toc';

hljs.registerLanguage('xml', xml);

function highlight(code: string, language: string): string {
  return hljs.highlight(code, { language }).value;
}

/** Fargene i temaet. Fargeklassene er listet med `@source inline` i src/styles.css. */
const COLORS = [
  'accent',
  'brand1',
  'brand2',
  'brand3',
  'neutral',
  'info',
  'success',
  'warning',
  'danger',
] as const;

type Usage = 'bg' | 'border' | 'text' | 'contrast';

interface ColorRole {
  role: string;
  usage: Usage;
  description: string;
}

interface RoleGroup {
  title: string;
  description: string;
  roles: ColorRole[];
}

const ROLE_GROUPS: RoleGroup[] = [
  {
    title: 'Bakgrunn',
    description: 'Bakgrunnen på siden eller et område.',
    roles: [
      { role: 'background-default', usage: 'bg', description: 'Standard bakgrunn' },
      { role: 'background-tinted', usage: 'bg', description: 'Bakgrunn med et hint av farge' },
    ],
  },
  {
    title: 'Overflate',
    description:
      'Flater som ligger oppå bakgrunnen, som kort og rader. Hover og active er for flater man kan klikke på.',
    roles: [
      { role: 'surface-default', usage: 'bg', description: 'Standard overflate' },
      { role: 'surface-tinted', usage: 'bg', description: 'Overflate med et hint av farge' },
      { role: 'surface-hover', usage: 'bg', description: 'Når musepekeren er over' },
      { role: 'surface-active', usage: 'bg', description: 'Når flaten er trykket eller valgt' },
    ],
  },
  {
    title: 'Kantlinje',
    description: 'Kanter og skillelinjer. Brukes sammen med klassen border, som gir selve kanten.',
    roles: [
      { role: 'border-subtle', usage: 'border', description: 'Dekorative skillelinjer' },
      { role: 'border-default', usage: 'border', description: 'Kanter på skjemafelt o.l.' },
      { role: 'border-strong', usage: 'border', description: 'Kanter med høy kontrast' },
    ],
  },
  {
    title: 'Tekst',
    description: 'Tekst og ikoner på bakgrunn og overflate.',
    roles: [
      { role: 'text-default', usage: 'text', description: 'Standard tekst' },
      { role: 'text-subtle', usage: 'text', description: 'Tekst med mindre kontrast' },
    ],
  },
  {
    title: 'Base',
    description:
      'Fylte flater med sterk farge, som primærknapper. Contrast-fargene er for tekst og ikoner oppå base.',
    roles: [
      { role: 'base-default', usage: 'bg', description: 'Standard fylt flate' },
      { role: 'base-hover', usage: 'bg', description: 'Når musepekeren er over' },
      { role: 'base-active', usage: 'bg', description: 'Når flaten er trykket' },
      { role: 'base-contrast-default', usage: 'contrast', description: 'Tekst oppå base' },
      { role: 'base-contrast-subtle', usage: 'contrast', description: 'Dempet tekst oppå base' },
    ],
  },
];

const USAGE_PREFIX: Record<Usage, string> = {
  bg: 'bg-',
  border: 'border-',
  text: 'text-',
  contrast: 'text-',
};

/** Designsystemets avstander. Andre tall bruker Tailwinds egen skala. */
const SPACING = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 22, 26, 30];

const RADII = [
  { className: 'rounded-sm', token: '--ds-border-radius-sm' },
  { className: 'rounded-md', token: '--ds-border-radius-md' },
  { className: 'rounded-lg', token: '--ds-border-radius-lg' },
  { className: 'rounded-xl', token: '--ds-border-radius-xl' },
];

const SHADOWS = [
  { className: 'shadow-xs', token: '--ds-shadow-xs' },
  { className: 'shadow-sm', token: '--ds-shadow-sm' },
  { className: 'shadow-md', token: '--ds-shadow-md' },
  { className: 'shadow-lg', token: '--ds-shadow-lg' },
  { className: 'shadow-xl', token: '--ds-shadow-xl' },
];

const TEXT_SIZES = [
  { className: 'text-sm', token: '--ds-body-sm-font-size' },
  { className: 'text-md', token: '--ds-body-md-font-size' },
  { className: 'text-lg', token: '--ds-body-lg-font-size' },
];

const FONT_WEIGHTS = [
  { className: 'font-regular', token: '--ds-font-weight-regular' },
  { className: 'font-medium', token: '--ds-font-weight-medium' },
  { className: 'font-semibold', token: '--ds-font-weight-semibold' },
];

/** Prefikser fargene kan brukes med. Gjør at søk på f.eks. `ring-border-strong` gir treff. */
const COLOR_PREFIXES = [
  'bg',
  'text',
  'border',
  'outline',
  'ring',
  'fill',
  'stroke',
  'divide',
  'decoration',
  'shadow',
];

/** Prefikser avstandene kan brukes med. */
const SPACING_PREFIXES = [
  'p',
  'px',
  'py',
  'pt',
  'pr',
  'pb',
  'pl',
  'm',
  'mx',
  'my',
  'mt',
  'mr',
  'mb',
  'ml',
  'gap',
  'gap-x',
  'gap-y',
  'space-x',
  'space-y',
  'w',
  'h',
  'size',
  'inset',
  'top',
  'right',
  'bottom',
  'left',
];

interface ClassEntry {
  className: string;
  variable: string;
  type: string;
  isColor: boolean;
  /** Det som vises i tabellen: klasse, variabel og type. */
  searchText: string;
  /** Samme verdi med andre prefikser, f.eks. `ring-border-strong`. */
  aliases: string[];
}

/**
 * Et søkeord treffer når det står i det som vises. Andre prefikser treffer bare når
 * ordet har noe etter prefiksen, så `text` ikke gir treff på alle fargene via `text-…`.
 */
function matches(entry: ClassEntry, word: string): boolean {
  if (entry.searchText.includes(word)) {
    return true;
  }
  return /-./.test(word) && entry.aliases.some((alias) => alias.startsWith(word));
}

/** Alle klassene i tailwind.css, med variabelen de peker på. */
function buildClassIndex(): ClassEntry[] {
  const entries: ClassEntry[] = [];
  const add = (className: string, variable: string, type: string, aliases: string[] = []) =>
    entries.push({
      className,
      variable,
      type,
      isColor: type === 'Farge',
      searchText: [className, variable, type].join(' ').toLowerCase(),
      aliases,
    });

  for (const color of ['', ...COLORS]) {
    for (const group of ROLE_GROUPS) {
      for (const role of group.roles) {
        const key = color ? `${color}-${role.role}` : role.role;
        add(
          `${USAGE_PREFIX[role.usage]}${key}`,
          `--ds-color-${key}`,
          'Farge',
          COLOR_PREFIXES.map((prefix) => `${prefix}-${key}`),
        );
      }
    }
  }
  for (const n of SPACING) {
    add(
      `p-${n}`,
      `--ds-size-${n}`,
      'Avstand',
      SPACING_PREFIXES.map((prefix) => `${prefix}-${n}`),
    );
  }
  for (const radius of RADII) {
    add(radius.className, radius.token, 'Hjørne', [
      radius.className.replace('rounded', 'rounded-t'),
    ]);
  }
  for (const shadow of SHADOWS) {
    add(shadow.className, shadow.token, 'Skygge');
  }
  for (const text of TEXT_SIZES) {
    add(text.className, text.token, 'Tekststørrelse');
  }
  for (const weight of FONT_WEIGHTS) {
    add(weight.className, weight.token, 'Skriftvekt');
  }
  add('font-sans', '--ds-font-family', 'Font');
  add('opacity-disabled', '--ds-opacity-disabled', 'Gjennomsiktighet');
  return entries;
}

const CLASS_INDEX = buildClassIndex();

const DATA_COLOR_CODE = `<div data-color="brand1" class="bg-background-tinted border border-border-subtle rounded-md p-4">
  <p class="text-text-default font-semibold">brand1</p>
  <p class="text-text-subtle text-sm">Samme klasser, ny farge</p>
  <span class="bg-base-default text-base-contrast-default rounded-sm px-3 py-1">Base</span>
</div>`;

@Component({
  selector: 'app-tailwind-page',
  imports: [
    PageTocComponent,
    RouterLink,
    HviInput,
    HviSearch,
    HviSearchClear,
    HviField,
    HviHeading,
    HviLabel,
    HviLink,
    HviParagraph,
    HviSelect,
    HviTable,
    HviTableScroll,
    HviToggleGroup,
    HviToggleGroupItem,
  ],
  templateUrl: './tailwind-page.html',
})
export class TailwindPage {
  protected readonly colors = COLORS;
  protected readonly roleGroups = ROLE_GROUPS;
  protected readonly spacing = SPACING;
  protected readonly radii = RADII;
  protected readonly shadows = SHADOWS;
  protected readonly textSizes = TEXT_SIZES;
  protected readonly fontWeights = FONT_WEIGHTS;

  protected readonly toc: TocItem[] = [
    { id: 'farger', title: 'Farger' },
    { id: 'data-color', title: 'Følger data-color' },
    { id: 'avstander', title: 'Avstander' },
    { id: 'hjorner', title: 'Hjørner' },
    { id: 'skygger', title: 'Skygger' },
    { id: 'tekst', title: 'Tekst' },
    { id: 'gjennomsiktighet', title: 'Gjennomsiktighet' },
    { id: 'alle-klasser', title: 'Alle klasser' },
  ];

  /** Søk i oversikten over alle klasser. */
  protected readonly classQuery = signal('');

  protected readonly filteredClasses = computed(() => {
    const words = this.classQuery().trim().toLowerCase().split(/\s+/).filter(Boolean);
    return words.length
      ? CLASS_INDEX.filter((entry) => words.every((word) => matches(entry, word)))
      : CLASS_INDEX;
  });

  protected setClassQuery(value: string): void {
    this.classQuery.set(value);
  }

  protected readonly dataColorHtml = highlight(DATA_COLOR_CODE, 'xml');

  /** Valgt farge i fargeoversikten. Tom streng gir klasser uten fargenavn. */
  protected readonly color = signal('');

  /** Valgt størrelsesmodus i avstandsoversikten. */
  protected readonly size = signal<'sm' | 'md' | 'lg'>('md');

  private readonly colorPrefix = computed(() => (this.color() ? `${this.color()}-` : ''));

  /** Klassen som vises for en fargerolle, f.eks. `bg-brand1-surface-hover`. */
  protected className(role: ColorRole): string {
    return `${USAGE_PREFIX[role.usage]}${this.colorPrefix()}${role.role}`;
  }

  /** Klassene som tegner fargeprøven. */
  protected swatchClass(role: ColorRole): string {
    const className = this.className(role);
    return role.usage === 'contrast'
      ? `${className} bg-${this.colorPrefix()}base-default`
      : className;
  }

  protected setColor(value: string): void {
    this.color.set(value);
  }

  protected setSize(value: string): void {
    this.size.set(value as 'sm' | 'md' | 'lg');
  }
}
