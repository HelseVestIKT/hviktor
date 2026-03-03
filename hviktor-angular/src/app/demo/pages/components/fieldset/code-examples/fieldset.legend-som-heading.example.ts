import { Component } from '@angular/core';
import { HviField, HviFieldset, HviHeading, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-fieldset-legend-som-heading-example',
  standalone: true,
  imports: [HviField, HviFieldset, HviHeading, HviInput, HviLabel],
  template: `
    <fieldset hviFieldset>
      <legend hviLabel weight="medium">
        <h2 hviHeading>Hvor skal du reise?</h2>
      </legend>
      <hvi-field>
        <input hviInput type="radio" id="oslo" name="reise" value="oslo" />
        <label hviLabel for="oslo">Oslo</label>
      </hvi-field>
      <hvi-field>
        <input hviInput type="radio" id="bergen" name="reise" value="bergen" />
        <label hviLabel for="bergen">Bergen</label>
      </hvi-field>
      <hvi-field>
        <input hviInput type="radio" id="trondheim" name="reise" value="trondheim" />
        <label hviLabel for="trondheim">Trondheim</label>
      </hvi-field>
    </fieldset>
  `,
})
export class FieldsetLegendSomHeadingExampleComponent {}
