import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviBadge } from './badge.component';

describe('HviBadge', () => {
  let fixture: ComponentFixture<HviBadge>;
  let element: HTMLElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [HviBadge] });
    fixture = TestBed.createComponent(HviBadge);
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should not set data attributes when no inputs are provided', () => {
    expect(element.getAttribute('data-variant')).toBeNull();
    expect(element.getAttribute('data-count')).toBeNull();
    expect(element.getAttribute('data-color')).toBeNull();
  });

  it('should reflect variant input as data-variant attribute', () => {
    fixture.componentRef.setInput('variant', 'tinted');
    fixture.detectChanges();
    expect(element.getAttribute('data-variant')).toBe('tinted');
  });

  it('should reflect count input as data-count attribute', () => {
    fixture.componentRef.setInput('count', '9+');
    fixture.detectChanges();
    expect(element.getAttribute('data-count')).toBe('9+');
  });

  it('should reflect color input as data-color attribute', () => {
    fixture.componentRef.setInput('color', 'danger');
    fixture.detectChanges();
    expect(element.getAttribute('data-color')).toBe('danger');
  });
});
