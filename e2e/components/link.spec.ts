import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Link', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('link');
  });

  test('renders link with ds-link class', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Varianter"]');
    await expect(section).toBeVisible();

    const link = section.locator('a.ds-link').first();
    await expect(link).toBeVisible();
  });

  test('neutral color variant has data-color="neutral"', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Varianter"]');
    await expect(section).toBeVisible();

    const neutralLink = section.locator('a.ds-link[data-color="neutral"]');
    await expect(neutralLink).toBeVisible();
    await expect(neutralLink).toHaveAttribute('data-color', 'neutral');
  });

  test('default link does not emit data-color attribute', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Varianter"]');
    await expect(section).toBeVisible();

    const defaultLink = section.locator('a.ds-link:not([data-color])');
    await expect(defaultLink).toBeVisible();
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
