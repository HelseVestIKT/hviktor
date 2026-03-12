import { Component } from '@angular/core';

/**
 * @summary
 * RequiredTag component description.
 *
 * @example
 * ```html
 * <hvi-required-tag></hvi-required-tag>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/required-tag/code}
 */

@Component({
  selector: 'hvi-required-tag',
  standalone: true,
  template: '<ng-content />',
  host: {},
})
export class HviRequiredTag {}
