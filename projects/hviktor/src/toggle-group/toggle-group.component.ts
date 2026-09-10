import {
  booleanAttribute,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HviToggleGroupItem } from './toggle-group-item.directive';

let nextGroupId = 0;

/**
 * @summary
 * ToggleGroup collects related options in a connected group where only one
 * option can be selected at a time.
 *
 * @example
 * ```html
 * <hvi-toggle-group [(value)]="selected" variant="primary">
 *   <label hviToggleGroupItem value="innboks">Innboks</label>
 *   <label hviToggleGroupItem value="utkast">Utkast</label>
 *   <label hviToggleGroupItem value="sendt">Sendt</label>
 * </hvi-toggle-group>
 * ```
 *
 * @example
 * With reactive forms:
 * ```html
 * <hvi-toggle-group formControlName="view" variant="secondary">
 *   <label hviToggleGroupItem value="list">Liste</label>
 *   <label hviToggleGroupItem value="grid">Rutenett</label>
 * </hvi-toggle-group>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/toggle-group}
 */
@Component({
  selector: 'hvi-toggle-group',
  standalone: true,
  template: `
    <fieldset
      class="ds-toggle-group"
      [attr.aria-label]="ariaLabel || null"
      [attr.aria-labelledby]="ariaLabelledby || null"
      [attr.data-variant]="_variant()"
      [attr.data-size]="_size()"
      [attr.disabled]="_disabled() ? '' : null"
    >
      <ng-content />
    </fieldset>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HviToggleGroup),
      multi: true,
    },
  ],
})
export class HviToggleGroup implements ControlValueAccessor {
  private readonly registeredItems: HviToggleGroupItem[] = [];

  /** Accessible label for the toggle group */
  @Input('aria-label') ariaLabel?: string;

  /** ID of an element that labels the toggle group */
  @Input('aria-labelledby') ariaLabelledby?: string;

  /** The variant of the toggle group */
  readonly _variant = signal<'primary' | 'secondary'>('primary');

  /** The size of the toggle group */
  readonly _size = signal<'sm' | 'md' | 'lg'>('md');

  /** Whether the group is disabled */
  readonly _disabled = signal(false);

  /** Form element name */
  readonly _name = signal(`togglegroup-name-${++nextGroupId}`);

  /** The currently selected value */
  private readonly _value = signal<string | undefined>(undefined);

  /** Event emitted when value changes */
  @Output() valueChange = new EventEmitter<string>();

  // ControlValueAccessor callbacks
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  @Input()
  set value(val: string | undefined) {
    this._value.set(val);
    this.updateItemStates();
  }

  @Input()
  set variant(val: 'primary' | 'secondary') {
    this._variant.set(val);
  }

  @Input()
  set size(val: 'sm' | 'md' | 'lg') {
    this._size.set(val);
  }

  @Input()
  set name(val: string) {
    if (!val) return;
    this._name.set(val);
    this.syncItemsWithGroup();
  }

  @Input({ transform: booleanAttribute })
  set disabled(val: boolean) {
    this._disabled.set(val);
    this.syncItemsWithGroup();
  }

  /** Register an item with this group */
  registerItem(item: HviToggleGroupItem): void {
    this.registeredItems.push(item);
    item.syncWithGroup();
    const shouldSelect = this._value() === item.value;
    item.setSelected(shouldSelect);

    if (shouldSelect) {
      this.updateFocusableItem(item);
      return;
    }

    const hasFocusableItem = this.registeredItems.some((registeredItem) =>
      registeredItem.isFocusable(),
    );
    if (!hasFocusableItem) {
      this.updateFocusableItem(this.registeredItems[0]);
    }
  }

  /** Unregister an item from this group */
  unregisterItem(item: HviToggleGroupItem): void {
    const index = this.registeredItems.indexOf(item);
    if (index > -1) {
      this.registeredItems.splice(index, 1);
    }
  }

  /** Select an item and update all states */
  selectItem(item: HviToggleGroupItem): void {
    if (this._disabled()) return;
    this._value.set(item.value);
    this.updateItemStates();
    this.updateFocusableItem(item);
    this.valueChange.emit(item.value);
    this.onChange(item.value);
    this.onTouched();
  }

  /** Handle keyboard navigation (roving tabindex) */
  handleKeydown(event: KeyboardEvent, currentItem: HviToggleGroupItem): void {
    const items = this.registeredItems;
    const currentIndex = items.indexOf(currentItem);

    let nextIndex: number | null = null;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (currentIndex + 1) % items.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (currentIndex - 1 + items.length) % items.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = items.length - 1;
        break;
      case ' ':
      case 'Enter':
        this.selectItem(currentItem);
        event.preventDefault();
        return;
      default:
        return;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      const nextItem = items[nextIndex];
      this.updateFocusableItem(nextItem);
      nextItem.focus();
    }
  }

  /** Update which item is the roving-tabindex target */
  private updateFocusableItem(focusedItem: HviToggleGroupItem): void {
    for (const item of this.registeredItems) {
      item.setFocusable(item === focusedItem);
    }
  }

  private updateItemStates(): void {
    const currentValue = this._value();
    for (const item of this.registeredItems) {
      item.syncWithGroup();
      item.setSelected(item.value === currentValue);
    }
  }

  private syncItemsWithGroup(): void {
    for (const item of this.registeredItems) {
      item.syncWithGroup();
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this._value.set(value);
    this.updateItemStates();
    const match = this.registeredItems.find((i) => i.value === value);
    if (match) this.updateFocusableItem(match);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
    this.syncItemsWithGroup();
  }
}
