import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { autoUpdate, computePosition, flip, offset, shift, type Placement } from '@floating-ui/dom';

/**
 * @summary
 * Dropdown er en generisk nedtrekksliste. Den legger grunnmuren for å bygge menyer og lister..
 *
 * @example
 * ```html
 * <button hviButton popovertarget="myDropdown">Åpne dropdown</button
 * <hvi-dropdown id="myDropdown" popover>
 *  <ul>
 *    <li>
 *     <button hviButton variant="tertiary">Menylenke</button>
 *   </li>
 *   <li>
 *    <button hviButton variant="tertiary">Menylenke</button>
 *  </li>
 * </ul>
 * </hvi-dropdown>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/dropdown/code}
 */

@Component({
  selector: 'hvi-dropdown',
  standalone: true,
  template: '<ng-content />',
  host: {
    class: 'ds-popover ds-dropdown',
    '[attr.data-id]': 'id',
    '[attr.data-variant]': 'variant',
  },
})
export class HviDropdown implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private cleanupAutoUpdate?: () => void;
  private boundHandleClick?: (event: MouseEvent) => void;
  private boundHandleKeydown?: (event: KeyboardEvent) => void;

  /**ID to target the popover */
  @Input() id?: string;

  /** variant */
  @Input() variant?: 'default' | 'tertiary';

  /** Plassering av popover relativt til trigger */
  @Input() dropdownPlacement: Placement = 'bottom-end';

  /** Aktiver automatisk repositjonering hvis det ikke er plass */
  @Input() autoPlacement = true;

  /** Event når popover åpnes */
  @Output() opened = new EventEmitter<void>();

  /** Event når popover lukkes */
  @Output() closed = new EventEmitter<void>();

  private get dropdownElement(): HTMLElement {
    return this.el.nativeElement;
  }

  private get triggerElement(): HTMLElement | null {
    const id = this.dropdownElement.id;
    return id ? document.querySelector(`[popovertarget="${id}"]`) : null;
  }

  ngOnInit() {
    this.setupEventListeners();
  }

  ngOnDestroy() {
    this.stopAutoUpdate();
    this.removeEventListeners();
  }

  private setupEventListeners() {
    const dropdown = this.dropdownElement;

    // Click utenfor lukker popover
    this.boundHandleClick = (event: MouseEvent) => {
      const el = event.target as Element | null;
      const isTrigger = el?.closest?.(`[popovertarget="${dropdown.id}"]`);
      const isOutside = !isTrigger && !dropdown.contains(el as Node);

      if (isTrigger) {
        event.preventDefault();
        dropdown.togglePopover?.();
      }
      if (isOutside && dropdown.matches(':popover-open')) {
        dropdown.togglePopover?.();
      }
    };

    // Escape lukker popover
    this.boundHandleKeydown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !dropdown.matches(':popover-open')) return;
      event.preventDefault();
      dropdown.togglePopover?.();
    };

    addEventListener('click', this.boundHandleClick);
    addEventListener('keydown', this.boundHandleKeydown);

    // Toggle events
    dropdown.addEventListener('beforetoggle', this.handleBeforeToggle);
    dropdown.addEventListener('toggle', this.handleToggle);
  }

  private removeEventListeners() {
    if (this.boundHandleClick) {
      removeEventListener('click', this.boundHandleClick);
    }
    if (this.boundHandleKeydown) {
      removeEventListener('keydown', this.boundHandleKeydown);
    }
    this.dropdownElement.removeEventListener('beforetoggle', this.handleBeforeToggle);
    this.dropdownElement.removeEventListener('toggle', this.handleToggle);
  }

  private handleBeforeToggle = (event: Event) => {
    const toggleEvent = event as ToggleEvent;
    if (toggleEvent.newState === 'open') {
      this.updatePosition();
    }
  };

  private handleToggle = (event: Event) => {
    const toggleEvent = event as ToggleEvent;
    if (toggleEvent.newState === 'open') {
      this.startAutoUpdate();
      this.opened.emit();
    } else {
      this.stopAutoUpdate();
      this.closed.emit();
    }
  };

  private updatePosition() {
    const trigger = this.triggerElement;
    const dropdown = this.dropdownElement;

    if (!trigger || !dropdown) return;

    computePosition(trigger, dropdown, {
      placement: this.dropdownPlacement,
      strategy: 'fixed',
      middleware: [
        offset((data) => {
          const styles = getComputedStyle(data.elements.floating, '::before');
          return parseFloat(styles.height) || 12;
        }),
        ...(this.autoPlacement ? [flip({ fallbackAxisSideDirection: 'start' }), shift()] : []),
      ],
    }).then(({ x, y }) => {
      dropdown.style.translate = `${x}px ${y}px`;
    });
  }

  private startAutoUpdate() {
    this.stopAutoUpdate();

    const trigger = this.triggerElement;
    const popover = this.dropdownElement;

    if (!trigger || !popover) return;

    this.cleanupAutoUpdate = autoUpdate(trigger, popover, () => this.updatePosition());
  }

  private stopAutoUpdate() {
    if (this.cleanupAutoUpdate) {
      this.cleanupAutoUpdate();
      this.cleanupAutoUpdate = undefined;
    }
  }
}
