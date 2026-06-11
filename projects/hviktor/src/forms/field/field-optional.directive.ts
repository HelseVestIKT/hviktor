import { Directive } from '@angular/core';

/**
 * @summary Marks a field as optional, applying data-field="optional" for styling.
 *
 * @example Optional field indicator
 * ```html
 * <hvi-field>
 *   <label hviLabel>Middle name</label>
 *   <span hviFieldOptional>(optional)</span>
 *   <input hviInput type="text" />
 * </hvi-field>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/docs/field/code}
 */
@Directive({
  selector: '[hviFieldOptional]',
  standalone: true,
  host: {
    'data-field': 'optional',
  },
})
export class HviFieldOptional {}
