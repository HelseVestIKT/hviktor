import {
  booleanAttribute,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import '@u-elements/u-details';

/**
 * @summary
 * Collapsible component that lets the user show or hide content.
 * Wraps the native `<details>` element via the `@u-elements/u-details` polyfill.
 *
 * @example Default
 * ```html
 * <hvi-details>
 *   <hvi-details-summary>How do I register?</hvi-details-summary>
 *   <hvi-details-content>
 *     <p>You can register by visiting our sign-up page.</p>
 *   </hvi-details-content>
 * </hvi-details>
 * ```
 *
 * @example Tinted variant
 * ```html
 * <hvi-details variant="tinted">
 *   <hvi-details-summary>More information</hvi-details-summary>
 *   <hvi-details-content>
 *     <p>Additional details appear here.</p>
 *   </hvi-details-content>
 * </hvi-details>
 * ```
 *
 * @example Open by default
 * ```html
 * <hvi-details defaultOpen>
 *   <hvi-details-summary>Pre-expanded section</hvi-details-summary>
 *   <hvi-details-content>
 *     <p>This panel is open on first render.</p>
 *   </hvi-details-content>
 * </hvi-details>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/docs/details/overview}
 */
@Component({
  selector: 'hvi-details',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  template: `<u-details
    class="ds-details"
    [attr.data-variant]="variant"
    [attr.defaultOpen]="defaultOpen || undefined"
    [attr.open]="open || undefined"
    (toggle)="toggled.emit($event)"
  >
    <u-summary>
      <ng-content select="hvi-details-summary" />
    </u-summary>
    <div>
      <ng-content select="hvi-details-content" />
    </div>
  </u-details>`,
  host: {},
})
export class HviDetails {
  /** Background variant of the details panel. */
  @Input() variant: 'default' | 'tinted' = 'default';

  /** Controls the open state. When set, automatic open/close management is disabled. */
  @Input({ transform: booleanAttribute }) open = false;

  /** Opens the panel by default on first render. */
  @Input({ transform: booleanAttribute }) defaultOpen = false;

  /** Emitted when the panel is toggled open or closed. */
  @Output() toggled = new EventEmitter<Event>();
}
