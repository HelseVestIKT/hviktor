import { Component } from '@angular/core';
import { HviIconBase } from '../base-icon.component';


@Component({
  selector: 'hvi-icon-home',
  standalone: true,
  imports: [HviIconBase],
  template: `
    <hvi-icon-base>
      <path d="M12 3l9 9h-3v9h-12v-9h-3z"></path>
    </hvi-icon-base>
  `
})

export class HviIconHome {}