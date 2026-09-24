import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-phone-fill',
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
export class HviIconPhoneFill extends HviIconBase {
  protected override readonly path =
    'M6.11615 2.82315C6.60431 2.33499 7.39577 2.33499 7.88392 2.82315L11.6768 6.61604C12.165 7.1042 12.165 7.89565 11.6768 8.38381L10.0607 9.99992L14 13.9393L15.6162 12.3231C16.1043 11.835 16.8958 11.835 17.3839 12.3231L21.1768 16.116C21.665 16.6042 21.665 17.3957 21.1768 17.8838L18.3959 20.6648C17.6587 21.402 16.553 21.6289 15.585 21.2417C9.73439 18.9014 5.09852 14.2656 2.75826 8.41492C2.37106 7.44692 2.598 6.34131 3.3352 5.6041L6.11615 2.82315Z';
}
