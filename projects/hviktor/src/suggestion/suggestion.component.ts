import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import '@digdir/designsystemet-web';
import '@u-elements/u-combobox';
import '@u-elements/u-datalist';

/**
 * @summary
 * Suggestion component description.
 *
 * @example
 * ```html
 * <hvi-suggestion></hvi-suggestion>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/suggestion/code}
 */

@Component({
  selector: 'hvi-suggestion',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  template: `
    <ds-suggestion
      class="ds-suggestion"
      [attr.data-multiple]="multiple || undefined"
      [attr.data-empty]="empty"
    >
      <ng-content />
    </ds-suggestion>
  `,
  host: {},
})
export class HviSuggestion {
  /** Mulighet for flervalg fra suggestion */
  @Input() multiple = false;
  @Input() empty: 'Ingen valgte' | 'No selected' = 'Ingen valgte';
}
