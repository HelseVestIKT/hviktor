import { type Locator, type Page } from '@playwright/test';

/**
 * Page Object for component demo pages.
 * Navigates to /komponenter/{id} and provides helpers for common assertions.
 */
export class ComponentPage {
  constructor(private page: Page) {}

  /** Navigate to a component's demo page. */
  async goto(componentId: string) {
    await this.page.goto(`/komponenter/${componentId}`);
  }

  /** Get the page heading (component name). */
  get heading(): Locator {
    return this.page.locator('article header h1');
  }

  /** Get a demo section by its title. */
  getSection(title: string): Locator {
    return this.page.locator('app-demo-section').filter({ hasText: title });
  }

  /** Get the main article content area. */
  get article(): Locator {
    return this.page.locator('article');
  }
}
