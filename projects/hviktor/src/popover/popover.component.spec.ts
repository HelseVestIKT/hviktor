import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviPopover } from './popover.component';

type ToggleState = 'open' | 'closed';

function toggleEvent(type: 'toggle' | 'beforetoggle', newState: ToggleState): Event {
  const event = new Event(type);
  Object.defineProperty(event, 'newState', { value: newState });
  Object.defineProperty(event, 'oldState', { value: newState === 'open' ? 'closed' : 'open' });
  return event;
}

/** Simulerer det nettleseren gjør: beforetoggle (synkront) etterfulgt av toggle. */
function open(popover: HTMLElement) {
  popover.dispatchEvent(toggleEvent('beforetoggle', 'open'));
  popover.dispatchEvent(toggleEvent('toggle', 'open'));
}

function close(popover: HTMLElement) {
  popover.dispatchEvent(toggleEvent('beforetoggle', 'closed'));
  popover.dispatchEvent(toggleEvent('toggle', 'closed'));
}

@Component({
  standalone: true,
  imports: [HviPopover],
  template: `
    <button id="trigger" popovertarget="pop1">Åpne</button>
    <hvi-popover
      id="pop1"
      (opened)="openedCount = openedCount + 1"
      (closed)="closedCount = closedCount + 1"
    >
      Popoverinnhold
    </hvi-popover>

    <button id="trigger-af" popovertarget="pop-af">Åpne</button>
    <hvi-popover id="pop-af">
      <button id="cancel">Avbryt</button>
    </hvi-popover>

    <button id="trigger-nofocus" popovertarget="pop-nofocus">Åpne</button>
    <hvi-popover id="pop-nofocus" moveFocus="false">Innhold</hvi-popover>

    <hvi-popover id="pop-label" aria-label="Hjelp">Innhold</hvi-popover>
    <hvi-popover id="pop-labelledby" aria-labelledby="title">
      <h2 id="title">Tittel</h2>
    </hvi-popover>

    <button id="trigger-hint" aria-describedby="other" popovertarget="pop-hint">?</button>
    <hvi-popover id="pop-hint" type="hint">Hint</hvi-popover>

    <hvi-popover>Uten id</hvi-popover>
  `,
})
class PopoverHostComponent {
  openedCount = 0;
  closedCount = 0;
}

describe('HviPopover', () => {
  let root: HTMLElement;
  let host: PopoverHostComponent;
  const q = <T extends HTMLElement = HTMLElement>(selector: string) =>
    root.querySelector(selector) as T;

  beforeEach(async () => {
    await setupTestBed({ imports: [PopoverHostComponent] });
    const fixture = TestBed.createComponent(PopoverHostComponent);
    host = fixture.componentInstance;
    root = fixture.nativeElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    (document.activeElement as HTMLElement | null)?.blur();
  });

  it('har dialog-rolle, er programmatisk fokuserbar og navngis av eget innhold', () => {
    const popover = q('#pop1');
    expect(popover.classList.contains('ds-popover')).toBe(true);
    expect(popover.getAttribute('popover')).toBe('auto');
    expect(popover.getAttribute('role')).toBe('dialog');
    expect(popover.getAttribute('tabindex')).toBe('-1');
    expect(popover.getAttribute('aria-labelledby')).toBe('pop1');
  });

  it('bruker aria-label og aria-labelledby fra konsumenten', () => {
    expect(q('#pop-label').getAttribute('aria-label')).toBe('Hjelp');
    expect(q('#pop-label').getAttribute('aria-labelledby')).toBeNull();
    expect(q('#pop-labelledby').getAttribute('aria-labelledby')).toBe('title');
  });

  it('genererer id når den mangler', () => {
    const popover = root.querySelectorAll('hvi-popover')[6] as HTMLElement;
    expect(popover.id).toMatch(/^hvi-popover-\d+$/);
    expect(popover.getAttribute('aria-labelledby')).toBe(popover.id);
  });

  it('kobler knappen til popoveren med aria-controls og aria-expanded', () => {
    const trigger = q('#trigger');
    const popover = q('#pop1');
    expect(trigger.getAttribute('aria-controls')).toBe('pop1');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');

    open(popover);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    close(popover);
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('flytter fokus inn i popoveren ved åpning og tilbake til knappen ved lukking', () => {
    const trigger = q('#trigger');
    const popover = q('#pop1');
    trigger.focus();

    open(popover);
    expect(document.activeElement).toBe(popover);

    close(popover);
    expect(document.activeElement).toBe(trigger);
  });

  it('returnerer fokus til knappen selv om den ikke hadde fokus før åpning (Safari)', () => {
    const trigger = q('#trigger');
    const popover = q('#pop1');

    open(popover);
    expect(document.activeElement).toBe(popover);

    close(popover);
    expect(document.activeElement).toBe(trigger);
  });

  it('flytter ikke fokus ved lukking hvis brukeren allerede har flyttet fokus et annet sted', () => {
    const trigger = q('#trigger');
    const other = q('#trigger-nofocus');
    const popover = q('#pop1');
    trigger.focus();

    open(popover);
    other.focus();
    close(popover);
    expect(document.activeElement).toBe(other);
  });

  it('lar element som nettleseren har fokusert inni popoveren (autofocus) beholde fokus', () => {
    const cancel = q('#cancel');
    q('#trigger-af').focus();
    const popover = q('#pop-af');

    popover.dispatchEvent(toggleEvent('beforetoggle', 'open'));
    cancel.focus(); // nettleseren håndterer autofocus mellom beforetoggle og toggle
    popover.dispatchEvent(toggleEvent('toggle', 'open'));

    expect(document.activeElement).toBe(cancel);
  });

  it('flytter ikke fokus når moveFocus er false', () => {
    const trigger = q('#trigger-nofocus');
    trigger.focus();
    open(q('#pop-nofocus'));
    expect(document.activeElement).toBe(trigger);
  });

  it('type="hint" blir tooltip beskrevet av knappen, uten fokusflytting', () => {
    const trigger = q('#trigger-hint');
    const popover = q('#pop-hint');
    expect(popover.getAttribute('role')).toBe('tooltip');
    expect(popover.getAttribute('aria-labelledby')).toBeNull();
    expect(trigger.getAttribute('aria-describedby')).toBe('other pop-hint');
    expect(trigger.getAttribute('aria-expanded')).toBeNull();

    trigger.focus();
    open(popover);
    expect(document.activeElement).toBe(trigger);
  });

  it('sender opened og closed', () => {
    const popover = q('#pop1');
    open(popover);
    close(popover);
    expect(host.openedCount).toBe(1);
    expect(host.closedCount).toBe(1);
  });
});
