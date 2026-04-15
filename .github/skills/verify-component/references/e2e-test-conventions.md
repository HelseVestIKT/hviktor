# E2E Test Conventions

## Setup

Tests use Playwright with two fixtures:

- `ComponentPage` — Page Object for navigating to `/komponenter/{id}`
- `checkAccessibility` — axe-core accessibility scan

```typescript
import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';
```

## Structure

```typescript
test.describe('ComponentName', () => {
  let componentPage: ComponentPage;

  test.beforeEach(async ({ page }) => {
    componentPage = new ComponentPage(page);
    await componentPage.goto('component-id');
  });

  test('page loads and renders heading', async () => {
    await expect(componentPage.heading).toHaveText('ComponentName');
  });

  // One test per demo section...

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
```

## Critical: Section Locators

Use **exact CSS attribute selectors** when section titles could be substrings of each other:

```typescript
// ✅ Correct — exact match
const section = page.locator('app-demo-section[title="Variant"]');

// ❌ Risky — "Variant" matches both "Variant" and "Varianter"
const section = componentPage.getSection('Variant');
```

`getSection()` uses `filter({ hasText })` which does substring matching. Prefer the exact `[title="..."]` selector.

## Critical: Wait Before Counting

Always wait for at least one element to be visible before calling `.count()`:

```typescript
// ✅ Correct
const buttons = page.locator('article button.ds-button');
await expect(buttons.first()).toBeVisible();
const count = await buttons.count();

// ❌ Flaky — count may be 0 if page hasn't rendered yet
const count = await buttons.count();
```

## Critical: Text Locators in Code Example Sections

Demo sections show both the rendered component and a "Vis kode" code toggle. Text locators can match inside the code example. Use class-scoped locators:

```typescript
// ✅ Correct — targets only the validation message element
const msg = section.locator('.ds-validation-message', {
  hasText: 'Du må velge minst to alternativ',
});

// ❌ Matches both the message AND the code example text
const msg = section.locator('text=Du må velge minst to alternativ');
```

## Accessibility

Always include an accessibility test as the last test case:

```typescript
test('accessibility check', async ({ page }) => {
  await checkAccessibility(page, ['color-contrast'], 'article');
});
```

- Always pass `'article'` as the include scope
- Always disable `'color-contrast'` — the demo app dark theme causes false positives that are not component bugs
- The helper automatically waits for the `article` element to be visible

## What to Test Per Section

For each `<app-demo-section>` in the demo page:

1. Section is visible
2. Expected number of component instances
3. Key attributes/classes are correct
4. Interactive behavior works (click, toggle, etc.)

## Running

```bash
# All browsers
npm run test:e2e

# Chromium only (faster, matches CI)
npx playwright test --project=chromium

# Interactive UI mode
npm run test:e2e:ui
```
