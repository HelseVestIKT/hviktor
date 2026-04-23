import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviDialogBlock } from './dialog-block.directive';
import { HviDialog } from './dialog.component';

// ---------------------------------------------------------------------------
// Host components
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [HviDialog],
  template: '<dialog hviDialog>Content</dialog>',
})
class BasicDialogHost {}

@Component({
  standalone: true,
  imports: [HviDialog],
  template: '<dialog hviDialog [placement]="placement">Content</dialog>',
})
class PlacementDialogHost {
  placement: 'center' | 'left' | 'right' | 'top' | 'bottom' = 'left';
}

@Component({
  standalone: true,
  imports: [HviDialog],
  template: '<dialog hviDialog [modal]="false">Content</dialog>',
})
class NonModalDialogHost {}

@Component({
  standalone: true,
  imports: [HviDialogBlock],
  template: '<div hviDialogBlock>Block</div>',
})
class DialogBlockHost {}

// ---------------------------------------------------------------------------
// HviDialog
// ---------------------------------------------------------------------------

describe('HviDialog', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [BasicDialogHost, PlacementDialogHost] });
  });

  it('should not set data-placement by default', () => {
    const f = TestBed.createComponent(BasicDialogHost);
    f.detectChanges();
    expect(f.nativeElement.querySelector('dialog').getAttribute('data-placement')).toBeNull();
  });

  it('should reflect a non-center placement as data-placement attribute', () => {
    const f = TestBed.createComponent(PlacementDialogHost);
    f.componentInstance.placement = 'left';
    f.detectChanges();
    expect(f.nativeElement.querySelector('dialog').getAttribute('data-placement')).toBe('left');
  });

  it('should omit data-placement attribute when placement is "center"', () => {
    const f = TestBed.createComponent(PlacementDialogHost);
    f.componentInstance.placement = 'center';
    f.detectChanges();
    expect(f.nativeElement.querySelector('dialog').getAttribute('data-placement')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// HviDialog open/close
// ---------------------------------------------------------------------------

describe('HviDialog open/close', () => {
  let fixture: ComponentFixture<BasicDialogHost>;
  let directive: HviDialog;
  let nativeDialog: HTMLDialogElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [BasicDialogHost] });
    fixture = TestBed.createComponent(BasicDialogHost);
    fixture.detectChanges();
    nativeDialog = fixture.nativeElement.querySelector('dialog');

    // jsdom does not implement showModal/show/close for <dialog>
    nativeDialog.showModal = vi.fn(() => {
      (nativeDialog as any).open = true;
    });
    nativeDialog.show = vi.fn(() => {
      (nativeDialog as any).open = true;
    });
    nativeDialog.close = vi.fn(() => {
      (nativeDialog as any).open = false;
    });

    directive = fixture.debugElement
      .query((de) => de.nativeElement.tagName === 'DIALOG')
      .injector.get(HviDialog);
  });

  it('should be closed by default', () => {
    expect(directive.open).toBe(false);
  });

  it('should emit openChange(true) when openModal() is called', () => {
    const spy = vi.spyOn(directive.openChange, 'emit');
    directive.openModal();
    expect(spy).toHaveBeenCalledWith(true);
    expect(directive.open).toBe(true);
  });

  it('should call showModal() on the native element', () => {
    directive.openModal();
    expect(nativeDialog.showModal).toHaveBeenCalled();
  });

  it('should emit openChange(false) when handleClose() is called', () => {
    const spy = vi.spyOn(directive.openChange, 'emit');
    directive.handleClose();
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('should not emit when openModal() is called while already open', () => {
    directive.openModal();
    const spy = vi.spyOn(directive.openChange, 'emit');
    directive.openModal();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not emit when close() is called while already closed', () => {
    const spy = vi.spyOn(directive.openChange, 'emit');
    directive.close();
    expect(spy).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// HviDialog non-modal
// ---------------------------------------------------------------------------

describe('HviDialog non-modal', () => {
  let fixture: ComponentFixture<NonModalDialogHost>;
  let directive: HviDialog;
  let nativeDialog: HTMLDialogElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [NonModalDialogHost] });
    fixture = TestBed.createComponent(NonModalDialogHost);
    fixture.detectChanges();
    nativeDialog = fixture.nativeElement.querySelector('dialog');
    nativeDialog.show = vi.fn(() => {
      (nativeDialog as any).open = true;
    });
    nativeDialog.close = vi.fn(() => {
      (nativeDialog as any).open = false;
    });
    directive = fixture.debugElement
      .query((de) => de.nativeElement.tagName === 'DIALOG')
      .injector.get(HviDialog);
  });

  it('should call show() (not showModal()) when modal is false', () => {
    directive.openModal();
    expect(nativeDialog.show).toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// HviDialogBlock
// ---------------------------------------------------------------------------

describe('HviDialogBlock', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [DialogBlockHost] });
  });

  it('should apply ds-dialog__block class to its host element', () => {
    const f = TestBed.createComponent(DialogBlockHost);
    f.detectChanges();
    expect(f.nativeElement.querySelector('div').classList.contains('ds-dialog__block')).toBe(true);
  });
});
