import { Directive } from '@angular/core';

/**
 * @summary Marks an element as the description for a field, automatically associated via ds-field.
 *
 * @example Field with description
 * ```html
 * <hvi-field>
 *   <label hviLabel>Last name</label>
 *   <span hviFieldDescription>Last name cannot contain spaces</span>
 *   <input hviInput type="text" />
 * </hvi-field>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/docs/field/code}
 */
@Directive({
  selector: '[hviFieldDescription]',
  standalone: true,
  host: {
    'data-field': 'description',
  },
})
export class HviFieldDescription {}
