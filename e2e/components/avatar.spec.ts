import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Avatar', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('avatar');
  });

  test('renders variants with correct data attributes', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Varianter"]');
    await expect(section).toBeVisible();
    await expect(section.locator('hvi-avatar[data-variant="square"]')).toBeVisible();
    await expect(section.locator('hvi-avatar[data-initials="EJ"]')).toBeVisible();
  });

  test('reflects size input as data-size attribute in browser', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Størrelser"]');
    await expect(section).toBeVisible();
    await expect(section.locator('hvi-avatar[data-size="xs"]')).toBeVisible();
    await expect(section.locator('hvi-avatar[data-size="lg"]')).toBeVisible();
  });

  test('renders avatar inside button', async ({ page }) => {
    const section = page.locator('app-demo-section[title="I knapp"]');
    await expect(section).toBeVisible();
    const avatar = section.locator('button hvi-avatar');
    await expect(avatar).toBeVisible();
    await expect(avatar).toHaveAttribute('data-initials', 'EJ');
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
