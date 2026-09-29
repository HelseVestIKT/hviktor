import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-chevron-up',
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
export class HviIconChevronUp extends HviIconBase {
  protected override readonly path =
    'M11.4697 7.96967C11.7626 7.67678 12.2374 7.67678 12.5303 7.96967L18.0303 13.4697C18.3232 13.7626 18.3232 14.2374 18.0303 14.5303C17.7374 14.8232 17.2626 14.8232 16.9697 14.5303L12 9.56066L7.03033 14.5303C6.73744 14.8232 6.26256 14.8232 5.96967 14.5303C5.67678 14.2374 5.67678 13.7626 5.96967 13.4697L11.4697 7.96967Z';
}
