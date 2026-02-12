import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HviButton } from '@helsevestikt/hviktor';
import { DEMO_COMPONENTS } from '../demo-components';

type ColorScheme = 'light' | 'dark';

@Component({
  selector: 'app-demo-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, HviButton],
  templateUrl: 'demo-layout.html',
  host: {
    '[attr.data-color-scheme]': 'colorScheme()',
  },
})
export class DemoLayoutComponent {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

  components = DEMO_COMPONENTS;
  colorScheme = signal<ColorScheme>(this.getInitialScheme());

  constructor() {
    effect(() => {
      const scheme = this.colorScheme();
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('color-scheme', scheme);
        // Sett data-color-scheme på body/html for å påvirke hele dokumentet
        this.document.documentElement.setAttribute('data-color-scheme', scheme);
        this.document.body.setAttribute('data-color-scheme', scheme);
      }
    });
  }

  private getInitialScheme(): ColorScheme {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('color-scheme') as ColorScheme;
      if (stored && ['light', 'dark'].includes(stored)) {
        return stored;
      }
    }
    return 'light';
  }

  toggleColorScheme(): void {
    const schemes: ColorScheme[] = ['light', 'dark'];
    const currentIndex = schemes.indexOf(this.colorScheme());
    const nextIndex = (currentIndex + 1) % schemes.length;
    this.colorScheme.set(schemes[nextIndex]);
  }
  getSchemeIcon(): string {
    switch (this.colorScheme()) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      default:
        return '☀️';
    }
  }
}
