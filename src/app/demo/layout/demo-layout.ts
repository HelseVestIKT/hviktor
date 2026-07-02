import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HviLogo, HviToggleGroup, HviToggleGroupItem } from '@helsevestikt/hviktor-angular';
import '@helsevestikt/hviktor-icons/icon-moon-fill.webcomponent';
import '@helsevestikt/hviktor-icons/icon-sun-fill.webcomponent';
import { DEMO_COMPONENTS } from '../demo-components';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-demo-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HviLogo,
    HviToggleGroup,
    HviToggleGroupItem,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: 'demo-layout.html',
  host: {
    '[attr.data-color-scheme]': 'themeService.colorScheme()',
  },
})
export class DemoLayoutComponent {
  themeService = inject(ThemeService);
  components = DEMO_COMPONENTS;
}
