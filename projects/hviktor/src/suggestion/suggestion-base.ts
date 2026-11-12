import { isPlatformBrowser } from '@angular/common';
import {
  booleanAttribute,
  computed,
  contentChild,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  isDevMode,
  model,
  ModelSignal,
  numberAttribute,
  output,
  PLATFORM_ID,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import '@digdir/designsystemet-web';
import '@u-elements/u-combobox';
import '@u-elements/u-datalist';

/** Sendes når brukeren skriver og forslagslista skal oppdateres. */
export interface HviSuggestionCompleteEvent {
  /** Teksten brukeren har skrevet. Tom streng ved fokus og når feltet tømmes. */
  query: string;
}

/**
 * Skjermlesertekster brukt av `<u-combobox>`. Designsystemet har norske
 * standardtekster for alle, så sett bare de du vil overstyre.
 */
export interface HviSuggestionSrText {
  /** Når et alternativ legges til. Standard: «La til». */
  added: string;
  /** Tøm-knappen. Standard: «Fjern tekst». */
  clear: string;
  /** Når ingenting er valgt. Standard: «Ingen valgte». */
  empty: string;
  /** Hint om valgte chips. `%d` er antall. Standard: «Naviger til venstre for å finne %d valgte». */
  found: string;
  /** Ugyldig verdi. Standard: «Ugyldig valg». */
  invalid: string;
  /** Lista med valgte. Standard: «Valgte». */
  items: string;
  /** Posisjon, som i «2 av 5». Standard: «av». */
  of: string;
  /** Antall forslag, flertall. `%d` er antall. Standard: «%d forslag». */
  plural: string;
  /** Hint på en valgt chip. Standard: «Trykk for å fjerne». */
  remove: string;
  /** Når et alternativ fjernes. Standard: «Fjernet». */
  removed: string;
  /** Antall forslag, entall. `%d` er antall. Standard: «%d forslag». */
  singular: string;
  /** Åpne/lukk-knappen. Standard: «Forslag». */
  toggle: string;
}

/**
 * Gjør om CSS-escapes (`\e5 ` → `å`). Designsystemets CSS er bygget med escapede
 * tegn utenfor ASCII, og designsystemet-web leser CSS-variablene uten å gjøre dem
 * om. Uten dette leser skjermleseren «Trykk for backslash e5 fjerne».
 */
const unescapeCss = (text: string): string =>
  text.replace(/\\([0-9a-fA-F]{1,6})\s?/g, (_, hex: string) =>
    String.fromCodePoint(parseInt(hex, 16)),
  );

const SR_KEYS: readonly (keyof HviSuggestionSrText)[] = [
  'added',
  'clear',
  'empty',
  'found',
  'invalid',
  'items',
  'of',
  'plural',
  'remove',
  'removed',
  'singular',
  'toggle',
];

/** Minimal beskrivelse av `<u-combobox>` sitt DOM-API. */
interface ComboboxElement extends HTMLElement {
  readonly control: HTMLInputElement | null;
  readonly items: HTMLCollectionOf<HTMLDataElement>;
}

let nextId = 0;

/** Felles mal for `HviSuggestion` og `HviSuggestionMultiple`. */
export const HVI_SUGGESTION_TEMPLATE = `
  <ds-field class="ds-field">
    @if (label()) {
      <label class="ds-label" [attr.for]="inputId()">{{ label() }}</label>
    }
    @if (description()) {
      <div data-field="description">{{ description() }}</div>
    }
    <ds-suggestion
      #combobox
      class="ds-suggestion"
      (comboboxafterselect)="readFromDom()"
      [attr.data-multiple]="multiple ? '' : undefined"
      [attr.data-creatable]="creatable() ? '' : undefined"
    >
      <input
        class="ds-input"
        type="text"
        [id]="inputId()"
        [disabled]="disabled()"
        [readOnly]="readOnly()"
        [attr.name]="name()"
        [attr.placeholder]="placeholder()"
        [attr.aria-label]="label() ? null : ariaLabel()"
        [attr.aria-invalid]="error() ? 'true' : null"
        [attr.aria-busy]="loading() ? 'true' : null"
        (input)="complete($event)"
        (focus)="onFocus($event)"
        (blur)="onTouched()"
      />
      <!-- u-combobox styrer aria-label, aria-expanded og når knappene vises. -->
      <button type="reset"></button>
      <button type="button" aria-expanded="false"></button>
      <u-datalist data-nofilter>
        @for (option of visible(); track keyOf(option)) {
          <u-option [attr.value]="keyOf(option)" [attr.label]="labelOf(option)">
            @if (itemTemplate(); as template) {
              <ng-container
                [ngTemplateOutlet]="template"
                [ngTemplateOutletContext]="{ $implicit: option }"
              />
            } @else {
              {{ labelOf(option) }}
            }
          </u-option>
        }
        @if (creatable()) {
          <u-option [attr.data-empty]="createText() ?? ''"></u-option>
        } @else {
          <!-- value="" fordi Designsystemet skjuler tom-valget til det har fått value.
               Det settes bare ved input, ikke når forslagene kommer senere (backend-søk). -->
          <u-option data-empty value="">{{ loading() ? loadingText() : emptyText() }}</u-option>
        }
        @if (hiddenCount(); as hidden) {
          <div data-suggestion-truncated aria-hidden="true">
            {{ truncatedText().replace('%d', hidden.toString()) }}
          </div>
        }
      </u-datalist>
    </ds-suggestion>
    @if (error()) {
      <p class="ds-validation-message" data-field="validation">{{ error() }}</p>
    }
  </ds-field>
`;

/** Felles stiler for `HviSuggestion` og `HviSuggestionMultiple`. */
export const HVI_SUGGESTION_STYLES = `
  :host {
    display: block;
    margin-block-end: var(--ds-size-2);
  }

  /* Designsystemet viser alltid en pil ned. Snu den når lista er åpen, som i en select. */
  .ds-suggestion > button[aria-expanded='true']::before {
    rotate: 180deg;
  }

  [data-suggestion-truncated] {
    padding: var(--dsc-suggestion-option-padding, var(--ds-size-3));
    font-size: var(--ds-body-sm-font-size);
    color: var(--ds-color-neutral-text-subtle);
  }
`;

/**
 * Felles logikk for `HviSuggestion` (enkeltvalg) og `HviSuggestionMultiple` (flervalg).
 *
 * `T` er typen på alternativene. `V` er typen på verdien: `T | null` for enkeltvalg
 * og `T[]` for flervalg. Underklassene bestemmer bare verditypen og hvordan den
 * gjøres om til og fra en liste.
 */
@Directive()
export abstract class HviSuggestionBase<T, V> implements ControlValueAccessor {
  private readonly comboboxRef = viewChild<ElementRef<ComboboxElement>>('combobox');
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /** Om brukeren kan velge flere alternativer. Settes av underklassen. */
  protected abstract readonly multiple: boolean;

  /** Valgt verdi. */
  abstract readonly value: ModelSignal<V>;

  /** Gjør verdien om til en flat liste. */
  protected abstract toArray(value: V | null | undefined): readonly T[];

  /** Gjør valgte alternativer om til verdien. */
  protected abstract fromArray(options: T[]): V;

  /** Valgfri mal per alternativ: `<ng-template let-item #item>`. */
  readonly itemTemplate = contentChild<TemplateRef<{ $implicit: T }>>('item');

  /** Ledetekst. Utelates den, bør `ariaLabel` settes. */
  readonly label = input<string>();

  /** Alternativ til synlig label. Brukes kun når `label` ikke er satt. */
  readonly ariaLabel = input<string>();

  /** Utfyllende hjelpetekst under label. */
  readonly description = input<string>();

  /** Feilmelding. Markerer samtidig feltet som ugyldig. */
  readonly error = input<string>();

  /** Alternativene som kan velges. */
  readonly suggestions = input<readonly T[]>([]);

  /** Egenskapen som brukes som visningstekst når alternativene er objekter. */
  readonly optionLabel = input<string>();

  /** Egenskapen som identifiserer et alternativ. Faller tilbake til `optionLabel`. */
  readonly dataKey = input<string>();

  /** Lar brukeren legge til verdier som ikke finnes i lista. */
  readonly creatable = input(false, { transform: booleanAttribute });

  /**
   * Lager et nytt alternativ av teksten brukeren har skrevet, når `creatable` er satt.
   * Påkrevd når alternativene er objekter. Uten den blir ny verdi en streng.
   */
  readonly createOption = input<(text: string) => T>();

  /** Tekst som vises når ingen alternativer matcher. */
  readonly emptyText = input('Ingen treff');

  /** Tekst som vises mens `loading` er satt og det ikke finnes forslag ennå. */
  readonly loadingText = input('Søker …');

  /**
   * Tekst på valget for å legge til en ny verdi når `creatable` er satt.
   * `%s` erstattes med det brukeren har skrevet. Standard er Designsystemets tekst.
   */
  readonly createText = input<string>();

  /**
   * Filtrer `suggestions` på det brukeren skriver. Sett `false` når lista
   * allerede er filtrert, for eksempel av et backend-søk i `completeMethod`.
   */
  readonly filter = input(true, { transform: booleanAttribute });

  /**
   * Maks antall alternativer som rendres samtidig. Resten nås ved å skrive.
   * Holder DOM liten selv når `suggestions` inneholder tusenvis av elementer.
   */
  readonly maxVisible = input(100, { transform: numberAttribute });

  /** Tekst som vises når lista er avkortet. `%d` erstattes med antall skjulte. */
  readonly truncatedText = input('Viser de første treffene. Skriv for å søke blant %d til.');

  /** Send `completeMethod` allerede ved fokus, som Prime sin `dropdown`. */
  readonly completeOnFocus = input(false, { transform: booleanAttribute });

  /** Marker feltet som opptatt mens forslag hentes. */
  readonly loading = input(false, { transform: booleanAttribute });

  /** `id` på inputfeltet. Genereres automatisk. */
  readonly inputId = input(`hvi-suggestion-${nextId++}`);

  /** `name` på inputfeltet. */
  readonly name = input<string>();

  /** Plassholdertekst. */
  readonly placeholder = input<string>();

  /** Deaktiverer feltet. Settes også av `formControlName`. */
  readonly disabled = model(false);

  /**
   * Viser valgt verdi uten at den kan endres. Feltet får samme
   * readonly-stil som `hviSelect`, og valgte chips kan ikke fjernes.
   */
  readonly readOnly = input(false, { transform: booleanAttribute });

  /** Overstyr enkelte skjermlesertekster. Resten er Designsystemets norske standard. */
  readonly srText = input<Partial<HviSuggestionSrText>>({});

  /** Sendes når brukeren skriver, slik at `suggestions` kan oppdateres. */
  readonly completeMethod = output<HviSuggestionCompleteEvent>();

  /** Teksten brukeren har skrevet. Styrer den interne filtreringen. */
  private readonly query = signal('');

  /** Alternativene som matcher det brukeren har skrevet. */
  private readonly matching = computed<readonly T[]>(() => {
    const options = this.suggestions();
    if (!this.filter()) return options;

    const query = this.query().trim().toLowerCase();
    if (!query) return options;

    return options.filter((option) => this.labelOf(option).toLowerCase().includes(query));
  });

  /** Alternativene som faktisk rendres. */
  protected readonly visible = computed<readonly T[]>(() =>
    this.matching().slice(0, this.maxVisible()),
  );

  /** Antall treff som ikke rendres. */
  protected readonly hiddenCount = computed(() =>
    Math.max(0, this.matching().length - this.maxVisible()),
  );

  /** Valgt verdi som flat liste. */
  private readonly selected = computed<readonly T[]>(() => this.toArray(this.value()));

  private onChange: (value: V) => void = () => undefined;
  protected onTouched: () => void = () => undefined;

  constructor() {
    effect(() => {
      const selected = this.selected();
      const texts = this.srText();
      this.optionLabel();
      this.dataKey();
      if (!this.isBrowser) return;

      // Tekstene først: u-combobox lager aria-label på chipsene når de settes inn.
      this.writeSrText(texts);
      this.writeToDom(selected);
    });
  }

  /** Skjermlesertekster som er overstyrt via `srText`. */
  private overriddenSrText = new Set<keyof HviSuggestionSrText>();

  /**
   * Setter overstyrte skjermlesertekster som `data-sr-*` på `<ds-suggestion>`.
   * Teksten tilbakestilles til Designsystemets standard (CSS-variabelen) når en
   * overstyring fjernes. Attributtene fjernes aldri, ellers faller u-combobox
   * tilbake til engelsk. Standardtekstene Designsystemet allerede har satt,
   * renses for CSS-escapes.
   */
  private writeSrText(texts: Partial<HviSuggestionSrText>): void {
    const combobox = this.comboboxRef()?.nativeElement;
    if (!combobox) return;

    const overridden = new Set<keyof HviSuggestionSrText>();
    for (const key of SR_KEYS) {
      const text = texts[key];
      if (text != null) {
        combobox.setAttribute(`data-sr-${key}`, text);
        overridden.add(key);
      } else if (this.overriddenSrText.has(key)) {
        const standard = getComputedStyle(combobox)
          .getPropertyValue(`--dsc-suggestion-sr-${key}`)
          .trim()
          .replace(/^["']|["']$/g, '');
        combobox.setAttribute(`data-sr-${key}`, unescapeCss(standard));
      } else {
        const current = combobox.getAttribute(`data-sr-${key}`);
        if (current?.includes('\\')) combobox.setAttribute(`data-sr-${key}`, unescapeCss(current));
      }
    }
    this.overriddenSrText = overridden;
  }

  /** Flytter fokus til inputfeltet. */
  focus(): void {
    this.comboboxRef()?.nativeElement.control?.focus();
  }

  protected keyOf(option: T): string {
    if (option == null) return '';
    if (typeof option !== 'object') return String(option);
    const property = this.dataKey() ?? this.optionLabel();
    return property ? String((option as Record<string, unknown>)[property] ?? '') : String(option);
  }

  protected labelOf(option: T): string {
    if (option == null) return '';
    if (typeof option !== 'object') return String(option);
    const property = this.optionLabel();
    if (!property) {
      this.warnOnce(
        'missingLabel',
        'Alternativene er objekter, men optionLabel er ikke satt. Visningsteksten blir "[object Object]".',
      );
    }
    return property ? String((option as Record<string, unknown>)[property] ?? '') : String(option);
  }

  private readonly warned = new Set<string>();

  /** Advarer én gang per komponent, og bare i dev-modus. */
  private warnOnce(key: string, message: string): void {
    if (!isDevMode() || this.warned.has(key)) return;
    this.warned.add(key);
    console.warn(`[hvi-suggestion] ${message}`);
  }

  protected complete(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.query.set(query);

    // u-combobox skriver selv valgt tekst i feltet med en syntetisk `input`-hendelse.
    // Det er ikke et søk, og skal ikke sende `completeMethod` (#428). Tømming
    // (tøm-knappen eller etter valg i flervalg) sendes fortsatt, slik at forslagene
    // kan nullstilles.
    if (event.type === 'input' && !event.isTrusted && query !== '') return;

    this.completeMethod.emit({ query });
  }

  protected onFocus(event: Event): void {
    if (this.completeOnFocus() && !this.readOnly()) this.complete(event);
  }

  /**
   * Speiler valgt verdi inn i `<data>`-elementene som `<u-combobox>` bruker
   * internt. Gjenbruker eksisterende noder, siden komponenten også eier dem.
   */
  private writeToDom(selected: readonly T[]): void {
    const combobox = this.comboboxRef()?.nativeElement;
    if (!combobox) return;

    const wanted = new Map(selected.map((option) => [this.keyOf(option), this.labelOf(option)]));

    for (const element of Array.from(combobox.querySelectorAll(':scope > data'))) {
      const key = element.getAttribute('value') ?? element.textContent?.trim() ?? '';
      const label = wanted.get(key);

      if (label === undefined) {
        element.remove();
      } else {
        if (element.textContent !== label) element.textContent = label;
        wanted.delete(key);
      }
    }

    for (const [key, label] of wanted) {
      const data = document.createElement('data');
      data.value = key;
      data.textContent = label;
      combobox.insertBefore(data, combobox.control);
    }
  }

  /** Leser `<data>`-elementene tilbake etter at brukeren har endret valget. */
  protected readFromDom(): void {
    const combobox = this.comboboxRef()?.nativeElement;
    if (!combobox) return;

    const options = Array.from(combobox.items).map((data) => {
      const label = data.textContent?.trim() ?? '';
      return this.resolve(data.value || label) ?? this.create(label);
    });

    const value = this.fromArray(options);
    this.value.set(value);

    // u-combobox skriver selv valgt tekst i feltet ved valg. Hold filtreringen i takt.
    this.query.set(combobox.control?.value ?? '');

    this.onChange(value);
    this.onTouched();
  }

  /** Lager et nytt alternativ av tekst brukeren har lagt til med `creatable`. */
  private create(text: string): T {
    const createOption = this.createOption();
    if (createOption) return createOption(text);

    if (this.optionLabel()) {
      this.warnOnce(
        'missingCreate',
        'creatable er satt for objekter uten createOption. Nye verdier blir strenger.',
      );
    }
    return text as T;
  }

  /** Finner opprinnelig alternativ ut fra nøkkel, så verdien beholder typen. */
  private resolve(key: string): T | undefined {
    return (
      this.suggestions().find((option) => this.keyOf(option) === key) ??
      this.selected().find((option) => this.keyOf(option) === key)
    );
  }

  writeValue(value: V | null): void {
    this.value.set(this.fromArray([...this.toArray(value)]));
  }

  registerOnChange(fn: (value: V) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
