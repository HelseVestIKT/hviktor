import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';

@Component({
  selector: 'hvi-icon-home',
  template: `
    <svg
      [attr.width]="sizePx()"
      [attr.height]="sizePx()"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 3l9 9h-3v9h-12v-9h-3z"></path>
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
export class HviIconHome {
  size = input<'sm' | 'md' | 'lg'>('md');

  sizePx = computed(() => {
    return this.size() === 'sm' ? 16 :
           this.size() === 'lg' ? 32 : 24;
  });
}