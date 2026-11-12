// Auto-generated - do not edit manually
export const SuggestionFlervalgExampleSource = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HviSuggestionMultiple } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-suggestion-flervalg-example',
  standalone: true,
  imports: [FormsModule, HviSuggestionMultiple],
  template: \`
    <hvi-suggestion-multiple
      label="Velg kommuner"
      placeholder="Skriv for å søke..."
      [(ngModel)]="valgteKommuner"
      [suggestions]="kommuner"
    />
    <p>Valgt: {{ valgteKommuner.join(', ') || 'ingen' }}</p>
  \`,
})
export class SuggestionFlervalgExampleComponent {
  readonly kommuner = ['Sogndal', 'Bergen', 'Oslo', 'Stavanger', 'Trondheim'];

  valgteKommuner: string[] = ['Bergen'];
}
`;
