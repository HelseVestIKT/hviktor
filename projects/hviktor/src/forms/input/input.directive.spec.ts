import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { setupTestBed } from '../../testing/test-utils';
import { HviInput } from './input.directive';

@Component({
  standalone: true,
  imports: [HviInput],
  template: '<input hviInput />',
})
class DefaultHost {}

@Component({
  standalone: true,
  imports: [HviInput],
  template: '<input hviInput type="checkbox" />',
})
class CheckboxHost {}

@Component({
  standalone: true,
  imports: [HviInput],
  template: '<input hviInput type="checkbox" readonly />',
})
class ReadonlyCheckboxHost {}

@Component({
  standalone: true,
  imports: [HviInput],
  template: '<input hviInput type="checkbox" disabled />',
})
class DisabledCheckboxHost {}

@Component({
  standalone: true,
  imports: [HviInput],
  template: '<input hviInput type="checkbox" [readonly]="isReadonly" />',
})
class ToggleReadonlyHost {
  isReadonly = false;
}

@Component({
  standalone: true,
  imports: [HviInput],
  template: '<input hviInput [dsSize]="dsSize" [width]="width" />',
})
class SizeWidthHost {
  dsSize: 'sm' | 'md' | 'lg' | undefined = undefined;
  width: 'auto' | 'full' | undefined = undefined;
}

@Component({
  standalone: true,
  imports: [HviInput],
  template: '<input hviInput type="email" [size]="size" role="searchbox" />',
})
class AttrsHost {
  size: number | undefined = 20;
}

describe('HviInput default state', () => {
  beforeEach(async () => {
    await setupTestBed({
      imports: [DefaultHost, SizeWidthHost, AttrsHost],
    });
  });

  it('should not set data-size when dsSize is not provided', () => {
    const f = TestBed.createComponent(DefaultHost);
    f.detectChanges();
    const el = f.nativeElement.querySelector('input');
    expect(el.getAttribute('data-size')).toBeNull();
  });

  it('should not set data-width when width is not provided', () => {
    const f = TestBed.createComponent(DefaultHost);
    f.detectChanges();
    const el = f.nativeElement.querySelector('input');
    expect(el.getAttribute('data-width')).toBeNull();
  });

  it('should not set disabled or readonly by default', () => {
    const f = TestBed.createComponent(DefaultHost);
    f.detectChanges();
    const el = f.nativeElement.querySelector('input');
    expect(el.hasAttribute('disabled')).toBe(false);
    expect(el.hasAttribute('readonly')).toBe(false);
  });

  it('should reflect dsSize input as data-size attribute', () => {
    const f = TestBed.createComponent(SizeWidthHost);
    f.componentInstance.dsSize = 'sm';
    f.detectChanges();
    const el = f.nativeElement.querySelector('input');
    expect(el.getAttribute('data-size')).toBe('sm');
  });

  it('should reflect width input as data-width attribute', () => {
    const f = TestBed.createComponent(SizeWidthHost);
    f.componentInstance.width = 'auto';
    f.detectChanges();
    const el = f.nativeElement.querySelector('input');
    expect(el.getAttribute('data-width')).toBe('auto');
  });

  it('should reflect type and role attributes', () => {
    const f = TestBed.createComponent(AttrsHost);
    f.detectChanges();
    const el = f.nativeElement.querySelector('input');
    expect(el.getAttribute('type')).toBe('email');
    expect(el.getAttribute('role')).toBe('searchbox');
  });

  it('should reflect size as HTML size attribute', () => {
    const f = TestBed.createComponent(AttrsHost);
    f.detectChanges();
    const el = f.nativeElement.querySelector('input');
    expect(el.getAttribute('size')).toBe('20');
  });
});

describe('HviInput disabled', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [DisabledCheckboxHost] });
  });

  it('should set disabled attribute', () => {
    const f = TestBed.createComponent(DisabledCheckboxHost);
    f.detectChanges();
    const el = f.nativeElement.querySelector('input');
    expect(el.hasAttribute('disabled')).toBe(true);
  });
});

describe('HviInput readonly toggle behavior', () => {
  beforeEach(async () => {
    await setupTestBed({
      imports: [ReadonlyCheckboxHost, ToggleReadonlyHost, CheckboxHost],
    });
  });

  it('should prevent click on readonly checkbox', () => {
    const f = TestBed.createComponent(ReadonlyCheckboxHost);
    f.detectChanges();
    const el: HTMLInputElement = f.nativeElement.querySelector('input');

    expect(el.checked).toBe(false);
    el.click();
    f.detectChanges();
    expect(el.checked).toBe(false);
  });

  it('should allow click when not readonly', () => {
    const f = TestBed.createComponent(ToggleReadonlyHost);
    f.componentInstance.isReadonly = false;
    f.detectChanges();
    const el: HTMLInputElement = f.nativeElement.querySelector('input');

    expect(el.checked).toBe(false);
    el.click();
    f.detectChanges();
    expect(el.checked).toBe(true);
  });

  it('should prevent click when readonly is toggled on', () => {
    const f = TestBed.createComponent(ToggleReadonlyHost);
    f.componentInstance.isReadonly = true;
    f.detectChanges();
    const el: HTMLInputElement = f.nativeElement.querySelector('input');

    expect(el.checked).toBe(false);
    el.click();
    f.detectChanges();
    expect(el.checked).toBe(false);
  });

  it('should not block click on non-toggle type even with readonly', () => {
    // text inputs with readonly don't need event prevention — browser handles it
    const f = TestBed.createComponent(CheckboxHost);
    f.detectChanges();
    const el: HTMLInputElement = f.nativeElement.querySelector('input');
    el.click();
    f.detectChanges();
    expect(el.checked).toBe(true);
  });
});
