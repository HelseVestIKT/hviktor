import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviLabel } from './label.directive';

@Component({
  standalone: true,
  imports: [HviLabel],
  template: `<label hviLabel>Default label</label>`,
})
class DefaultLabelHost {}

@Component({
  standalone: true,
  imports: [HviLabel],
  template: `<label hviLabel [weight]="weight">Weighted label</label>`,
})
class WeightHost {
  weight: 'regular' | 'medium' | 'semibold' = 'semibold';
}

@Component({
  standalone: true,
  imports: [HviLabel],
  template: `<legend hviLabel>Legend label</legend>`,
})
class LegendHost {}

describe('HviLabel', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [DefaultLabelHost, WeightHost, LegendHost] });
  });

  it('omits data-weight attribute when weight is not set', () => {
    const fixture = TestBed.createComponent(DefaultLabelHost);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('label');
    expect(el.getAttribute('data-weight')).toBeNull();
  });

  it('reflects weight input as data-weight attribute', () => {
    const fixture = TestBed.createComponent(WeightHost);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('label');
    expect(el.getAttribute('data-weight')).toBe('semibold');
  });

  it('applies ds-label class to host element', () => {
    const fixture = TestBed.createComponent(DefaultLabelHost);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('label');
    expect(el.classList.contains('ds-label')).toBe(true);
  });

  it('works on legend elements', () => {
    const fixture = TestBed.createComponent(LegendHost);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('legend');
    expect(el.classList.contains('ds-label')).toBe(true);
    expect(el.getAttribute('data-weight')).toBeNull();
  });
});
