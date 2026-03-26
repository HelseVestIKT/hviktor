import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import '@digdir/designsystemet-web';

/**
 * @summary
 * Field kobler automatisk sammen label, beskrivelse, validering og input via ds-field web component.
 *
 * @example
 * ```html
 * <ds-field>
 *  <label hviLabel>Name</label>
 *  <span hviFieldDescription>Fill in your full name.</span>
 *  <input type="text" />
 *  <span hviFieldValidation>This field is required.</span>
 * </ds-field>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/field/overview}
 */
@Component({
  selector: 'ds-field',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  template: '<ng-content />',
  host: {
    class: 'ds-field',
    '[attr.data-position]': 'position ?? null',
  },
})
export class HviField {
  /** Position of toggle inputs (radio, checkbox, switch) in field */
  @Input() position?: 'start' | 'end';
}
