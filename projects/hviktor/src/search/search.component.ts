import { Component } from '@angular/core';

/**
 * @summary
 * Search allows users to quickly find relevant content on a website or in an application.
 * The component consists of a search field, with or without a search button.
 *
 * Use `hviInput` with `type="search"` for the input field.
 * Use `hviSearchClear` for the clear button.
 * Use `hviButton` for the submit button.
 *
 * Important: Add `placeholder=" "` on the input if you have a clear button. The clear button
 * is only shown when the field has text, which relies on `:placeholder-shown`. A space gives
 * no visible placeholder text. Add `enterkeyhint="search"` to show a search key on mobile
 * keyboards.
 *
 * Designsystemet deprecated Search in 1.24 and removes it in v2. `hvi-search` therefore
 * ships its own styles (the `hvi-search` class in `styles.css`) instead of `ds-search`.
 *
 * @example
 * Basic search with clear and submit button:
 * ```html
 * <hvi-search>
 *   <input hviInput type="search" placeholder=" " enterkeyhint="search" aria-label="Søk" />
 *   <button hviSearchClear type="reset" aria-label="Tøm"></button>
 *   <button hviButton variant="primary" type="submit">Søk</button>
 * </hvi-search>
 * ```
 *
 * @example
 * Search without submit button:
 * ```html
 * <hvi-search>
 *   <input hviInput type="search" placeholder=" " enterkeyhint="search" aria-label="Søk" />
 *   <button hviSearchClear type="reset" aria-label="Tøm"></button>
 * </hvi-search>
 * ```
 *
 * @example
 * Search with label using hvi-field:
 * ```html
 * <hvi-field>
 *   <label hviLabel>Søk etter katter</label>
 *   <hvi-search>
 *     <input hviInput type="search" placeholder=" " enterkeyhint="search" name="cat-search" />
 *     <button hviSearchClear type="reset" aria-label="Tøm"></button>
 *     <button hviButton variant="primary" type="submit">Søk</button>
 *   </hvi-search>
 * </hvi-field>
 * ```
 *
 * @see {@link https://hviktor.no/komponenter/search}
 */
@Component({
  selector: 'hvi-search',
  standalone: true,
  template: '<ng-content />',
  styles: [':host { display: grid; margin-block: var(--ds-size-1); }'],
  host: {
    class: 'hvi-search',
  },
})
export class HviSearch {}
