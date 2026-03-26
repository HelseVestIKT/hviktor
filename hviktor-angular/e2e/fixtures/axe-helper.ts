import AxeBuilder from '@axe-core/playwright';
import { type Page, expect } from '@playwright/test';

/**
 * Runs an axe accessibility scan on the current page.
 * Asserts that there are no violations.
 */
export async function checkAccessibility(page: Page, disableRules: string[] = []) {
  const results = await new AxeBuilder({ page }).disableRules(disableRules).analyze();

  expect(
    results.violations,
    results.violations
      .map((v) => `[${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} nodes)`)
      .join('\n'),
  ).toHaveLength(0);
}
