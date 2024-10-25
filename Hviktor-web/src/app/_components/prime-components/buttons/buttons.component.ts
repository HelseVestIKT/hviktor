import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [TabViewModule, DividerModule, ButtonModule, CardModule],
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {

}
