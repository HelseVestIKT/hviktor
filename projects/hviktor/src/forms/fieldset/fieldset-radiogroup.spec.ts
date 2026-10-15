import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { setupTestBed } from '../../testing/test-utils';
import { HviFieldValidation } from '../field/field-validation.directive';
import { HviField } from '../field/field.component';
import { HviInput } from '../input/input.directive';
import { HviControlInvalid } from '../validation/control-invalid/control-invalid.directive';
import { HviValidationMessage } from '../validation/validation-message/validation-message.directive';
import { HviFieldset } from './fieldset.directive';

const radioImports = [
  HviControlInvalid,
  HviField,
  HviFieldset,
  HviFieldValidation,
  HviInput,
  ReactiveFormsModule,
];

/** Lets the ds-field web component react to DOM mutations. */
const settle = () => new Promise((resolve) => setTimeout(resolve, 50));

@Component({
  standalone: true,
  imports: radioImports,
  template: `
    <fieldset hviFieldset>
      <legend>Bydel</legend>
      <hvi-field>
        <input
          hviInput
          hviControlInvalid
          type="radio"
          id="a"
          name="bydel"
          value="a"
          [formControl]="control"
        />
        <label for="a">A</label>
      </hvi-field>
      <hvi-field>
        <input
          hviInput
          hviControlInvalid
          type="radio"
          id="b"
          name="bydel"
          value="b"
          [formControl]="control"
        />
        <label for="b">B</label>
      </hvi-field>
      @if (showError()) {
        <p hviFieldValidation>Du må velge en bydel før du kan fortsette.</p>
      }
    </fieldset>
  `,
})
class RadioGroupHost {
  control = new FormControl('', Validators.required);
  showError = signal(true);
}

@Component({
  standalone: true,
  imports: [HviControlInvalid, HviField, HviFieldset, HviInput, ReactiveFormsModule],
  template: `
    <fieldset hviFieldset>
      <legend>Bydel</legend>
      <hvi-field>
        <input
          hviInput
          hviControlInvalid
          type="radio"
          id="c"
          name="c"
          value="c"
          [formControl]="control"
        />
        <label for="c">C</label>
      </hvi-field>
    </fieldset>
  `,
})
class RadioGroupControlOnlyHost {
  control = new FormControl('', Validators.required);
}

@Component({
  standalone: true,
  imports: [HviField, HviFieldset, HviFieldValidation, HviInput],
  template: `
    <fieldset hviFieldset>
      <legend>Vilkår</legend>
      <hvi-field>
        <input hviInput type="checkbox" id="x" />
        <label for="x">X</label>
      </hvi-field>
      <p hviFieldValidation>Feil i gruppen</p>
    </fieldset>
  `,
})
class CheckboxGroupHost {}

@Component({
  standalone: true,
  imports: [HviField, HviFieldset, HviFieldValidation, HviInput],
  template: `
    <fieldset hviFieldset aria-describedby="extra">
      <legend>Bydel</legend>
      <hvi-field>
        <input hviInput type="radio" id="d" name="d" value="d" />
        <label for="d">D</label>
        <p hviFieldValidation id="field-error">Feltfeil</p>
      </hvi-field>
      <p hviFieldValidation id="group-error">Gruppefeil</p>
    </fieldset>
  `,
})
class MixedValidationHost {}

@Component({
  standalone: true,
  imports: [
    HviField,
    HviFieldset,
    HviFieldValidation,
    HviInput,
    HviValidationMessage,
    ReactiveFormsModule,
  ],
  template: `
    <form [formGroup]="form">
      <fieldset hviFieldset>
        <legend>Bydel</legend>
        <hvi-field>
          <input hviInput type="radio" id="e" name="bydel" value="e" formControlName="bydel" />
          <label for="e">E</label>
        </hvi-field>
        <p
          hviFieldValidation
          hviValidationMessage="bydel"
          [messages]="{ required: 'Velg bydel' }"
        ></p>
      </fieldset>
    </form>
  `,
})
class ValidationMessageHost {
  form = new FormGroup({ bydel: new FormControl('', Validators.required) });
}

describe('HviFieldset – radiogruppe med feil', () => {
  beforeEach(async () => {
    await setupTestBed({
      imports: [
        RadioGroupHost,
        RadioGroupControlOnlyHost,
        CheckboxGroupHost,
        MixedValidationHost,
        ValidationMessageHost,
      ],
    });
  });

  it('gives a fieldset with radio buttons role="radiogroup"', () => {
    const fixture = TestBed.createComponent(RadioGroupHost);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('fieldset').getAttribute('role')).toBe('radiogroup');
  });

  it('puts aria-invalid and aria-describedby on the group, not on each radio', async () => {
    const fixture = TestBed.createComponent(RadioGroupHost);
    fixture.detectChanges();
    await settle();
    fixture.detectChanges();

    const fieldset: HTMLFieldSetElement = fixture.nativeElement.querySelector('fieldset');
    const message: HTMLElement = fixture.nativeElement.querySelector('[hviFieldValidation]');
    const radios: HTMLInputElement[] = Array.from(fixture.nativeElement.querySelectorAll('input'));

    expect(message.id).toBeTruthy();
    expect(message.hasAttribute('data-field')).toBe(false);
    expect(fieldset.getAttribute('aria-invalid')).toBe('true');
    expect(fieldset.getAttribute('aria-describedby')).toBe(message.id);

    for (const radio of radios) {
      expect(radio.getAttribute('aria-invalid')).toBeNull();
      expect(radio.getAttribute('aria-describedby') ?? '').not.toContain(message.id);
    }
  });

  it('removes the invalid state from the group when the message is removed', () => {
    const fixture = TestBed.createComponent(RadioGroupHost);
    fixture.detectChanges();
    fixture.componentInstance.showError.set(false);
    fixture.detectChanges();

    const fieldset: HTMLFieldSetElement = fixture.nativeElement.querySelector('fieldset');
    expect(fieldset.getAttribute('aria-invalid')).toBeNull();
    expect(fieldset.getAttribute('aria-describedby')).toBeNull();
  });

  it('lets hviControlInvalid on radios mark the group instead of each radio', () => {
    const fixture = TestBed.createComponent(RadioGroupControlOnlyHost);
    fixture.detectChanges();
    fixture.componentInstance.control.markAsTouched();
    fixture.detectChanges();

    const fieldset: HTMLFieldSetElement = fixture.nativeElement.querySelector('fieldset');
    const radio: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(fieldset.getAttribute('aria-invalid')).toBe('true');
    expect(radio.getAttribute('aria-invalid')).toBeNull();
  });

  it('keeps field-level validation on the field and merges static aria-describedby', () => {
    const fixture = TestBed.createComponent(MixedValidationHost);
    fixture.detectChanges();

    const fieldset: HTMLFieldSetElement = fixture.nativeElement.querySelector('fieldset');
    expect(fixture.nativeElement.querySelector('#field-error').getAttribute('data-field')).toBe(
      'validation',
    );
    expect(fixture.nativeElement.querySelector('#group-error').hasAttribute('data-field')).toBe(
      false,
    );
    expect(fieldset.getAttribute('aria-describedby')).toBe('extra group-error');
  });

  it('ignores a hidden hviValidationMessage until it has a message', () => {
    const fixture = TestBed.createComponent(ValidationMessageHost);
    fixture.detectChanges();

    const fieldset: HTMLFieldSetElement = fixture.nativeElement.querySelector('fieldset');
    expect(fieldset.getAttribute('aria-invalid')).toBeNull();

    fixture.componentInstance.form.markAllAsTouched();
    fixture.detectChanges();
    expect(fieldset.getAttribute('aria-invalid')).toBe('true');
    expect(fieldset.getAttribute('aria-describedby')).toBe(
      fixture.nativeElement.querySelector('[hviFieldValidation]').id,
    );
  });

  it('leaves checkbox groups to the default Designsystemet behaviour', async () => {
    const fixture = TestBed.createComponent(CheckboxGroupHost);
    fixture.detectChanges();
    await settle();

    const fieldset: HTMLFieldSetElement = fixture.nativeElement.querySelector('fieldset');
    expect(fieldset.getAttribute('role')).toBeNull();
    expect(fieldset.getAttribute('aria-invalid')).toBeNull();
    expect(
      fixture.nativeElement.querySelector('[hviFieldValidation]').getAttribute('data-field'),
    ).toBe('validation');
    // Proves the ds-field web component runs in the test environment: it marks the checkbox.
    expect(fixture.nativeElement.querySelector('input').getAttribute('aria-invalid')).toBe('true');
  });
});
