import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Heading', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('heading');
  });

  test('renders headings with ds-heading class and data-size attribute', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Størrelser"]');
    await expect(section).toBeVisible();

    const xlHeading = section.locator('.ds-heading[data-size="xl"]').first();
    await expect(xlHeading).toBeVisible();
    await expect(xlHeading).toHaveAttribute('data-size', 'xl');
  });

  test('supports multiple heading sizes', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Størrelser"]');
    await expect(section).toBeVisible();

    await expect(section.locator('.ds-heading[data-size="2xl"]')).toBeVisible();
    await expect(section.locator('.ds-heading[data-size="sm"]')).toBeVisible();
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
