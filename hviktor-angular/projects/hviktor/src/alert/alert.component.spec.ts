import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { HviAlert } from './alert.component';

@Component({
  standalone: true,
  imports: [HviAlert],
  template: '<hvi-alert>Testvarsel</hvi-alert>',
})
class AlertHostComponent {}

@Component({
  standalone: true,
  imports: [HviAlert],
  template: `<hvi-alert>
    <h2>Overskrift</h2>
    <p>Beskrivelse</p>
  </hvi-alert>`,
})
class AlertRichContentHostComponent {}

@Component({
  standalone: true,
  imports: [HviAlert],
  template: '<hvi-alert color="warning">Snapshot test</hvi-alert>',
})
class AlertSnapshotHostComponent {}

describe('HviAlert', () => {
  let fixture: ComponentFixture<HviAlert>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HviAlert,
        AlertHostComponent,
        AlertRichContentHostComponent,
        AlertSnapshotHostComponent,
      ],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
    fixture = TestBed.createComponent(HviAlert);
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have ds-alert host class', () => {
    expect(element.classList.contains('ds-alert')).toBe(true);
  });

  it('should not set data-color when no color is provided', () => {
    expect(element.getAttribute('data-color')).toBeNull();
  });

  it.each(['info', 'success', 'warning', 'danger'] as const)(
    'should set data-color="%s" when color input is set',
    async (color) => {
      fixture.componentRef.setInput('color', color);
      fixture.detectChanges();
      expect(element.getAttribute('data-color')).toBe(color);
    },
  );

  it('should project content', () => {
    const hostFixture = TestBed.createComponent(AlertHostComponent);
    hostFixture.detectChanges();
    const alertEl = hostFixture.nativeElement.querySelector('hvi-alert');
    expect(alertEl.textContent).toContain('Testvarsel');
  });

  it('should project heading and paragraph content', () => {
    const hostFixture = TestBed.createComponent(AlertRichContentHostComponent);
    hostFixture.detectChanges();
    const alertEl = hostFixture.nativeElement.querySelector('hvi-alert');
    expect(alertEl.querySelector('h2')?.textContent).toContain('Overskrift');
    expect(alertEl.querySelector('p')?.textContent).toContain('Beskrivelse');
  });

  it('should match snapshot', () => {
    const hostFixture = TestBed.createComponent(AlertSnapshotHostComponent);
    hostFixture.detectChanges();
    const alertEl = hostFixture.nativeElement.querySelector('hvi-alert');
    expect(alertEl.outerHTML).toMatchSnapshot();
  });
});
