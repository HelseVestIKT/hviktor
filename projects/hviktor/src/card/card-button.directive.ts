import { Directive, Input } from '@angular/core';

/**
 * @summary
 * CardButton makes an entire card a clickable button. It applies the `ds-card`
 * class and supports the same `variant` and `color` as `HviCard`, defaulting to
 * `default` and `neutral`. Use it when the card should trigger an action like
 * opening a dialog rather than navigate via a link.
 *
 * @example Card button with content
 * ```html
 * <button hviCardButton maxWidth="420px">
 *   <div hviCardBlock>
 *     <h2 hviHeading>Innstillinger</h2>
 *     <p hviParagraph>Åpne innstillinger og personvern.</p>
 *   </div>
 * </button>
 * ```
 *
 * @example Tinted card button with a color theme
 * ```html
 * <button hviCardButton variant="tinted" color="accent">
 *   <div hviCardBlock>
 *     <h2 hviHeading>Innstillinger</h2>
 *   </div>
 * </button>
 * ```
 *
 * @see {@link https://hviktor.no/komponenter/card}
 */
@Directive({
  selector: 'button[hviCardButton]',
  standalone: true,
  host: {
    class: 'ds-card',
    '[attr.data-variant]': 'variant',
    '[attr.data-color]': 'color',
    '[style.max-width]': 'maxWidth',
  },
})
export class HviCardButton {
  /** Background style of the card. */
  @Input() variant: 'default' | 'tinted' = 'default';

  /** Color theme of the card. */
  @Input() color: 'accent' | 'brand1' | 'brand2' | 'brand3' | 'neutral' = 'neutral';

  /** Maximum width of the card (e.g. `'320px'` or `'20rem'`). */
  @Input() maxWidth?: string;
}
