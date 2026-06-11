import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviHeading } from './heading.directive';

@Component({
  standalone: true,
  imports: [HviHeading],
  selector: 'app-default-host',
  template: `<h1 hviHeading>Default heading</h1>`,
})
class DefaultHost {}

@Component({
  standalone: true,
  imports: [HviHeading],
  selector: 'app-size-host',
  template: `<h2 hviHeading [size]="size">Sized heading</h2>`,
})
class SizeHost {
  size: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'lg';
}

@Component({
  standalone: true,
  imports: [HviHeading],
  selector: 'app-h3-host',
  template: `<h3 hviHeading>H3 heading</h3>`,
})
class H3Host {}

describe('HviHeading', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [DefaultHost, SizeHost, H3Host] });
  });

  it('omits data-size attribute when size is not set', () => {
    const fixture = TestBed.createComponent(DefaultHost);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('h1');
    expect(el.getAttribute('data-size')).toBeNull();
  });

  it('reflects size input as data-size attribute', () => {
    const fixture = TestBed.createComponent(SizeHost);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('h2');
    expect(el.getAttribute('data-size')).toBe('lg');
  });

  it('applies ds-heading class to host element', () => {
    const fixture = TestBed.createComponent(DefaultHost);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('h1');
    expect(el.classList.contains('ds-heading')).toBe(true);
  });

  it('works on different heading levels', () => {
    const fixture = TestBed.createComponent(H3Host);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('h3');
    expect(el.classList.contains('ds-heading')).toBe(true);
  });

  it('projects content', () => {
    const fixture = TestBed.createComponent(DefaultHost);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('h1');
    expect(el.textContent).toContain('Default heading');
  });
});
