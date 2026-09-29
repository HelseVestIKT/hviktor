import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-caret-up-fill',
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
export class HviIconCaretUpFill extends HviIconBase {
  protected override readonly path =
    'M11.4697 7.96967C11.7626 7.67678 12.2374 7.67678 12.5303 7.96967L18.0303 13.4697C18.2448 13.6842 18.309 14.0068 18.1929 14.287C18.0768 14.5673 17.8033 14.75 17.5 14.75H6.5C6.19665 14.75 5.92318 14.5673 5.80709 14.287C5.691 14.0068 5.75517 13.6842 5.96967 13.4697L11.4697 7.96967Z';
}
