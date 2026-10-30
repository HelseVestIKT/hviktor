import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { setupTestBed } from '../testing/test-utils';
import { HviFileUpload } from './file-upload.component';

@Component({
  standalone: true,
  imports: [HviFileUpload, ReactiveFormsModule],
  template: `
    <hvi-file-upload
      label="Last opp vedlegg"
      description="Filen må være mindre enn 2 MB"
      [multiple]="multiple()"
      [readOnly]="readOnly()"
      [error]="error()"
      [formControl]="files"
    />
  `,
})
class Host {
  readonly multiple = signal(false);
  readonly readOnly = signal(false);
  readonly error = signal<string | undefined>(undefined);
  readonly files = new FormControl<File[]>([], { nonNullable: true });
}

/** Simulerer at brukeren velger filer. jsdom lar oss ikke sette `files` direkte. */
function selectFiles(input: HTMLInputElement, files: File[]) {
  Object.defineProperty(input, 'files', { value: files, configurable: true });
  input.dispatchEvent(new Event('change'));
}

describe('HviFileUpload', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [Host] });
  });

  function render(setup?: (host: Host) => void) {
    const fixture = TestBed.createComponent(Host);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const input = el.querySelector<HTMLInputElement>('.ds-file-upload > input[type="file"]')!;
    return { fixture, host: fixture.componentInstance, el, input };
  }

  it('kobler label og beskrivelser til fil-inputen', async () => {
    const { fixture, el, input } = render();
    await fixture.whenStable();
    await new Promise((resolve) => setTimeout(resolve));
    const descriptions = Array.from(el.querySelectorAll('[data-field="description"]'));

    expect(el.querySelector('label')!.control).toBe(input);
    expect(input.getAttribute('aria-describedby')?.split(' ')).toEqual(
      descriptions.map((description) => description.id),
    );
  });

  it('tilpasser standardtekstene til multiple', () => {
    const { el } = render((host) => host.multiple.set(true));

    expect(el.querySelector('.ds-file-upload')!.textContent).toContain('Slipp filer her');
    expect(el.querySelector('.ds-button')!.textContent!.trim()).toBe('Velg filer');
  });

  it('gir valgte filer til skjemaet', () => {
    const { host, input } = render();
    const file = new File(['innhold'], 'cv.pdf', { type: 'application/pdf' });
    selectFiles(input, [file]);

    expect(host.files.value).toEqual([file]);
    expect(host.files.touched).toBe(true);
  });

  it('tømmer inputen når skjemaet nullstilles', async () => {
    const { fixture, host, input } = render();
    const clear = vi.spyOn(input, 'value', 'set');
    host.files.reset();
    await fixture.whenStable();

    expect(clear).toHaveBeenCalledWith('');
  });

  it('åpner ikke filvelgeren når feltet er skrivebeskyttet', () => {
    const { input } = render((host) => host.readOnly.set(true));
    const click = new MouseEvent('click', { cancelable: true });
    input.dispatchEvent(click);

    expect(click.defaultPrevented).toBe(true);
    expect(input.getAttribute('aria-readonly')).toBe('true');
  });

  it('viser feilmelding og markerer inputen som ugyldig', () => {
    const { el, input } = render((host) => host.error.set('Filen er for stor'));

    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(el.querySelector('.ds-validation-message')!.textContent).toContain('Filen er for stor');
  });
});
