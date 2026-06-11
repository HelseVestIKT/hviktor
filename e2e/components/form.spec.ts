import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Form', () => {
  let componentPage: ComponentPage;

  test.beforeEach(async ({ page }) => {
    componentPage = new ComponentPage(page);
    await componentPage.goto('form');
  });

  test('all-required section shows required-tag when all fields are required', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Alle felt er obligatoriske"]');
    await expect(section).toBeVisible();
    await expect(section.locator('hvi-required-tag')).toBeVisible();
  });

  test('mixed section marks individual fields with required/optional tags', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Obligatoriske og valgfrie felt"]');
    await expect(section).toBeVisible();
    const form = section.locator('form[hviForm]');
    await expect(form).toBeVisible();
  });

  test('submit with invalid form shows error summary and focuses it', async ({ page }) => {
    const section = page.locator(
      'app-demo-section[title="Skjema med validering og feiloppsummering"]',
    );
    await expect(section).toBeVisible();

    const submitBtn = section.locator('button[type="submit"]');
    await submitBtn.click();

    const errorSummary = section.locator('ds-error-summary');
    await expect(errorSummary).toBeVisible();
  });

  test('validation messages appear on invalid controls after submit', async ({ page }) => {
    const section = page.locator(
      'app-demo-section[title="Skjema med validering og feiloppsummering"]',
    );
    const submitBtn = section.locator('button[type="submit"]');
    await submitBtn.click();

    const validationMsg = section.locator('.ds-validation-message').first();
    await expect(validationMsg).toBeVisible();
  });

  test('error summary link focuses the related input field', async ({ page }) => {
    const section = page.locator(
      'app-demo-section[title="Skjema med validering og feiloppsummering"]',
    );
    await section.locator('button[type="submit"]').click();

    const firstLink = section.locator('ds-error-summary a.ds-link').first();
    await expect(firstLink).toBeVisible();
    await firstLink.click();

    const firstInput = section.locator('#firstName');
    await expect(firstInput).toBeFocused();
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
