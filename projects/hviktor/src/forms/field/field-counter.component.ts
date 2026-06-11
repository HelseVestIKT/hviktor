import { Component, input } from '@angular/core';

/**
 * @summary Displays remaining or exceeded character count for a field input.
 *
 * @example Counter with custom labels
 * ```html
 * <hvi-field>
 *   <label hviLabel for="desc">Description</label>
 *   <textarea hviInput id="desc" rows="3"></textarea>
 *   <hvi-field-counter [limit]="100" over="%d characters too many" under="%d characters remaining" />
 * </hvi-field>
 * ```
 *
 * @example Basic counter
 * ```html
 * <hvi-field>
 *   <label hviLabel for="name">Name</label>
 *   <input hviInput id="name" type="text" />
 *   <hvi-field-counter [limit]="50" />
 * </hvi-field>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/docs/field/code}
 */
@Component({
  selector: 'hvi-field-counter',
  standalone: true,
  styles: [':host { display: contents; }'],
  template: `<p
    class="ds-validation-message"
    data-field="counter"
    [attr.data-limit]="limit()"
    [attr.data-over]="over() ?? null"
    [attr.data-under]="under() ?? null"
  ></p>`,
})
export class HviFieldCounter {
  /** Maximum allowed characters */
  limit = input.required<number>();

  /** Label template when limit is exceeded. Use %d for the count. */
  over = input<string>();

  /** Label template for remaining characters. Use %d for the count. */
  under = input<string>();
}
