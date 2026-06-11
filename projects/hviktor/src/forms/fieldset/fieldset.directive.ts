import { Directive } from '@angular/core';

/**
 * @summary Directive that applies Designsystemet fieldset styling to a native `<fieldset>` element,
 * grouping related form fields with a shared legend for improved structure and accessibility.
 *
 * @example Radio group fieldset
 * ```html
 * <fieldset hviFieldset>
 *   <legend hviLabel weight="medium">Which framework do you like best?</legend>
 *   <p hviParagraph>Your choice will help us improve the service.</p>
 *   <hvi-field>
 *     <input hviInput type="radio" id="angular" name="framework" value="angular" />
 *     <label hviLabel for="angular">Angular</label>
 *   </hvi-field>
 *   <hvi-field>
 *     <input hviInput type="radio" id="react" name="framework" value="react" />
 *     <label hviLabel for="react">React</label>
 *   </hvi-field>
 * </fieldset>
 * ```
 *
 * @example Disabled fieldset
 * ```html
 * <fieldset hviFieldset disabled>
 *   <legend hviLabel weight="medium">Disabled group</legend>
 *   <hvi-field>
 *     <input hviInput type="checkbox" id="opt" value="opt" />
 *     <label hviLabel for="opt">Option</label>
 *   </hvi-field>
 * </fieldset>
 * ```
 *
 * @see {@link https://designsystemet.no/komponenter/fieldset}
 */
@Directive({
  selector: 'fieldset[hviFieldset]',
  standalone: true,
  host: {
    class: 'ds-fieldset',
  },
})
export class HviFieldset {}
