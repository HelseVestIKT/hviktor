import { booleanAttribute, Directive, ElementRef, inject, Input } from '@angular/core';

/** @internal Group-level validation message registered with a fieldset. */
export interface HviFieldsetValidationRef {
  readonly element: HTMLElement;
  readonly id: () => string;
  readonly visible: () => boolean;
}

/** @internal Form control (radio) that reports its invalid state to a fieldset. */
export interface HviFieldsetControlRef {
  readonly invalid: () => boolean;
}

/** Like `booleanAttribute`, but keeps `undefined`/`null` as "not set". */
export function optionalBooleanAttribute(value: unknown): boolean | undefined {
  return value === undefined || value === null ? undefined : booleanAttribute(value);
}

/**
 * @summary Directive that applies Designsystemet fieldset styling to a native `<fieldset>` element,
 * grouping related form fields with a shared legend for improved structure and accessibility.
 *
 * When the fieldset contains radio buttons it automatically becomes a radio group
 * (`role="radiogroup"`) and takes ownership of the validation state:
 * - A `hviFieldValidation` message placed directly in the fieldset is linked to the
 *   group with `aria-describedby`, not to each radio button.
 * - `aria-invalid="true"` is set on the group, not on each radio button, so screen readers
 *   announce «Bydel, radiogruppe, ugyldig, Du må velge en bydel» once instead of «ugyldig»
 *   for every option.
 * - `hviControlInvalid` on the radios reports to the group instead of marking each radio.
 * - The radios still get the red error styling via `styles.css`.
 *
 * If the radios are rendered by a child component of your own (e.g. inside an `@for` in
 * another component), set `role="radiogroup"` explicitly so the group is detected on first render.
 *
 * @example Radio group fieldset
 * ```html
 * <fieldset hviFieldset>
 *   <legend hviLabel weight="medium">Which framework do you like best?</legend>
 *   <p hviParagraph>Your choice will help us improve the service.</p>
 *   <hvi-field>
 *     <input hviInput type="radio" id="angular" name="framework" value="angular" />
 *     <label hviLabel for="angular">Angular</label>
 *   </hvi-field>
 *   <hvi-field>
 *     <input hviInput type="radio" id="react" name="framework" value="react" />
 *     <label hviLabel for="react">React</label>
 *   </hvi-field>
 * </fieldset>
 * ```
 *
 * @example Radio group with error
 * ```html
 * <fieldset hviFieldset>
 *   <legend hviLabel weight="medium">Bydel</legend>
 *   <hvi-field>
 *     <input hviInput hviControlInvalid type="radio" id="ostbyen" name="bydel" value="ostbyen" [formControl]="bydel" />
 *     <label hviLabel for="ostbyen">Østbyen</label>
 *   </hvi-field>
 *   <p hviFieldValidation>Du må velge en bydel før du kan fortsette.</p>
 * </fieldset>
 * ```
 *
 * @example Disabled fieldset
 * ```html
 * <fieldset hviFieldset disabled>
 *   <legend hviLabel weight="medium">Disabled group</legend>
 *   <hvi-field>
 *     <input hviInput type="checkbox" id="opt" value="opt" />
 *     <label hviLabel for="opt">Option</label>
 *   </hvi-field>
 * </fieldset>
 * ```
 *
 * @see {@link https://designsystemet.no/komponenter/fieldset}
 */
@Directive({
  selector: 'fieldset[hviFieldset]',
  standalone: true,
  host: {
    class: 'ds-fieldset',
    '[attr.role]': 'groupRole',
    '[attr.aria-invalid]': 'groupInvalid',
    '[attr.aria-describedby]': 'groupDescribedby',
  },
})
export class HviFieldset {
  private readonly host = inject<ElementRef<HTMLFieldSetElement>>(ElementRef).nativeElement;
  private readonly validations = new Set<HviFieldsetValidationRef>();
  private readonly controls = new Set<HviFieldsetControlRef>();
  /** Static `aria-describedby` set in the template. Merged with group-level validation ids. */
  private readonly staticDescribedby = this.host.getAttribute('aria-describedby');

  /**
   * ARIA role for the group. Defaults to `radiogroup` when the fieldset contains radio buttons,
   * otherwise the native `group` role of `<fieldset>` is used.
   */
  @Input() role?: string | null;

  /**
   * Overrides the automatic invalid state of the group.
   * Leave unset to derive it from `hviFieldValidation` / `hviControlInvalid` in a radio group.
   */
  @Input({ transform: optionalBooleanAttribute }) invalid?: boolean;

  /** Whether this fieldset is a radio group (explicit `role` or contains radio buttons). */
  get isRadioGroup(): boolean {
    if (this.role) return this.role === 'radiogroup';
    return this.host.querySelector('input[type="radio"]') !== null;
  }

  /**
   * @internal
   * Whether a validation message element is a group-level message owned by this fieldset
   * (a direct child of a radio group fieldset).
   */
  ownsValidation(element: HTMLElement): boolean {
    return element.parentElement === this.host && this.isRadioGroup;
  }

  /** @internal */
  registerValidation(ref: HviFieldsetValidationRef): () => void {
    this.validations.add(ref);
    return () => this.validations.delete(ref);
  }

  /** @internal */
  registerControl(ref: HviFieldsetControlRef): () => void {
    this.controls.add(ref);
    return () => this.controls.delete(ref);
  }

  protected get groupRole(): string | null {
    if (this.role) return this.role;
    return this.isRadioGroup ? 'radiogroup' : null;
  }

  protected get groupInvalid(): 'true' | null {
    if (this.invalid !== undefined) return this.invalid ? 'true' : null;
    if (!this.isRadioGroup) return null;

    const hasVisibleMessage = this.activeValidations().length > 0;
    const hasInvalidControl = [...this.controls].some((control) => control.invalid());
    return hasVisibleMessage || hasInvalidControl ? 'true' : null;
  }

  protected get groupDescribedby(): string | null {
    const ids = [
      ...(this.staticDescribedby?.trim().split(/\s+/) ?? []),
      ...this.activeValidations().map((validation) => validation.id()),
    ].filter(Boolean);
    return ids.length ? [...new Set(ids)].join(' ') : null;
  }

  private activeValidations(): HviFieldsetValidationRef[] {
    if (!this.isRadioGroup) return [];
    return [...this.validations].filter(
      (validation) => validation.visible() && validation.element.parentElement === this.host,
    );
  }
}
