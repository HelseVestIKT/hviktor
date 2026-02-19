import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';

@Component({
  selector: 'hvi-icon-base',
  imports: [],
  template: `
    <svg
      [attr.width]="sizePx()"
      [attr.height]="sizePx()"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path [attr.d]="pathData()"></path>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: inline-block;
      line-height: 0;
    }
  `,
})
export class HviIconBase {
  size = input<'sm' | 'md' | 'lg'>('md');
  pathData = input.required<string>();

  sizePx = computed(() => {
    return this.size() === 'sm' ? 16 :
           this.size() === 'lg' ? 32 : 24;
  });
}
