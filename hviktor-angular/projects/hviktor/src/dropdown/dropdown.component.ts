import { Component, Input, booleanAttribute } from '@angular/core';
import { HviButton } from "../button";

/**
 * Info
 *
 * Eksempel på bruk:
 * ```html
 * <hvi-dropdown></hvi-dropdown>
 * ```
 *
 * Dokumentasjon: https://designsystemet.no/no/components/docs/input/overview
 */

export interface DropdownItem {
  label: string;
  href: string;
  ariaLabel?: string;
}

@Component({
  selector: 'div[hviDropdown]',
  standalone: true,
  template: `
  <div
    [attr.data-id]="id"
    [attr.data-popover]="popover"
    [attr.data-variant]="variant"
    [attr.data-placement]="placement"
    >

  <ul>
      @for (item of items; track item) {
      <li>
        <button hviButton variant="tertiary" type="button">
          {{ item.label }}
        </button>
      </li>
      }
  </ul>
  </div>
`,
  host: {
    class: 'ds-popover ds-dropdown',
    '[attr.data-id]': 'id',
    '[attr.data-variant]': 'variant',
    '[attr.data-popover]': 'popover ? "" : null',
    '[attr.data-placement]': 'placement',
    '[attr.anchor]': 'anchor',
  },
  imports: [HviButton],
})

export class HviDropdown {
      /**ID to target the popover */
      @Input() id?: string;
      
      @Input() anchor?: string;

      /** variant */
      @Input() variant?: 'default' | 'tertiary';
  
      /** Typen knapp */
      @Input({ transform: booleanAttribute }) popover = true;

      /** Plassering */
      @Input() placement?: 'top' | 'bottom' | 'left' | 'right';

      /** Array of dropdown items */
      @Input() items: DropdownItem[] = [];
}
