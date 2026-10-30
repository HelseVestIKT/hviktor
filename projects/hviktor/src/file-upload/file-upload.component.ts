import {
  booleanAttribute,
  Component,
  computed,
  ElementRef,
  forwardRef,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HviFieldDescription } from '../forms/field/field-description.directive';
import { HviFieldValidation } from '../forms/field/field-validation.directive';
import { HviField } from '../forms/field/field.component';
import { HviForm } from '../forms/form/form.directive';
import { HviLabel } from '../label/label.directive';
import { HviRequiredTag, RequiredTagMode } from '../required-tag/required-tag.component';

let nextId = 0;

/**
 * File upload er et skjemaelement for å laste opp filer.
 *
 * Komponenten kombinerer et område for å dra og slippe filer med en vanlig filvelger.
 * Den usynlige `<input type="file">` dekker hele området, så brukeren kan både klikke
 * og slippe filer der. Label, beskrivelser og feilmelding kobles til inputen av `ds-field`.
 *
 * Verdien er alltid en liste med filer (`File[]`), også når `multiple` ikke er satt.
 * Komponenten laster ikke opp noe selv. Opplasting, fremdrift og liste over valgte filer
 * bygger du rundt komponenten.
 *
 * Fortell alltid brukeren hvilke filtyper og størrelser som er tillatt, f.eks. i `description`.
 * Merk at `accept` bare filtrerer filvelgeren. Filer som slippes i området sjekkes ikke,
 * så filtype og størrelse må fortsatt valideres.
 *
 * @example
 * ```html
 * <hvi-file-upload
 *   label="Last opp profilbilde"
 *   description="Filen må være i png- eller jpg-format og mindre enn 2 MB"
 *   accept=".png,.jpg"
 *   formControlName="profilbilde"
 * />
 * ```
 *
 * @example Flere filer med toveisbinding
 * ```html
 * <hvi-file-upload label="Vedlegg" multiple [(value)]="vedlegg" />
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/docs/file-upload/code}
 */
@Component({
  selector: 'hvi-file-upload',
  standalone: true,
  host: {
    // `id` gjelder inputen. Fjern den fra vertselementet så id-en ikke finnes to ganger.
    '[attr.id]': 'null',
  },
  styles: [
    ':host { display: block; }',
    // Designsystemet har bare stil for readonly. Gi deaktivert felt samme uttrykk som andre felt.
    '.ds-file-upload:has(> :disabled) { opacity: var(--ds-opacity-disabled); cursor: not-allowed; }',
  ],
  imports: [HviField, HviLabel, HviFieldDescription, HviFieldValidation, HviRequiredTag],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HviFileUpload),
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
        <div hviFieldDescription>{{ description() }}</div>
      }
      <div class="ds-file-upload">
        <p class="ds-paragraph" hviFieldDescription>{{ effectiveDropzoneText() }}</p>
        @if (dropzoneDescription()) {
          <p class="ds-paragraph" hviFieldDescription>{{ dropzoneDescription() }}</p>
        }
        <!-- Bare visuell: det er inputen under som er den ekte, klikkbare kontrollen. -->
        <span class="ds-button" data-variant="secondary" aria-hidden="true">
          {{ effectiveButtonText() }}
        </span>
        <input
          #fileInput
          type="file"
          title=""
          [id]="inputId()"
          [attr.name]="name() ?? null"
          [attr.accept]="accept() ?? null"
          [multiple]="multiple()"
          [disabled]="isDisabled()"
          [attr.readonly]="readOnly() ? '' : null"
          [attr.aria-readonly]="readOnly() ? 'true' : null"
          [attr.aria-invalid]="error() ? 'true' : null"
          [attr.required]="required() ? '' : null"
          (click)="preventIfReadOnly($event)"
          (change)="handleChange()"
          (blur)="onTouched()"
        />
      </div>
      @if (error()) {
        <p hviFieldValidation>{{ error() }}</p>
      }
    </hvi-field>
  `,
})
export class HviFileUpload implements ControlValueAccessor {
  /** Synlig ledetekst som forteller hva som skal lastes opp. */
  readonly label = input.required<string>();

  /** Hjelpetekst under ledeteksten, f.eks. tillatte filtyper og maks størrelse. */
  readonly description = input<string>();

  /** Teksten i slippområdet. Standard er «Slipp fil her», eller «Slipp filer her» med `multiple`. */
  readonly dropzoneText = input<string>();

  /** Ekstra beskrivelse inni slippområdet, under `dropzoneText`. */
  readonly dropzoneDescription = input<string>();

  /** Teksten på knappen. Standard er «Velg fil», eller «Velg filer» med `multiple`. */
  readonly buttonText = input<string>();

  /**
   * Tillatte filtyper, f.eks. `'.pdf'` eller `'image/*'`. Sendes rett til `<input accept>`.
   * Filtrerer bare filvelgeren, ikke filer som slippes i området.
   */
  readonly accept = input<string>();

  /** La brukeren velge flere filer. */
  readonly multiple = input(false, { transform: booleanAttribute });

  /** Feilmelding for feltet. Markerer også feltet som ugyldig. */
  readonly error = input<string>();

  /** Marker feltet som påkrevd. */
  readonly required = input(false, { transform: booleanAttribute });

  /**
   * Manuell overstyring av required-tag-mode. Uten denne bestemmes taggen av
   * `<form hviForm>` på samme måte som i `hvi-textfield`.
   */
  readonly requiredMode = input<RequiredTagMode>();

  /** Gjør feltet skrivebeskyttet. Området blir nøytralt og filvelgeren åpnes ikke. */
  readonly readOnly = input(false, { transform: booleanAttribute });

  /** Deaktiverer feltet. Unngå om mulig — vurder `readOnly` i stedet. */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** `name`-attributt på inputen. */
  readonly name = input<string>();

  /** `id` på inputen. Genereres automatisk hvis den ikke settes. */
  readonly id = input<string>();

  /**
   * Valgte filer. Toveisbinding, og settes også av `ngModel` og `formControlName`.
   * Er en tom liste når ingen filer er valgt.
   */
  readonly value = model<File[]>([]);

  private readonly uniqueId = nextId++;

  readonly inputId = computed(() => this.id() ?? `hvi-file-upload-${this.uniqueId}`);

  protected readonly effectiveDropzoneText = computed(
    () => this.dropzoneText() ?? (this.multiple() ? 'Slipp filer her' : 'Slipp fil her'),
  );

  protected readonly effectiveButtonText = computed(
    () => this.buttonText() ?? (this.multiple() ? 'Velg filer' : 'Velg fil'),
  );

  /** Satt av `setDisabledState` fra reactive forms. */
  private readonly disabledByForm = signal(false);

  /** Feltet er deaktivert hvis enten input-et eller skjemaet sier det. */
  protected readonly isDisabled = computed(() => this.disabled() || this.disabledByForm());

  private readonly hviForm = inject(HviForm, { optional: true });

  /**
   * Required-tag-mode fra manuell overstyring eller `HviForm`-kontekst.
   * Er `null` når ingen tag skal vises.
   */
  readonly effectiveRequiredMode = computed<RequiredTagMode | null>(() => {
    const override = this.requiredMode();
    if (override) return override;

    const form = this.hviForm;
    if (!form || !form.showRequiredTags) return null;

    // Med 'all-required' vises taggen øverst i skjemaet, ikke per felt.
    if (form.requiredMode() !== 'mixed') return null;
    return this.required() ? 'required' : 'optional';
  });

  private readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  private onChange: (value: File[]) => void = () => undefined;
  protected onTouched: () => void = () => undefined;

  /** `readonly` stopper ikke filvelgeren, så vi stopper klikket (også fra tastaturet). */
  protected preventIfReadOnly(event: Event): void {
    if (this.readOnly()) event.preventDefault();
  }

  protected handleChange(): void {
    const files = Array.from(this.fileInput()?.nativeElement.files ?? []);
    this.value.set(files);
    this.onChange(files);
    this.onTouched();
  }

  writeValue(value: File[] | null | undefined): void {
    const files = value ?? [];
    this.value.set(files);

    // En fil-input kan bare tømmes programmatisk. Gjør det når skjemaet nullstilles,
    // så filnavnet ikke blir hengende igjen i inputen. Første kall kan komme før inputen finnes.
    const input = this.fileInput()?.nativeElement;
    if (input && files.length === 0) input.value = '';
  }

  registerOnChange(fn: (value: File[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledByForm.set(isDisabled);
  }
}
