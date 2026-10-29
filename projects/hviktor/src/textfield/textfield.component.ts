import {
  booleanAttribute,
  Component,
  computed,
  ElementRef,
  forwardRef,
  inject,
  input,
  model,
  numberAttribute,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HviFieldAffix } from '../forms/field/field-affix.component';
import { HviFieldAffixes } from '../forms/field/field-affixes.component';
import { HviFieldCounter } from '../forms/field/field-counter.component';
import { HviFieldDescription } from '../forms/field/field-description.directive';
import { HviFieldValidation } from '../forms/field/field-validation.directive';
import { HviField } from '../forms/field/field.component';
import { HviForm } from '../forms/form/form.directive';
import { HviInput } from '../forms/input/input.directive';
import { HviLabel } from '../label/label.directive';
import { HviRequiredTag, RequiredTagMode } from '../required-tag/required-tag.component';

export type HviTextfieldType =
  | 'number'
  | 'hidden'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'month'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

/** Verdien til et textfield: tekst, eller tall/`null` når `type="number"`. */
export type HviTextfieldValue = string | number | null;

let nextId = 0;

/**
 * Textfield gir brukere muligheten til å skrive fritekst eller tall.
 *
 * Dette er en sammensatt komponent som bruker Field, Input/Textarea og Label under panseret.
 * Bruk `multiline` for å bytte mellom input og textarea.
 *
 * Komponenten er signalbasert og fungerer derfor også i soneløse applikasjoner
 * og sammen med signalbaserte skjemaer.
 *
 * @example
 * ```html
 * <hvi-textfield label="Navn"></hvi-textfield>
 * ```
 *
 * @example
 * ```html
 * <hvi-textfield label="Beskrivelse" [multiline]="true" [rows]="4"></hvi-textfield>
 * ```
 *
 * @example
 * ```html
 * <hvi-textfield label="Pris" prefix="NOK" suffix="pr. mnd"></hvi-textfield>
 * ```
 *
 * @example Tallfelt – skjemaet får `number`, eller `null` når feltet er tomt
 * ```html
 * <hvi-textfield label="Antall" type="number" formControlName="antall"></hvi-textfield>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/textfield/code}
 */
@Component({
  selector: 'hvi-textfield',
  standalone: true,
  styles: [
    ':host { display: block; }',
    // Designsystemet bruker bare data-width på select, så vi lar det styre input også.
    '.ds-input[data-width="auto"] { width: auto; }',
    '.ds-input[data-width="full"] { width: 100%; }',
    '.ds-field-affixes:has(> .ds-input[data-width="auto"]) { width: fit-content; }',
    '.ds-field-affixes:has(> .ds-input[data-width="full"]) { width: auto; }',
  ],
  imports: [
    HviField,
    HviLabel,
    HviInput,
    HviFieldAffixes,
    HviFieldAffix,
    HviFieldCounter,
    HviFieldDescription,
    HviFieldValidation,
    HviRequiredTag,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HviTextfield),
      multi: true,
    },
  ],
  template: `
    <hvi-field>
      <label hviLabel [attr.for]="inputId()">
        {{ label() }}
        @if (effectiveRequiredMode(); as mode) {
          <hvi-required-tag [mode]="mode" />
        }
      </label>
      @if (description()) {
        <span hviFieldDescription>{{ description() }}</span>
      }
      <hvi-field-affixes>
        @if (prefix()) {
          <hvi-field-affix [id]="prefixId()">{{ prefix() }}</hvi-field-affix>
        }
        @if (multiline()) {
          <textarea
            #control
            hviInput
            [id]="inputId()"
            [attr.name]="name() ?? null"
            [attr.rows]="rows() ?? null"
            [attr.placeholder]="placeholder() ?? null"
            [disabled]="isDisabled()"
            [readOnly]="readOnly()"
            [attr.maxlength]="maxLength() ?? null"
            [attr.aria-invalid]="error() ? 'true' : null"
            [attr.aria-describedby]="affixDescribedBy()"
            [attr.required]="required() ? '' : null"
            [attr.autocomplete]="autocomplete() ?? null"
            [value]="displayValue()"
            (input)="handleInput($event)"
            (blur)="onTouched()"
          ></textarea>
        } @else {
          <input
            #control
            hviInput
            [id]="inputId()"
            [type]="type()"
            [attr.name]="name() ?? null"
            [size]="size() || undefined"
            [width]="width()"
            [attr.placeholder]="placeholder() ?? null"
            [disabled]="isDisabled()"
            [readOnly]="readOnly()"
            [attr.maxlength]="maxLength() ?? null"
            [attr.aria-invalid]="error() ? 'true' : null"
            [attr.aria-describedby]="affixDescribedBy()"
            [attr.required]="required() ? '' : null"
            [attr.autocomplete]="autocomplete() ?? null"
            [value]="displayValue()"
            (input)="handleInput($event)"
            (blur)="onTouched()"
          />
        }
        @if (suffix()) {
          <hvi-field-affix [id]="suffixId()">{{ suffix() }}</hvi-field-affix>
        }
      </hvi-field-affixes>
      @if (counterLimit(); as limit) {
        <hvi-field-counter [limit]="limit" />
      }
      @if (error()) {
        <p hviFieldValidation>{{ error() }}</p>
      }
    </hvi-field>
  `,
})
export class HviTextfield<T extends HviTextfieldValue = string> implements ControlValueAccessor {
  /** Ledetekst for feltet. */
  readonly label = input<string>('');

  /** Hjelpetekst under ledeteksten. */
  readonly description = input<string>();

  /**
   * Tekst foran inputfeltet, f.eks. valuta. Kobles til feltet med `aria-describedby`
   * slik at skjermlesere leser den opp. Samme informasjon bør også stå i ledeteksten.
   */
  readonly prefix = input<string>();

  /**
   * Tekst etter inputfeltet, f.eks. enhet. Kobles til feltet med `aria-describedby`
   * slik at skjermlesere leser den opp. Samme informasjon bør også stå i ledeteksten.
   */
  readonly suffix = input<string>();

  /** Feilmelding for feltet. */
  readonly error = input<string>();

  /** Tegngrense. Viser en teller under feltet. */
  readonly counterLimit = input<number | undefined>(undefined, { transform: numberAttribute });

  /** Input-typen for feltet. */
  readonly type = input<HviTextfieldType>('text');

  /**
   * Manuell overstyring av required-tag-mode.
   * Når satt, vises taggen uavhengig av HviForm-kontekst.
   * - `'required'`: "Må fylles ut" (warning)
   * - `'optional'`: "Valgfritt" (info)
   *
   * Når IKKE satt og feltet er inne i en `<form hviForm>`, bestemmes mode automatisk:
   * - Form er `'all-required'` → ingen tag per felt (vis `all-required` øverst i form)
   * - Form er `'mixed'` → `'required'` hvis feltet er required, `'optional'` hvis ikke
   * - Form er `'none'` → ingen tag
   */
  readonly requiredMode = input<RequiredTagMode>();

  /** Autocomplete-attributt for inputfeltet, f.eks. 'given-name' eller 'email'. */
  readonly autocomplete = input<string>();

  /** Render en textarea i stedet for input, for flerlinjet tekst. */
  readonly multiline = input(false, { transform: booleanAttribute });

  /** Antall rader i textarea. */
  readonly rows = input<number | undefined>(undefined, { transform: numberAttribute });

  /**
   * Bredden på feltet:
   * - `'full'`: hele tilgjengelige bredden, også når `size` er satt.
   * - `'auto'`: feltets naturlige bredde – `size` tegn, eller ca. 20 tegn uten `size`.
   *
   * Ikke satt: hele bredden, med mindre `size` er satt. Gjelder ikke `multiline`.
   */
  readonly width = input<'auto' | 'full'>();

  /** Bredden på inputfeltet målt i antall tegn. Bruk det for å gi feltet en realistisk bredde. */
  readonly size = input<number | undefined>(undefined, { transform: numberAttribute });

  /** Plassholdertekst. Unngå å bruke dette i stedet for ledetekst. */
  readonly placeholder = input<string>();

  /** `name`-attributt på inputfeltet. */
  readonly name = input<string>();

  /** `id` på inputfeltet. Genereres automatisk hvis den ikke settes. */
  readonly id = input<string>();

  /** Maks antall tegn. */
  readonly maxLength = input<number | undefined>(undefined, { transform: numberAttribute });

  /**
   * Verdien i feltet. Toveisbinding, og settes også av `ngModel`, `formControlName` og `[formField]`.
   *
   * Med `type="number"` er verdien et tall, eller `null` når feltet er tomt – på samme måte
   * som Angular gjør for `<input type="number">`. For alle andre typer er verdien en streng.
   */
  readonly value = model<T>('' as T);

  /** Marker feltet som påkrevd. */
  readonly required = input(false, { transform: booleanAttribute });

  /** Deaktiverer feltet. Unngå om mulig — vurder `readOnly` i stedet. */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Satt av `setDisabledState` fra reactive forms. */
  private readonly disabledByForm = signal(false);

  /** Feltet er deaktivert hvis enten input-et eller skjemaet sier det. */
  protected readonly isDisabled = computed(() => this.disabled() || this.disabledByForm());

  /** Gjør feltet skrivebeskyttet. Foretrekkes framfor `disabled`. */
  readonly readOnly = input(false, { transform: booleanAttribute });

  /** Injisert HviForm for automatisk required-tag-beregning. */
  private readonly hviForm = inject(HviForm, { optional: true });

  private readonly uniqueId = nextId++;

  readonly inputId = computed(() => this.id() ?? `hvi-textfield-${this.uniqueId}`);

  protected readonly prefixId = computed(() => `${this.inputId()}-prefix`);
  protected readonly suffixId = computed(() => `${this.inputId()}-suffix`);

  /**
   * Kobler prefiks og suffiks til feltet. `ds-field` legger selv til beskrivelse
   * og feilmelding i `aria-describedby`, og beholder id-ene vi setter her.
   */
  protected readonly affixDescribedBy = computed(() => {
    const ids = [this.prefix() && this.prefixId(), this.suffix() && this.suffixId()].filter(
      Boolean,
    );
    return ids.length ? ids.join(' ') : null;
  });

  /**
   * Beregnet required-tag-mode basert på manuell overstyring eller HviForm-kontekst.
   * Er `null` når ingen tag skal vises.
   */
  readonly effectiveRequiredMode = computed<RequiredTagMode | null>(() => {
    // Manuell overstyring vinner alltid
    const override = this.requiredMode();
    if (override) return override;

    // Uten HviForm-kontekst eller med tags skrudd av: ingen automatikk
    const form = this.hviForm;
    if (!form || !form.showRequiredTags) return null;

    switch (form.requiredMode()) {
      case 'all-required':
        // Alle er required – vis ingen tag per felt (all-required vises øverst i form)
        return null;
      case 'mixed':
        // Blanding – vis required eller optional basert på feltets required-state
        return this.required() ? 'required' : 'optional';
      case 'none':
      default:
        return null;
    }
  });

  /** Det brukeren sist skrev, slik at f.eks. «1.0» ikke skrives om til «1» mens man skriver. */
  private readonly rawInput = signal<string | null>(null);

  /** Teksten som vises i feltet. */
  protected readonly displayValue = computed(() => {
    const value = this.value();
    const raw = this.rawInput();
    if (raw !== null && this.parse(raw) === value) return raw;
    return value === null || value === undefined ? '' : String(value);
  });

  private readonly control =
    viewChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('control');

  private onChange: (value: T) => void = () => undefined;
  protected onTouched: () => void = () => undefined;

  protected handleInput(event: Event): void {
    const raw = (event.target as HTMLInputElement | HTMLTextAreaElement).value;
    const value = this.parse(raw);
    this.rawInput.set(raw);
    this.value.set(value);
    this.onChange(value);
  }

  /** Samme konvertering som Angulars `NumberValueAccessor`: tomt felt gir `null`, ellers et tall. */
  private parse(raw: string): T {
    if (this.type() !== 'number' || this.multiline()) return raw as T;
    return (raw === '' ? null : parseFloat(raw)) as T;
  }

  writeValue(value: T | null | undefined): void {
    this.rawInput.set(null);
    this.value.set((value ?? (this.type() === 'number' ? null : '')) as T);

    // Skriv også rett til feltet, slik Angular gjør. Ellers blir f.eks. ugyldig tekst
    // i et tallfelt stående når skjemaet nullstilles, fordi den viste verdien er uendret.
    const control = this.control()?.nativeElement;
    if (control) control.value = this.displayValue();
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledByForm.set(isDisabled);
  }
}
