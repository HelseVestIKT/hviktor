import { NgTemplateOutlet } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  HviButton,
  HviLogo,
  HviToggleGroup,
  HviToggleGroupItem,
} from '@helsevestikt/hviktor-angular';
import { HviIconMoonFill } from '../../../../projects/icons/src/lib/components/icon-moon-fill.component';
import { HviIconSunFill } from '../../../../projects/icons/src/lib/components/icon-sun-fill.component';
import { DEMO_COMPONENTS } from '../demo-components';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-demo-layout',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HviButton,
    HviLogo,
    HviToggleGroup,
    HviToggleGroupItem,
    HviIconMoonFill,
    HviIconSunFill,
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

  private sideMenu = viewChild<ElementRef<HTMLElement>>('sideMenu');

  closeSideMenu() {
    const element = this.sideMenu()?.nativeElement;
    if (element?.matches(':popover-open')) {
      element.hidePopover();
    }
  }
}
