import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-caret-left-fill',
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
export class HviIconCaretLeftFill extends HviIconBase {
  protected override readonly path =
    'M15.037 6.5571C15.3173 6.67318 15.5 6.94666 15.5 7.25001L15.5 18.25C15.5 18.5534 15.3173 18.8268 15.037 18.9429C14.7567 19.059 14.4342 18.9948 14.2197 18.7803L8.71965 13.2803C8.42676 12.9874 8.42676 12.5126 8.71965 12.2197L14.2197 6.71968C14.4342 6.50518 14.7567 6.44101 15.037 6.5571Z';
}
