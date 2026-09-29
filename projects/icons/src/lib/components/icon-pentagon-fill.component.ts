import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-pentagon-fill',
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
export class HviIconPentagonFill extends HviIconBase {
  protected override readonly path =
    'M11.5609 1.89199C11.823 1.70267 12.177 1.70267 12.4391 1.89199L21.4391 8.39199C21.7049 8.58392 21.8152 8.92619 21.7115 9.23717L18.2115 19.7372C18.1094 20.0434 17.8228 20.25 17.5 20.25H6.49999C6.17717 20.25 5.89057 20.0434 5.78848 19.7372L2.28848 9.23717C2.18482 8.92619 2.29513 8.58392 2.56087 8.39199L11.5609 1.89199Z';
}
