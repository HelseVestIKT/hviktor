import { Directive, Input } from '@angular/core';

/**
 * @summary Applies Designsystemet label styling to a `<label>` or `<legend>` element,
 * providing a clear and accessible text label for an associated form control.
 *
 * @example Default label
 * ```html
 * <label hviLabel for="my-input">Fødselsnummer (11 sifre)</label>
 * ```
 *
 * @example Semibold weight for label hierarchy
 * ```html
 * <label hviLabel weight="semibold">Group label</label>
 * ```
 *
 * @example Legend inside a fieldset
 * ```html
 * <fieldset>
 *   <legend hviLabel>Velg alternativ</legend>
 * </fieldset>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/docs/label/overview}
 */
@Directive({
  selector: 'label[hviLabel], legend[hviLabel]',
  standalone: true,
  host: {
    class: 'ds-label',
    '[attr.data-weight]': 'weight ?? null',
  },
})
export class HviLabel {
  /** Adjusts font weight. Default is medium. Use `'regular'` or `'semibold'` when establishing a label hierarchy, e.g. checkboxes or radios in a fieldset. */
  @Input() weight?: 'regular' | 'medium' | 'semibold';
}
