import { Directive, ElementRef, inject } from '@angular/core';

/**
 * @summary
 * SearchClear is a button directive for clearing the search input.
 * It automatically finds the input field inside the parent `hvi-search` component and clears it.
 * Native reset is prevented: it would not update `ngModel`/`formControl`, and inside a form
 * it would reset every field. Instead the input is cleared and an `input` event is dispatched.
 *
 * @example
 * ```html
 * <hvi-search>
 *   <input hviInput type="search" placeholder=" " enterkeyhint="search" aria-label="Søk" />
 *   <button hviSearchClear type="reset" aria-label="Tøm"></button>
 *   <button hviButton variant="primary" type="submit">Søk</button>
 * </hvi-search>
 * ```
 *
 * @see {@link https://hviktor.no/komponenter/search}
 */
@Directive({
  selector: 'button[hviSearchClear]',
  standalone: true,
  host: {
    class: 'ds-button',
    '[attr.data-icon]': '"true"',
    '[attr.data-variant]': '"tertiary"',
    type: 'reset',
    '(click)': 'onClick($event)',
  },
})
export class HviSearchClear {
  private readonly elementRef = inject(ElementRef<HTMLButtonElement>);

  onClick(event: Event): void {
    event.preventDefault();

    const searchContainer = this.elementRef.nativeElement.closest('.hvi-search');
    if (!searchContainer) return;

    const input = searchContainer.querySelector('input') as HTMLInputElement | null;
    if (input) {
      input.value = '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.focus();
    }
  }
}
