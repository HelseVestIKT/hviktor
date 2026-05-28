import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Label', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('label');
  });

  test('renders regular weight label with ds-label class and data-weight="regular"', async ({
    page,
  }) => {
    const section = page.locator('app-demo-section[title="Varianter"]');
    await expect(section).toBeVisible();

    const regularLabel = section.locator('label.ds-label[data-weight="regular"]').first();
    await expect(regularLabel).toBeVisible();
    await expect(regularLabel).toHaveAttribute('data-weight', 'regular');
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
