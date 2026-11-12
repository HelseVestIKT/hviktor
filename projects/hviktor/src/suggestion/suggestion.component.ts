import { NgTemplateOutlet } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, forwardRef, model } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  HVI_SUGGESTION_STYLES,
  HVI_SUGGESTION_TEMPLATE,
  HviSuggestionBase,
} from './suggestion-base';

/**
 * @summary
 * Searchable input with a list of suggestions where the user selects one option.
 * The value is set with `ngModel`, `formControlName` or `[(value)]`, and the list
 * is filled via `suggestions`. Use `hvi-suggestion-multiple` for multi select.
 *
 * Only the first `maxVisible` matches are rendered, so long lists do not put
 * thousands of nodes in the DOM.
 *
 * @example Basic single selection
 * ```html
 * <hvi-suggestion
 *   label="Velg en kommune"
 *   [(ngModel)]="kommune"
 *   [suggestions]="kommuner"
 * />
 * ```
 *
 * @example Backend search with objects
 * ```html
 * <hvi-suggestion
 *   label="Søk etter kommune"
 *   optionLabel="navn"
 *   dataKey="nummer"
 *   [filter]="false"
 *   [loading]="laster()"
 *   [(ngModel)]="kommune"
 *   [suggestions]="treff()"
 *   (completeMethod)="sok($event.query)"
 * />
 * ```
 *
 * @see {@link https://hviktor.no/komponenter/suggestion}
 * @see {@link https://u-elements.github.io/u-elements/elements/u-combobox}
 */
@Component({
  selector: 'hvi-suggestion',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgTemplateOutlet],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HviSuggestion),
      multi: true,
    },
  ],
  template: HVI_SUGGESTION_TEMPLATE,
  styles: [HVI_SUGGESTION_STYLES],
})
export class HviSuggestion<T = unknown> extends HviSuggestionBase<T, T | null> {
  protected readonly multiple = false;

  /** The selected option, or `null` when nothing is selected. */
  readonly value = model<T | null>(null);

  protected toArray(value: T | null | undefined): readonly T[] {
    return value == null ? [] : [value];
  }

  protected fromArray(options: T[]): T | null {
    return options[0] ?? null;
  }
}
