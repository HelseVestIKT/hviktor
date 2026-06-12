import {
  booleanAttribute,
  computed,
  Directive,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { HviToggleGroup } from './toggle-group.directive';

let nextId = 0;

/**
 * @summary
 * ToggleGroupItem is a button directive for use inside HviToggleGroup.
 *
 * @example
 * ```html
 * <hvi-toggle-group [(value)]="selected">
 *   <button hviToggleGroupItem value="option1">Option 1</button>
 *   <button hviToggleGroupItem value="option2">Option 2</button>
 * </hvi-toggle-group>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/toggle-group}
 */
@Directive({
  selector: 'label[hviToggleGroupItem]',
  standalone: true,
  host: {
    class: 'ds-button',
    '[id]': 'id',
    '[attr.data-variant]': 'computedVariant()',
    '[attr.data-icon]': 'icon ? "" : null',
    '(click)': 'onClick()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class HviToggleGroupItem implements OnInit, OnDestroy {
  readonly group = inject(HviToggleGroup);
  private readonly elementRef = inject(ElementRef<HTMLLabelElement>);

  /** The hidden radio input rendered inside the label */
  private radioInput!: HTMLInputElement;

  /** Unique ID for this item */
  readonly id = `togglegroup-item-${++nextId}`;

  /** The value of this toggle item */
  @Input({ required: true }) value!: string;

  /** Toggle icon-only styling */
  @Input({ transform: booleanAttribute }) icon = false;

  /** Internal signal for tracking selection state */
  private readonly _isSelected = signal(false);

  /** Whether this item is currently selected */
  readonly isSelected = this._isSelected.asReadonly();

  /** Internal signal for tracking which item is the roving-tabindex target */
  private readonly _isFocusable = signal(false);

  /** Whether this item should receive focus when tabbing into the group */
  readonly isFocusable = this._isFocusable.asReadonly();

  /** Computed variant based on selection state */
  readonly computedVariant = computed(() => {
    return this._isSelected() ? this.group._variant() : 'tertiary';
  });

  ngOnInit(): void {
    this.createRadioInput();
    this.group.registerItem(this);
  }

  ngOnDestroy(): void {
    this.group.unregisterItem(this);
  }

  /** Update the selected state (called by parent group) */
  setSelected(selected: boolean): void {
    this._isSelected.set(selected);
    if (this.radioInput) {
      this.radioInput.checked = selected;
    }
  }

  /** Update the focusable state for roving tabindex (called by parent group) */
  setFocusable(focusable: boolean): void {
    this._isFocusable.set(focusable);
    if (this.radioInput) {
      this.radioInput.tabIndex = focusable ? 0 : -1;
    }
  }

  /** Focus this item's radio input to trigger label:has(input:focus-visible) CSS */
  focus(): void {
    this.radioInput.focus();
  }

  protected onClick(): void {
    this.group.selectItem(this);
  }

  protected onKeydown(event: KeyboardEvent): void {
    this.group.handleKeydown(event, this);
  }

  /** Create and prepend the hidden radio input inside the label */
  private createRadioInput(): void {
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = this.group._name();
    input.value = this.value;
    input.checked = this._isSelected();
    input.tabIndex = this._isFocusable() ? 0 : -1;
    input.addEventListener('keydown', (e) => this.onKeydown(e));
    this.radioInput = input;
    this.elementRef.nativeElement.prepend(input);
  }
}
