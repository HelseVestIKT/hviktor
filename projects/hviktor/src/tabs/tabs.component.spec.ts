import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviTabPanel } from './tab-panel.component';
import { HviTab } from './tab.component';
import { HviTabs } from './tabs.component';

@Component({
  standalone: true,
  imports: [HviTabs, HviTab, HviTabPanel],
  template: `
    <hvi-tabs (valueChange)="outerChanges.push($event)">
      <hvi-tab value="outer">Outer tab</hvi-tab>
      <hvi-tab-panel value="outer">
        <hvi-tabs (valueChange)="innerChanges.push($event)">
          <hvi-tab value="inner">Inner tab</hvi-tab>
          <hvi-tab-panel value="inner">Inner panel</hvi-tab-panel>
        </hvi-tabs>
      </hvi-tab-panel>
    </hvi-tabs>
  `,
})
class NestedTabsHostComponent {
  outerChanges: string[] = [];
  innerChanges: string[] = [];
}

describe('HviTabs nested instances', () => {
  let fixture: ComponentFixture<NestedTabsHostComponent>;

  beforeEach(async () => {
    await setupTestBed({ imports: [NestedTabsHostComponent] });
    fixture = TestBed.createComponent(NestedTabsHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('emits an inner tab change only from the inner instance', () => {
    const innerTab = fixture.nativeElement.querySelectorAll('u-tabs')[1].querySelector('u-tab');
    innerTab.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));

    expect(fixture.componentInstance.innerChanges).toEqual(['inner']);
    expect(fixture.componentInstance.outerChanges).toEqual([]);
  });
});
