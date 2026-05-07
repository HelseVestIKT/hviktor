import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Alert', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('alert');
  });

  test('reflects color input as data-color attribute in browser', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Varianter"]');
    await expect(section).toBeVisible();
    await expect(section.locator('hvi-alert[data-color="success"]')).toBeVisible();
    await expect(section.locator('hvi-alert[data-color="warning"]')).toBeVisible();
    await expect(section.locator('hvi-alert[data-color="danger"]')).toBeVisible();
  });

  test('applies default aria-labels per color variant', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Varianter"]');
    await expect(section.locator('hvi-alert').first()).toHaveAttribute('aria-label', 'Informasjon');
    await expect(section.locator('hvi-alert[data-color="success"]')).toHaveAttribute(
      'aria-label',
      'Suksessmelding',
    );
    await expect(section.locator('hvi-alert[data-color="warning"]')).toHaveAttribute(
      'aria-label',
      'Advarsel',
    );
    await expect(section.locator('hvi-alert[data-color="danger"]')).toHaveAttribute(
      'aria-label',
      'Feilmelding',
    );
  });

  test('applies correct roles per color variant', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Varianter"]');
    await expect(section.locator('hvi-alert').first()).toHaveAttribute('role', 'status');
    await expect(section.locator('hvi-alert[data-color="warning"]')).toHaveAttribute(
      'role',
      'status',
    );
    await expect(section.locator('hvi-alert[data-color="danger"]')).toHaveAttribute(
      'role',
      'alert',
    );
  });

  test('does not set aria-live', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Varianter"]');
    await expect(section.locator('hvi-alert').first()).not.toHaveAttribute('aria-live');
    await expect(section.locator('hvi-alert[data-color="danger"]')).not.toHaveAttribute(
      'aria-live',
    );
  });

  test('title input renders h2 and sets aria-label', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Med tittel"]');
    await expect(section).toBeVisible();
    const alert = section.locator('hvi-alert').first();
    await expect(alert.locator('h2')).toBeVisible();
    await expect(alert.locator('h2')).toContainText('Har du husket å bestille passtime?');
    await expect(alert).toHaveAttribute('aria-label', 'Har du husket å bestille passtime?');
  });

  test('projects rich content', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Med tittel"]');
    await expect(section).toBeVisible();
    const alert = section.locator('hvi-alert').first();
    await expect(alert.locator('p')).toBeVisible();
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
