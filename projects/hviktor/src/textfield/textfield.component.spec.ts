import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
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

const settle = () => new Promise((resolve) => setTimeout(resolve));

describe('HviTextfield', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [AffixHost] });
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
});
