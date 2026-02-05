import { booleanAttribute, Directive, Input } from '@angular/core';

/**
 * Input is a form element used to collect user data.
 * It offers basic functionality and is ideal when you need full control over the component's layout and validation,
 * making it suitable for building custom elements.
 *
 * @example
 * ```html
 * <input hviInput type="text" placeholder="Type something here..." />
 * ```
 *
 * Documentation: https://designsystemet.no/en/components/docs/input/overview
 */
@Directive({
  selector: 'input[hviInput]',
  standalone: true,
  host: {
    class: 'ds-input',
    '[attr.type]': 'type ?? null',

    // DS: "size" = width in count of characters
    '[attr.size]': 'size ?? null',

    // DS: disabled/readOnly toggle
    '[attr.disabled]': 'disabled ? "" : null',
    '[attr.readonly]': 'readOnly ? "" : null',

    // DS: role (e.g. switch for checkbox/radio)
    '[attr.role]': 'role ?? null',
  },
})
export class HviInput {
  /** Supported input types */
  @Input() type?:
    | 'number'
    | 'hidden'
    | 'color'
    | 'checkbox'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'month'
    | 'password'
    | 'radio'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';

  /**
   * Defines the width of Input in count of characters.
   * Maps to the native `size` attribute.
   */
  @Input() size?: number;

  /** Disables element (avoid using if possible for a11y purposes) */
  @Input({ transform: booleanAttribute }) disabled = false;

  /** Toggle readOnly */
  @Input({ transform: booleanAttribute }) readOnly = false;

  /** Set role, e.g. `switch` when `checkbox` or `radio` */
  @Input() role?: string;
}
