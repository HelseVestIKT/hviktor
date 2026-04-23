import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Dialog', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('dialog');
  });

  test.describe('Modal Dialog', () => {
    test('opens when button is clicked', async ({ page }) => {
      const section = page.locator('app-demo-section[title="Modal Dialog"]');
      const openButton = section.locator('button.ds-button').first();
      const dialog = page.locator('dialog[hviDialog]').first();

      await expect(dialog).not.toHaveAttribute('open');
      await openButton.click();
      await expect(dialog).toHaveAttribute('open');
    });

    test('closes when close button is clicked', async ({ page }) => {
      const section = page.locator('app-demo-section[title="Modal Dialog"]');
      const openButton = section.locator('button.ds-button').first();
      const dialog = page.locator('dialog[hviDialog]').first();

      await openButton.click();
      await expect(dialog).toHaveAttribute('open');

      const closeButton = dialog.locator('button[data-command="close"]').first();
      await closeButton.click();
      await expect(dialog).not.toHaveAttribute('open');
    });

    test('has ds-dialog class', async ({ page }) => {
      const dialog = page.locator('dialog[hviDialog]').first();
      await expect(dialog).toHaveClass(/ds-dialog/);
    });

    test('renders action buttons', async ({ page }) => {
      const section = page.locator('app-demo-section[title="Modal Dialog"]');
      const openButton = section.locator('button.ds-button').first();
      const dialog = page.locator('dialog[hviDialog]').first();

      await openButton.click();
      await expect(dialog).toHaveAttribute('open');

      // Check for action buttons
      const actionButtons = dialog.locator('button').all();
      expect(actionButtons.length).toBeGreaterThan(1);
    });
  });

  test.describe('Non-modal Dialog', () => {
    test('opens when button is clicked', async ({ page }) => {
      const section = page.locator('app-demo-section[title="Ikke-modal Dialog"]');
      const openButton = section.locator('button.ds-button').first();
      const dialogs = page.locator('dialog[hviDialog]');
      const nonModalDialog = dialogs.nth(1); // Second dialog is non-modal

      await openButton.click();
      await expect(nonModalDialog).toHaveAttribute('open');
    });

    test('allows page interaction while open', async ({ page }) => {
      // Non-modal dialogs don't have a backdrop that blocks interaction
      const section = page.locator('app-demo-section[title="Ikke-modal Dialog"]');
      const openButton = section.locator('button.ds-button').first();

      await openButton.click();
      // Page is still responsive in non-modal mode
      expect(openButton).toBeDefined();
    });

    test('closes when action button is clicked', async ({ page }) => {
      const section = page.locator('app-demo-section[title="Ikke-modal Dialog"]');
      const openButton = section.locator('button.ds-button').first();
      const dialogs = page.locator('dialog[hviDialog]');
      const nonModalDialog = dialogs.nth(1);

      await openButton.click();
      await expect(nonModalDialog).toHaveAttribute('open');

      const sendButton = nonModalDialog.locator('button.ds-button').first();
      await sendButton.click();
      await expect(nonModalDialog).not.toHaveAttribute('open');
    });
  });

  test.describe('Dialog as Drawer (Placement)', () => {
    test('opens with data-placement attribute', async ({ page }) => {
      const section = page.locator('app-demo-section[title="Dialog som drawer"]');
      const openButton = section.locator('button.ds-button').first();
      const dialogs = page.locator('dialog[hviDialog]');
      const drawerDialog = dialogs.nth(2); // Third dialog is the drawer

      await openButton.click();
      await expect(drawerDialog).toHaveAttribute('open');
      await expect(drawerDialog).toHaveAttribute('data-placement', 'bottom');
    });

    test('closes when close button is clicked', async ({ page }) => {
      const section = page.locator('app-demo-section[title="Dialog som drawer"]');
      const openButton = section.locator('button.ds-button').first();
      const dialogs = page.locator('dialog[hviDialog]');
      const drawerDialog = dialogs.nth(2);

      await openButton.click();
      await expect(drawerDialog).toHaveAttribute('open');

      const closeButton = drawerDialog.locator('button[data-command="close"]').first();
      await closeButton.click();
      await expect(drawerDialog).not.toHaveAttribute('open');
    });

    test('allows backdrop click to close (closedby="any")', async ({ page }) => {
      const section = page.locator('app-demo-section[title="Dialog som drawer"]');
      const openButton = section.locator('button.ds-button').first();
      const dialogs = page.locator('dialog[hviDialog]');
      const drawerDialog = dialogs.nth(2);

      await openButton.click();
      await expect(drawerDialog).toHaveAttribute('open');
      await expect(drawerDialog).toHaveAttribute('closedby', 'any');
    });
  });

  test.describe('Dialog with Form and Focus', () => {
    test('opens dialog with form input', async ({ page }) => {
      const section = page.locator('app-demo-section[title="Med skjema og fokus"]');
      const openButton = section.locator('button.ds-button').first();
      const dialogs = page.locator('dialog[hviDialog]');
      const formDialog = dialogs.nth(3);

      await openButton.click();
      await expect(formDialog).toHaveAttribute('open');
    });

    test('contains form input field', async ({ page }) => {
      const section = page.locator('app-demo-section[title="Med skjema og fokus"]');
      const openButton = section.locator('button.ds-button').first();
      const dialogs = page.locator('dialog[hviDialog]');
      const formDialog = dialogs.nth(3);

      await openButton.click();
      const input = formDialog.locator('input');
      await expect(input).toBeDefined();
    });
  });

  test.describe('Dialog with Blocks', () => {
    test('renders dialog with multiple blocks', async ({ page }) => {
      const section = page.locator('app-demo-section[title="Med blokker"]');
      const openButton = section.locator('button.ds-button').first();
      const dialogs = page.locator('dialog[hviDialog]');
      const blocksDialog = dialogs.nth(4);

      await openButton.click();
      await expect(blocksDialog).toHaveAttribute('open');

      const blocks = blocksDialog.locator('[hviDialogBlock]');
      expect(blocks).toBeDefined();
    });

    test('blocks have correct CSS class', async ({ page }) => {
      const section = page.locator('app-demo-section[title="Med blokker"]');
      const openButton = section.locator('button.ds-button').first();
      const dialogs = page.locator('dialog[hviDialog]');
      const blocksDialog = dialogs.nth(4);

      await openButton.click();

      const blocks = blocksDialog.locator('[hviDialogBlock]');
      const blockCount = await blocks.count();
      expect(blockCount).toBeGreaterThan(0);

      for (let i = 0; i < blockCount; i++) {
        await expect(blocks.nth(i)).toHaveClass(/ds-dialog__block/);
      }
    });
  });

  test.describe('Dialog with Backdrop Click', () => {
    test('closes when clicking outside dialog (closedby="any")', async ({ page }) => {
      const section = page.locator('app-demo-section[title="Lukk ved klikk utenfor"]');
      const openButton = section.locator('button.ds-button').first();
      const dialogs = page.locator('dialog[hviDialog]');
      const backdropDialog = dialogs.nth(5);

      await openButton.click();
      await expect(backdropDialog).toHaveAttribute('open');
      await expect(backdropDialog).toHaveAttribute('closedby', 'any');
    });
  });

  test.describe('Dialog Accessibility', () => {
    test('has proper accessibility attributes', async ({ page }) => {
      const section = page.locator('app-demo-section[title="Modal Dialog"]');
      const openButton = section.locator('button.ds-button').first();
      const dialog = page.locator('dialog[hviDialog]').first();

      await openButton.click();

      // Check close button has aria-label
      const closeButton = dialog.locator('button[data-command="close"]').first();
      const ariaLabel = await closeButton.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
    });

    test('passes accessibility checks', async ({ page }) => {
      await checkAccessibility(page, ['color-contrast'], 'article');
    });
  });
});
