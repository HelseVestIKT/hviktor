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
      label="Sykehus"
      placeholder="Søk etter sykehus"
      [readOnly]="true"
      [(ngModel)]="readonlySykehus"
      [suggestions]="sykehus"
    />
    <hvi-suggestion
      label="Sykehus"
      placeholder="Søk etter sykehus"
      [readOnly]="true"
      [multiple]="true"
      [(ngModel)]="readonlySykehuser"
      [suggestions]="sykehus"
    />
  \`,
})
export class SuggestionReadonlyExampleComponent {
  readonly sykehus = [
    'Haukeland universitetssjukehus',
    'Stavanger universitetssjukehus',
    'Haugesund sjukehus',
    'Førde sentralsjukehus',
  ];

  readonlySykehus: string | null = 'Haukeland universitetssjukehus';
  readonlySykehuser: string[] = [
    'Haukeland universitetssjukehus',
    'Stavanger universitetssjukehus',
  ];
}
`;
