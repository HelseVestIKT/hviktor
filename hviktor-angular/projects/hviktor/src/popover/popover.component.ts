import { Component } from '@angular/core';

/**
 * @summary
 * Popover component description.
 *
 * @example
 * ```html
 * <hvi-popover id="popoverId">Popovercontent</hvi-popover>
 * <button hviButton popovertarget="popoverId">Open popover</button>
 * ```
 *
 * Documentation: https://designsystemet.no/en/components/docs/popover/code
 */

@Component({
  selector: 'hvi-popover',
  standalone: true,
  template: '<ng-content />',
  host: {
    class: 'ds-popover',
  },
})
export class HviPopover {}
