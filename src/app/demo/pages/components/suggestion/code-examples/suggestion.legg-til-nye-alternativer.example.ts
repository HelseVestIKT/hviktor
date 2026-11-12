import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HviSuggestionMultiple } from '@helsevestikt/hviktor-angular';
import { Kommune } from '../suggestion-demo';

@Component({
  selector: 'app-suggestion-legg-til-nye-alternativer-example',
  standalone: true,
  imports: [FormsModule, HviSuggestionMultiple],
  template: `
    <hvi-suggestion-multiple
      label="Velg eller legg til kommuner"
      placeholder="Skriv for å søke eller legge til..."
      optionLabel="navn"
      dataKey="nummer"
      [creatable]="true"
      [createOption]="nyKommune"
      [(ngModel)]="egneKommuner"
      [suggestions]="kommuneObjekter"
    />
    <p>Valgt: {{ beskrivKommuner(egneKommuner) }}</p>
  `,
})
export class SuggestionLeggTilNyeAlternativerExampleComponent {
  readonly kommuneObjekter: Kommune[] = [
    { nummer: '4601', navn: 'Bergen' },
    { nummer: '4640', navn: 'Sogndal' },
    { nummer: '0301', navn: 'Oslo' },
  ];

  egneKommuner: Kommune[] = [];

  /** Lager en ny kommune av teksten brukeren skrev. */
  readonly nyKommune = (navn: string): Kommune => ({ nummer: `ny-${navn}`, navn });

  beskrivKommuner(kommuner: Kommune[]): string {
    const navn = kommuner.map((k) => (k.nummer.startsWith('ny-') ? `${k.navn} (ny)` : k.navn));
    return navn.join(', ') || 'ingen';
  }
}
