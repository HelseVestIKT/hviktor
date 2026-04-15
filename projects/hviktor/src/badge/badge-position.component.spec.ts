import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviBadgePosition } from './badge-position.component';
import { HviBadge } from './badge.component';

describe('HviBadgePosition', () => {
  let fixture: ComponentFixture<HviBadgePosition>;
  let element: HTMLElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [HviBadgePosition] });
    fixture = TestBed.createComponent(HviBadgePosition);
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should have default data-overlap of rectangle', () => {
    expect(element.getAttribute('data-overlap')).toBe('rectangle');
  });

  it('should have default data-placement of top-right', () => {
    expect(element.getAttribute('data-placement')).toBe('top-right');
  });

  it('should reflect placement input as data-placement attribute', () => {
    fixture.componentRef.setInput('placement', 'bottom-left');
    fixture.detectChanges();
    expect(element.getAttribute('data-placement')).toBe('bottom-left');
  });

  it('should reflect overlap input as data-overlap attribute', () => {
    fixture.componentRef.setInput('overlap', 'circle');
    fixture.detectChanges();
    expect(element.getAttribute('data-overlap')).toBe('circle');
  });
});

@Component({
  standalone: true,
  imports: [HviBadgePosition, HviBadge],
  template: `
    <hvi-badge-position placement="top-left">
      <hvi-badge color="danger" count="3"></hvi-badge>
      <span>Innhold</span>
    </hvi-badge-position>
  `,
})
class BadgePositionHostComponent {}

describe('HviBadgePosition content projection', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [BadgePositionHostComponent] });
  });

  it('should project badge and child content', () => {
    const fixture = TestBed.createComponent(BadgePositionHostComponent);
    fixture.detectChanges();
    const positionEl = fixture.nativeElement.querySelector('hvi-badge-position');
    const badge = positionEl.querySelector('hvi-badge');
    const span = positionEl.querySelector('span');

    expect(badge).toBeTruthy();
    expect(badge.getAttribute('data-count')).toBe('3');
    expect(span?.textContent).toBe('Innhold');
  });
});
