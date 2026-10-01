import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class App {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    let previousPath = this.getPath(this.router.url);

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        const nextPath = this.getPath(event.urlAfterRedirects);

        if (nextPath !== previousPath) {
          previousPath = nextPath;
          window.scrollTo(0, 0);
        }
      });
  }

  private getPath(url: string): string {
    return url.split(/[?#]/, 1)[0];
  }
}
