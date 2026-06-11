import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { setupTestBed } from '../../testing/test-utils';
import { HviFieldAffix } from './field-affix.component';
import { HviFieldAffixes } from './field-affixes.component';
import { HviFieldCounter } from './field-counter.component';
import { HviFieldDescription } from './field-description.directive';
import { HviFieldOptional } from './field-optional.directive';
import { HviFieldValidation } from './field-validation.directive';

@Component({
  standalone: true,
  imports: [HviFieldDescription],
  template: '<span hviFieldDescription>Help text</span>',
})
class DescriptionHost {}

@Component({
  standalone: true,
  imports: [HviFieldValidation],
  template: '<p hviFieldValidation>Error message</p>',
})
class ValidationHost {}

@Component({
  standalone: true,
  imports: [HviFieldOptional],
  template: '<span hviFieldOptional>(optional)</span>',
})
class OptionalHost {}

@Component({
  standalone: true,
  imports: [HviFieldCounter],
  template: '<hvi-field-counter [limit]="limit" [over]="over" [under]="under" />',
})
class CounterHost {
  limit = 100;
  over: string | undefined;
  under: string | undefined;
}

@Component({
  standalone: true,
  imports: [HviFieldAffix],
  template: '<hvi-field-affix>NOK</hvi-field-affix>',
})
class AffixHost {}

@Component({
  standalone: true,
  imports: [HviFieldAffixes],
  template: '<hvi-field-affixes><span>content</span></hvi-field-affixes>',
})
class AffixesHost {}

describe('HviFieldDescription', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [DescriptionHost] });
  });

  it('should set data-field="description" on host element', () => {
    const fixture = TestBed.createComponent(DescriptionHost);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('[hviFieldDescription]');
    expect(el.getAttribute('data-field')).toBe('description');
  });

  it('should project text content', () => {
    const fixture = TestBed.createComponent(DescriptionHost);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('[hviFieldDescription]');
    expect(el.textContent).toContain('Help text');
  });
});

describe('HviFieldValidation', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [ValidationHost] });
  });

  it('should set data-field="validation" on host element', () => {
    const fixture = TestBed.createComponent(ValidationHost);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('[hviFieldValidation]');
    expect(el.getAttribute('data-field')).toBe('validation');
  });

  it('should apply ds-validation-message class', () => {
    const fixture = TestBed.createComponent(ValidationHost);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('[hviFieldValidation]');
    expect(el.classList.contains('ds-validation-message')).toBe(true);
  });
});

describe('HviFieldOptional', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [OptionalHost] });
  });

  it('should set data-field="optional" on host element', () => {
    const fixture = TestBed.createComponent(OptionalHost);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('[hviFieldOptional]');
    expect(el.getAttribute('data-field')).toBe('optional');
  });
});

describe('HviFieldCounter', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [CounterHost] });
  });

  it('should render a p element with data-field="counter"', () => {
    const fixture = TestBed.createComponent(CounterHost);
    fixture.detectChanges();
    const p = fixture.nativeElement.querySelector('p[data-field="counter"]');
    expect(p).toBeTruthy();
  });

  it('should set data-limit from limit input', () => {
    const fixture = TestBed.createComponent(CounterHost);
    fixture.detectChanges();
    const p = fixture.nativeElement.querySelector('p[data-field="counter"]');
    expect(p.getAttribute('data-limit')).toBe('100');
  });

  it('should not set data-over when over is not provided', () => {
    const fixture = TestBed.createComponent(CounterHost);
    fixture.detectChanges();
    const p = fixture.nativeElement.querySelector('p[data-field="counter"]');
    expect(p.getAttribute('data-over')).toBeNull();
  });

  it('should not set data-under when under is not provided', () => {
    const fixture = TestBed.createComponent(CounterHost);
    fixture.detectChanges();
    const p = fixture.nativeElement.querySelector('p[data-field="counter"]');
    expect(p.getAttribute('data-under')).toBeNull();
  });

  it('should reflect over input as data-over attribute', () => {
    const fixture = TestBed.createComponent(CounterHost);
    fixture.componentInstance.over = '%d too many';
    fixture.detectChanges();
    const p = fixture.nativeElement.querySelector('p[data-field="counter"]');
    expect(p.getAttribute('data-over')).toBe('%d too many');
  });

  it('should reflect under input as data-under attribute', () => {
    const fixture = TestBed.createComponent(CounterHost);
    fixture.componentInstance.under = '%d remaining';
    fixture.detectChanges();
    const p = fixture.nativeElement.querySelector('p[data-field="counter"]');
    expect(p.getAttribute('data-under')).toBe('%d remaining');
  });
});

describe('HviFieldAffix', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [AffixHost] });
  });

  it('should apply ds-field-affix class', () => {
    const fixture = TestBed.createComponent(AffixHost);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('hvi-field-affix');
    expect(el.classList.contains('ds-field-affix')).toBe(true);
  });

  it('should set aria-hidden to true', () => {
    const fixture = TestBed.createComponent(AffixHost);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('hvi-field-affix');
    expect(el.getAttribute('aria-hidden')).toBe('true');
  });

  it('should project content', () => {
    const fixture = TestBed.createComponent(AffixHost);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('hvi-field-affix');
    expect(el.textContent).toContain('NOK');
  });
});

describe('HviFieldAffixes', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [AffixesHost] });
  });

  it('should apply ds-field-affixes class', () => {
    const fixture = TestBed.createComponent(AffixesHost);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('hvi-field-affixes');
    expect(el.classList.contains('ds-field-affixes')).toBe(true);
  });

  it('should project content', () => {
    const fixture = TestBed.createComponent(AffixesHost);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('hvi-field-affixes');
    expect(el.textContent).toContain('content');
  });
});
