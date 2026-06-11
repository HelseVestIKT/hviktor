import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviLogo } from './logo.component';

describe('HviLogo', () => {
  let fixture: ComponentFixture<HviLogo>;
  let element: HTMLElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [HviLogo] });
    fixture = TestBed.createComponent(HviLogo);
    element = fixture.nativeElement;
    fixture.componentRef.setInput('company', 'hve');
    fixture.detectChanges();
  });

  it('should default to data-size "md" when no size is provided', () => {
    expect(element.getAttribute('data-size')).toBe('md');
  });

  it('should reflect size input as data-size attribute', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    expect(element.getAttribute('data-size')).toBe('lg');
  });

  it('should render an SVG with role="img" and aria-label', () => {
    const svg = element.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg!.getAttribute('role')).toBe('img');
    expect(svg!.getAttribute('aria-label')).toBe('Helse Vest');
  });

  it('should update aria-label when company changes', () => {
    fixture.componentRef.setInput('company', 'hvikt');
    fixture.detectChanges();
    const svg = element.querySelector('svg');
    expect(svg!.getAttribute('aria-label')).toBeTruthy();
    expect(svg!.getAttribute('aria-label')).not.toBe('Helse Vest');
  });

  it('should render accent paths with fixed blue fill', () => {
    const paths = element.querySelectorAll('path');
    const accentPaths = Array.from(paths).filter((p) => p.getAttribute('fill') === '#6CACE4');
    expect(accentPaths.length).toBeGreaterThan(0);
  });

  it('should render themed paths with currentColor fill', () => {
    const paths = element.querySelectorAll('path');
    const themedPaths = Array.from(paths).filter((p) => p.getAttribute('fill') === 'currentColor');
    expect(themedPaths.length).toBeGreaterThan(0);
  });

  it('should have hvi-logo host class', () => {
    expect(element.classList.contains('hvi-logo')).toBe(true);
  });
});
