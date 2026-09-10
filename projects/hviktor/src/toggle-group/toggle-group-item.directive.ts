import {
  booleanAttribute,
  computed,
  Directive,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  signal,
} from '@angular/core';
import { HviToggleGroup } from './toggle-group.component';

let nextId = 0;

/**
 * @summary
 * ToggleGroupItem is an item directive for use inside HviToggleGroup.
 *
 * @example
 * ```html
 * <hvi-toggle-group [(value)]="selected">
 *   <label hviToggleGroupItem value="option1">Option 1</label>
 *   <label hviToggleGroupItem value="option2">Option 2</label>
 * </hvi-toggle-group>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/toggle-group}
 */
@Directive({
  selector: 'button[hviToggleGroupItem],label[hviToggleGroupItem]',
  standalone: true,
  host: {
    class: 'ds-button',
    '[attr.type]': 'isButton() ? "button" : null',
    role: 'radio',
    '[id]': 'id',
    '[attr.value]': 'value',
    '[attr.name]': 'isButton() ? group._name() : null',
    '[attr.aria-checked]': 'isSelected()',
    '[attr.aria-current]': 'isSelected()',
    '[attr.disabled]': 'isButton() && group._disabled() ? "" : null',
    '[attr.aria-disabled]': '!isButton() && group._disabled() ? "true" : null',
    '[attr.data-variant]': 'computedVariant()',
    '[attr.data-icon]': 'icon ? "" : null',
    '[attr.data-roving-tabindex-item]': 'isButton() ? "true" : null',
    '[tabindex]':
      'isButton() ? (isFocusable() ? 0 : -1) : (group._disabled() ? -1 : isFocusable() ? 0 : -1)',
    '(click)': 'onClick($event)',
    '(keydown)': 'onKeydown($event)',
    '(focus)': 'onFocus()',
  },
})
export class HviToggleGroupItem implements OnInit, OnDestroy {
  readonly group = inject(HviToggleGroup);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  /** Unique ID for this item */
  readonly id = `togglegroup-item-${++nextId}`;

  /** The value of this toggle item */
  private _value = '';

  @Input({ required: true })
  set value(val: string) {
    this._value = val;
    this.syncNativeInputState();
  }

  get value(): string {
    return this._value;
  }

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

  readonly isButton = signal(this.elementRef.nativeElement.tagName === 'BUTTON');

  private inputElement?: HTMLInputElement;
  private removeInputChangeListener?: () => void;

  ngOnInit(): void {
    if (!this.isButton()) {
      this.ensureNativeInput();
    }
    this.group.registerItem(this);
  }

  ngOnDestroy(): void {
    this.removeInputChangeListener?.();
    this.group.unregisterItem(this);
  }

  /** Update the selected state (called by parent group) */
  setSelected(selected: boolean): void {
    this._isSelected.set(selected);
    this.syncNativeInputState();
  }

  /** Update the focusable state for roving tabindex (called by parent group) */
  setFocusable(focusable: boolean): void {
    this._isFocusable.set(focusable);
    this.syncNativeInputState();
  }

  /** Focus this item element */
  focus(): void {
    if (this.isButton()) {
      this.elementRef.nativeElement.focus();
      return;
    }
    this.elementRef.nativeElement.focus();
  }

  /** Sync internal input attributes with current group state */
  syncWithGroup(): void {
    this.syncNativeInputState();
  }

  protected onClick(event: Event): void {
    if (this.group._disabled()) return;

    if (!this.isButton()) {
      (event as MouseEvent).preventDefault();
    }

    this.group.selectItem(this);
  }

  protected onKeydown(event: Event): void {
    if (this.group._disabled()) return;
    this.group.handleKeydown(event as KeyboardEvent, this);
  }

  protected onFocus(): void {
    if (this.isButton()) return;
    this.inputElement?.focus();
  }

  private ensureNativeInput(): void {
    const host = this.elementRef.nativeElement;
    const existingInput = Array.from(host.children).find(
      (child) => child instanceof HTMLInputElement && child.type === 'radio',
    ) as HTMLInputElement | undefined;

    this.inputElement = existingInput ?? this.renderer.createElement('input');

    if (!existingInput) {
      this.renderer.setAttribute(this.inputElement, 'type', 'radio');
      this.renderer.insertBefore(host, this.inputElement, host.firstChild);
    }

    this.removeInputChangeListener = this.renderer.listen(this.inputElement, 'change', () => {
      if (this.inputElement?.checked) {
        this.group.selectItem(this);
      }
    });

    this.syncNativeInputState();
  }

  private syncNativeInputState(): void {
    if (!this.inputElement) return;
    this.inputElement.name = this.group._name();
    this.inputElement.value = this.value;
    this.inputElement.checked = this.isSelected();
    this.inputElement.tabIndex = -1;
    this.inputElement.disabled = this.group._disabled();
  }
}
