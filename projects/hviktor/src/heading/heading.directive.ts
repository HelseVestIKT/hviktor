import { Directive, Input } from '@angular/core';

/**
 * @summary Directive that applies Designsystemet heading typography to native heading elements.
 *
 * @example Large page title
 * ```html
 * <h1 hviHeading size="xl">Page Title</h1>
 * ```
 *
 * @example Section heading with medium size
 * ```html
 * <h2 hviHeading size="md">Section Title</h2>
 * ```
 *
 * @example Small subsection heading
 * ```html
 * <h3 hviHeading size="sm">Subsection</h3>
 * ```
 *
 * @see {@link https://designsystemet.no/komponenter/heading}
 */
@Directive({
  selector:
    'h1[hviHeading], h2[hviHeading], h3[hviHeading], h4[hviHeading], h5[hviHeading], h6[hviHeading]',
  standalone: true,
  host: {
    class: 'ds-heading',
    '[attr.data-size]': 'size',
  },
})
export class HviHeading {
  /** The visual size of the heading. When omitted, defaults to the CSS default (md). */
  @Input() size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}
