import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviCard } from './card.component';

describe('HviCard', () => {
  let fixture: ComponentFixture<HviCard>;
  let el: HTMLElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [HviCard] });
    fixture = TestBed.createComponent(HviCard);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should not set data attributes when no inputs are provided', () => {
    expect(el.getAttribute('data-variant')).toBeNull();
    expect(el.getAttribute('data-color')).toBeNull();
    expect(el.getAttribute('data-clickdelegatefor')).toBeNull();
    expect(el.style.maxWidth).toBe('');
  });

  it('should reflect variant input as data-variant attribute', () => {
    fixture.componentRef.setInput('variant', 'tinted');
    fixture.detectChanges();
    expect(el.getAttribute('data-variant')).toBe('tinted');
  });

  it('should reflect color input as data-color attribute', () => {
    fixture.componentRef.setInput('color', 'brand2');
    fixture.detectChanges();
    expect(el.getAttribute('data-color')).toBe('brand2');
  });

  it('should reflect maxWidth as an inline max-width style', () => {
    fixture.componentRef.setInput('maxWidth', '320px');
    fixture.detectChanges();
    expect(el.style.maxWidth).toBe('320px');
  });

  it('should reflect clickDelegateFor as data-clickdelegatefor attribute', () => {
    fixture.componentRef.setInput('clickDelegateFor', 'my-link');
    fixture.detectChanges();
    expect(el.getAttribute('data-clickdelegatefor')).toBe('my-link');
  });
});
