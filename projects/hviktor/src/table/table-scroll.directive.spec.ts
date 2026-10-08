import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviTableScroll } from './table-scroll.directive';
import { HviTable } from './table.directive';

@Component({
  standalone: true,
  imports: [HviTable, HviTableScroll],
  template: `
    <div hviTableScroll>
      <table hviTable>
        <caption>
          Ansatte
        </caption>
        <tbody>
          <tr>
            <td>Ola Nordmann</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})
class ScrollTableComponent {}

@Component({
  standalone: true,
  imports: [HviTable, HviTableScroll],
  template: `
    <div hviTableScroll aria-label="Egen etikett">
      <table hviTable>
        <caption>
          Ansatte
        </caption>
        <tbody>
          <tr>
            <td>Ola Nordmann</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})
class LabelledScrollTableComponent {}

/** jsdom har ingen layout, så bredden på scroll-beholderen må simuleres. */
function mockScrollWidths(scrollWidth: number, clientWidth: number): void {
  const isScroller = (el: HTMLElement) => el.classList.contains('hvi-table-scroll');
  Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
    configurable: true,
    get(this: HTMLElement) {
      return isScroller(this) ? scrollWidth : 0;
    },
  });
  Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
    configurable: true,
    get(this: HTMLElement) {
      return isScroller(this) ? clientWidth : 0;
    },
  });
}

function restoreScrollWidths(): void {
  delete (HTMLElement.prototype as { scrollWidth?: number }).scrollWidth;
  delete (HTMLElement.prototype as { clientWidth?: number }).clientWidth;
}

async function render<T>(component: new () => T): Promise<HTMLElement> {
  const fixture: ComponentFixture<T> = TestBed.createComponent(component);
  await fixture.whenStable();
  return fixture.nativeElement.querySelector('[hviTableScroll]') as HTMLElement;
}

describe('HviTableScroll', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [ScrollTableComponent, LabelledScrollTableComponent] });
  });

  afterEach(() => restoreScrollWidths());

  it('should add the hvi-table-scroll class', async () => {
    const scroller = await render(ScrollTableComponent);
    expect(scroller.classList.contains('hvi-table-scroll')).toBe(true);
  });

  it('should not be focusable or a region when the table fits', async () => {
    mockScrollWidths(300, 300);
    const scroller = await render(ScrollTableComponent);

    expect(scroller.hasAttribute('tabindex')).toBe(false);
    expect(scroller.hasAttribute('role')).toBe(false);
    expect(scroller.hasAttribute('aria-labelledby')).toBe(false);
  });

  it('should become a focusable region named by the caption when the table overflows', async () => {
    mockScrollWidths(800, 300);
    const scroller = await render(ScrollTableComponent);
    const caption = scroller.querySelector('caption') as HTMLElement;

    expect(scroller.getAttribute('tabindex')).toBe('0');
    expect(scroller.getAttribute('role')).toBe('region');
    expect(caption.id).toBeTruthy();
    expect(scroller.getAttribute('aria-labelledby')).toBe(caption.id);
  });

  it('should keep a label set by the developer', async () => {
    mockScrollWidths(800, 300);
    const scroller = await render(LabelledScrollTableComponent);

    expect(scroller.getAttribute('aria-label')).toBe('Egen etikett');
    expect(scroller.hasAttribute('aria-labelledby')).toBe(false);
    expect(scroller.getAttribute('role')).toBe('region');
    expect(scroller.getAttribute('tabindex')).toBe('0');
  });
});
