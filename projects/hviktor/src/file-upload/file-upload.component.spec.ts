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
      [accept]="accept()"
      [readOnly]="readOnly()"
      [error]="error()"
      [formControl]="files"
    />
  `,
})
class Host {
  readonly multiple = signal(false);
  readonly accept = signal<string | undefined>(undefined);
  readonly readOnly = signal(false);
  readonly error = signal<string | undefined>(undefined);
  readonly files = new FormControl<File[]>([], { nonNullable: true });
}

const cv = new File(['cv'], 'cv.pdf', { type: 'application/pdf', lastModified: 1 });
const attest = new File(['attest'], 'attest.pdf', { type: 'application/pdf', lastModified: 2 });

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
    const fileNames = () =>
      Array.from(el.querySelectorAll('.hvi-file-upload__name')).map((name) => name.textContent);
    return { fixture, host: fixture.componentInstance, el, input, fileNames };
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

  it('legger nye filer til de valgte med multiple, uten dubletter', async () => {
    const { fixture, host, input, fileNames } = render((host) => host.multiple.set(true));
    selectFiles(input, [cv]);
    selectFiles(input, [cv, attest]);
    await fixture.whenStable();

    expect(host.files.value).toEqual([cv, attest]);
    expect(host.files.touched).toBe(true);
    expect(fileNames()).toEqual(['cv.pdf', 'attest.pdf']);
  });

  it('erstatter filen uten multiple', () => {
    const { host, input } = render();
    selectFiles(input, [cv]);
    selectFiles(input, [attest]);

    expect(host.files.value).toEqual([attest]);
  });

  it('avviser filer som ikke passer med accept, også når de slippes i området', async () => {
    const { fixture, host, el, input, fileNames } = render((host) => {
      host.multiple.set(true);
      host.accept.set('.pdf, image/*');
    });
    const bilde = new File(['bilde'], 'bilde.png', { type: 'image/png' });
    const notat = new File(['notat'], 'notat.txt', { type: 'text/plain' });
    selectFiles(input, [cv, bilde, notat]);
    await fixture.whenStable();

    expect(host.files.value).toEqual([cv, bilde]);
    expect(fileNames()).toEqual(['cv.pdf', 'bilde.png']);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(el.querySelector('.ds-validation-message')!.textContent).toContain(
      'notat.txt ble ikke lagt til fordi filtypen ikke er tillatt',
    );
  });

  it('fjerner en fil med knappen og sier fra til skjermlesere', async () => {
    const { fixture, host, el, fileNames } = render();
    host.files.setValue([cv]);
    await fixture.whenStable();

    const remove = el.querySelector<HTMLButtonElement>('.hvi-file-upload__remove')!;
    expect(remove.getAttribute('aria-label')).toBe('Fjern cv.pdf');

    remove.click();
    await fixture.whenStable();

    expect(host.files.value).toEqual([]);
    expect(fileNames()).toEqual([]);
    expect(el.querySelector('[role="status"]')!.textContent).toBe('cv.pdf er fjernet');
  });

  it('markerer området når en fil dras over det', async () => {
    const { fixture, el, input } = render();
    const dragEnter = new Event('dragenter');
    Object.defineProperty(dragEnter, 'dataTransfer', { value: { types: ['Files'] } });
    input.dispatchEvent(dragEnter);
    await fixture.whenStable();
    const zone = el.querySelector('.ds-file-upload')!;

    expect(zone.hasAttribute('data-dragover')).toBe(true);

    input.dispatchEvent(new Event('dragleave'));
    await fixture.whenStable();

    expect(zone.hasAttribute('data-dragover')).toBe(false);
  });

  it('åpner ikke filvelgeren og skjuler fjern-knappene når feltet er skrivebeskyttet', async () => {
    const { fixture, host, el, input } = render((host) => host.readOnly.set(true));
    host.files.setValue([cv]);
    await fixture.whenStable();
    const click = new MouseEvent('click', { cancelable: true });
    input.dispatchEvent(click);

    expect(click.defaultPrevented).toBe(true);
    expect(input.getAttribute('aria-readonly')).toBe('true');
    expect(el.querySelector('.hvi-file-upload__remove')).toBeNull();
  });

  it('viser feilmelding og markerer inputen som ugyldig', () => {
    const { el, input } = render((host) => host.error.set('Filen er for stor'));

    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(el.querySelector('.ds-validation-message')!.textContent).toContain('Filen er for stor');
  });
});
