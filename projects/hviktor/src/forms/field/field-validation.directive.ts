import { Directive } from '@angular/core';

/**
 * @summary Marks an element as the validation message for a field, styled with ds-validation-message.
 *
 * @example Field with validation error
 * ```html
 * <hvi-field>
 *   <label hviLabel>Email</label>
 *   <input hviInput type="email" />
 *   <p hviFieldValidation>Please enter a valid email address.</p>
 * </hvi-field>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/docs/field/code}
 */
@Directive({
  selector: '[hviFieldValidation]',
  standalone: true,
  host: {
    class: 'ds-validation-message',
    'data-field': 'validation',
  },
})
export class HviFieldValidation {}
