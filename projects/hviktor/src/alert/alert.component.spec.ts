import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviAlert } from './alert.component';

describe('HviAlert', () => {
  let fixture: ComponentFixture<HviAlert>;
  let element: HTMLElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [HviAlert] });
    fixture = TestBed.createComponent(HviAlert);
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should not set data-color when no color is provided', () => {
    expect(element.getAttribute('data-color')).toBeNull();
  });

  it('should set status role by default', () => {
    expect(element.getAttribute('role')).toBe('status');
  });

  it('should not set aria-live', () => {
    expect(element.getAttribute('aria-live')).toBeNull();
  });

  it('should reflect color input as data-color attribute', () => {
    fixture.componentRef.setInput('color', 'danger');
    fixture.detectChanges();
    expect(element.getAttribute('data-color')).toBe('danger');
  });

  it('should map danger color to role alert', () => {
    fixture.componentRef.setInput('color', 'danger');
    fixture.detectChanges();
    expect(element.getAttribute('role')).toBe('alert');
  });

  it('should respect explicit role override', () => {
    fixture.componentRef.setInput('color', 'danger');
    fixture.componentRef.setInput('role', 'status');
    fixture.detectChanges();
    expect(element.getAttribute('role')).toBe('status');
  });

  describe('aria-label defaults', () => {
    it('should use "Informasjon" when no color is set', () => {
      expect(element.getAttribute('aria-label')).toBe('Informasjon');
    });

    it('should use "Informasjon" for color info', () => {
      fixture.componentRef.setInput('color', 'info');
      fixture.detectChanges();
      expect(element.getAttribute('aria-label')).toBe('Informasjon');
    });

    it('should use "Suksessmelding" for color success', () => {
      fixture.componentRef.setInput('color', 'success');
      fixture.detectChanges();
      expect(element.getAttribute('aria-label')).toBe('Suksessmelding');
    });

    it('should use "Advarsel" for color warning', () => {
      fixture.componentRef.setInput('color', 'warning');
      fixture.detectChanges();
      expect(element.getAttribute('aria-label')).toBe('Advarsel');
    });

    it('should use "Feilmelding" for color danger', () => {
      fixture.componentRef.setInput('color', 'danger');
      fixture.detectChanges();
      expect(element.getAttribute('aria-label')).toBe('Feilmelding');
    });
  });

  describe('title input', () => {
    it('should render an h2 with the title text', () => {
      fixture.componentRef.setInput('title', 'Min overskrift');
      fixture.detectChanges();
      const h2 = element.querySelector('h2');
      expect(h2).not.toBeNull();
      expect(h2?.textContent?.trim()).toBe('Min overskrift');
    });

    it('should use title as aria-label', () => {
      fixture.componentRef.setInput('title', 'Min overskrift');
      fixture.detectChanges();
      expect(element.getAttribute('aria-label')).toBe('Min overskrift');
    });

    it('should not render h2 when title is not set', () => {
      expect(element.querySelector('h2')).toBeNull();
    });
  });
});

@Component({
  standalone: true,
  imports: [HviAlert],
  template: `<hvi-alert>
    <p>Beskrivelse</p>
  </hvi-alert>`,
})
class AlertRichContentHostComponent {}

describe('HviAlert content projection', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [AlertRichContentHostComponent] });
  });

  it('should project rich content', () => {
    const fixture = TestBed.createComponent(AlertRichContentHostComponent);
    fixture.detectChanges();
    const alertEl = fixture.nativeElement.querySelector('hvi-alert');
    expect(alertEl.querySelector('p')?.textContent).toContain('Beskrivelse');
  });
});
