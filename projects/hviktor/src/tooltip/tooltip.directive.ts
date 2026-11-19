import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, inject } from '@angular/core';
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
export class HviTooltip implements OnChanges, OnInit, OnDestroy {
  /** Tooltip content. Empty, null or undefined removes the tooltip entirely. */
  @Input({ required: true }) hviTooltip: string | null | undefined = '';

  /** Placement of the tooltip relative to the trigger */
  @Input() tooltipPlacement: 'top' | 'right' | 'bottom' | 'left' = 'top';

  /** Enable auto placement when there's not enough space */
  @Input() tooltipAutoPlacement = true;

  private readonly host: HTMLElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  /**
   * Siste aria-label/aria-description satt av appen (ikke av Designsystemet).
   *
   * Designsystemet skriver tooltip-teksten til disse attributtene, og når data-tooltip fjernes
   * legger det tilbake data-tooltip="" og setter aria-label/aria-description til "". Da mister
   * f.eks. en ikonknapp med aria-label navnet sitt. Vi følger med på appens egne verdier og
   * legger dem tilbake når Designsystemet tømmer dem.
   */
  private readonly appAria: Record<AriaAttr, string | null> = {
    'aria-label': null,
    'aria-description': null,
  };

  /** Siste ikke-tomme tooltip-tekst, for å kjenne igjen verdier Designsystemet har skrevet. */
  private lastTooltip: string | null = null;

  private ariaObserver?: MutationObserver;

  get hasTooltip(): boolean {
    return !!this.hviTooltip?.trim();
  }

  ngOnChanges(): void {
    if (this.hasTooltip) this.lastTooltip = this.hviTooltip ?? null;
  }

  ngOnInit(): void {
    // Kjøres etter at elementets egne bindinger (f.eks. [attr.aria-label]) er satt, og før
    // Designsystemet rekker å reagere på data-tooltip (det skjer i en mikrotask).
    for (const name of ARIA_ATTRS) this.appAria[name] = this.host.getAttribute(name);

    if (typeof MutationObserver === 'undefined') return;
    this.ariaObserver = new MutationObserver((records) => this.onAriaMutation(records));
    this.ariaObserver.observe(this.host, { attributes: true, attributeFilter: [...ARIA_ATTRS] });
  }

  ngOnDestroy(): void {
    this.ariaObserver?.disconnect();
  }

  private onAriaMutation(records: MutationRecord[]): void {
    const names = new Set(records.map((record) => record.attributeName as AriaAttr));
    for (const name of names) {
      const value = this.host.getAttribute(name);
      if (value === '' && !this.hasTooltip) {
        // Designsystemet har tømt attributtet fordi tooltipen ble fjernet
        this.setAria(name, this.appAria[name]);
      } else if (value !== '' && !this.isTooltipText(value)) {
        // Endret av appen
        this.appAria[name] = value;
      }
    }
  }

  private isTooltipText(value: string | null): boolean {
    return value !== null && (value === this.hviTooltip || value === this.lastTooltip);
  }

  private setAria(name: AriaAttr, value: string | null): void {
    if (this.host.getAttribute(name) === value) return;
    if (value === null) this.host.removeAttribute(name);
    else this.host.setAttribute(name, value);
  }
}

const ARIA_ATTRS = ['aria-label', 'aria-description'] as const;
type AriaAttr = (typeof ARIA_ATTRS)[number];
