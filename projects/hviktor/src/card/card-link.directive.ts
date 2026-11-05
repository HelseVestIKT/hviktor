import { Directive, Input } from '@angular/core';

/**
 * @summary
 * CardLink makes an entire card a clickable link. It applies the `ds-card`
 * class and supports the same `variant` and `color` as `HviCard`, defaulting to
 * `default` and `neutral`. Use it when the card should navigate to a new URL
 * rather than trigger an action.
 *
 * @example Card link with content
 * ```html
 * <a hviCardLink href="/innstillinger" maxWidth="420px">
 *   <div hviCardBlock>
 *     <h2 hviHeading>Innstillinger</h2>
 *     <p hviParagraph>Åpne innstillinger og personvern.</p>
 *   </div>
 * </a>
 * ```
 *
 * @example Tinted card link with a color theme
 * ```html
 * <a hviCardLink href="/innstillinger" variant="tinted" color="accent">
 *   <div hviCardBlock>
 *     <h2 hviHeading>Innstillinger</h2>
 *   </div>
 * </a>
 * ```
 *
 * @see {@link https://hviktor.no/komponenter/card}
 */
@Directive({
  selector: 'a[hviCardLink]',
  standalone: true,
  host: {
    class: 'ds-card',
    '[attr.data-variant]': 'variant',
    '[attr.data-color]': 'color',
    '[style.max-width]': 'maxWidth',
  },
})
export class HviCardLink {
  /** Background style of the card. */
  @Input() variant: 'default' | 'tinted' = 'default';

  /** Color theme of the card. */
  @Input() color: 'accent' | 'brand1' | 'brand2' | 'brand3' | 'neutral' = 'neutral';

  /** Maximum width of the card (e.g. `'320px'` or `'20rem'`). */
  @Input() maxWidth?: string;
}
