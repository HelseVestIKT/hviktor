import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Input', () => {
  let componentPage: ComponentPage;

  test.beforeEach(async ({ page }) => {
    componentPage = new ComponentPage(page);
    await componentPage.goto('input');
  });

  test('basic input renders with ds-input class', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Grunnleggende"]');
    await expect(section).toBeVisible();
    const input = section.locator('input.ds-input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('type', 'text');
  });

  test('input with label is wired via for/id', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Med label"]');
    await expect(section).toBeVisible();
    const label = section.locator('label.ds-label');
    await expect(label).toBeVisible();
    const input = section.locator('input.ds-input');
    await expect(input).toBeVisible();
    const inputId = await input.getAttribute('id');
    await expect(label).toHaveAttribute('for', inputId!);
  });

  test('error state sets aria-invalid', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Med feil"]');
    await expect(section).toBeVisible();
    const input = section.locator('input.ds-input');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  test('disabled input has disabled attribute', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Disabled"]');
    await expect(section).toBeVisible();
    const input = section.locator('input.ds-input');
    await expect(input).toBeDisabled();
  });

  test('readonly input has readonly attribute', async ({ page }) => {
    const section = page.locator('app-demo-section[title="ReadOnly"]');
    await expect(section).toBeVisible();
    const input = section.locator('input.ds-input');
    await expect(input).toHaveAttribute('readonly', '');
  });

  test('multiple input types render correctly', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Ulike typer"]');
    await expect(section).toBeVisible();
    await expect(section.locator('input[type="email"]')).toBeVisible();
    await expect(section.locator('input[type="password"]')).toBeVisible();
    await expect(section.locator('input[type="number"]')).toBeVisible();
    await expect(section.locator('input[type="date"]')).toBeVisible();
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
