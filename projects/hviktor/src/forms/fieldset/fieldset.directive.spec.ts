import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { setupTestBed } from '../../testing/test-utils';
import { HviFieldset } from './fieldset.directive';

@Component({
  standalone: true,
  imports: [HviFieldset],
  template: `
    <fieldset id="with-directive" hviFieldset>
      <legend>Group</legend>
      <input type="text" />
    </fieldset>
    <fieldset id="without-directive">
      <legend>Plain</legend>
      <input type="text" />
    </fieldset>
  `,
})
class FieldsetHost {}

@Component({
  standalone: true,
  imports: [HviFieldset],
  template: `
    <fieldset hviFieldset disabled>
      <legend>Disabled</legend>
      <input type="text" />
    </fieldset>
  `,
})
class DisabledFieldsetHost {}

describe('HviFieldset', () => {
  beforeEach(async () => {
    await setupTestBed({
      imports: [FieldsetHost, DisabledFieldsetHost],
    });
  });

  it('applies ds-fieldset class to fieldset with hviFieldset directive', () => {
    const fixture = TestBed.createComponent(FieldsetHost);
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('#with-directive');
    expect(el.classList.contains('ds-fieldset')).toBe(true);
  });

  it('does not affect fieldset elements without hviFieldset directive', () => {
    const fixture = TestBed.createComponent(FieldsetHost);
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('#without-directive');
    expect(el.classList.contains('ds-fieldset')).toBe(false);
  });

  it('preserves native disabled attribute on the fieldset', () => {
    const fixture = TestBed.createComponent(DisabledFieldsetHost);
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('fieldset');
    expect(el.disabled).toBe(true);
    expect(el.classList.contains('ds-fieldset')).toBe(true);
  });
});
