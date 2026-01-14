import { Component, HostBinding, Input } from "@angular/core";

@Component({
  selector: 'hvi-alert',
  standalone: true,
  template: `<ng-content />`,
  host: {
    class: 'ds-alert',
  },
})
export class HviAlert {
    @Input() color: 'info' | 'success' | 'warning' | 'danger' = 'info';

    @HostBinding('attr.data-color') get dataColor() {
        return this.color;
    }
}