import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { setupTestBed } from '../testing/test-utils';
import { HviTextfield } from './textfield.component';

@Component({
  standalone: true,
  imports: [HviTextfield],
  template: `
    <hvi-textfield
      label="Hvor mange kroner koster det per måned?"
      [description]="description()"
      [prefix]="prefix()"
      [suffix]="suffix()"
      [multiline]="multiline()"
    />
  `,
})
class AffixHost {
  readonly description = signal<string | undefined>(undefined);
  readonly prefix = signal<string | undefined>('NOK');
  readonly suffix = signal<string | undefined>('pr. mnd');
  readonly multiline = signal(false);
}

@Component({
  standalone: true,
  imports: [HviTextfield, ReactiveFormsModule],
  template: `
    <hvi-textfield label="Antall" type="number" [formControl]="tall" />
    <hvi-textfield label="Navn" [formControl]="navn" />
  `,
})
class FormHost {
  readonly tall = new FormControl<number | null>(null);
  readonly navn = new FormControl<string | null>('');
}

@Component({
  standalone: true,
  imports: [HviTextfield],
  template: `<hvi-textfield label="Antall" type="number" [(value)]="antall" />`,
})
class NumberValueHost {
  readonly antall = signal<number | null>(null);
}

function type(control: HTMLInputElement, text: string) {
  control.value = text;
  control.dispatchEvent(new Event('input'));
}

const settle = () => new Promise((resolve) => setTimeout(resolve));

describe('HviTextfield', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [AffixHost, FormHost, NumberValueHost] });
  });

  describe('prefiks og suffiks', () => {
    function render(setup?: (host: AffixHost) => void) {
      const fixture = TestBed.createComponent(AffixHost);
      setup?.(fixture.componentInstance);
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement;
      const control = el.querySelector<HTMLElement>('.ds-input')!;
      const describedBy = () => control.getAttribute('aria-describedby')?.split(' ') ?? [];
      return { fixture, el, control, describedBy };
    }

    it('kobler prefiks og suffiks til feltet med aria-describedby', () => {
      const { el, describedBy } = render();
      const [prefix, suffix] = Array.from(el.querySelectorAll('.ds-field-affix'));

      expect(prefix.id).toBeTruthy();
      expect(suffix.id).toBeTruthy();
      expect(describedBy()).toEqual([prefix.id, suffix.id]);
    });

    it('kobler bare affikset som er satt', () => {
      const { el, describedBy } = render((host) => host.suffix.set(undefined));
      const prefix = el.querySelector('.ds-field-affix')!;

      expect(describedBy()).toEqual([prefix.id]);
    });

    it('setter ikke aria-describedby uten prefiks og suffiks', () => {
      const { control } = render((host) => {
        host.prefix.set(undefined);
        host.suffix.set(undefined);
      });

      expect(control.hasAttribute('aria-describedby')).toBe(false);
    });

    it('beholder aria-hidden på affiksene så de ikke leses dobbelt', () => {
      const { el } = render();
      const affixes = Array.from(el.querySelectorAll('.ds-field-affix'));

      expect(affixes.every((affix) => affix.getAttribute('aria-hidden') === 'true')).toBe(true);
    });

    it('kobler affiksene også når feltet er en textarea', () => {
      const { control, describedBy } = render((host) => host.multiline.set(true));

      expect(control.tagName).toBe('TEXTAREA');
      expect(describedBy()).toHaveLength(2);
    });

    it('beholder beskrivelsen fra ds-field i tillegg til affiksene', async () => {
      const { el, describedBy } = render((host) =>
        host.description.set('Oppgi beløpet i hele kroner'),
      );
      await settle();

      const description = el.querySelector('[data-field="description"]')!;
      const [prefix, suffix] = Array.from(el.querySelectorAll('.ds-field-affix'));

      expect(describedBy()).toEqual([description.id, prefix.id, suffix.id]);
    });
  });

  describe('type="number"', () => {
    function renderForm() {
      const fixture = TestBed.createComponent(FormHost);
      fixture.detectChanges();
      const [tall, navn] = Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLInputElement>('input'),
      );
      return { fixture, host: fixture.componentInstance, tall, navn };
    }

    it('gir et tall til skjemaet, slik som <input type="number">', () => {
      const { host, tall } = renderForm();
      type(tall, '42.5');

      expect(host.tall.value).toBe(42.5);
    });

    it('gir null til skjemaet når feltet tømmes', () => {
      const { host, tall } = renderForm();
      type(tall, '7');
      type(tall, '');

      expect(host.tall.value).toBeNull();
    });

    it('gir fortsatt tekst til skjemaet for andre typer', () => {
      const { host, navn } = renderForm();
      type(navn, '42');

      expect(host.navn.value).toBe('42');
    });

    it('viser tall som settes fra skjemaet', async () => {
      const { fixture, host, tall } = renderForm();
      host.tall.setValue(12);
      await fixture.whenStable();

      expect(tall.value).toBe('12');
    });

    it('tømmer feltet når skjemaet nullstilles', async () => {
      const { fixture, host, tall } = renderForm();
      type(tall, '3');
      host.tall.reset();
      await fixture.whenStable();

      expect(tall.value).toBe('');
      expect(host.tall.value).toBeNull();
    });

    it('gir et tall gjennom [(value)]', () => {
      const fixture = TestBed.createComponent(NumberValueHost);
      fixture.detectChanges();
      const input = (fixture.nativeElement as HTMLElement).querySelector('input')!;
      type(input, '3');

      expect(fixture.componentInstance.antall()).toBe(3);
    });

    it('skriver ikke om det brukeren taster, f.eks. «1.0»', async () => {
      const fixture = TestBed.createComponent(NumberValueHost);
      fixture.detectChanges();
      const input = (fixture.nativeElement as HTMLElement).querySelector('input')!;
      type(input, '1.0');
      await fixture.whenStable();

      expect(fixture.componentInstance.antall()).toBe(1);
      expect(input.value).toBe('1.0');
    });

    it('viser ny verdi når [(value)] endres utenfra', async () => {
      const fixture = TestBed.createComponent(NumberValueHost);
      fixture.detectChanges();
      const input = (fixture.nativeElement as HTMLElement).querySelector('input')!;
      type(input, '1.0');
      fixture.componentInstance.antall.set(2);
      await fixture.whenStable();

      expect(input.value).toBe('2');
    });
  });
});
