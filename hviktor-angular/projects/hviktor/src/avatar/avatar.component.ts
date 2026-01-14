import { Component, Input } from "@angular/core";

@Component({
  selector: 'hvi-avatar',
  standalone: true,
    template: '<ng-content />',
    host: {
        class: 'ds-avatar',
        role: 'img',
        '[attr.aria-label]': 'ariaLabel ?? null',
        '[attr.data-variant]': 'variant ?? null',
        '[attr.data-initials]': 'initials ?? null',
        '[attr.data-size]': 'size ?? null',
        '[attr.data-color]': 'color ?? null',
    },
})
export class HviAvatar {
    /** The name of the person the avatar represents */
    @Input() ariaLabel?: string;

    /** The shape of the avatar */
    @Input() variant?: 'circle' | 'square';

    /** Initials to display inside the avatar */
    @Input() initials?: string;

    /** The size of the avatar */
    @Input() size?: 'xs' | 'sm' | 'md' | 'lg';

    /** The color theme of the avatar */
    @Input() color?: 'accent' | 'brand1' | 'brand2' | 'brand3' | 'neutral' | 'danger';
}