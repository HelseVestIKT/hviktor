import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviCardLink } from './card-link.directive';

@Component({
  standalone: true,
  imports: [HviCardLink],
  template: '<a hviCardLink href="/innstillinger">Innstillinger</a>',
})
class DefaultCardLinkComponent {}

@Component({
  standalone: true,
  imports: [HviCardLink],
  template:
    '<a hviCardLink href="/innstillinger" variant="tinted" color="accent" maxWidth="320px">Innstillinger</a>',
})
class CustomCardLinkComponent {}

describe('HviCardLink', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [DefaultCardLinkComponent, CustomCardLinkComponent] });
  });

  const render = (component: typeof DefaultCardLinkComponent | typeof CustomCardLinkComponent) => {
    const f = TestBed.createComponent(component);
    f.detectChanges();
    return f.nativeElement.querySelector('a') as HTMLAnchorElement;
  };

  it('should add ds-card class to its host element', () => {
    expect(render(DefaultCardLinkComponent).classList.contains('ds-card')).toBe(true);
  });

  it('should default data-variant to default and data-color to neutral', () => {
    const link = render(DefaultCardLinkComponent);
    expect(link.getAttribute('data-variant')).toBe('default');
    expect(link.getAttribute('data-color')).toBe('neutral');
  });

  it('should apply variant and color when set', () => {
    const link = render(CustomCardLinkComponent);
    expect(link.getAttribute('data-variant')).toBe('tinted');
    expect(link.getAttribute('data-color')).toBe('accent');
  });

  it('should apply max-width style when maxWidth is set', () => {
    expect(render(CustomCardLinkComponent).style.maxWidth).toBe('320px');
  });

  it('should not apply max-width style when maxWidth is not set', () => {
    expect(render(DefaultCardLinkComponent).style.maxWidth).toBe('');
  });
});
