import { Component } from '@angular/core';

/**
 * @summary Container for decorative prefix and suffix elements alongside a text input.
 *
 * @example Currency input with prefix and suffix
 * ```html
 * <hvi-field-affixes>
 *   <hvi-field-affix>NOK</hvi-field-affix>
 *   <input hviInput type="text" placeholder="Amount" />
 *   <hvi-field-affix>per month</hvi-field-affix>
 * </hvi-field-affixes>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/docs/field/code}
 */
@Component({
  selector: 'hvi-field-affixes',
  template: `<ng-content />`,
  host: {
    class: 'ds-field-affixes',
  },
})
export class HviFieldAffixes {}
