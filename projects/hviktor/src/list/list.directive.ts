import { Directive } from '@angular/core';

/**
 * @summary Applies Designsystemet list styling to ordered and unordered lists.
 *
 * @example Unordered list
 * ```html
 * <ul hviList>
 *   <li>First item</li>
 *   <li>Second item</li>
 *   <li>Third item</li>
 * </ul>
 * ```
 *
 * @example Ordered list
 * ```html
 * <ol hviList>
 *   <li>Step one</li>
 *   <li>Step two</li>
 *   <li>Step three</li>
 * </ol>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/docs/list}
 */

@Directive({
  selector: 'ol[hviList], ul[hviList]',
  standalone: true,
  host: {
    class: 'ds-list',
  },
})
export class HviList {}
