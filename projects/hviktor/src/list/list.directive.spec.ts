import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviList } from './list.directive';

@Component({
  standalone: true,
  imports: [HviList],
  template: `
    <ul id="ul-with" hviList>
      <li>Item</li>
    </ul>
    <ol id="ol-with" hviList>
      <li>Item</li>
    </ol>
    <ul id="ul-without">
      <li>Item</li>
    </ul>
  `,
})
class ListHostComponent {}

describe('HviList', () => {
  beforeEach(async () => {
    await setupTestBed({
      imports: [ListHostComponent],
    });
  });

  it('adds ds-list class to ul with hviList', () => {
    const fixture = TestBed.createComponent(ListHostComponent);
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('#ul-with');
    expect(el.classList.contains('ds-list')).toBe(true);
  });

  it('adds ds-list class to ol with hviList', () => {
    const fixture = TestBed.createComponent(ListHostComponent);
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('#ol-with');
    expect(el.classList.contains('ds-list')).toBe(true);
  });

  it('does not affect list elements without hviList', () => {
    const fixture = TestBed.createComponent(ListHostComponent);
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('#ul-without');
    expect(el.classList.contains('ds-list')).toBe(false);
  });

  it('projects content into list items', () => {
    const fixture = TestBed.createComponent(ListHostComponent);
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('#ul-with li');
    expect(el.textContent).toContain('Item');
  });
});
