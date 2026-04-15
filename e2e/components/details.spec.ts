import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Details', () => {
  let componentPage: ComponentPage;

  test.beforeEach(async ({ page }) => {
    componentPage = new ComponentPage(page);
    await componentPage.goto('details');
  });

  test('page loads and renders heading', async () => {
    await expect(componentPage.heading).toHaveText('Details');
  });

  test('varianter section renders default and tinted details', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Varianter"]');
    await expect(section).toBeVisible();

    const details = section.locator('hvi-details');
    await expect(details.first()).toBeVisible();
    const count = await details.count();
    expect(count).toBe(2);

    await expect(details.nth(0)).toHaveAttribute('ng-reflect-variant', 'tinted');
    await expect(details.nth(1)).not.toHaveAttribute('ng-reflect-variant', 'tinted');
  });

  test('varianter section inner u-details has ds-details class', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Varianter"]');
    const inner = section.locator('u-details').first();
    await expect(inner).toBeVisible();
    await expect(inner).toHaveClass(/ds-details/);
  });

  test('varianter section tinted details has data-variant="tinted"', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Varianter"]');
    const tintedInner = section.locator('u-details[data-variant="tinted"]');
    await expect(tintedInner).toBeVisible();
  });

  test('varianter section default details has data-variant="default"', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Varianter"]');
    const defaultInner = section.locator('u-details[data-variant="default"]');
    await expect(defaultInner).toBeVisible();
  });

  test('varianter section details expand on click', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Varianter"]');
    const firstDetails = section.locator('u-details').first();
    const summary = firstDetails.locator('u-summary');

    await expect(firstDetails).not.toHaveAttribute('open');
    await summary.click();
    await expect(firstDetails).toHaveAttribute('open');
  });

  test('i kort section renders details inside a card', async ({ page }) => {
    const section = page.locator('app-demo-section[title="I kort"]');
    await expect(section).toBeVisible();

    const card = section.locator('hvi-card');
    await expect(card).toBeVisible();

    const details = section.locator('hvi-details');
    await expect(details.first()).toBeVisible();
    const count = await details.count();
    expect(count).toBe(2);
  });

  test('i kort section has one pre-opened details panel', async ({ page }) => {
    const section = page.locator('app-demo-section[title="I kort"]');
    const openInner = section.locator('u-details[open]');
    await expect(openInner).toBeVisible();
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
