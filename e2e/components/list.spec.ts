import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('List', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('list');
  });

  test('renders ordered list with ds-list class in nummerert liste section', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Nummerert liste"]');
    await expect(section).toBeVisible();

    const list = section.locator('ol.ds-list');
    await expect(list).toBeVisible();
    await expect(list.locator('li').first()).toBeVisible();
  });

  test('renders unordered list with ds-list class in punktliste section', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Punktliste"]');
    await expect(section).toBeVisible();

    const list = section.locator('ul.ds-list');
    await expect(list).toBeVisible();
    await expect(list.locator('li').first()).toBeVisible();
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
