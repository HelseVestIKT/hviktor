// Auto-generated - do not edit manually
export const FieldGrunnleggendeExampleSource = `import { Component } from '@angular/core';
import { HviField, HviFieldDescription, HviFieldValidation, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-field-grunnleggende-example',
  standalone: true,
  imports: [HviField, HviFieldDescription, HviFieldValidation, HviInput, HviLabel],
  template: \`
    <div style="max-width: 400px">
      <hvi-field>
        <label hviLabel for="etternavn" weight="medium">Etternavn</label>
        <p hviFieldDescription>Etternavn kan ikke inneholde mellomrom</p>
        <input
          hviInput
          id="etternavn"
          type="text"
          value="Nordmann Svenske"
          [attr.aria-invalid]="hasEtternavnError || null"
          (input)="hasEtternavnError = $any($event.target).value.includes(' ')"
        />
        @if (hasEtternavnError) {
          <p hviFieldValidation>Du kan ikke ha mellomrom i etternavnet ditt</p>
        }
      </hvi-field>
    </div>
  \`,
})
export class FieldGrunnleggendeExampleComponent {
  hasEtternavnError = true;
}
`;
