import { Directive } from '@angular/core';

/**
 * @summary
 * SearchClear is a button directive for clearing the search input.
 * It should be used with `type="reset"` inside an `hvi-search` component.
 *
 * @example
 * ```html
 * <hvi-search>
 *   <input hviInput type="search" placeholder="" aria-label="Søk" />
 *   <button hviSearchClear type="reset" aria-label="Tøm"></button>
 *   <button hviButton variant="primary" type="submit">Søk</button>
 * </hvi-search>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/search}
 */
@Directive({
  selector: 'button[hviSearchClear]',
  standalone: true,
  host: {
    class: 'ds-button',
    '[attr.data-icon]': '"true"',
    '[attr.data-variant]': '"tertiary"',
  },
})
export class HviSearchClear {}
