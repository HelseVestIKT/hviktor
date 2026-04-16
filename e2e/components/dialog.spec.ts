import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Dialog', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('dialog');
  });

  test('standard dialog opens on button click', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Standard"]');
    const openButton = section.locator('button.ds-button').first();
    const dialog = page.locator('dialog#demoDialog');

    await expect(dialog).not.toHaveAttribute('open');
    await openButton.click();
    await expect(dialog).toHaveAttribute('open');
  });

  test('standard dialog closes on Lukk button click', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Standard"]');
    await section.locator('button.ds-button').first().click();

    const dialog = page.locator('dialog#demoDialog');
    await dialog.locator('button.ds-button', { hasText: 'Lukk' }).click();
    await expect(dialog).not.toHaveAttribute('open');
  });

  test('placement dialog opens with correct data-placement attribute', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Skuff (placement)"]');
    await section.locator('button.ds-button', { hasText: 'right' }).click();

    const dialog = page.locator('dialog#drawerDialog');
    await expect(dialog).toHaveAttribute('open');
    await expect(dialog).toHaveAttribute('data-placement', 'right');
  });

  test('placement dialog closes on Lukk button click', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Skuff (placement)"]');
    await section.locator('button.ds-button', { hasText: 'right' }).click();

    const dialog = page.locator('dialog#drawerDialog');
    await dialog.locator('button.ds-button', { hasText: 'Lukk' }).click();
    await expect(dialog).not.toHaveAttribute('open');
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
