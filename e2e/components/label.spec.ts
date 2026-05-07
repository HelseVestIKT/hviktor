import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Label', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('label');
  });

  test('renders default label with ds-label class and no data-weight', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Varianter"]');
    await expect(section).toBeVisible();

    const defaultLabel = section.locator('label.ds-label').first();
    await expect(defaultLabel).toBeVisible();
    await expect(defaultLabel).not.toHaveAttribute('data-weight');
  });

  test('reflects weight input as data-weight attribute', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Varianter"]');
    await expect(section).toBeVisible();

    await expect(section.locator('label.ds-label[data-weight="semibold"]')).toBeVisible();
    await expect(section.locator('label.ds-label[data-weight="medium"]')).toBeVisible();
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
