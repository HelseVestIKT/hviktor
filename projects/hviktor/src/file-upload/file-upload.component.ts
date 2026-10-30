import {
  afterNextRender,
  booleanAttribute,
  Component,
  computed,
  ElementRef,
  forwardRef,
  inject,
  Injector,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HviButton } from '../button/button.directive';
import { HviFieldDescription } from '../forms/field/field-description.directive';
import { HviFieldValidation } from '../forms/field/field-validation.directive';
import { HviField } from '../forms/field/field.component';
import { HviForm } from '../forms/form/form.directive';
import { HviLabel } from '../label/label.directive';
import { HviRequiredTag, RequiredTagMode } from '../required-tag/required-tag.component';

let nextId = 0;

/** Samme fil valgt to ganger skal bare stå én gang i lista. */
function isSameFile(a: File, b: File): boolean {
  return a.name === b.name && a.size === b.size && a.lastModified === b.lastModified;
}

/** Filstørrelse som «512 B», «1,2 kB» eller «3,4 MB». */
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toLocaleString('nb-NO', { maximumFractionDigits: 1 })} kB`;
  return `${(kb / 1024).toLocaleString('nb-NO', { maximumFractionDigits: 1 })} MB`;
}

/**
 * File upload er et skjemaelement for å laste opp filer.
 *
 * Komponenten kombinerer et område for å dra og slippe filer med en vanlig filvelger.
 * Den usynlige `<input type="file">` dekker hele området, så brukeren kan både klikke
 * og slippe filer der. Området markeres når en fil dras over det.
 *
 * Valgte filer vises i en liste under området, med en knapp for å fjerne hver fil.
 * Med `multiple` legges nye filer til de som allerede er valgt. Uten `multiple` erstatter
 * en ny fil den forrige. Skjermlesere får beskjed når filer legges til eller fjernes.
 *
 * Verdien er alltid en liste med filer (`File[]`). Komponenten laster ikke opp noe selv:
 * send filene sammen med resten av skjemaet, f.eks. som `FormData` med `HttpClient`.
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
 * @example Send filene til et API
 * ```ts
 * const formData = new FormData();
 * for (const fil of this.vedlegg()) formData.append('vedlegg', fil, fil.name);
 * this.http.post('/api/vedlegg', formData).subscribe();
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
    // `:hover` slår ikke inn mens man drar, så vi markerer området selv.
    `
      .ds-file-upload[data-dragover] {
        --dsc-file-upload-border-style: solid;
        --dsc-file-upload-border-color: var(--ds-color-border-strong);
        --dsc-file-upload-background: var(--ds-color-surface-tinted);
        --dsc-file-upload-icon-color: var(--ds-color-text-default);
      }
    `,
    `
      .hvi-file-upload__list {
        display: grid;
        gap: var(--ds-size-2);
        margin: var(--ds-size-3) 0 0;
        padding: 0;
        list-style: none;
      }
    `,
    `
      .hvi-file-upload__file {
        display: flex;
        align-items: center;
        gap: var(--ds-size-3);
        padding: var(--ds-size-2) var(--ds-size-2) var(--ds-size-2) var(--ds-size-3);
        border-radius: var(--ds-border-radius-md);
        background: var(--ds-color-neutral-surface-tinted);
      }
    `,
    '.hvi-file-upload__file > svg { flex-shrink: 0; font-size: var(--ds-size-6); }',
    `
      .hvi-file-upload__name {
        flex: 1;
        min-width: 0;
        overflow-wrap: anywhere;
      }
    `,
    `
      .hvi-file-upload__size {
        color: var(--ds-color-neutral-text-subtle);
        white-space: nowrap;
      }
    `,
  ],
  imports: [HviField, HviLabel, HviFieldDescription, HviFieldValidation, HviRequiredTag, HviButton],
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
      <div class="ds-file-upload" [attr.data-dragover]="dragOver() ? '' : null">
        <p class="ds-paragraph" hviFieldDescription>
          {{ dragOver() ? 'Slipp for å legge til' : effectiveDropzoneText() }}
        </p>
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
          [attr.accept]="accept() ?? null"
          [multiple]="multiple()"
          [disabled]="isDisabled()"
          [attr.readonly]="readOnly() ? '' : null"
          [attr.aria-readonly]="readOnly() ? 'true' : null"
          [attr.aria-invalid]="error() ? 'true' : null"
          [attr.aria-required]="required() ? 'true' : null"
          (click)="preventIfReadOnly($event)"
          (change)="handleChange()"
          (blur)="onTouched()"
          (dragenter)="handleDragEnter($event)"
          (dragleave)="dragOver.set(false)"
          (drop)="dragOver.set(false)"
        />
      </div>
      @if (value().length) {
        <ul class="hvi-file-upload__list" [attr.aria-label]="'Valgte filer for ' + label()">
          @for (file of value(); track file) {
            <li class="hvi-file-upload__file">
              <svg aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M6.5 3.25C5.80964 3.25 5.25 3.80964 5.25 4.5V19.5C5.25 20.1904 5.80964 20.75 6.5 20.75H17.5C18.1904 20.75 18.75 20.1904 18.75 19.5V8C18.75 7.80109 18.671 7.61032 18.5303 7.46967L14.5303 3.46967C14.3897 3.32902 14.1989 3.25 14 3.25H6.5ZM13.25 7.5C13.25 8.19036 13.8096 8.75 14.5 8.75H17.25V19.25H6.75V4.75H13.25V7.5ZM16.1893 7.25L14.75 5.81066V7.25H16.1893Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="hvi-file-upload__name">{{ file.name }}</span>
              <span class="hvi-file-upload__size">{{ formatFileSize(file.size) }}</span>
              @if (canEdit()) {
                <button
                  hviButton
                  type="button"
                  variant="tertiary"
                  size="sm"
                  icon
                  class="hvi-file-upload__remove"
                  [ariaLabel]="'Fjern ' + file.name"
                  (click)="removeFile(file)"
                >
                  <svg aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                    <path
                      fill="currentColor"
                      d="M6.53 5.47a.75.75 0 0 0-1.06 1.06L10.94 12l-5.47 5.47a.75.75 0 1 0 1.06 1.06L12 13.06l5.47 5.47a.75.75 0 1 0 1.06-1.06L13.06 12l5.47-5.47a.75.75 0 0 0-1.06-1.06L12 10.94z"
                    />
                  </svg>
                </button>
              }
            </li>
          }
        </ul>
      }
      @if (error()) {
        <p hviFieldValidation>{{ error() }}</p>
      }
    </hvi-field>
    <div class="ds-sr-only" role="status">{{ announcement() }}</div>
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

  /** La brukeren velge flere filer. Nye filer legges da til de som allerede er valgt. */
  readonly multiple = input(false, { transform: booleanAttribute });

  /** Feilmelding for feltet. Markerer også feltet som ugyldig. */
  readonly error = input<string>();

  /** Marker feltet som påkrevd. Bruk `Validators.required` i skjemaet for selve valideringen. */
  readonly required = input(false, { transform: booleanAttribute });

  /**
   * Manuell overstyring av required-tag-mode. Uten denne bestemmes taggen av
   * `<form hviForm>` på samme måte som i `hvi-textfield`.
   */
  readonly requiredMode = input<RequiredTagMode>();

  /** Gjør feltet skrivebeskyttet. Filvelgeren åpnes ikke, og filer kan ikke fjernes. */
  readonly readOnly = input(false, { transform: booleanAttribute });

  /** Deaktiverer feltet. Unngå om mulig — vurder `readOnly` i stedet. */
  readonly disabled = input(false, { transform: booleanAttribute });

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

  /** Brukeren kan legge til og fjerne filer. */
  protected readonly canEdit = computed(() => !this.isDisabled() && !this.readOnly());

  /** En fil dras over området akkurat nå. */
  protected readonly dragOver = signal(false);

  /** Tekst som leses opp av skjermlesere når filer legges til eller fjernes. */
  protected readonly announcement = signal('');

  protected readonly formatFileSize = formatFileSize;

  private readonly hviForm = inject(HviForm, { optional: true });
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);

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

  /** Marker området bare når det er filer som dras, ikke f.eks. markert tekst. */
  protected handleDragEnter(event: DragEvent): void {
    const hasFiles = event.dataTransfer?.types.includes('Files') ?? false;
    this.dragOver.set(hasFiles && this.canEdit());
  }

  protected handleChange(): void {
    const input = this.fileInput()?.nativeElement;
    if (!input) return;

    const selected = Array.from(input.files ?? []);
    // Filene ligger i `value`, ikke i inputen. Tøm den så samme fil kan velges igjen.
    input.value = '';
    if (!selected.length) return;

    const added = this.multiple()
      ? selected.filter((file) => !this.value().some((existing) => isSameFile(existing, file)))
      : selected.slice(0, 1);
    const files = this.multiple() ? [...this.value(), ...added] : added;

    this.update(files);
    this.onTouched();
    this.announce(added, 'lagt til');
  }

  /** Fjerner en fil og flytter fokus til neste fil, eller til filvelgeren når lista er tom. */
  protected removeFile(file: File): void {
    const index = this.value().indexOf(file);
    this.update(this.value().filter((existing) => existing !== file));
    this.announce([file], 'fjernet');

    afterNextRender(
      () => {
        const buttons = this.host.nativeElement.querySelectorAll<HTMLElement>(
          '.hvi-file-upload__remove',
        );
        const next = buttons[Math.min(index, buttons.length - 1)];
        (next ?? this.fileInput()?.nativeElement)?.focus();
      },
      { injector: this.injector },
    );
  }

  private update(files: File[]): void {
    this.value.set(files);
    this.onChange(files);
  }

  private announce(files: File[], action: 'lagt til' | 'fjernet'): void {
    if (!files.length) return;
    const subject = files.length === 1 ? files[0].name : `${files.length} filer`;
    this.announcement.set(`${subject} er ${action}`);
  }

  writeValue(value: File[] | null | undefined): void {
    this.value.set(value ?? []);
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
