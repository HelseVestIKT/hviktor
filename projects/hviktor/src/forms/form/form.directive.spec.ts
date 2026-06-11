import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { setupTestBed } from '../../testing/test-utils';
import { analyzeFormRequired, HviForm } from './form.directive';

// --- Host components ---

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, HviForm],
  template: `<form hviForm #f="hviForm" [formGroup]="form">
    <input formControlName="name" />
  </form>`,
})
class AllRequiredHost {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, HviForm],
  template: `<form hviForm #f="hviForm" [formGroup]="form">
    <input formControlName="name" />
  </form>`,
})
class MixedHost {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    comment: new FormControl(''),
  });
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, HviForm],
  template: `<form hviForm #f="hviForm" [formGroup]="form">
    <input formControlName="name" />
  </form>`,
})
class NoneRequiredHost {
  form = new FormGroup({
    name: new FormControl(''),
    comment: new FormControl(''),
  });
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, HviForm],
  template: `<form
    hviForm
    #f="hviForm"
    [formGroup]="form"
    [focusOnInvalid]="focusTarget"
    (hviSubmitted)="submitCount = submitCount + 1"
  >
    <input formControlName="name" />
    <button type="submit">Submit</button>
  </form>`,
})
class SubmitHost {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  focusTarget = { focus: vi.fn() };
  submitCount = 0;
}

@Component({
  standalone: true,
  imports: [HviForm],
  template: `<form hviForm #f="hviForm">
    <button type="submit">Submit</button>
  </form>`,
})
class NoFormGroupHost {}

describe('HviForm', () => {
  beforeEach(async () => {
    await setupTestBed({
      imports: [AllRequiredHost, MixedHost, NoneRequiredHost, SubmitHost, NoFormGroupHost],
    });
  });

  describe('analyzeFormRequired', () => {
    it('should return "all-required" when every control has required validator', () => {
      const form = new FormGroup({
        a: new FormControl('', Validators.required),
        b: new FormControl('', Validators.requiredTrue),
      });
      expect(analyzeFormRequired(form)).toBe('all-required');
    });

    it('should return "mixed" when some controls are required', () => {
      const form = new FormGroup({
        a: new FormControl('', Validators.required),
        b: new FormControl(''),
      });
      expect(analyzeFormRequired(form)).toBe('mixed');
    });

    it('should return "none" when no controls have required validator', () => {
      const form = new FormGroup({
        a: new FormControl(''),
        b: new FormControl(''),
      });
      expect(analyzeFormRequired(form)).toBe('none');
    });

    it('should return "none" for an empty FormGroup', () => {
      const form = new FormGroup({});
      expect(analyzeFormRequired(form)).toBe('none');
    });
  });

  describe('requiredMode on init', () => {
    it('should compute "all-required" when all controls are required', () => {
      const f = TestBed.createComponent(AllRequiredHost);
      f.detectChanges();
      const directive = f.debugElement.children[0].injector.get(HviForm);
      expect(directive.requiredMode()).toBe('all-required');
    });

    it('should compute "mixed" when some controls are required', () => {
      const f = TestBed.createComponent(MixedHost);
      f.detectChanges();
      const directive = f.debugElement.children[0].injector.get(HviForm);
      expect(directive.requiredMode()).toBe('mixed');
    });

    it('should compute "none" when no controls are required', () => {
      const f = TestBed.createComponent(NoneRequiredHost);
      f.detectChanges();
      const directive = f.debugElement.children[0].injector.get(HviForm);
      expect(directive.requiredMode()).toBe('none');
    });

    it('should return "none" when no FormGroup is bound', () => {
      const f = TestBed.createComponent(NoFormGroupHost);
      f.detectChanges();
      const directive = f.debugElement.children[0].injector.get(HviForm);
      expect(directive.requiredMode()).toBe('none');
    });
  });

  describe('submit behavior', () => {
    it('should set submitted to true and emit hviSubmitted on submit', () => {
      const f = TestBed.createComponent(SubmitHost);
      f.detectChanges();
      const directive = f.debugElement.children[0].injector.get(HviForm);

      expect(directive.submitted).toBe(false);
      expect(f.componentInstance.submitCount).toBe(0);

      f.nativeElement.querySelector('button').click();
      f.detectChanges();

      expect(directive.submitted).toBe(true);
      expect(f.componentInstance.submitCount).toBe(1);
    });

    it('should mark all controls as touched on submit', () => {
      const f = TestBed.createComponent(SubmitHost);
      f.detectChanges();
      const form = f.componentInstance.form;

      expect(form.get('name')!.touched).toBe(false);

      f.nativeElement.querySelector('button').click();
      f.detectChanges();

      expect(form.get('name')!.touched).toBe(true);
    });

    it('should call focusOnInvalid.focus when form is invalid on submit', async () => {
      const f = TestBed.createComponent(SubmitHost);
      f.detectChanges();

      f.nativeElement.querySelector('button').click();
      f.detectChanges();

      // focusOnInvalid.focus is called via queueMicrotask
      await new Promise<void>((resolve) => queueMicrotask(() => resolve()));

      expect(f.componentInstance.focusTarget.focus).toHaveBeenCalled();
    });

    it('should not call focusOnInvalid.focus when form is valid', async () => {
      const f = TestBed.createComponent(SubmitHost);
      f.detectChanges();
      f.componentInstance.form.get('name')!.setValue('test');
      f.detectChanges();

      f.nativeElement.querySelector('button').click();
      f.detectChanges();

      await new Promise<void>((resolve) => queueMicrotask(() => resolve()));

      expect(f.componentInstance.focusTarget.focus).not.toHaveBeenCalled();
    });
  });

  describe('without FormGroup', () => {
    it('should still set submitted and emit on submit without crashing', () => {
      const f = TestBed.createComponent(NoFormGroupHost);
      f.detectChanges();
      const directive = f.debugElement.children[0].injector.get(HviForm);

      f.nativeElement.querySelector('button').click();
      f.detectChanges();

      expect(directive.submitted).toBe(true);
    });
  });
});
