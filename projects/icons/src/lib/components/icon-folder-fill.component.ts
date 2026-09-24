import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-folder-fill',
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
export class HviIconFolderFill extends HviIconBase {
  protected override readonly path =
    'M2.25 6C2.25 5.0335 3.0335 4.25 4 4.25H10C10.9665 4.25 11.75 5.0335 11.75 6V7.25H20.5C21.1904 7.25 21.75 7.80964 21.75 8.5V18.5C21.75 19.1904 21.1904 19.75 20.5 19.75H3.5C2.80964 19.75 2.25 19.1904 2.25 18.5V6Z';
}
