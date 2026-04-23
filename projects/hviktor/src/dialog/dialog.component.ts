import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  inject,
} from '@angular/core';

/**
 * @summary
 * Dialog wraps the native HTML `<dialog>` element with Angular bindings for opening, closing,
 * and placement. Supports both modal and non-modal modes.
 * Automatically injects the close button.
 */
@Component({
  selector: 'dialog[hviDialog]',
  standalone: true,
  host: {
    class: 'ds-dialog',
    '[attr.id]': 'id',
    '[attr.data-placement]': 'placement === "center" ? null : placement',
    '[attr.data-modal]': 'modal',
    '[attr.closedby]': 'closedby',
    '(close)': 'handleClose()',
    '(cancel)': 'handleCancel($event)',
  },
  template: `
    @if (closeButton !== false) {
      <button
        class="ds-button"
        data-icon="true"
        data-variant="tertiary"
        data-color="neutral"
        data-command="close"
        type="button"
        [attr.aria-label]="closeButtonAriaLabel"
        (click)="close()"
      ></button>
    }
    <ng-content></ng-content>
  `,
})
export class HviDialog {
  /** Optional id for the dialog element */
  @Input() id?: string;

  @Input()
  set open(value: boolean) {
    this.setOpen(Boolean(value));
  }

  get open(): boolean {
    return this.element.open;
  }

  /** Whether the dialog opens as a modal (default: `true`). */
  @Input() modal = true;

  /** Placement of the dialog. `center` (default) shows a traditional dialog. */
  @Input() placement: 'center' | 'left' | 'right' | 'top' | 'bottom' = 'center';

  /** Light dismiss behavior. Set to `any` to allow closing by clicking the backdrop. */
  @Input() closedby: 'none' | 'closerequest' | 'any' = 'closerequest';

  /** Screen reader label for close button. Set to false to hide the close button. */
  @Input() closeButton: string | boolean = 'Lukk dialogvindu';

  /** Emits `true` when the dialog opens and `false` when it closes. */
  @Output() readonly openChange = new EventEmitter<boolean>();

  private readonly element = inject(ElementRef<HTMLDialogElement>).nativeElement;

  get closeButtonAriaLabel(): string {
    return typeof this.closeButton === 'string' ? this.closeButton : 'Lukk dialogvindu';
  }

  openModal(): void {
    this.setOpen(true);
  }

  close(): void {
    this.setOpen(false);
  }

  handleClose(): void {
    this.openChange.emit(false);
  }

  handleCancel(event: Event): void {
    event.preventDefault();
    this.setOpen(false);
  }

  @HostListener('click', ['$event'])
  onBackdropClick(event: MouseEvent): void {
    if (this.closedby === 'any' && this.element.open) {
      if (event.target === this.element) {
        const rect = this.element.getBoundingClientRect();
        const isInDialog =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom;

        if (!isInDialog) {
          this.close();
        }
      }
    }
  }

  private setOpen(shouldOpen: boolean): void {
    if (shouldOpen) {
      if (this.element.open) {
        return;
      }

      if (this.modal) {
        this.element.showModal();
      } else {
        this.element.show();
      }

      this.openChange.emit(true);
      return;
    }

    if (!this.element.open) {
      return;
    }

    this.element.close();
  }
}
