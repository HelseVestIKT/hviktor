import { Component, Input } from '@angular/core';
import { HviHeading } from '../heading';

type HviAlertColor = 'info' | 'success' | 'warning' | 'danger';
type HviAlertRole = 'status' | 'alert' | string;

/**
 * @summary
 * Alert displays important information that users need to see and understand.
 * Designed to capture attention, it supports color variants for different severity levels.
 * Supports projecting plain text or rich content (headings, paragraphs).
 *
 * Use `title` to render a visible heading and provide an accessible name at the same time.
 * When no `title` is set, a default `aria-label` is derived from `color`.
 *
 * @example Info alert with title
 * ```html
 * <hvi-alert title="Har du husket å bestille passtime?">
 *   Det er lange køer for å bestille pass om dagen.
 * </hvi-alert>
 * ```
 *
 * @example Danger alert
 * ```html
 * <hvi-alert color="danger" title="Det har skjedd en feil">
 *   Vi klarer ikke å hente informasjonen du ser etter akkurat nå.
 * </hvi-alert>
 * ```
 *
 * @example Alert without title (default aria-label applied)
 * ```html
 * <hvi-alert color="warning">
 *   Vi har tekniske problemer. Vi jobber med å rette problemene.
 * </hvi-alert>
 * ```
 *
 * @example Explicit role override for special cases
 * ```html
 * <hvi-alert color="warning" role="alert">
 *   This warning alert is intentionally announced as an alert message.
 * </hvi-alert>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/docs/alert/overview}
 */
@Component({
  selector: 'hvi-alert',
  standalone: true,
  imports: [HviHeading],
  template: `
    @if (title) {
      <h2 hviHeading style="margin-bottom: var(--ds-size-2);">{{ title }}</h2>
    }
    <ng-content />
  `,
  host: {
    class: 'ds-alert',
    style: 'display: block; height: fit-content; align-self: flex-start; max-width: 731px;',
    '[attr.data-color]': 'color',
    '[attr.role]': 'role ?? (color === "danger" ? "alert" : "status")',
    '[attr.aria-label]': 'title || ariaLabelForColor',
  },
})
export class HviAlert {
  /** Sets the color and visual style of the alert to indicate severity. */
  @Input() color?: HviAlertColor;

  /**
   * Renders a visible `<h2>` heading inside the alert and sets the accessible name (`aria-label`).
   * When omitted, a default label is derived from `color`.
   */
  @Input() title?: string;

  /**
   * Overrides the default semantic role.
   * Defaults to `status` for info/success/warning and `alert` for danger.
   */
  @Input() role?: HviAlertRole;

  get ariaLabelForColor(): string {
    switch (this.color) {
      case 'success':
        return 'Suksessmelding';
      case 'warning':
        return 'Advarsel';
      case 'danger':
        return 'Feilmelding';
      default:
        return 'Informasjon';
    }
  }
}
