import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Details', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('details');
  });

  test('standard section renders tinted and default data-variant attributes', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Standard"]');
    await expect(section.locator('details[data-variant="tinted"]').first()).toBeVisible();
    await expect(section.locator('details[data-variant="default"]').first()).toBeVisible();
  });

  test('standard section details expand on click', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Standard"]');
    const firstDetails = section.locator('details').first();
    const summary = firstDetails.locator('summary');

    await expect(firstDetails).not.toHaveAttribute('open');
    await summary.click();
    await expect(firstDetails).toHaveAttribute('open');
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
