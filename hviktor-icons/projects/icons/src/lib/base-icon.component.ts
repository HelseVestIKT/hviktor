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
      xmlns="http://www.w3.org/2000/svg"
    >
      <path [attr.d]="pathData"></path>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ``,
})
export class HviIconBase {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() pathData: string = '';

    get sizePx() {
    return this.size === 'sm' ? 16 :
           this.size === 'lg' ? 32 : 24;
  }

}
