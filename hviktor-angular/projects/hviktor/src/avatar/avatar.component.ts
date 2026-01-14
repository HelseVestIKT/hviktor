import { Component, HostBinding, Input } from "@angular/core";

@Component({
  selector: 'hvi-avatar',
  standalone: true,
  template: `<ng-content />`,
  host: {
    class: 'ds-avatar',
  },
})
export class HviAvatar {
    /** The name of the person the avatar represents */
    @Input() ariaLabel: string = 'User avatar';

    @HostBinding('attr.aria-label') get attrAriaLabel() {
        return this.ariaLabel;
    }
}