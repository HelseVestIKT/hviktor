import { Component } from '@angular/core';
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
    expect(element.getAttribute('data-size')).toBeNull();
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

  it('should reflect size input as data-size attribute', () => {
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    expect(element.getAttribute('data-size')).toBe('sm');
  });

  it('should reflect color input as data-color attribute', () => {
    fixture.componentRef.setInput('color', 'danger');
    fixture.detectChanges();
    expect(element.getAttribute('data-color')).toBe('danger');
  });
});

@Component({
  standalone: true,
  imports: [HviBadge],
  template: '<hvi-badge>Active</hvi-badge>',
})
class BadgeContentHostComponent {}

describe('HviBadge content projection', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [BadgeContentHostComponent] });
  });

  it('should render projected label content', () => {
    const contentFixture = TestBed.createComponent(BadgeContentHostComponent);
    contentFixture.detectChanges();

    expect(contentFixture.nativeElement.querySelector('hvi-badge').textContent.trim()).toBe(
      'Active',
    );
  });
});
