import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Fieldset', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('fieldset');
  });

  test('renders fieldset with ds-fieldset class and legend in radio group section', async ({
    page,
  }) => {
    const section = page.locator('app-demo-section[title="Radio-gruppe"]');
    await expect(section).toBeVisible();

    const fieldset = section.locator('fieldset.ds-fieldset');
    await expect(fieldset).toBeVisible();

    const legend = fieldset.locator('legend');
    await expect(legend).toBeVisible();
    await expect(legend).toHaveText('Hvilken fjordarm bor du ved?');
  });

  test('renders checkbox fieldset with single checkbox', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Checkbox"]');
    await expect(section).toBeVisible();

    const fieldset = section.locator('fieldset.ds-fieldset');
    await expect(fieldset).toBeVisible();

    const checkbox = fieldset.locator('input[type="checkbox"]');
    await expect(checkbox.first()).toBeVisible();
  });

  test('supports legend with heading element', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Legend som heading"]');
    await expect(section).toBeVisible();

    const fieldset = section.locator('fieldset.ds-fieldset');
    const heading = fieldset.locator('legend h2');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Hvor skal du reise?');
  });

  test('renders checkbox group with description paragraph', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Checkbox-gruppe"]');
    await expect(section).toBeVisible();

    const fieldset = section.locator('fieldset.ds-fieldset');
    await expect(fieldset).toBeVisible();

    const description = fieldset.locator('p');
    await expect(description.first()).toBeVisible();
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
