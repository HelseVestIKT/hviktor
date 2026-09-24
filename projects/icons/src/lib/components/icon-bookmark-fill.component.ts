import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-bookmark-fill',
  standalone: true,
  template: `<svg
    [attr.width]="sizePx()"
    [attr.height]="sizePx()"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" [attr.d]="path" />
  </svg>`,
  styles: [':host { display: inline-block; line-height: 0; }', 'svg { display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconBookmarkFill extends HviIconBase {
  protected override readonly path =
    'M6.25 5C6.25 4.0335 7.0335 3.25 8 3.25H16C16.9665 3.25 17.75 4.0335 17.75 5V20C17.75 20.3033 17.5673 20.5768 17.287 20.6929C17.0068 20.809 16.6842 20.7448 16.4697 20.5303L12 16.0607L7.53033 20.5303C7.31583 20.7448 6.99324 20.809 6.71299 20.6929C6.43273 20.5768 6.25 20.3033 6.25 20V5Z';
}
