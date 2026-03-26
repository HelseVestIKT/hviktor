import { Component, EventEmitter, Input, Output } from '@angular/core';
import '@digdir/designsystemet-web';

/**
 * @summary
 * Dropdown er en generisk nedtrekksliste. Den legger grunnmuren for å bygge menyer og lister..
 *
 * @example
 * ```html
 * <button hviButton popovertarget="myDropdown">Åpne dropdown</button
 * <hvi-dropdown id="myDropdown" popover>
 *  <ul>
 *    <li>
 *     <button hviButton variant="tertiary">Menylenke</button>
 *   </li>
 *   <li>
 *    <button hviButton variant="tertiary">Menylenke</button>
 *  </li>
 * </ul>
 * </hvi-dropdown>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/dropdown/code}
 */

@Component({
  selector: 'hvi-dropdown',
  standalone: true,
  template: '<ng-content />',
  host: {
    class: 'ds-popover ds-dropdown',
    '[attr.data-id]': 'id',
    '[attr.data-variant]': 'variant',
  },
})
export class HviDropdown {
  /**ID to target the popover */
  @Input() id?: string;

  /** variant */
  @Input() variant?: 'default' | 'tertiary';

  /** Plassering av popover relativt til trigger */
  @Input() dropdownPlacement: 'top' | 'right' | 'bottom' | 'left' = 'bottom';

  /** Aktiver automatisk repositjonering hvis det ikke er plass */
  @Input() autoPlacement = true;

  /** Event når popover åpnes */
  @Output() opened = new EventEmitter<void>();

  /** Event når popover lukkes */
  @Output() closed = new EventEmitter<void>();
}
