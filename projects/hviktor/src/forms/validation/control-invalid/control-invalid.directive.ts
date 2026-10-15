import { DestroyRef, Directive, ElementRef, HostBinding, inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import { HviFieldset } from '../../fieldset/fieldset.directive';
import { HviForm } from '../../form';

/**
 * @summary
 * Directive to set `aria-invalid` on form controls based on their validation state.
 *
 * For radio buttons inside a radio group `<fieldset hviFieldset>` the invalid state is
 * reported to the group instead, so `aria-invalid` is set once on the fieldset and
 * screen readers don't announce «ugyldig» for every option.
 *
 * Usage:
 * ```html
 * <input hviControlInvalid formControlName="email" />
 * ```
 */

@Directive({
  selector: '[hviControlInvalid]',
  standalone: true,
})
export class HviControlInvalid {
  private readonly ngControl = inject(NgControl, { self: true, optional: true });
  private readonly hviForm = inject(HviForm, { optional: true });
  private readonly fieldset = inject(HviFieldset, { optional: true });
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    if (!this.fieldset) return;

    const unregister = this.fieldset.registerControl({
      invalid: () => this.isRadio && this.showInvalid,
    });
    inject(DestroyRef).onDestroy(unregister);
  }

  @HostBinding('attr.aria-invalid')
  get ariaInvalid(): string | null {
    if (!this.showInvalid) return null;
    // The radio group (fieldset) carries the invalid state for its radio buttons.
    if (this.isRadio && this.fieldset?.isRadioGroup) return null;
    return 'true';
  }

  private get isRadio(): boolean {
    return this.element instanceof HTMLInputElement && this.element.type === 'radio';
  }

  private get showInvalid(): boolean {
    const control = this.ngControl?.control;
    if (!control) return false;

    const submitted = this.hviForm?.submitted ?? false;
    return control.invalid && (control.touched || submitted);
  }
}
