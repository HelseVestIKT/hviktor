import { Directive, Input } from '@angular/core';

/**
 * @summary
 * Details directive description.
 *
 * @example
 * ```html
 * <details hviDetails variant="tinted">
 *      <summary>Click to expand</summary>
 *      <div>
 *          This content is hidden until the user clicks the summary.
 *      </div>
 * </details>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/details/code}
 */

@Directive({
  selector: 'details[hviDetails]',
  standalone: true,
  host: {
    class: 'ds-details',
    '[attr.data-variant]': 'variant',
  },
})
export class HviDetails {
  /** Used to change the appearance of the details element. */
  @Input() variant: 'default' | 'tinted' = 'default';
}
