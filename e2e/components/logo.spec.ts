import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Logo', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('logo');
  });

  test('renders logo with data-size attribute', async ({ page }) => {
    const logo = page.locator('hvi-logo').first();
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('data-size', /sm|md|lg/);
  });

  test('renders SVG with role="img" and aria-label', async ({ page }) => {
    const svg = page.locator('hvi-logo svg[role="img"]').first();
    await expect(svg).toBeVisible();
    await expect(svg).toHaveAttribute('aria-label');
  });

  test('renders accent paths with fixed blue fill', async ({ page }) => {
    const accentPath = page.locator('hvi-logo svg path[fill="#6CACE4"]').first();
    await expect(accentPath).toBeAttached();
  });

  test('renders themed paths with currentColor fill', async ({ page }) => {
    const themedPath = page.locator('hvi-logo svg path[fill="currentColor"]').first();
    await expect(themedPath).toBeAttached();
  });

  test('size toggle updates data-size on logos', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Varianter"]');
    const toggleLg = page.locator('button[hvitogglegroupitem][value="lg"]');
    await toggleLg.click();
    const logo = section.locator('hvi-logo').first();
    await expect(logo).toHaveAttribute('data-size', 'lg');
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
