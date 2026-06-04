import { booleanAttribute, Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import '@digdir/designsystemet-web';

/**
 * @summary
 * Field kobler automatisk sammen label, beskrivelse, validering og input via ds-field web component.
 *
 * @example
 * ```html
 * <hvi-field>
 *  <label hviLabel>Name</label>
 *  <span hviFieldDescription>Fill in your full name.</span>
 *  <input type="text" />
 *  <p hviFieldValidation>This field is required.</p>
 * </hvi-field>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/field/overview}
 */
@Component({
  selector: 'hvi-field',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  styles: [
    ':host { display: block; }',
    'ds-field[data-variant="outline"] { margin-block-end: var(--dsc-fieldset-gap, var(--ds-size-2)); }',
  ],
  template:
    '<ds-field class="ds-field" [attr.data-position]="position ?? null" [attr.data-variant]="outline ? \'outline\' : null"><ng-content /></ds-field>',
})
export class HviField {
  /** Position of toggle inputs (radio, checkbox, switch) in field */
  @Input() position?: 'start' | 'end';
  /** Outline variant for the field. Works for input types radio and checkbox */
  @Input({ transform: booleanAttribute }) outline?: boolean = false;
}
