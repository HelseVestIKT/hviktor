import { DestroyRef, Directive, ElementRef, inject, Input } from '@angular/core';
import { HviFieldset } from '../fieldset/fieldset.directive';
import { HviValidationMessage } from '../validation/validation-message/validation-message.directive';

let nextValidationId = 0;

/**
 * @summary Marks an element as the validation message for a field, styled with ds-validation-message.
 *
 * Inside `<hvi-field>` the message is linked to the input by the ds-field web component.
 *
 * Placed directly inside a radio group `<fieldset hviFieldset>` the message belongs to the
 * whole group: it is linked to the fieldset with `aria-describedby` and the fieldset gets
 * `aria-invalid="true"`, instead of every radio button being announced as invalid.
 *
 * @example Field with validation error
 * ```html
 * <hvi-field>
 *   <label hviLabel>Email</label>
 *   <input hviInput type="email" />
 *   <p hviFieldValidation>Please enter a valid email address.</p>
 * </hvi-field>
 * ```
 *
 * @example Radio group with validation error
 * ```html
 * <fieldset hviFieldset>
 *   <legend hviLabel weight="medium">Bydel</legend>
 *   <hvi-field>…radio…</hvi-field>
 *   <p hviFieldValidation>Du må velge en bydel før du kan fortsette.</p>
 * </fieldset>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/docs/field/code}
 */
@Directive({
  selector: '[hviFieldValidation]',
  standalone: true,
  host: {
    class: 'ds-validation-message',
    // Group-level messages in a radio group are handled by HviFieldset. Without data-field the
    // ds-field web component won't put aria-invalid/aria-describedby on every radio button.
    '[attr.data-field]': 'groupLevel ? null : "validation"',
    '[attr.id]': 'id',
  },
})
export class HviFieldValidation {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly fieldset = inject(HviFieldset, { optional: true });
  private readonly validationMessage = inject(HviValidationMessage, { self: true, optional: true });

  /** Id of the message element. Generated when not set. */
  @Input() id = `hvi-validation-${nextValidationId++}`;

  constructor() {
    if (!this.fieldset) return;

    const unregister = this.fieldset.registerValidation({
      element: this.element,
      id: () => this.id,
      visible: () => this.visible,
    });
    inject(DestroyRef).onDestroy(unregister);
  }

  /** Whether the message belongs to a radio group fieldset rather than a single field. */
  protected get groupLevel(): boolean {
    return this.fieldset?.ownsValidation(this.element) ?? false;
  }

  private get visible(): boolean {
    // Combined with hviValidationMessage the element is hidden while there is no message.
    return this.validationMessage ? !!this.validationMessage.message : true;
  }
}
