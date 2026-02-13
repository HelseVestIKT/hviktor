import { Directive, ElementRef, HostListener, inject, Input } from '@angular/core';

/**
 * Clear button for the search field.
 * Automatically clears the input field in the parent hvi-search container.
 * Also works with type="reset" when inside a form element.
 *
 * @example
 * ```html
 * <button hviSearchClear aria-label="Tøm"></button>
 * ```
 */
@Directive({
  selector: 'button[hviSearchClear]',
  standalone: true,
  host: {
    class: 'ds-button',
    '[attr.type]': 'type',
    '[attr.data-icon]': '"true"',
    '[attr.data-variant]': '"tertiary"',
  },
})
export class HviSearchClear {
  private elementRef = inject(ElementRef);

  /** Button type. Defaults to 'button' since we handle clearing via click. */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @HostListener('click')
  onClick(): void {
    const searchContainer = this.elementRef.nativeElement.closest('hvi-search, .ds-search');
    if (searchContainer) {
      const input = searchContainer.querySelector('input') as HTMLInputElement | null;
      if (input) {
        input.value = '';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.focus();
      }
    }
  }
}
