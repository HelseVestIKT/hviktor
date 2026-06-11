import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { setupTestBed } from '../../testing/test-utils';
import { HviField } from './field.component';

@Component({
  standalone: true,
  imports: [HviField],
  template: '<hvi-field><input type="text" /></hvi-field>',
})
class BasicHost {}

@Component({
  standalone: true,
  imports: [HviField],
  template: '<hvi-field [position]="position"><input type="checkbox" /></hvi-field>',
})
class PositionHost {
  position: 'start' | 'end' = 'end';
}

@Component({
  standalone: true,
  imports: [HviField],
  template: '<hvi-field [outline]="outline"><input type="radio" /></hvi-field>',
})
class OutlineHost {
  outline = true;
}

describe('HviField', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [BasicHost, PositionHost, OutlineHost] });
  });

  it('should not set data-position when no position is provided', () => {
    const fixture = TestBed.createComponent(BasicHost);
    fixture.detectChanges();
    const dsField = fixture.nativeElement.querySelector('ds-field');
    expect(dsField.getAttribute('data-position')).toBeNull();
  });

  it('should not set data-variant when outline is false', () => {
    const fixture = TestBed.createComponent(BasicHost);
    fixture.detectChanges();
    const dsField = fixture.nativeElement.querySelector('ds-field');
    expect(dsField.getAttribute('data-variant')).toBeNull();
  });

  it('should reflect position input as data-position attribute', () => {
    const fixture = TestBed.createComponent(PositionHost);
    fixture.detectChanges();
    const dsField = fixture.nativeElement.querySelector('ds-field');
    expect(dsField.getAttribute('data-position')).toBe('end');
  });

  it('should set data-variant to outline when outline is true', () => {
    const fixture = TestBed.createComponent(OutlineHost);
    fixture.detectChanges();
    const dsField = fixture.nativeElement.querySelector('ds-field');
    expect(dsField.getAttribute('data-variant')).toBe('outline');
  });

  it('should project content into ds-field', () => {
    const fixture = TestBed.createComponent(BasicHost);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('ds-field input[type="text"]');
    expect(input).toBeTruthy();
  });
});
