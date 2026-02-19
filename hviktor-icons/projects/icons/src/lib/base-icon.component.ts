import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'hvi-icon-base',
  imports: [],
  standalone: true,
  template: `
    <svg
      [attr.width]="sizePx"
      [attr.height]="sizePx"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <ng-content></ng-content>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ``,
})
export class HviIconBase {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

    get sizePx() {
    return this.size === 'sm' ? 16 :
           this.size === 'lg' ? 32 : 24;
  }

}
