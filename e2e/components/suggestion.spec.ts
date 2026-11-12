import { expect, test, type Locator, type Page } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

/**
 * Låser dagens brukeropplevde oppførsel for Suggestion før revisjonen.
 * Testene går mot demosiden og bruker bare DOM-et som `ds-suggestion`/`u-combobox`
 * eier (input, u-option, data-chips), slik at de overlever en endring av
 * Angular-komponentens API eller elementnavn.
 */

const section = (page: Page, title: string) => page.locator(`app-demo-section[title="${title}"]`);

const input = (scope: Locator) => scope.locator('ds-suggestion input.ds-input').first();
const option = (scope: Locator, label: string) => scope.locator(`u-option[label="${label}"]`);
const options = (scope: Locator) => scope.locator('u-option:visible');
const chips = (scope: Locator) => scope.locator('ds-suggestion > data');
const valgt = (scope: Locator) => scope.locator('p', { hasText: 'Valgt:' }).first();

/**
 * Skriver som en bruker: klikk i feltet, marker eksisterende tekst og tast inn.
 * `fill()` åpner ikke forslagslista i u-combobox, så vi trenger ekte tastetrykk.
 */
const type = async (scope: Locator, text: string) => {
  const field = input(scope);
  await field.click();
  await field.press('ControlOrMeta+a');
  await field.pressSequentially(text);
};

test.describe('Suggestion', () => {
  test.beforeEach(async ({ page }) => {
    await new ComponentPage(page).goto('suggestion');
  });

  test.describe('enkeltvalg', () => {
    test('viser forhåndsvalgt verdi i feltet', async ({ page }) => {
      const s = section(page, 'Standard Suggestion');
      await expect(input(s)).toHaveValue('Bergen');
      await expect(valgt(s)).toHaveText('Valgt: Bergen');
    });

    test('filtrerer forslagene på det brukeren skriver', async ({ page }) => {
      const s = section(page, 'Standard Suggestion');
      await type(s, 'sta');
      await expect(option(s, 'Stavanger')).toBeVisible();
      await expect(options(s)).toHaveCount(1);
    });

    test('velger med mus og oppdaterer modellen', async ({ page }) => {
      const s = section(page, 'Standard Suggestion');
      await type(s, 'Os');
      await option(s, 'Oslo').click();
      await expect(input(s)).toHaveValue('Oslo');
      await expect(valgt(s)).toHaveText('Valgt: Oslo');
    });

    test('velger med tastatur', async ({ page }) => {
      const s = section(page, 'Standard Suggestion');
      await type(s, 'Trond');
      await expect(option(s, 'Trondheim')).toBeVisible();
      await input(s).press('ArrowDown');
      await page.keyboard.press('Enter');
      await expect(valgt(s)).toHaveText('Valgt: Trondheim');
    });

    test('lukker forslagslista med Escape', async ({ page }) => {
      const s = section(page, 'Standard Suggestion');
      await type(s, 's');
      await expect(s.locator('u-datalist')).toBeVisible();
      await input(s).press('Escape');
      await expect(s.locator('u-datalist')).toBeHidden();
    });

    test('tøm-knappen nullstiller verdien', async ({ page }) => {
      const s = section(page, 'Standard Suggestion');
      await s.locator('ds-suggestion button[type="reset"]').click();
      await expect(input(s)).toHaveValue('');
      await expect(valgt(s)).toHaveText('Valgt: ingen');
    });
  });

  test.describe('flervalg', () => {
    test('viser forhåndsvalgt verdi som chip', async ({ page }) => {
      const s = section(page, 'Flervalg');
      await expect(chips(s)).toHaveCount(1);
      await expect(chips(s).first()).toHaveText('Bergen');
      await expect(valgt(s)).toHaveText('Valgt: Bergen');
    });

    test('legger til valg uten å fjerne tidligere valg', async ({ page }) => {
      const s = section(page, 'Flervalg');
      await type(s, 'Os');
      await option(s, 'Oslo').click();
      await expect(chips(s)).toHaveCount(2);
      await expect(valgt(s)).toHaveText('Valgt: Bergen, Oslo');
    });

    // Fjerning med tastatur er flyten Designsystemet tester for flervalg.
    // Klikk på chip er vanskelig å teste stabilt, fordi forslagslista og
    // ds-suggestion ligger over chipsene for Playwrights treffsjekk.
    test('fjerner ett valg med tastatur uten å fjerne andre', async ({ page }) => {
      const s = section(page, 'Flervalg');
      await type(s, 'Os');
      await option(s, 'Oslo').click();
      await expect(chips(s)).toHaveCount(2);

      const field = input(s);
      await field.fill(''); // tøm teksten uten Backspace, som ville fjernet siste chip
      await field.press('Escape');
      await field.press('ArrowLeft'); // Oslo
      await page.keyboard.press('ArrowLeft'); // Bergen
      await expect(chips(s).filter({ hasText: 'Bergen' })).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(chips(s)).toHaveCount(1);
      await expect(valgt(s)).toHaveText('Valgt: Oslo');
    });
  });

  test.describe('søk i backend', () => {
    test('viser forhåndsvalgt verdi selv om forslagslista er tom', async ({ page }) => {
      const s = section(page, 'Søk i backend');
      await expect(input(s)).toHaveValue('Bergen');
      await expect(valgt(s)).toHaveText('Valgt: Bergen');
    });

    test('henter forslag og velger objekt', async ({ page }) => {
      const s = section(page, 'Søk i backend');
      await type(s, 'Tr');
      await expect(option(s, 'Trondheim')).toBeVisible();
      await expect(option(s, 'Tromsø')).toBeVisible();
      await expect(input(s)).not.toHaveAttribute('aria-busy', 'true');

      await option(s, 'Trondheim').click();
      await expect(valgt(s)).toHaveText('Valgt: Trondheim');
    });

    test('tøm-knappen nullstiller søket', async ({ page }) => {
      const s = section(page, 'Søk i backend');
      await type(s, 'Tr');
      await expect(option(s, 'Trondheim')).toBeVisible();

      await s.locator('ds-suggestion button[type="reset"]').click();
      await expect(s.locator('u-option')).toHaveCount(0);
    });

    // #428: u-combobox skriver valgt tekst inn i feltet med en syntetisk
    // `input`-hendelse, som tidligere sendte `completeMethod` en ekstra gang.
    test('starter ikke et nytt søk når et forslag velges', async ({ page }) => {
      const s = section(page, 'Søk i backend');
      const field = input(s);

      await type(s, 'Tr');
      await expect(option(s, 'Trondheim')).toBeVisible();
      await expect(field).not.toHaveAttribute('aria-busy', 'true');

      // `loading` settes synkront når demoen får `completeMethod`.
      await field.evaluate((el) => {
        const w = window as unknown as { __hviSearched: boolean };
        w.__hviSearched = false;
        new MutationObserver(() => {
          if (el.getAttribute('aria-busy') === 'true') w.__hviSearched = true;
        }).observe(el, { attributes: true, attributeFilter: ['aria-busy'] });
      });

      await option(s, 'Trondheim').click();
      await expect(valgt(s)).toHaveText('Valgt: Trondheim');
      await page.waitForTimeout(1000); // debounce (300 ms) + simulert API (400 ms)

      const searched = await page.evaluate(
        () => (window as unknown as { __hviSearched: boolean }).__hviSearched,
      );
      expect(searched).toBe(false);
    });
  });

  test.describe('lange lister', () => {
    test('rendrer bare maxVisible alternativer og viser hvor mange som er skjult', async ({
      page,
    }) => {
      const s = section(page, 'Lange lister');
      await input(s).click();
      await expect(s.locator('u-option')).toHaveCount(50);
      await expect(s.locator('[data-suggestion-truncated]')).toContainText('2950');
    });

    test('søker blant alle alternativene, ikke bare de rendrede', async ({ page }) => {
      const s = section(page, 'Lange lister');
      await type(s, 'Sensor 2999');
      await expect(option(s, 'Sensor 2999')).toBeVisible();
      await expect(options(s)).toHaveCount(1);
    });
  });

  test.describe('egen mal for alternativene', () => {
    test('henter forslag ved fokus og bruker malen', async ({ page }) => {
      const s = section(page, 'Egen mal for alternativene');
      await input(s).click();
      await expect(options(s)).toHaveCount(5);
      await expect(option(s, 'Lagre')).toContainText('⌘S');
    });

    test('velger objekt', async ({ page }) => {
      const s = section(page, 'Egen mal for alternativene');
      await input(s).click();
      await option(s, 'Lagre').click();
      await expect(valgt(s)).toHaveText('Valgt: Lagre');
    });
  });

  test.describe('readonly', () => {
    test('feltene er skrivebeskyttet', async ({ page }) => {
      const s = section(page, 'ReadOnly');
      await expect(s.locator('ds-suggestion input.ds-input').nth(0)).toHaveAttribute('readonly');
      await expect(s.locator('ds-suggestion input.ds-input').nth(1)).toHaveAttribute('readonly');
    });

    test('valgte chips kan ikke fjernes', async ({ page }) => {
      const multi = section(page, 'ReadOnly').locator('ds-suggestion').nth(1);
      const multiChips = multi.locator(':scope > data');
      await expect(multiChips).toHaveCount(2);
      // `force` fordi readonly slår av pekerhendelser på chipsene. Klikket treffer
      // da ds-suggestion, slik det gjør for en ekte bruker.
      await multiChips.first().click({ force: true });
      await expect(multiChips).toHaveCount(2);
    });
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
