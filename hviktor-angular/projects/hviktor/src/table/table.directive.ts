import { booleanAttribute, Directive, Input } from '@angular/core';

/**
 * @summary
 * Table directive description.
 *
 * @example
 * ```html
 * <[hviTable]></[hviTable]>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/table/code}
 */

@Directive({
  selector: '[hviTable]',
  standalone: true,
  host: {
    class: 'ds-table',
    '[attr.data-zebra]': 'zebra || null',
    '[attr.data-border]': 'border || null',
  },
})
export class HviTable {
  @Input({ transform: booleanAttribute }) zebra = false;
  @Input({ transform: booleanAttribute }) border = false;
}
