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
    <ds-field>
      <label hviLabel for="etternavn" weight="medium">Etternavn</label>
      <span hviFieldDescription>Etternavn kan ikke inneholde mellomrom</span>
      <input hviInput id="etternavn" type="text" value="Nordmann Svenske" aria-invalid="true" />
      <span hviFieldValidation>Du kan ikke ha mellomrom i etternavnet ditt</span>
    </ds-field>
  `,
})
export class FieldGrunnleggendeExampleComponent {}
