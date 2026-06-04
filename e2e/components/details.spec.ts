import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Details', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('details');
  });

  test('details renders tinted and default data-variant attributes', async ({ page }) => {
    await expect(
      page.locator('app-demo-section[title="I kort"] details[data-variant="tinted"]').first(),
    ).toBeVisible();
    await expect(
      page.locator('app-demo-section[title="Standard"] details[data-variant="default"]').first(),
    ).toBeVisible();
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
