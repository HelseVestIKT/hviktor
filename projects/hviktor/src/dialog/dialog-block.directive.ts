import { Directive } from '@angular/core';

/**
 * @summary
 * Creates a visually separated section within a dialog with padding and a top dividing border.
 * Use multiple blocks to structure dialog content into header, body, and footer areas.
 *
 * @description
 * Blocks are optional — simple dialogs can place content directly in `<dialog hviDialog>`.
 * Use blocks when you want divider lines between sections (e.g. header, body, footer).
 * When mixing blocks and direct content, note that `HviDialog` always renders its own close
 * button as a direct child regardless.
 *
 * The component applies the `ds-dialog__block` CSS class, which handles spacing and the divider line.
 *
 * @example Dialog with three sections
 * ```html
 * <dialog hviDialog [open]="isOpen()" (openChange)="isOpen.set($event)">
 *   <div hviDialogBlock>
 *     <p hviParagraph size="sm">Subtitle</p>
 *     <h2 hviHeading>Confirm Action</h2>
 *   </div>
 *   <div hviDialogBlock>
 *     <p hviParagraph>Are you sure you want to proceed with this action?</p>
 *   </div>
 *   <div hviDialogBlock>
 *     <button hviButton variant="primary" (click)="handleConfirm()">Yes, Confirm</button>
 *     <button hviButton variant="secondary" (click)="isOpen.set(false)">Cancel</button>
 *   </div>
 * </dialog>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/docs/dialog/code}
 */
@Directive({
  selector: '[hviDialogBlock]',
  standalone: true,
  host: {
    class: 'ds-dialog__block',
  },
})
export class HviDialogBlock {}
