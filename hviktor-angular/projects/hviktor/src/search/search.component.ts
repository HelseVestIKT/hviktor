import { booleanAttribute, Directive, Input } from '@angular/core';

/**
 * @summary
 * Search allows users to quickly find relevant content on a website or in an application.
 * The component consists of a search field, with or without a search button.
 *
 * @example
 * ```html
 * <div hviSearch>
 *   <input hviSearchInput aria-label="Søk" />
 *   <button hviSearchClear aria-label="Tøm"></button>
 *   <button hviSearchButton>Søk</button>
 * </div>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/search}
 */
@Directive({
  selector: '[hviSearch]',
  standalone: true,
  host: {
    class: 'ds-search',
  },
})
export class HviSearch {}

/**
 * Search input field directive.
 * Important: Add an empty placeholder="" if you have a clear button.
 *
 * @example
 * ```html
 * <input hviSearchInput aria-label="Søk" placeholder="" />
 * ```
 */
@Directive({
  selector: 'input[hviSearchInput]',
  standalone: true,
  host: {
    class: 'ds-input',
    type: 'search',
    '[placeholder]': 'placeholder',
  },
})
export class HviSearchInput {
  /**
   * Placeholder text for the input.
   * Important: Set to empty string "" if using clear button to enable CSS :placeholder-shown selector.
   */
  @Input() placeholder = '';
}

/**
 * Clear button for the search field.
 * Uses type="reset" to clear the form when inside a form element.
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
  /** Button type. Defaults to 'reset' to clear form inputs. */
  @Input() type: 'button' | 'submit' | 'reset' = 'reset';
}

/**
 * Submit button for the search.
 *
 * @example
 * ```html
 * <button hviSearchButton>Søk</button>
 * <button hviSearchButton variant="secondary">Søk</button>
 * ```
 */
@Directive({
  selector: 'button[hviSearchButton]',
  standalone: true,
  host: {
    class: 'ds-button',
    '[attr.type]': 'type',
    '[attr.data-variant]': 'variant',
    '[attr.data-icon]': 'icon ? "" : null',
  },
})
export class HviSearchButton {
  /** Button variant */
  @Input() variant: 'primary' | 'secondary' | 'tertiary' = 'primary';

  /** Button type */
  @Input() type: 'button' | 'submit' | 'reset' = 'submit';

  /** Icon-only mode */
  @Input({ transform: booleanAttribute }) icon = false;
}
