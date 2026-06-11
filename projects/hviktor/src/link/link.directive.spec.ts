import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviLink } from './link.directive';

@Component({
  standalone: true,
  imports: [HviLink],
  template: `<a hviLink href="/page">Default link</a>`,
})
class DefaultLinkHost {}

@Component({
  standalone: true,
  imports: [HviLink],
  template: `<a hviLink href="/page" color="neutral">Neutral link</a>`,
})
class NeutralColorHost {}

@Component({
  standalone: true,
  imports: [HviLink],
  template: `<button hviLink>Button link</button>`,
})
class ButtonHost {}

describe('HviLink', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [DefaultLinkHost, NeutralColorHost, ButtonHost] });
  });

  it('applies ds-link class to anchor element', () => {
    const fixture = TestBed.createComponent(DefaultLinkHost);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('a');
    expect(el.classList.contains('ds-link')).toBe(true);
  });

  it('does not emit data-color attribute by default', () => {
    const fixture = TestBed.createComponent(DefaultLinkHost);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('a');
    expect(el.getAttribute('data-color')).toBeNull();
  });

  it('reflects color input as data-color attribute', () => {
    const fixture = TestBed.createComponent(NeutralColorHost);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('a');
    expect(el.getAttribute('data-color')).toBe('neutral');
  });

  it('applies ds-link class to button element', () => {
    const fixture = TestBed.createComponent(ButtonHost);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('button');
    expect(el.classList.contains('ds-link')).toBe(true);
  });
});
