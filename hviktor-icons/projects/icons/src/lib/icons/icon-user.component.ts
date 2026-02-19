import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';

@Component({
  selector: 'hvi-icon-user',
  template: `
    <svg
      [attr.width]="sizePx()"
      [attr.height]="sizePx()"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: inline-block;
      line-height: 0;
    }
  `
})
export class HviIconUser {
  size = input<'sm' | 'md' | 'lg'>('md');

  sizePx = computed(() => {
    return this.size() === 'sm' ? 16 :
           this.size() === 'lg' ? 32 : 24;
  });
}