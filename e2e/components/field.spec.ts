import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Field', () => {
  let componentPage: ComponentPage;

  test.beforeEach(async ({ page }) => {
    componentPage = new ComponentPage(page);
    await componentPage.goto('field');
  });

  test('renders basic field with label, description, input and validation', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Grunnleggende"]');
    await expect(section).toBeVisible();
    await expect(section.locator('label.ds-label')).toBeVisible();
    await expect(section.locator('[data-field="description"]')).toBeVisible();
    await expect(section.locator('input.ds-input')).toBeVisible();
    await expect(section.locator('.ds-validation-message[data-field="validation"]')).toBeVisible();
  });

  test('prefix and suffix affixes render with correct classes', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Prefix/Suffix"]');
    await expect(section).toBeVisible();
    const affixes = section.locator('.ds-field-affixes');
    await expect(affixes).toBeVisible();
    await expect(section.locator('.ds-field-affix').first()).toBeVisible();
    await expect(section.locator('.ds-field-affix').first()).toHaveAttribute('aria-hidden', 'true');
  });

  test('counter renders with data-limit attribute', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Antall tegn"]');
    await expect(section).toBeVisible();
    const counter = section.locator('p[data-field="counter"]');
    await expect(counter).toBeVisible();
    await expect(counter).toHaveAttribute('data-limit', '10');
  });

  test('outline variant applies data-variant attribute', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Outline"]');
    await expect(section).toBeVisible();
    const outlineField = section.locator('ds-field[data-variant="outline"]').first();
    await expect(outlineField).toBeVisible();
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
