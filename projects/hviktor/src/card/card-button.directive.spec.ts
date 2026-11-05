import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviCardButton } from './card-button.directive';

@Component({
  standalone: true,
  imports: [HviCardButton],
  template: '<button hviCardButton>Click me</button>',
})
class DefaultCardButtonComponent {}

@Component({
  standalone: true,
  imports: [HviCardButton],
  template: '<button hviCardButton maxWidth="320px">Click me</button>',
})
class MaxWidthCardButtonComponent {}

@Component({
  standalone: true,
  imports: [HviCardButton],
  template: '<button hviCardButton variant="tinted" color="accent">Click me</button>',
})
class CustomCardButtonComponent {}

describe('HviCardButton', () => {
  beforeEach(async () => {
    await setupTestBed({
      imports: [DefaultCardButtonComponent, MaxWidthCardButtonComponent, CustomCardButtonComponent],
    });
  });

  it('should add ds-card class to its host element', () => {
    const f = TestBed.createComponent(DefaultCardButtonComponent);
    f.detectChanges();
    const button = f.nativeElement.querySelector('button');
    expect(button.classList.contains('ds-card')).toBe(true);
  });

  it('should set data-variant to default', () => {
    const f = TestBed.createComponent(DefaultCardButtonComponent);
    f.detectChanges();
    const button = f.nativeElement.querySelector('button');
    expect(button.getAttribute('data-variant')).toBe('default');
  });

  it('should set data-color to neutral', () => {
    const f = TestBed.createComponent(DefaultCardButtonComponent);
    f.detectChanges();
    const button = f.nativeElement.querySelector('button');
    expect(button.getAttribute('data-color')).toBe('neutral');
  });

  it('should apply variant and color when set', () => {
    const f = TestBed.createComponent(CustomCardButtonComponent);
    f.detectChanges();
    const button = f.nativeElement.querySelector('button');
    expect(button.getAttribute('data-variant')).toBe('tinted');
    expect(button.getAttribute('data-color')).toBe('accent');
  });

  it('should apply max-width style when maxWidth is set', () => {
    const f = TestBed.createComponent(MaxWidthCardButtonComponent);
    f.detectChanges();
    const button = f.nativeElement.querySelector('button');
    expect(button.style.maxWidth).toBe('320px');
  });

  it('should not apply max-width style when maxWidth is not set', () => {
    const f = TestBed.createComponent(DefaultCardButtonComponent);
    f.detectChanges();
    const button = f.nativeElement.querySelector('button');
    expect(button.style.maxWidth).toBe('');
  });
});
