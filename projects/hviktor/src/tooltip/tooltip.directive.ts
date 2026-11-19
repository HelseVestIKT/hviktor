import { Directive, ElementRef, Input, OnDestroy, inject } from '@angular/core';
import '@digdir/designsystemet-web';

/**
 * @summary
 * Tooltip viser kort informasjon når brukeren holder musepekeren over
 * eller fokuserer på et element. Den brukes til sekundær informasjon,
 * for eksempel til å forklare hva et symbol betyr.
 *
 * @example
 * ```html
 * <button hviButton hviTooltip="Kopier">📋</button>
 * <span hviTooltip="Organisasjonsnummer">Org.nr.</span>
 *
 * <!-- Tom verdi fjerner tooltipen helt -->
 * <span [hviTooltip]="erLaast() ? 'Feltet er låst' : ''">Status</span>
 * ```
 *
 * @see {@link https://hviktor.no/komponenter/tooltip}
 */
@Directive({
  selector: '[hviTooltip]',
  standalone: true,
  host: {
    '[attr.data-tooltip]': 'hasTooltip ? hviTooltip : null',
    '[attr.data-placement]': 'hasTooltip ? tooltipPlacement : null',
    '[attr.data-autoplacement]': 'hasTooltip && tooltipAutoPlacement ? "true" : null',
  },
})
export class HviTooltip implements OnDestroy {
  /** Tooltip content. Empty, null or undefined removes the tooltip entirely. */
  @Input({ required: true }) hviTooltip: string | null | undefined = '';

  /** Placement of the tooltip relative to the trigger */
  @Input() tooltipPlacement: 'top' | 'right' | 'bottom' | 'left' = 'top';

  /** Enable auto placement when there's not enough space */
  @Input() tooltipAutoPlacement = true;

  private readonly host: HTMLElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  /**
   * aria-label/aria-description slik de var før Designsystemet rørte dem.
   * Designsystemet skriver tooltip-teksten til disse, og når data-tooltip fjernes legger det
   * tilbake data-tooltip="" og setter aria-label/aria-description til "". Da mister f.eks.
   * en ikonknapp med aria-label navnet sitt. Vi legger tilbake de opprinnelige verdiene.
   */
  private readonly originalAria: Record<AriaAttr, string | null> = {
    'aria-label': this.host.getAttribute('aria-label'),
    'aria-description': this.host.getAttribute('aria-description'),
  };

  private readonly ariaObserver =
    typeof MutationObserver === 'undefined'
      ? undefined
      : new MutationObserver(() => this.restoreAria());

  constructor() {
    this.ariaObserver?.observe(this.host, { attributeFilter: [...ARIA_ATTRS] });
  }

  get hasTooltip(): boolean {
    return !!this.hviTooltip?.trim();
  }

  ngOnDestroy(): void {
    this.ariaObserver?.disconnect();
  }

  private restoreAria(): void {
    if (this.hasTooltip) return;
    for (const name of ARIA_ATTRS) {
      const original = this.originalAria[name];
      if (this.host.getAttribute(name) === original) continue;
      if (original === null) this.host.removeAttribute(name);
      else this.host.setAttribute(name, original);
    }
  }
}

const ARIA_ATTRS = ['aria-label', 'aria-description'] as const;
type AriaAttr = (typeof ARIA_ATTRS)[number];
