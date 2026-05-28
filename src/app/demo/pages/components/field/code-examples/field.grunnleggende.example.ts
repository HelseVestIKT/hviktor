import { Component } from '@angular/core';
import {
  HviField,
  HviFieldDescription,
  HviFieldValidation,
  HviInput,
  HviLabel,
} from '@helsevestikt/hviktor';

@Component({
  selector: 'app-field-grunnleggende-example',
  standalone: true,
  imports: [HviField, HviFieldDescription, HviFieldValidation, HviInput, HviLabel],
  template: `
    <div style="width: 400px">
      <hvi-field>
        <label hviLabel for="etternavn" weight="medium">Etternavn</label>
        <p hviFieldDescription>Etternavn kan ikke inneholde mellomrom</p>
        <input
          hviInput
          id="etternavn"
          type="text"
          value="Nordmann Svenske"
          (input)="hasError = $any($event.target).value.includes(' ')"
        />
        @if (hasError) {
          <p hviFieldValidation>Du kan ikke ha mellomrom i etternavnet ditt</p>
        }
      </hvi-field>
    </div>
  `,
})
export class FieldGrunnleggendeExampleComponent {
  hasError = true;
}
