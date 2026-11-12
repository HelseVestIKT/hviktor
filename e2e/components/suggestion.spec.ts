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
// Designsystemet setter `label` på tom-valget til det brukeren skriver, så det må utelates.
const option = (scope: Locator, label: string) =>
  scope.locator(`u-option[label="${label}"]:not([data-empty])`);
const options = (scope: Locator) => scope.locator('u-option:not([data-empty]):visible');
const chips = (scope: Locator) => scope.locator('ds-suggestion > data');
const toggle = (scope: Locator) => scope.locator('ds-suggestion button[aria-expanded]').first();
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

/** Søker og velger et alternativ med mus. */
const velg = async (scope: Locator, text: string, label: string) => {
  await type(scope, text);
  await option(scope, label).click();
};

test.describe('Suggestion', () => {
  test.beforeEach(async ({ page }) => {
    await new ComponentPage(page).goto('suggestion');
  });

  test.describe('enkeltvalg', () => {
    test('starter tomt', async ({ page }) => {
      const s = section(page, 'Standard Suggestion');
      await expect(input(s)).toHaveValue('');
      await expect(valgt(s)).toHaveText('Valgt: ingen');
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

    test('viser «Ingen treff» når ingenting matcher', async ({ page }) => {
      const s = section(page, 'Standard Suggestion');
      await type(s, 'xyz');
      await expect(options(s)).toHaveCount(0);
      await expect(s.locator('u-option[data-empty]')).toBeVisible();
      await expect(s.locator('u-option[data-empty]')).toHaveText('Ingen treff');
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
      await velg(s, 'Os', 'Oslo');
      await expect(valgt(s)).toHaveText('Valgt: Oslo');

      await s.locator('ds-suggestion button[type="reset"]').click();
      await expect(input(s)).toHaveValue('');
      await expect(valgt(s)).toHaveText('Valgt: ingen');
    });
  });

  test.describe('flervalg', () => {
    test('starter uten valg', async ({ page }) => {
      const s = section(page, 'Flervalg');
      await expect(chips(s)).toHaveCount(0);
      await expect(valgt(s)).toHaveText('Valgt: ingen');
    });

    test('viser valgt alternativ som chip', async ({ page }) => {
      const s = section(page, 'Flervalg');
      await velg(s, 'Ber', 'Bergen');
      await expect(chips(s)).toHaveCount(1);
      await expect(chips(s).first()).toHaveText('Bergen');
      await expect(valgt(s)).toHaveText('Valgt: Bergen');
    });

    test('legger til valg uten å fjerne tidligere valg', async ({ page }) => {
      const s = section(page, 'Flervalg');
      await velg(s, 'Ber', 'Bergen');
      await velg(s, 'Os', 'Oslo');
      await expect(chips(s)).toHaveCount(2);
      await expect(valgt(s)).toHaveText('Valgt: Bergen, Oslo');
    });

    // Fjerning med tastatur er flyten Designsystemet tester for flervalg.
    // Klikk på chip er vanskelig å teste stabilt, fordi forslagslista og
    // ds-suggestion ligger over chipsene for Playwrights treffsjekk.
    test('fjerner ett valg med tastatur uten å fjerne andre', async ({ page }) => {
      const s = section(page, 'Flervalg');
      await velg(s, 'Ber', 'Bergen');
      await velg(s, 'Os', 'Oslo');
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

  test.describe('skjermlesertekster', () => {
    test('bruker Designsystemets norske standardtekster', async ({ page }) => {
      const s = section(page, 'Flervalg');
      await expect(toggle(s)).toHaveAttribute('aria-label', 'Forslag');

      await velg(s, 'Ber', 'Bergen');
      await expect(chips(s).first()).toHaveAttribute('aria-label', /Trykk for å fjerne/);
      await expect(input(s)).toHaveAttribute('aria-description', /for å finne 1 valgte/);

      await type(s, 'Os');
      await expect(s.locator('ds-suggestion button[type="reset"]')).toHaveAttribute(
        'aria-label',
        'Fjern tekst',
      );
    });
  });

  test.describe('åpne/lukk-knapp', () => {
    test('åpner og lukker lista, og snur pila', async ({ page }) => {
      const s = section(page, 'Flervalg');
      const knapp = toggle(s);
      await expect(knapp).toBeVisible();
      await expect(knapp).toHaveAttribute('aria-expanded', 'false');

      await knapp.click();
      await expect(s.locator('u-datalist')).toBeVisible();
      await expect(knapp).toHaveAttribute('aria-expanded', 'true');
      const rotasjon = await knapp.evaluate((el) => getComputedStyle(el, '::before').rotate);
      expect(rotasjon).toBe('180deg');

      await knapp.click();
      await expect(s.locator('u-datalist')).toBeHidden();
      await expect(knapp).toHaveAttribute('aria-expanded', 'false');
    });

    test('byttes med tøm-knappen når feltet har tekst', async ({ page }) => {
      const s = section(page, 'Flervalg');
      await type(s, 'Os');
      await expect(toggle(s)).toBeHidden();
      await expect(s.locator('ds-suggestion button[type="reset"]')).toBeVisible();
    });

    test('vises ikke i readonly', async ({ page }) => {
      const s = section(page, 'ReadOnly');
      await expect(s.locator('ds-suggestion button[aria-expanded]')).toHaveCount(2);
      for (const knapp of await s.locator('ds-suggestion button[aria-expanded]').all()) {
        await expect(knapp).toBeHidden();
      }
    });
  });

  test.describe('legg til nye alternativer', () => {
    test('viser valget for å legge til teksten brukeren skrev', async ({ page }) => {
      const s = section(page, 'Legg til nye alternativer');
      await type(s, 'Nyby');
      await expect(s.locator('u-option[data-empty]')).toBeVisible();
      await expect(s.locator('u-option[data-empty]')).toHaveAttribute('data-create', /Nyby/);
    });

    test('lager nytt objekt med createOption', async ({ page }) => {
      const s = section(page, 'Legg til nye alternativer');
      await type(s, 'Nyby');
      await page.keyboard.press('Enter');
      await expect(chips(s)).toHaveCount(1);
      await expect(chips(s).first()).toHaveText('Nyby');
      await expect(valgt(s)).toHaveText('Valgt: Nyby (ny)');
    });

    test('velger eksisterende objekt', async ({ page }) => {
      const s = section(page, 'Legg til nye alternativer');
      await type(s, 'Ber');
      await option(s, 'Bergen').click();
      await expect(valgt(s)).toHaveText('Valgt: Bergen');
    });
  });

  test.describe('søk i backend', () => {
    test('henter forslag og velger objekt', async ({ page }) => {
      const s = section(page, 'Søk i backend');
      await type(s, 'Tr');
      await expect(option(s, 'Trondheim')).toBeVisible();
      await expect(option(s, 'Tromsø')).toBeVisible();
      await expect(input(s)).not.toHaveAttribute('aria-busy', 'true');

      await option(s, 'Trondheim').click();
      await expect(valgt(s)).toHaveText('Valgt: Trondheim');
    });

    test('viser «Søker …» og deretter «Ingen treff» når søket ikke gir treff', async ({ page }) => {
      const s = section(page, 'Søk i backend');
      const tom = s.locator('u-option[data-empty]');
      await type(s, 'Kopervik');
      await expect(tom).toBeVisible();
      await expect(tom).toHaveText('Søker …');
      await expect(tom).toHaveText('Ingen treff');
      await expect(tom).toBeVisible();
    });

    test('tøm-knappen nullstiller søket', async ({ page }) => {
      const s = section(page, 'Søk i backend');
      await type(s, 'Tr');
      await expect(option(s, 'Trondheim')).toBeVisible();

      await s.locator('ds-suggestion button[type="reset"]').click();
      await expect(s.locator('u-option:not([data-empty])')).toHaveCount(0);
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
      await expect(s.locator('u-option:not([data-empty])')).toHaveCount(50);
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
    test('viser forhåndsvalgte verdier', async ({ page }) => {
      const s = section(page, 'ReadOnly');
      await expect(s.locator('ds-suggestion input.ds-input').nth(0)).toHaveValue(
        'Haukeland universitetssjukehus',
      );
      await expect(s.locator('ds-suggestion').nth(1).locator(':scope > data')).toHaveCount(2);
    });

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
