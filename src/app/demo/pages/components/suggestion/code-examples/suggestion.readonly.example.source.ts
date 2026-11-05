// Auto-generated - do not edit manually
export const SuggestionReadonlyExampleSource = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HviSuggestion } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-suggestion-readonly-example',
  standalone: true,
  imports: [FormsModule, HviSuggestion],
  template: \`
    <hvi-suggestion
      label="Blodbank"
      placeholder="Søk etter blodbank"
      [readOnly]="true"
      [(ngModel)]="blodbank"
      [suggestions]="blodbanker"
    />
    <hvi-suggestion
      label="Blodbanker"
      placeholder="Søk etter region eller blodbank"
      [readOnly]="true"
      [multiple]="true"
      [(ngModel)]="valgteBlodbanker"
      [suggestions]="blodbanker"
    />
  \`,
})
export class SuggestionReadonlyExampleComponent {
  readonly blodbanker = [
    'Haukeland universitetssjukehus',
    'Stavanger universitetssjukehus',
    'Haugesund sjukehus',
    'Førde sentralsjukehus',
  ];

  blodbank: string | null = 'Haukeland universitetssjukehus';
  valgteBlodbanker: string[] = ['Haukeland universitetssjukehus', 'Stavanger universitetssjukehus'];
}
`;
