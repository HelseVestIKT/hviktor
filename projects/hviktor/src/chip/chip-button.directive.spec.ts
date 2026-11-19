import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviChipButton } from './chip-button.directive';

@Component({
  standalone: true,
  imports: [HviChipButton],
  template: `<button hviChip>Chip</button>`,
})
class DefaultHost {}

@Component({
  standalone: true,
  imports: [HviChipButton],
  template: `<button hviChip removable>Removable</button>`,
})
class RemovableHost {}

@Component({
  standalone: true,
  imports: [HviChipButton],
  template: `<button hviChip type="submit">Submit</button>`,
})
class SubmitHost {}

@Component({
  standalone: true,
  imports: [HviChipButton],
  template: `<form (submit)="submitted = true; $event.preventDefault()">
    <button hviChip>Chip</button>
  </form>`,
})
class FormHost {
  submitted = false;
}

describe('HviChipButton', () => {
  beforeEach(() => setupTestBed({ imports: [DefaultHost, RemovableHost, SubmitHost, FormHost] }));

  it('should not set data-removable by default', () => {
    const fixture = TestBed.createComponent(DefaultHost);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.getAttribute('data-removable')).toBeNull();
  });

  it('should set data-removable to "true" when removable input is set', () => {
    const fixture = TestBed.createComponent(RemovableHost);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.getAttribute('data-removable')).toBe('true');
  });

  it('should default type to "button"', () => {
    const fixture = TestBed.createComponent(DefaultHost);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.getAttribute('type')).toBe('button');
  });

  it('should allow overriding type', () => {
    const fixture = TestBed.createComponent(SubmitHost);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.getAttribute('type')).toBe('submit');
  });

  it('should not submit a surrounding form when clicked', () => {
    const fixture = TestBed.createComponent(FormHost);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.click();
    expect(fixture.componentInstance.submitted).toBe(false);
  });
});
