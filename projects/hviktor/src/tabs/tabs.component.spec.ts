import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviTabPanel } from './tab-panel.component';
import { HviTab } from './tab.component';
import { HviTabs } from './tabs.component';

@Component({
  standalone: true,
  imports: [HviTabs, HviTab, HviTabPanel],
  template: `
    <hvi-tabs [(value)]="currentTab">
      @for (tab of tabs(); track tab) {
        <hvi-tab [value]="tab">{{ tab }}</hvi-tab>
      }
      @for (tab of tabs(); track tab) {
        <hvi-tab-panel [value]="tab">
          Innhold {{ tab }}
          <button type="button" (click)="currentTab.set('tab3')">Gå til tab 3</button>
        </hvi-tab-panel>
      }
    </hvi-tabs>
  `,
})
class ControlledHost {
  readonly tabs = signal(['tab1', 'tab2', 'tab3']);
  readonly currentTab = signal<string | undefined>('tab2');
}

@Component({
  standalone: true,
  imports: [HviTabs, HviTab, HviTabPanel],
  template: `
    <hvi-tabs [value]="currentTab()">
      <hvi-tab value="tab1">Tab 1</hvi-tab>
      <hvi-tab value="tab2">Tab 2</hvi-tab>
      <hvi-tab-panel value="tab1">Innhold 1</hvi-tab-panel>
      <hvi-tab-panel value="tab2">Innhold 2</hvi-tab-panel>
    </hvi-tabs>
  `,
})
class OneWayHost {
  readonly currentTab = signal('tab1');
}

@Component({
  standalone: true,
  imports: [HviTabs, HviTab, HviTabPanel],
  template: `
    <hvi-tabs defaultValue="tab2" (valueChange)="changes.push($event)">
      <hvi-tab value="tab1">Tab 1</hvi-tab>
      <hvi-tab value="tab2">Tab 2</hvi-tab>
      <hvi-tab-panel value="tab1">Innhold 1</hvi-tab-panel>
      <hvi-tab-panel value="tab2">Innhold 2</hvi-tab-panel>
    </hvi-tabs>
  `,
})
class UncontrolledHost {
  changes: string[] = [];
}

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
class NestedHost {
  outerChanges: string[] = [];
  innerChanges: string[] = [];
}

async function render<T>(component: new () => T): Promise<ComponentFixture<T>> {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  await settle(fixture);
  return fixture;
}

async function settle(fixture: ComponentFixture<unknown>) {
  await fixture.whenStable();
  await new Promise((resolve) => setTimeout(resolve));
  await fixture.whenStable();
}

function root(fixture: ComponentFixture<unknown>): HTMLElement {
  return fixture.nativeElement.querySelector('u-tabs');
}

function selectedTab(fixture: ComponentFixture<unknown>): string | null {
  return (
    root(fixture)
      .querySelector(':scope > u-tablist > u-tab[aria-selected="true"]')
      ?.getAttribute('data-value') ?? null
  );
}

function visiblePanel(fixture: ComponentFixture<unknown>): string | null {
  return (
    root(fixture).querySelector(':scope > u-tabpanel:not([hidden])')?.getAttribute('data-value') ??
    null
  );
}

function click(fixture: ComponentFixture<unknown>, value: string) {
  root(fixture)
    .querySelector<HTMLElement>(`:scope > u-tablist > u-tab[data-value="${value}"]`)!
    .dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
}

describe('HviTabs', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [ControlledHost, OneWayHost, UncontrolledHost, NestedHost] });
  });

  it('velger fanen fra defaultValue', async () => {
    const fixture = await render(UncontrolledHost);

    expect(selectedTab(fixture)).toBe('tab2');
    expect(visiblePanel(fixture)).toBe('tab2');
  });

  it('sender valueChange når brukeren klikker på en fane', async () => {
    const fixture = await render(UncontrolledHost);
    click(fixture, 'tab1');

    expect(fixture.componentInstance.changes).toEqual(['tab1']);
    expect(selectedTab(fixture)).toBe('tab1');
  });

  it('velger fanen fra value', async () => {
    const fixture = await render(ControlledHost);

    expect(selectedTab(fixture)).toBe('tab2');
    expect(visiblePanel(fixture)).toBe('tab2');
  });

  it('bytter fane når value endres utenfra', async () => {
    const fixture = await render(OneWayHost);
    fixture.componentInstance.currentTab.set('tab2');
    await settle(fixture);

    expect(selectedTab(fixture)).toBe('tab2');
    expect(visiblePanel(fixture)).toBe('tab2');
  });

  it('bytter fane fra en knapp inne i et panel', async () => {
    const fixture = await render(ControlledHost);
    root(fixture)
      .querySelector<HTMLButtonElement>(':scope > u-tabpanel:not([hidden]) button')!
      .click();
    await settle(fixture);

    expect(selectedTab(fixture)).toBe('tab3');
    expect(visiblePanel(fixture)).toBe('tab3');
  });

  it('oppdaterer [(value)] når brukeren klikker, slik at samme fane kan velges igjen utenfra', async () => {
    const fixture = await render(ControlledHost);
    fixture.componentInstance.currentTab.set('tab3');
    await settle(fixture);
    click(fixture, 'tab1');
    await settle(fixture);

    expect(fixture.componentInstance.currentTab()).toBe('tab1');

    fixture.componentInstance.currentTab.set('tab3');
    await settle(fixture);

    expect(selectedTab(fixture)).toBe('tab3');
  });

  it('beholder valgt fane når faner legges til senere', async () => {
    const fixture = TestBed.createComponent(ControlledHost);
    fixture.componentInstance.tabs.set([]);
    fixture.componentInstance.currentTab.set('tab3');
    fixture.detectChanges();
    await settle(fixture);

    fixture.componentInstance.tabs.set(['tab1', 'tab2', 'tab3']);
    await settle(fixture);

    expect(selectedTab(fixture)).toBe('tab3');
    expect(visiblePanel(fixture)).toBe('tab3');
  });

  it('sender bare valueChange fra den indre fanegruppen ved nøstede faner', async () => {
    const fixture = await render(NestedHost);
    const innerTab = fixture.nativeElement.querySelectorAll('u-tabs')[1].querySelector('u-tab');
    innerTab.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));

    expect(fixture.componentInstance.innerChanges).toEqual(['inner']);
    expect(fixture.componentInstance.outerChanges).toEqual([]);
  });
});
