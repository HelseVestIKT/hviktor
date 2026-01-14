import { Component, HostBinding, Input } from "@angular/core";

@Component({
  selector: 'hvi-alert',
  standalone: true,
  template: `<ng-content />`,
  host: {
    class: 'ds-alert',
    '[attr.data-color]': 'color'

  },
})
export class HviAlert {
  /** The color theme of the alert */
    @Input() color: 'info' | 'success' | 'warning' | 'danger' = 'info';
}