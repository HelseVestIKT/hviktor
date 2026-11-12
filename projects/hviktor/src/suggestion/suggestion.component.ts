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
 * Søkbart inputfelt med forslagsliste der brukeren velger ett alternativ.
 * Verdien settes med `ngModel`, `formControlName` eller `[(value)]`, og lista
 * fylles via `suggestions`. Bruk `hvi-suggestion-multiple` for flervalg.
 *
 * Bare de `maxVisible` første treffene rendres, slik at lange lister ikke
 * legger tusenvis av noder i DOM.
 *
 * @example
 * ```html
 * <hvi-suggestion
 *   label="Velg en kommune"
 *   [(ngModel)]="kommune"
 *   [suggestions]="treff"
 *   (completeMethod)="sok($event)"
 *   optionLabel="navn"
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

  /** Valgt verdi, eller `null` når ingenting er valgt. */
  readonly value = model<T | null>(null);

  protected toArray(value: T | null | undefined): readonly T[] {
    return value == null ? [] : [value];
  }

  protected fromArray(options: T[]): T | null {
    return options[0] ?? null;
  }
}
