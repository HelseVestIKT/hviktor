import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  afterNextRender,
  booleanAttribute,
  inject,
} from '@angular/core';
import '@digdir/designsystemet-web';

let nextId = 0;

/**
 * @summary
 * Popover vises over andre elementer i grensesnittet og er koblet til et spesifikt element.
 * Den brukes til å vise tilleggsinformasjon, interaktive elementer eller korte forklaringer uten å navigere bort fra siden.
 *
 * Tilgjengelighet er innebygd:
 * - Popoveren får `role="dialog"` og et tilgjengelig navn (innholdet, eller `aria-label`/`aria-labelledby` om satt).
 * - Knappen(e) som åpner den får `aria-expanded` og `aria-controls`.
 * - Når popoveren åpnes flyttes fokus inn i den, slik at skjermleser leser innholdet.
 *   Element med `autofocus` inni popoveren får fokus i stedet.
 * - Når popoveren lukkes, går fokus tilbake til elementet som åpnet den.
 *
 * @example
 * ```html
 * <button hviButton popovertarget="popover1">Open popover</button>
 * <hvi-popover id="popover1"> Popover content </hvi-popover>
 * ```
 *
 * @example Med overskrift som tilgjengelig navn
 * ```html
 * <button hviButton popovertarget="popover2">Slett</button>
 * <hvi-popover id="popover2" aria-labelledby="popover2-title">
 *   <h2 hviHeading id="popover2-title">Er du sikker?</h2>
 *   ...
 * </hvi-popover>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/popover/code}
 */
@Component({
  selector: 'hvi-popover',
  standalone: true,
  template: '<ng-content />',
  styles: [':host:focus { outline: none; }'],
  host: {
    class: 'ds-popover',
    tabindex: '-1',
    '[id]': 'id',
    '[attr.popover]': 'type',
    '[attr.role]': 'type === "hint" ? "tooltip" : "dialog"',
    '[attr.aria-label]': 'ariaLabel || null',
    '[attr.aria-labelledby]': 'labelledBy',
    '[attr.data-variant]': 'variant',
    '[attr.data-color]': 'color',
    '[attr.data-placement]': 'placement',
    '[attr.data-autoplacement]': 'autoPlacement ? "" : null',
  },
})
export class HviPopover {
  private readonly host: HTMLElement = inject(ElementRef).nativeElement;

  /** Element som hadde fokus før popoveren ble åpnet, og som får fokus tilbake ved lukking. */
  private returnFocusTo: HTMLElement | null = null;

  /** Id som knappen refererer til via popovertarget. Genereres automatisk hvis den ikke er satt. */
  @Input() id = `hvi-popover-${nextId++}`;

  /** Popover type - 'auto' lukkes ved klikk utenfor eller Escape, 'manual' krever manuell lukking */
  @Input() type: 'auto' | 'manual' | 'hint' = 'auto';

  /** Visuell variant */
  @Input() variant: 'default' | 'tinted' = 'default';

  /** Farge-tema */
  @Input() color: 'neutral' | 'danger' | 'info' | 'success' | 'warning' = 'neutral';

  /** Plassering av popover relativt til trigger */
  @Input() placement: 'top' | 'right' | 'bottom' | 'left' = 'top';

  /** Aktiver automatisk repositjonering hvis det ikke er plass */
  @Input() autoPlacement = true;

  /** Tilgjengelig navn på popoveren. Uten denne (eller aria-labelledby) brukes innholdet som navn. */
  @Input('aria-label') ariaLabel?: string;

  /** Id til element(er) som gir popoveren navn, f.eks. en overskrift inni popoveren. */
  @Input('aria-labelledby') ariaLabelledby?: string;

  /**
   * Flytt fokus inn i popoveren når den åpnes, slik at skjermleser leser innholdet.
   * Standard er `true`, unntatt for `type="hint"`.
   */
  @Input({ transform: booleanAttribute }) moveFocus?: boolean;

  /** Event når popover åpnes */
  @Output() opened = new EventEmitter<void>();

  /** Event når popover lukkes */
  @Output() closed = new EventEmitter<void>();

  constructor() {
    afterNextRender(() => this.syncInvokers(false));
  }

  /** Uten eget navn er popoveren navngitt av sitt eget innhold, slik at skjermleser leser det ved fokus. */
  protected get labelledBy(): string | null {
    if (this.ariaLabelledby) return this.ariaLabelledby;
    if (this.ariaLabel) return null;
    return this.type === 'hint' ? null : this.id;
  }

  private get shouldMoveFocus(): boolean {
    return this.moveFocus ?? this.type !== 'hint';
  }

  @HostListener('beforetoggle', ['$event'])
  onBeforeToggle(event: ToggleEvent) {
    if (event.newState !== 'open') return;
    const active = this.host.ownerDocument.activeElement;
    this.returnFocusTo =
      active instanceof HTMLElement && active !== this.host.ownerDocument.body
        ? active
        : this.getInvoker(event);
  }

  @HostListener('toggle', ['$event'])
  onToggle(event: ToggleEvent) {
    const open = event.newState === 'open';
    this.syncInvokers(open);

    if (open) {
      this.focusPopover();
      this.opened.emit();
    } else {
      this.restoreFocus();
      this.closed.emit();
    }
  }

  private focusPopover() {
    if (!this.shouldMoveFocus) return;
    // Nettleseren har allerede gitt fokus til et element med autofocus inni popoveren.
    if (this.host.contains(this.host.ownerDocument.activeElement)) return;
    // preventScroll: posisjonen settes asynkront av designsystemet-web, så uten dette kan siden hoppe.
    this.host.focus({ preventScroll: true });
  }

  private restoreFocus() {
    const target = this.returnFocusTo;
    this.returnFocusTo = null;
    if (!target?.isConnected) return;

    const active = this.host.ownerDocument.activeElement;
    // Flytt bare fokus hvis det ellers ville gått tapt (lå i popoveren eller falt tilbake til body).
    const focusLost =
      !active || active === this.host.ownerDocument.body || this.host.contains(active);
    if (focusLost) target.focus({ preventScroll: true });
  }

  private getInvoker(event: ToggleEvent): HTMLElement | null {
    const source = (event as ToggleEvent & { source?: Element | null }).source;
    if (source instanceof HTMLElement) return source;
    return this.findInvokers()[0] ?? null;
  }

  private findInvokers(): HTMLElement[] {
    const root = this.host.getRootNode() as Document | ShadowRoot;
    if (!this.id || typeof root.querySelectorAll !== 'function') return [];
    const id = CSS.escape(this.id);
    return Array.from(
      root.querySelectorAll<HTMLElement>(`[popovertarget="${id}"],[commandfor="${id}"]`),
    );
  }

  /** Kobler knapper med popovertarget/commandfor til popoveren med ARIA. */
  private syncInvokers(open: boolean) {
    for (const invoker of this.findInvokers()) {
      if (this.type === 'hint') {
        addIdRef(invoker, 'aria-describedby', this.id);
      } else {
        invoker.setAttribute('aria-expanded', String(open));
        addIdRef(invoker, 'aria-controls', this.id);
      }
    }
  }
}

function addIdRef(el: Element, attr: string, id: string) {
  const ids = (el.getAttribute(attr) ?? '').split(/\s+/).filter(Boolean);
  if (!ids.includes(id)) el.setAttribute(attr, [...ids, id].join(' '));
}
