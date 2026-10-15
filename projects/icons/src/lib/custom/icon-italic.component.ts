// Generert fra projects/icons/custom/svg/Italic.svg av scripts/import-custom-icons.js.
// Ikke rediger denne filen. Endre SVG-en og kjør `npm run import:custom-icons`.
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-italic',
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
export class HviIconItalic extends HviIconBase {
  protected override readonly path = 'M5 19V16.5H9L12 7.5H8V5H18V7.5H14.5L11.5 16.5H15V19H5Z';
}
