import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviDetailsContent } from './details-content.component';
import { HviDetailsSummary } from './details-summary.component';
import { HviDetails } from './details.component';

// ---------------------------------------------------------------------------
// Host components
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [HviDetails, HviDetailsSummary, HviDetailsContent],
  template: `<hvi-details>
    <hvi-details-summary>Summary text</hvi-details-summary>
    <hvi-details-content>Content text</hvi-details-content>
  </hvi-details>`,
})
class BasicDetailsHost {}

@Component({
  standalone: true,
  imports: [HviDetails, HviDetailsSummary, HviDetailsContent],
  template: `<hvi-details variant="tinted">
    <hvi-details-summary>Summary</hvi-details-summary>
    <hvi-details-content>Content</hvi-details-content>
  </hvi-details>`,
})
class TintedDetailsHost {}

@Component({
  standalone: true,
  imports: [HviDetails, HviDetailsSummary, HviDetailsContent],
  template: `<hvi-details [open]="true">
    <hvi-details-summary>Summary</hvi-details-summary>
    <hvi-details-content>Content</hvi-details-content>
  </hvi-details>`,
})
class OpenDetailsHost {}

@Component({
  standalone: true,
  imports: [HviDetails, HviDetailsSummary, HviDetailsContent],
  template: `<hvi-details defaultOpen>
    <hvi-details-summary>Summary</hvi-details-summary>
    <hvi-details-content>Content</hvi-details-content>
  </hvi-details>`,
})
class DefaultOpenDetailsHost {}

// ---------------------------------------------------------------------------
// HviDetails
// ---------------------------------------------------------------------------

describe('HviDetails', () => {
  let fixture: ComponentFixture<HviDetails>;
  let inner: HTMLElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [HviDetails] });
    fixture = TestBed.createComponent(HviDetails);
    fixture.detectChanges();
    inner = fixture.nativeElement.querySelector('u-details');
  });

  it('should create', () => {
    expect(inner).toBeTruthy();
  });

  it('should apply ds-details class to inner u-details element', () => {
    expect(inner.classList.contains('ds-details')).toBe(true);
  });

  it('should set data-variant to "default" by default', () => {
    expect(inner.getAttribute('data-variant')).toBe('default');
  });

  it('should not set open attribute by default', () => {
    expect(inner.getAttribute('open')).toBeNull();
  });

  it('should not set defaultOpen attribute by default', () => {
    const hasAttr = inner.hasAttribute('defaultOpen') || inner.hasAttribute('defaultopen');
    expect(hasAttr).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// HviDetails variant
// ---------------------------------------------------------------------------

describe('HviDetails variant', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [HviDetails] });
  });

  it('should set data-variant to "tinted"', () => {
    const f = TestBed.createComponent(HviDetails);
    f.componentRef.setInput('variant', 'tinted');
    f.detectChanges();
    expect(f.nativeElement.querySelector('u-details').getAttribute('data-variant')).toBe('tinted');
  });

  it('should set data-variant to "default"', () => {
    const f = TestBed.createComponent(HviDetails);
    f.componentRef.setInput('variant', 'default');
    f.detectChanges();
    expect(f.nativeElement.querySelector('u-details').getAttribute('data-variant')).toBe('default');
  });

  it('should reflect tinted variant via host component', async () => {
    await setupTestBed({ imports: [TintedDetailsHost] });
    const f = TestBed.createComponent(TintedDetailsHost);
    f.detectChanges();
    const inner = f.nativeElement.querySelector('u-details');
    expect(inner.getAttribute('data-variant')).toBe('tinted');
  });
});

// ---------------------------------------------------------------------------
// HviDetails open
// ---------------------------------------------------------------------------

describe('HviDetails open', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [HviDetails] });
  });

  it('should set open attribute when open is true', () => {
    const f = TestBed.createComponent(HviDetails);
    f.componentRef.setInput('open', true);
    f.detectChanges();
    expect(f.nativeElement.querySelector('u-details').getAttribute('open')).not.toBeNull();
  });

  it('should not set open attribute when open is false', () => {
    const f = TestBed.createComponent(HviDetails);
    f.componentRef.setInput('open', false);
    f.detectChanges();
    expect(f.nativeElement.querySelector('u-details').getAttribute('open')).toBeNull();
  });

  it('should set open attribute via [open]="true" binding', async () => {
    await setupTestBed({ imports: [OpenDetailsHost] });
    const f = TestBed.createComponent(OpenDetailsHost);
    f.detectChanges();
    expect(f.nativeElement.querySelector('u-details').getAttribute('open')).not.toBeNull();
  });
});

// ---------------------------------------------------------------------------
// HviDetails defaultOpen
// ---------------------------------------------------------------------------

describe('HviDetails defaultOpen', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [HviDetails] });
  });

  it('should set defaultOpen attribute when defaultOpen is true', () => {
    const f = TestBed.createComponent(HviDetails);
    f.componentRef.setInput('defaultOpen', true);
    f.detectChanges();
    const el = f.nativeElement.querySelector('u-details');
    const hasAttr = el.hasAttribute('defaultOpen') || el.hasAttribute('defaultopen');
    expect(hasAttr).toBe(true);
  });

  it('should not set defaultOpen attribute when defaultOpen is false', () => {
    const f = TestBed.createComponent(HviDetails);
    f.componentRef.setInput('defaultOpen', false);
    f.detectChanges();
    const el = f.nativeElement.querySelector('u-details');
    const hasAttr = el.hasAttribute('defaultOpen') || el.hasAttribute('defaultopen');
    expect(hasAttr).toBe(false);
  });

  it('should set defaultOpen attribute via attribute binding', async () => {
    await setupTestBed({ imports: [DefaultOpenDetailsHost] });
    const f = TestBed.createComponent(DefaultOpenDetailsHost);
    f.detectChanges();
    const el = f.nativeElement.querySelector('u-details');
    const hasAttr = el.hasAttribute('defaultOpen') || el.hasAttribute('defaultopen');
    expect(hasAttr).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// HviDetails toggle output
// ---------------------------------------------------------------------------

describe('HviDetails toggle output', () => {
  it('should emit toggle event when native toggle fires on u-details', async () => {
    await setupTestBed({ imports: [HviDetails] });
    const f = TestBed.createComponent(HviDetails);
    f.detectChanges();

    let emitted: Event | undefined;
    f.componentInstance.toggled.subscribe((e: Event) => (emitted = e));

    const uDetails = f.nativeElement.querySelector('u-details');
    const event = new Event('toggle');
    uDetails.dispatchEvent(event);

    expect(emitted).toBe(event);
  });
});

// ---------------------------------------------------------------------------
// HviDetails content projection
// ---------------------------------------------------------------------------

describe('HviDetails content projection', () => {
  it('should project hvi-details-summary and hvi-details-content', async () => {
    await setupTestBed({ imports: [BasicDetailsHost] });
    const f = TestBed.createComponent(BasicDetailsHost);
    f.detectChanges();
    expect(f.nativeElement.querySelector('hvi-details-summary').textContent.trim()).toBe(
      'Summary text',
    );
    expect(f.nativeElement.querySelector('hvi-details-content').textContent.trim()).toBe(
      'Content text',
    );
  });
});

// ---------------------------------------------------------------------------
// HviDetailsSummary
// ---------------------------------------------------------------------------

describe('HviDetailsSummary', () => {
  it('should create', async () => {
    await setupTestBed({ imports: [HviDetailsSummary] });
    const f = TestBed.createComponent(HviDetailsSummary);
    f.detectChanges();
    expect(f.nativeElement).toBeTruthy();
  });

  it('should project content', async () => {
    @Component({
      standalone: true,
      imports: [HviDetailsSummary],
      template: '<hvi-details-summary>Summary content</hvi-details-summary>',
    })
    class SummaryHost {}

    await setupTestBed({ imports: [SummaryHost] });
    const f = TestBed.createComponent(SummaryHost);
    f.detectChanges();
    expect(f.nativeElement.querySelector('hvi-details-summary').textContent.trim()).toBe(
      'Summary content',
    );
  });
});

// ---------------------------------------------------------------------------
// HviDetailsContent
// ---------------------------------------------------------------------------

describe('HviDetailsContent', () => {
  it('should create', async () => {
    await setupTestBed({ imports: [HviDetailsContent] });
    const f = TestBed.createComponent(HviDetailsContent);
    f.detectChanges();
    expect(f.nativeElement).toBeTruthy();
  });

  it('should project content', async () => {
    @Component({
      standalone: true,
      imports: [HviDetailsContent],
      template: '<hvi-details-content>Panel content</hvi-details-content>',
    })
    class ContentHost {}

    await setupTestBed({ imports: [ContentHost] });
    const f = TestBed.createComponent(ContentHost);
    f.detectChanges();
    expect(f.nativeElement.querySelector('hvi-details-content').textContent.trim()).toBe(
      'Panel content',
    );
  });
});
