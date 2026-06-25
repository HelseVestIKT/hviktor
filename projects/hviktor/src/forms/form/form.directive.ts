import {
  AfterViewInit,
  booleanAttribute,
  computed,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FormGroup, FormGroupDirective, Validators } from '@angular/forms';

let formHeadingId = 0;

/** The result of analyzing required validators in a FormGroup. */
export type FormRequiredMode = 'all-required' | 'mixed' | 'none';

/**
 * Analyzes a FormGroup and returns the required mode.
 *
 * All controls are counted — including those without validators (treated as optional).
 *
 * - `'all-required'` — every control has `Validators.required` or `Validators.requiredTrue`
 * - `'mixed'` — some controls are required, some are not
 * - `'none'` — no controls have required validation
 */
export function analyzeFormRequired(formGroup: FormGroup): FormRequiredMode {
  const controls = Object.values(formGroup.controls);
  if (controls.length === 0) return 'none';

  let requiredCount = 0;

  for (const control of controls) {
    if (
      control.hasValidator(Validators.required) ||
      control.hasValidator(Validators.requiredTrue)
    ) {
      requiredCount++;
    }
  }

  if (requiredCount === 0) return 'none';
  if (requiredCount === controls.length) return 'all-required';
  return 'mixed';
}

/**
 * @summary Form directive that provides submit handling, touched-state management,
 * and automatic required-mode analysis for Angular reactive forms.
 *
 * @example Basic form with required-tag
 * ```html
 * <form hviForm #myForm="hviForm" [formGroup]="formGroup">
 *   @if (myForm.requiredMode() === 'all-required') {
 *     <hvi-required-tag mode="all-required" />
 *   }
 *   <hvi-textfield label="Name" formControlName="name" required />
 *   <button hviButton type="submit">Submit</button>
 * </form>
 * ```
 *
 * @example Form with error summary focus
 * ```html
 * <form hviForm [formGroup]="form" [focusOnInvalid]="summary">
 *   <hvi-textfield label="Email" formControlName="email" required />
 *   <button hviButton type="submit">Send</button>
 *   <hvi-error-summary #summary [form]="form" [messages]="messages" showWhen="submitted" />
 * </form>
 * ```
 *
 * @see {@link https://helsevestikt.github.io/hviktor/komponenter/form}
 */
@Directive({
  selector: 'form[hviForm]',
  standalone: true,
  exportAs: 'hviForm',
  host: {
    '(submit)': 'onSubmit($event)',
  },
})
export class HviForm implements OnInit, AfterViewInit {
  private readonly el = inject(ElementRef<HTMLFormElement>);

  /** Emits when the form has been submitted. */
  @Output() hviSubmitted = new EventEmitter<void>();

  /** True after the first submit attempt. */
  private readonly _submitted = signal(false);
  get submitted(): boolean {
    return this._submitted();
  }
  set submitted(value: boolean) {
    this._submitted.set(value);
  }

  /** Optional focus target (e.g. HviErrorSummary) to focus when the form is invalid on submit. */
  @Input() focusOnInvalid?: { focus?: () => void } | null;

  /** Whether to automatically show required/optional tags on child fields. Defaults to `true`. */
  @Input({ transform: booleanAttribute }) showRequiredTags = true;

  private readonly formGroupDir = inject(FormGroupDirective, { optional: true });

  private readonly _requiredMode = signal<FormRequiredMode>('none');

  /**
   * Computed required mode for the bound FormGroup.
   * - `'all-required'` — all controls have required validation
   * - `'mixed'` — some controls are required, some are optional
   * - `'none'` — no required validators found
   */
  readonly requiredMode = computed(() => this._requiredMode());

  /** Refresh the required-mode analysis. Called automatically on init and submit. */
  refreshRequiredMode(): void {
    const form = this.formGroupDir?.form;
    if (!form) {
      this._requiredMode.set('none');
      return;
    }
    this._requiredMode.set(analyzeFormRequired(form));
  }

  onSubmit(event: Event): void {
    this.submitted = true;
    this.hviSubmitted.emit();

    const form = this.formGroupDir?.form;
    if (!form) return;

    form.markAllAsTouched();

    if (form.invalid) {
      event.preventDefault();
      queueMicrotask(() => this.focusOnInvalid?.focus?.());
    }
  }

  /** Resets the submitted state. Call alongside FormGroup.reset() to fully reset the form. */
  reset(): void {
    this.submitted = false;
  }

  ngOnInit(): void {
    this.refreshRequiredMode();
  }

  ngAfterViewInit(): void {
    const formEl = this.el.nativeElement as HTMLFormElement;

    // Respect any consumer-provided labelling.
    if (formEl.hasAttribute('aria-labelledby')) return;

    // Prefer a DS heading (hviHeading) if present; otherwise only consider a direct child heading
    // to avoid picking up headings inside nested components (e.g. error summary).
    const heading = (formEl.querySelector(
      'h1[hviHeading], h2[hviHeading], h3[hviHeading], h4[hviHeading], h5[hviHeading], h6[hviHeading]',
    ) ??
      formEl.querySelector(
        ':scope > h1, :scope > h2, :scope > h3, :scope > h4, :scope > h5, :scope > h6',
      )) as HTMLHeadingElement | null;

    if (!heading) return;

    if (!heading.id) {
      heading.id = `hvi-form-heading-${formHeadingId++}`;
    }
    formEl.setAttribute('aria-labelledby', heading.id);
  }
}
