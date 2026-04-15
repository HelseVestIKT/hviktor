import { Component } from '@angular/core';

/**
 * @summary
 * Summary (heading) row of a `hvi-details` panel. The user clicks this to
 * expand or collapse the panel.
 *
 * @example
 * ```html
 * <hvi-details>
 *   <hvi-details-summary>How do I register?</hvi-details-summary>
 *   <hvi-details-content><p>Visit our sign-up page.</p></hvi-details-content>
 * </hvi-details>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/docs/details/overview}
 */
@Component({
  selector: 'hvi-details-summary',
  standalone: true,
  template: `<ng-content />`,
})
export class HviDetailsSummary {}
