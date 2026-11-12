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
 * Søkbart inputfelt med forslagsliste der brukeren kan velge flere alternativer.
 * Valgte alternativer vises som chips. Verdien er alltid en liste, og en tom
 * liste når ingenting er valgt. Bruk `hvi-suggestion` for enkeltvalg.
 *
 * @example
 * ```html
 * <hvi-suggestion-multiple
 *   label="Velg kommuner"
 *   [(ngModel)]="kommuner"
 *   [suggestions]="treff"
 *   optionLabel="navn"
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

  /** Valgte alternativer. Tom liste når ingenting er valgt. */
  override readonly value = model<T[]>([]);

  protected override toArray(value: T[] | null | undefined): readonly T[] {
    return value ?? [];
  }

  protected override fromArray(options: T[]): T[] {
    return options;
  }
}
