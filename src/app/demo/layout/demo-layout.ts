import { NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  HviButton,
  HviLogo,
  HviToggleGroup,
  HviToggleGroupItem,
} from '@helsevestikt/hviktor-angular';
import { HviIconMoonFill, HviIconSunFill } from '@helsevestikt/hviktor-icons';
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
