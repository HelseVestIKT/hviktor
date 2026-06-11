import { Directive, Input } from '@angular/core';

/**
 * @summary Directive that applies Designsystemet link styling to anchor or button elements.
 *
 * @example Basic link
 * ```html
 * <a hviLink href="/page">Go to page</a>
 * ```
 *
 * @example Neutral color variant
 * ```html
 * <a hviLink href="/privacy" color="neutral">Privacy policy</a>
 * ```
 *
 * @example Link styled as button
 * ```html
 * <button hviLink (click)="navigate()">Navigate</button>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/docs/link}
 */
@Directive({
  selector: 'a[hviLink], button[hviLink]',
  standalone: true,
  host: {
    class: 'ds-link',
    '[attr.data-color]': 'color',
  },
})
export class HviLink {
  /** Color variant for the link. Only `neutral` changes appearance; omit for default styling. */
  @Input() color?: 'neutral';
}
