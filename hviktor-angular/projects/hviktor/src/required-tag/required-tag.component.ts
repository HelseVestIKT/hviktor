import { Component, Input } from '@angular/core';
import { HviTag } from '../tag';

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
  imports: [HviTag],
  template: `
    <hvi-tag variant="default" size="sm" [color]="mode === 'optional' ? 'info' : 'warning'">
      @switch (mode) {
        @case ('all-required') {
          Alle felt må fylles ut
        }
        @case ('required') {
          Må fylles ut
        }
        @case ('optional') {
          Valgfritt
        }
      }
    </hvi-tag>
  `,
  host: {},
})
export class HviRequiredTag {
  @Input() mode: 'all-required' | 'required' | 'optional' = 'required';
}
