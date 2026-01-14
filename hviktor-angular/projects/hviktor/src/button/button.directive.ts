import { booleanAttribute, Directive, Input } from "@angular/core";

@Directive({
    selector: 'button[hviButton], a[hviButton]',
    standalone: true,
      host: {
    class: 'ds-button',
    '[attr.type]': 'type',
    '[attr.data-size]': 'size',
    '[attr.data-variant]': 'variant',
    '[attr.data-color]': 'color',
    '[attr.data-fullwidth]': 'fullWidth ? "" : null',
    '[attr.data-icon]': 'icon ? "" : null',
    '[attr.aria-busy]': 'loading ? "true" : null',
  },
})
export class HviButton {
    @Input() size: 'sm' | 'md' | 'lg' = 'md';
    @Input() variant: 'primary' | 'secondary' | 'tertiary' = 'primary';
    @Input() type: 'button' | 'submit' | 'reset' = 'button';
    @Input() color: 'accent' | 'brand1' | 'brand2' | 'brand3' | 'neutral' | 'danger' = 'accent';

    @Input({ transform: booleanAttribute }) icon = false;
    @Input({ transform: booleanAttribute }) loading = false; 
    @Input({ transform: booleanAttribute }) fullWidth = false;
}