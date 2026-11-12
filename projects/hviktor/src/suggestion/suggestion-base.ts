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

/** Emitted when the user types and the suggestions should be updated. */
export interface HviSuggestionCompleteEvent {
  /** The text the user has typed. Empty string on focus and when the field is cleared. */
  query: string;
}

/**
 * Screen reader texts used by `<u-combobox>`. Designsystemet provides Norwegian
 * defaults for all of them, so only set the ones you want to override.
 */
export interface HviSuggestionSrText {
  /** Announced when an option is added. Default: «La til». */
  added: string;
  /** The clear button. Default: «Fjern tekst». */
  clear: string;
  /** Announced when nothing is selected. Default: «Ingen valgte». */
  empty: string;
  /** Hint about selected chips. `%d` is the count. Default: «Naviger til venstre for å finne %d valgte». */
  found: string;
  /** Invalid value. Default: «Ugyldig valg». */
  invalid: string;
  /** The list of selected items. Default: «Valgte». */
  items: string;
  /** Position, as in «2 av 5». Default: «av». */
  of: string;
  /** Number of suggestions, plural. `%d` is the count. Default: «%d forslag». */
  plural: string;
  /** Hint on a selected chip. Default: «Trykk for å fjerne». */
  remove: string;
  /** Announced when an option is removed. Default: «Fjernet». */
  removed: string;
  /** Number of suggestions, singular. `%d` is the count. Default: «%d forslag». */
  singular: string;
  /** The open/close button. Default: «Forslag». */
  toggle: string;
}

/**
 * Decodes CSS escapes (`\e5 ` → `å`). Designsystemet ships the texts unescaped, but the
 * Angular build (esbuild) escapes non-ASCII characters in the bundled CSS, and
 * designsystemet-web reads the CSS variables without decoding them. Without this,
 * screen readers announce «Trykk for backslash e5 fjerne».
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

/** Minimal description of the `<u-combobox>` DOM API. */
interface ComboboxElement extends HTMLElement {
  readonly control: HTMLInputElement | null;
  readonly items: HTMLCollectionOf<HTMLDataElement>;
}

let nextId = 0;

/** Shared template for `HviSuggestion` and `HviSuggestionMultiple`. */
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
      (comboboxbeforeselect)="beforeSelect($event)"
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
      <!-- u-combobox manages aria-label, aria-expanded and when the buttons are shown. -->
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
          <!-- value="" because Designsystemet hides the empty option until it has a value.
               It only sets one on input, not when suggestions arrive later (backend search). -->
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

/** Shared styles for `HviSuggestion` and `HviSuggestionMultiple`. */
export const HVI_SUGGESTION_STYLES = `
  :host {
    display: block;
    margin-block-end: var(--ds-size-2);
  }

  /* Designsystemet always shows a down arrow. Flip it when the list is open, like a select. */
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
 * Shared logic for `HviSuggestion` (single select) and `HviSuggestionMultiple` (multi select).
 *
 * `T` is the option type. `V` is the value type: `T | null` for single select and
 * `T[]` for multi select. Subclasses only decide the value type and how it is
 * converted to and from a list.
 */
@Directive()
export abstract class HviSuggestionBase<T, V> implements ControlValueAccessor {
  private readonly comboboxRef = viewChild<ElementRef<ComboboxElement>>('combobox');
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /** Whether the user can select multiple options. Set by the subclass. */
  protected abstract readonly multiple: boolean;

  /** The selected value. */
  abstract readonly value: ModelSignal<V>;

  /** Converts the value to a flat list. */
  protected abstract toArray(value: V | null | undefined): readonly T[];

  /** Converts the selected options to the value. */
  protected abstract fromArray(options: T[]): V;

  /** Optional template per option: `<ng-template let-item #item>`. */
  readonly itemTemplate = contentChild<TemplateRef<{ $implicit: T }>>('item');

  /** Visible label. If omitted, set `ariaLabel`. */
  readonly label = input<string>();

  /** Accessible name used only when `label` is not set. */
  readonly ariaLabel = input<string>();

  /** Helper text shown below the label. */
  readonly description = input<string>();

  /** Error message. Also marks the field as invalid. */
  readonly error = input<string>();

  /** The options that can be selected. */
  readonly suggestions = input<readonly T[]>([]);

  /** Property used as display text when the options are objects. */
  readonly optionLabel = input<string>();

  /** Property that identifies an option. Falls back to `optionLabel`. */
  readonly dataKey = input<string>();

  /** Lets the user add values that are not in the list. */
  readonly creatable = input(false, { transform: booleanAttribute });

  /**
   * Creates a new option from the text the user typed, when `creatable` is set.
   * Required when the options are objects. Without it, new values are strings.
   */
  readonly createOption = input<(text: string) => T>();

  /** Text shown when no options match. */
  readonly emptyText = input('Ingen treff');

  /** Text shown while `loading` is set and there are no suggestions yet. */
  readonly loadingText = input('Søker …');

  /**
   * Text on the option for adding a new value when `creatable` is set.
   * `%s` is replaced with what the user typed. Defaults to Designsystemet's text.
   */
  readonly createText = input<string>();

  /**
   * Filters `suggestions` by what the user types. Set to `false` when the list
   * is already filtered, for example by a backend search in `completeMethod`.
   */
  readonly filter = input(true, { transform: booleanAttribute });

  /**
   * Maximum number of options rendered at once. The rest are reached by typing.
   * Keeps the DOM small even when `suggestions` contains thousands of items.
   */
  readonly maxVisible = input(100, { transform: numberAttribute });

  /** Text shown when the list is truncated. `%d` is replaced with the number hidden. */
  readonly truncatedText = input('Viser de første treffene. Skriv for å søke blant %d til.');

  /** Emits `completeMethod` on focus as well, like PrimeNG's `dropdown`. */
  readonly completeOnFocus = input(false, { transform: booleanAttribute });

  /** Marks the field as busy while suggestions are loading. */
  readonly loading = input(false, { transform: booleanAttribute });

  /** `id` of the input. Generated automatically. */
  readonly inputId = input(`hvi-suggestion-${nextId++}`);

  /** `name` of the input. */
  readonly name = input<string>();

  /** Placeholder text. */
  readonly placeholder = input<string>();

  /** Disables the field. Also set by `formControlName`. */
  readonly disabled = model(false);

  /**
   * Shows the selected value without allowing changes. The field gets the same
   * read-only style as `hviSelect`, and selected chips cannot be removed.
   */
  readonly readOnly = input(false, { transform: booleanAttribute });

  /** Overrides individual screen reader texts. The rest use Designsystemet's Norwegian defaults. */
  readonly srText = input<Partial<HviSuggestionSrText>>({});

  /** Emitted when the user types or clears the field, so `suggestions` can be updated. Not emitted when an option is selected. */
  readonly completeMethod = output<HviSuggestionCompleteEvent>();

  /** The text the user has typed. Drives the internal filtering. */
  private readonly query = signal('');

  /** The options matching what the user has typed. */
  private readonly matching = computed<readonly T[]>(() => {
    const options = this.suggestions();
    if (!this.filter()) return options;

    const query = this.query().trim().toLowerCase();
    if (!query) return options;

    return options.filter((option) => this.labelOf(option).toLowerCase().includes(query));
  });

  /** The options actually rendered. */
  protected readonly visible = computed<readonly T[]>(() =>
    this.matching().slice(0, this.maxVisible()),
  );

  /** Number of matches not rendered. */
  protected readonly hiddenCount = computed(() =>
    Math.max(0, this.matching().length - this.maxVisible()),
  );

  /** The selected value as a flat list. */
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

      // Texts first: u-combobox sets aria-label on the chips when they are inserted.
      this.writeSrText(texts);
      this.writeToDom(selected);
    });
  }

  /** Screen reader texts overridden via `srText`. */
  private overriddenSrText = new Set<keyof HviSuggestionSrText>();

  /**
   * Sets overridden screen reader texts as `data-sr-*` on `<ds-suggestion>`.
   * When an override is removed, the text is reset to Designsystemet's default
   * (the CSS variable). The attributes are never removed, or u-combobox would fall
   * back to English. Defaults already set by Designsystemet are decoded from CSS escapes.
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

  /** Moves focus to the input. */
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

  /** Warns once per component instance, and only in dev mode. */
  private warnOnce(key: string, message: string): void {
    if (!isDevMode() || this.warned.has(key)) return;
    this.warned.add(key);
    console.warn(`[hvi-suggestion] ${message}`);
  }

  protected complete(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.query.set(query);

    // u-combobox writes the selected text into the field with a synthetic `input` event.
    // That is not a search and must not emit `completeMethod` (#428). Clearing (the clear
    // button, or after selecting in multi select) is still emitted, so suggestions can be reset.
    if (event.type === 'input' && !event.isTrusted && query !== '') return;

    this.completeMethod.emit({ query });
  }

  protected onFocus(event: Event): void {
    if (this.completeOnFocus() && !this.readOnly()) this.complete(event);
  }

  /**
   * Mirrors the selected value into the `<data>` elements `<u-combobox>` uses
   * internally. Reuses existing nodes, since the web component owns them too.
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

  /**
   * Stops text that is not an option from being added when `creatable` is not set.
   * Designsystemet sets the typed text as `label` on the empty option («Ingen treff»),
   * so u-combobox treats it as a match when the user presses Enter.
   */
  protected beforeSelect(event: Event): void {
    if (this.creatable()) return;

    const item = (event as CustomEvent<HTMLDataElement | undefined>).detail;
    // An item already in the DOM is a chip being removed. That is always allowed.
    if (!item || item.isConnected) return;

    if (this.resolve(item.value) === undefined) event.preventDefault();
  }

  /** Reads the `<data>` elements back after the user has changed the selection. */
  protected readFromDom(): void {
    const combobox = this.comboboxRef()?.nativeElement;
    if (!combobox) return;

    // Without `creatable`, items that are not options are dropped. writeToDom then removes them.
    const options = Array.from(combobox.items).flatMap((data) => {
      const label = data.textContent?.trim() ?? '';
      const option = this.resolve(data.value || label);
      if (option !== undefined) return [option];
      return this.creatable() ? [this.create(label)] : [];
    });

    const value = this.fromArray(options);
    this.value.set(value);

    // u-combobox writes the selected text into the field on selection. Keep filtering in sync.
    this.query.set(combobox.control?.value ?? '');

    this.onChange(value);
    this.onTouched();
  }

  /** Creates a new option from text the user added with `creatable`. */
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

  /** Finds the original option by key, so the value keeps its type. */
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
