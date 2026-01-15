import { Directive } from '@angular/core';

@Directive({
  selector: '[hviFieldCounter]',
  standalone: true,
  host: {
    'data-field': 'counter',
  },
})
export class HviFieldCounter {}
