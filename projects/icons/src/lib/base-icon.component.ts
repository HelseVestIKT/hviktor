import { computed, Directive, input } from '@angular/core';

export type HviIconSize = 'sm' | 'md' | 'lg';

@Directive()
export abstract class HviIconBase {
  size = input<HviIconSize>('md');

  protected abstract readonly path: string;

  protected readonly sizePx = computed(() => {
    const sizeMap: Record<HviIconSize, number> = {
      sm: 16,
      md: 24,
      lg: 32,
    };

    return sizeMap[this.size()];
  });
}
