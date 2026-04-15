import { Component } from '@angular/core';

/**
 * @summary
 * Content area of a `hvi-details` panel. Shown when the panel is expanded.
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
  selector: 'hvi-details-content',
  standalone: true,
  template: `<ng-content />`,
})
export class HviDetailsContent {}
