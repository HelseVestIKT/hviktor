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
 * Searchable input with a list of suggestions where the user can select multiple
 * options. Selected options are shown as chips. The value is always a list, and
 * an empty list when nothing is selected. Use `hvi-suggestion` for single select.
 *
 * @example Basic multiple selection
 * ```html
 * <hvi-suggestion-multiple
 *   label="Velg kommuner"
 *   [(ngModel)]="valgteKommuner"
 *   [suggestions]="kommuner"
 * />
 * ```
 *
 * @example Letting the user add new objects
 * ```html
 * <hvi-suggestion-multiple
 *   label="Velg eller legg til kommuner"
 *   optionLabel="navn"
 *   dataKey="nummer"
 *   creatable
 *   [createOption]="nyKommune"
 *   [(ngModel)]="valgteKommuner"
 *   [suggestions]="kommuner"
 * />
 * ```
 *
 * @see {@link https://hviktor.no/komponenter/suggestion}
 * @see {@link https://u-elements.github.io/u-elements/elements/u-combobox}
 */
@Component({
  selector: 'hvi-suggestion-multiple',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgTemplateOutlet],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HviSuggestionMultiple),
      multi: true,
    },
  ],
  template: HVI_SUGGESTION_TEMPLATE,
  styles: [HVI_SUGGESTION_STYLES],
})
export class HviSuggestionMultiple<T = unknown> extends HviSuggestionBase<T, T[]> {
  protected override readonly multiple = true;

  /** The selected options. An empty list when nothing is selected. */
  override readonly value = model<T[]>([]);

  protected override toArray(value: T[] | null | undefined): readonly T[] {
    return value ?? [];
  }

  protected override fromArray(options: T[]): T[] {
    return options;
  }
}
