import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Nora } from 'primeng/themes/nora';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private primengConfig: PrimeNGConfig) {
    this.primengConfig.theme.set({
      preset: Nora,
      options: {
        cssLayer: {
          name: 'primeng',
          order: 'tailwind-base, primeng, tailwind-utilities'
        }
      }
    })
  }
  title = 'Hviktor-web';
}
