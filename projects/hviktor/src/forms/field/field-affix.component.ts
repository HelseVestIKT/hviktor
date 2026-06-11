import { Component } from '@angular/core';

/**
 * @summary Decorative affix container displayed alongside a text input.
 *
 * @example Prefix and suffix affixes
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
  selector: 'hvi-field-affix',
  template: `<ng-content />`,
  host: {
    class: 'ds-field-affix',
    '[aria-hidden]': 'true',
  },
})
export class HviFieldAffix {}
