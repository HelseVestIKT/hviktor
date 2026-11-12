import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { setupTestBed } from '../testing/test-utils';
import { HviSuggestionMultiple } from './suggestion-multiple.component';
import { HviSuggestion } from './suggestion.component';

interface Kommune {
  nummer: string;
  navn: string;
}

const KOMMUNER = ['Sogndal', 'Bergen', 'Oslo', 'Stavanger', 'Trondheim'];
const BERGEN: Kommune = { nummer: '4601', navn: 'Bergen' };
const OSLO: Kommune = { nummer: '0301', navn: 'Oslo' };

@Component({
  standalone: true,
  imports: [HviSuggestion],
  template: `
    <hvi-suggestion
      label="Kommune"
      [suggestions]="kommuner"
      [filter]="filter"
      [maxVisible]="maxVisible"
      [completeOnFocus]="completeOnFocus"
      (completeMethod)="queries.push($event.query)"
    />
  `,
})
class StringHost {
  readonly kommuner = KOMMUNER;
  filter = true;
  maxVisible = 100;
  completeOnFocus = false;
  readonly queries: string[] = [];
}

@Component({
  standalone: true,
  imports: [HviSuggestion, ReactiveFormsModule],
  template: `
    <hvi-suggestion
      label="Kommune"
      optionLabel="navn"
      dataKey="nummer"
      [suggestions]="kommuner"
      [formControl]="kommune"
    />
  `,
})
class SingleFormHost {
  readonly kommuner = [BERGEN, OSLO];
  readonly kommune = new FormControl<Kommune | null>(BERGEN);
}

@Component({
  standalone: true,
  imports: [HviSuggestionMultiple, ReactiveFormsModule],
  template: `
    <hvi-suggestion-multiple label="Kommuner" [suggestions]="kommuner" [formControl]="kommuner$" />
  `,
})
class MultipleFormHost {
  readonly kommuner = KOMMUNER;
  readonly kommuner$ = new FormControl<string[] | null>(null);
}

@Component({
  standalone: true,
  imports: [HviSuggestionMultiple],
  template: `
    <hvi-suggestion-multiple
      label="Kommuner"
      optionLabel="navn"
      dataKey="nummer"
      creatable
      [createOption]="nyKommune"
      [suggestions]="kommuner"
      [(value)]="valgte"
    />
  `,
})
class CreatableHost {
  readonly kommuner = [BERGEN, OSLO];
  readonly valgte = signal<Kommune[]>([]);
  readonly nyKommune = (navn: string): Kommune => ({ nummer: `ny-${navn}`, navn });
}

@Component({
  standalone: true,
  imports: [HviSuggestion],
  template: `
    <hvi-suggestion
      label="Kommune"
      emptyText="Fant ingen kommuner"
      loadingText="Henter kommuner"
      [loading]="loading"
      [suggestions]="[]"
    />
  `,
})
class EmptyHost {
  loading = false;
}

@Component({
  standalone: true,
  imports: [HviSuggestion],
  template: `<hvi-suggestion label="Kommune" [suggestions]="kommuner" />`,
})
class MissingLabelHost {
  readonly kommuner = [BERGEN, OSLO];
}

@Component({
  standalone: true,
  imports: [HviSuggestion],
  template: `
    <hvi-suggestion
      label="Kommune"
      [suggestions]="kommuner"
      [srText]="{ toggle: 'Vis kommuner' }"
    />
  `,
})
class SrTextHost {
  readonly kommuner = KOMMUNER;
}

const field = (f: ComponentFixture<unknown>) =>
  f.nativeElement.querySelector('input.ds-input') as HTMLInputElement;

const combobox = (f: ComponentFixture<unknown>) =>
  f.nativeElement.querySelector('ds-suggestion') as HTMLElement;

const optionLabels = (f: ComponentFixture<unknown>) =>
  Array.from(f.nativeElement.querySelectorAll('u-option:not([data-empty])')).map((el) =>
    (el as HTMLElement).getAttribute('label'),
  );

/** Simulates input from u-combobox itself: a synthetic, untrusted event. */
const syntheticInput = async (f: ComponentFixture<unknown>, text: string) => {
  const el = field(f);
  el.value = text;
  el.dispatchEvent(new Event('input', { bubbles: true }));
  await f.whenStable();
};

/**
 * Simulates the user typing. jsdom cannot create trusted events, so the
 * component's handler is called with an event that looks trusted.
 */
const userInput = async (f: ComponentFixture<unknown>, text: string) => {
  const el = field(f);
  el.value = text;
  const component = f.debugElement.query(By.directive(HviSuggestion)).componentInstance as {
    complete(event: Event): void;
  };
  component.complete({ type: 'input', isTrusted: true, target: el } as unknown as Event);
  await f.whenStable();
};

/** Simulates u-combobox committing a selection: a `<data>` item plus the event. */
const commitSelection = (f: ComponentFixture<unknown>, value: string, label: string) => {
  const data = document.createElement('data');
  data.value = value;
  data.textContent = label;
  combobox(f).insertBefore(data, field(f));
  combobox(f).dispatchEvent(new CustomEvent('comboboxafterselect', { bubbles: true }));
};

describe('HviSuggestion', () => {
  beforeEach(async () => {
    await setupTestBed({
      imports: [
        StringHost,
        SingleFormHost,
        MultipleFormHost,
        CreatableHost,
        EmptyHost,
        MissingLabelHost,
        SrTextHost,
      ],
    });
  });

  describe('value', () => {
    it('should keep the selected object from a form control', async () => {
      const f = TestBed.createComponent(SingleFormHost);
      f.detectChanges();
      await f.whenStable();

      const component = f.debugElement.query(By.directive(HviSuggestion)).componentInstance;
      expect(component.value()).toBe(BERGEN);
      expect(combobox(f).hasAttribute('data-multiple')).toBe(false);
    });

    it('should resolve a selected key back to the original object', async () => {
      const f = TestBed.createComponent(SingleFormHost);
      f.detectChanges();
      await f.whenStable();

      combobox(f)
        .querySelectorAll(':scope > data')
        .forEach((el) => el.remove());
      commitSelection(f, OSLO.nummer, OSLO.navn);
      expect(f.componentInstance.kommune.value).toBe(OSLO);
    });
  });

  describe('completeMethod', () => {
    it('should emit when the user types', async () => {
      const f = TestBed.createComponent(StringHost);
      f.detectChanges();
      await userInput(f, 'Ber');
      expect(f.componentInstance.queries).toEqual(['Ber']);
    });

    it('should not emit when u-combobox writes the selected text into the field', async () => {
      const f = TestBed.createComponent(StringHost);
      f.detectChanges();
      await syntheticInput(f, 'Bergen');
      expect(f.componentInstance.queries).toEqual([]);
    });

    it('should emit an empty query when the field is cleared', async () => {
      const f = TestBed.createComponent(StringHost);
      f.detectChanges();
      await syntheticInput(f, '');
      expect(f.componentInstance.queries).toEqual(['']);
    });

    it('should emit on focus when completeOnFocus is set', async () => {
      const f = TestBed.createComponent(StringHost);
      f.componentInstance.completeOnFocus = true;
      f.detectChanges();
      field(f).dispatchEvent(new FocusEvent('focus'));
      await f.whenStable();
      expect(f.componentInstance.queries).toEqual(['']);
    });
  });

  describe('filtering', () => {
    it('should filter suggestions by the typed text', async () => {
      const f = TestBed.createComponent(StringHost);
      f.detectChanges();
      await syntheticInput(f, 'sta');
      f.detectChanges();
      expect(optionLabels(f)).toEqual(['Stavanger']);
    });

    it('should render all suggestions when filter is false', async () => {
      const f = TestBed.createComponent(StringHost);
      f.componentInstance.filter = false;
      f.detectChanges();
      await syntheticInput(f, 'sta');
      f.detectChanges();
      expect(optionLabels(f)).toEqual(KOMMUNER);
    });

    it('should render only maxVisible options and show how many are hidden', async () => {
      const f = TestBed.createComponent(StringHost);
      f.componentInstance.maxVisible = 2;
      f.detectChanges();
      await f.whenStable();
      expect(optionLabels(f)).toEqual(['Sogndal', 'Bergen']);
      expect(f.nativeElement.querySelector('[data-suggestion-truncated]').textContent).toContain(
        '3',
      );
    });
  });

  describe('empty state', () => {
    it('should show emptyText when nothing matches', () => {
      const f = TestBed.createComponent(EmptyHost);
      f.detectChanges();
      const empty = f.nativeElement.querySelector('u-option[data-empty]');
      expect(empty.textContent.trim()).toBe('Fant ingen kommuner');
      expect(empty.getAttribute('value')).toBe('');
    });

    it('should show loadingText while loading', () => {
      const f = TestBed.createComponent(EmptyHost);
      f.componentInstance.loading = true;
      f.detectChanges();
      const empty = f.nativeElement.querySelector('u-option[data-empty]');
      expect(empty.textContent.trim()).toBe('Henter kommuner');
    });
  });

  describe('dev warnings', () => {
    it('should warn once when object options have no optionLabel', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      const f = TestBed.createComponent(MissingLabelHost);
      f.detectChanges();
      await f.whenStable();

      const calls = warn.mock.calls.filter(([message]) => String(message).includes('optionLabel'));
      expect(calls.length).toBe(1);
      warn.mockRestore();
    });
  });

  describe('srText', () => {
    it('should set overridden screen reader texts on ds-suggestion', async () => {
      const f = TestBed.createComponent(SrTextHost);
      f.detectChanges();
      await f.whenStable();
      expect(combobox(f).getAttribute('data-sr-toggle')).toBe('Vis kommuner');
    });
  });
});

describe('HviSuggestionMultiple', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [MultipleFormHost, CreatableHost] });
  });

  it('should normalize null from a form control to an empty list', async () => {
    const f = TestBed.createComponent(MultipleFormHost);
    f.detectChanges();
    await f.whenStable();

    const component = f.debugElement.query(By.directive(HviSuggestionMultiple)).componentInstance;
    expect(component.value()).toEqual([]);
    expect(combobox(f).hasAttribute('data-multiple')).toBe(true);
  });

  it('should render selected options as chips', async () => {
    const f = TestBed.createComponent(MultipleFormHost);
    f.componentInstance.kommuner$.setValue(['Bergen', 'Oslo']);
    f.detectChanges();
    await f.whenStable();

    const chips = Array.from(combobox(f).querySelectorAll(':scope > data')).map((el) =>
      el.textContent?.trim(),
    );
    expect(chips).toEqual(['Bergen', 'Oslo']);
  });

  describe('text that is not an option', () => {
    /** Simulates u-combobox asking to add an item. Returns whether it was allowed. */
    const beforeSelect = (f: ComponentFixture<unknown>, value: string, label: string) => {
      const data = document.createElement('data');
      data.value = value;
      data.textContent = label;
      return combobox(f).dispatchEvent(
        new CustomEvent('comboboxbeforeselect', { bubbles: true, cancelable: true, detail: data }),
      );
    };

    it('should stop the empty option from being added without creatable', async () => {
      const f = TestBed.createComponent(MultipleFormHost);
      f.detectChanges();
      await f.whenStable();

      expect(beforeSelect(f, '', 'tull')).toBe(false);
      expect(beforeSelect(f, 'Bergen', 'Bergen')).toBe(true);
    });

    it('should always allow removing a chip', async () => {
      const f = TestBed.createComponent(MultipleFormHost);
      f.componentInstance.kommuner$.setValue(['Bergen']);
      f.detectChanges();
      await f.whenStable();

      const chip = combobox(f).querySelector(':scope > data');
      const allowed = combobox(f).dispatchEvent(
        new CustomEvent('comboboxbeforeselect', { bubbles: true, cancelable: true, detail: chip }),
      );
      expect(allowed).toBe(true);
    });

    it('should drop items that are not options without creatable', async () => {
      const f = TestBed.createComponent(MultipleFormHost);
      f.detectChanges();
      await f.whenStable();

      commitSelection(f, '', 'tull');
      await f.whenStable();
      expect(f.componentInstance.kommuner$.value).toEqual([]);
      expect(combobox(f).querySelector(':scope > data')).toBeNull();
    });

    it('should allow new text with creatable', async () => {
      const f = TestBed.createComponent(CreatableHost);
      f.detectChanges();
      await f.whenStable();

      expect(beforeSelect(f, 'Nyby', 'Nyby')).toBe(true);
    });
  });

  it('should create new objects with createOption', async () => {
    const f = TestBed.createComponent(CreatableHost);
    f.detectChanges();
    await f.whenStable();

    commitSelection(f, 'Nyby', 'Nyby');
    expect(f.componentInstance.valgte()).toEqual([{ nummer: 'ny-Nyby', navn: 'Nyby' }]);
  });
});
