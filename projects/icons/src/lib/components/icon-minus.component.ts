import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-minus',
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
export class HviIconMinus extends HviIconBase {
  protected override readonly path =
    'M4.75 12.0001C4.75 11.5858 5.08579 11.2501 5.5 11.2501L18.5 11.2501C18.9142 11.2501 19.25 11.5858 19.25 12.0001C19.25 12.4143 18.9142 12.7501 18.5 12.7501L5.5 12.7501C5.08579 12.7501 4.75 12.4143 4.75 12.0001Z';
}
