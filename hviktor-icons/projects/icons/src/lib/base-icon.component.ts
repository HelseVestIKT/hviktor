import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';

@Component({
  template: `
   <svg
      [attr.width]="sizePx()"
      [attr.height]="sizePx()"
      viewBox="0 0 24 24"
      fill="none"
      [attr.stroke]="color()"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path [attr.d]="path" />
    </svg>`,
  styles: `
    :host {
      display: inline-block;
      line-height: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class HviIconBase {
  size = input<'sm' | 'md' | 'lg'>('md');
  color = input<string>('currentColor');

  protected readonly sizePx = computed(() => {
    const sizeMap = { sm: 16, md: 24, lg: 32 };
    return sizeMap[this.size()];
  });

  protected abstract readonly path: string;
}
