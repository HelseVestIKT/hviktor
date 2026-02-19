import { Component } from '@angular/core';
import { HviIconBase } from '../base-icon.component';


@Component({
  selector: 'hvi-icon-user',
  standalone: true,
  imports: [HviIconBase],
  template: `
    <hvi-icon-base pathData="M12 3l9 9h-3v9h-12v-9h-3z"></hvi-icon-base>
  `
})

export class HviIconUser {}