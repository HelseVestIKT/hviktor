import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {
  HviAlert,
  HviLink,
  HviSuggestion,
  HviSuggestionCompleteEvent,
  HviSuggestionMultiple,
} from '@helsevestikt/hviktor-angular';
import { debounceTime, delay, distinctUntilChanged, of, Subject, switchMap } from 'rxjs';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { SuggestionFlervalgExampleSource } from './code-examples/suggestion.flervalg.example.source';
import { SuggestionStandardSuggestionExampleSource } from './code-examples/suggestion.standard-suggestion.example.source';

import { SuggestionLangeListerExampleSource } from './code-examples';
import { SuggestionEgenMalForAlternativeneExampleSource } from './code-examples/suggestion.egen-mal-for-alternativene.example.source';
import { SuggestionLeggTilNyeAlternativerExampleSource } from './code-examples/suggestion.legg-til-nye-alternativer.example.source';
import { SuggestionReadonlyExampleSource } from './code-examples/suggestion.readonly.example.source';
import { SuggestionSokIBackendExampleSource } from './code-examples/suggestion.sok-i-backend.example.source';

export interface Kommando {
  id: number;
  navn: string;
  hurtigtast: string;
}

export interface Kommune {
  nummer: string;
  navn: string;
}

export interface Sensor {
  id: number;
  navn: string;
}

@Component({
  selector: 'app-suggestion-demo',
  standalone: true,
  imports: [
    DemoPageComponent,
    DemoSectionComponent,
    FormsModule,
    HviSuggestion,
    HviSuggestionMultiple,
    HviAlert,
    HviLink,
  ],
  template: `
    <app-demo-page componentId="suggestion">
      <hvi-alert class="mb-4"
        >Suggestion er fortsatt under utvikling både her og i

        <a
          hviLink
          href="https://designsystemet.no/no/components/docs/suggestion/overview"
          target="_blank"
          rel="noopener noreferrer"
          >Designsystemet</a
        >
        og kan derfor ikke anses som ferdig</hvi-alert
      >

      <app-demo-section title="Standard Suggestion" [code]="standardSuggestionCode">
        <hvi-suggestion
          label="Velg en kommune"
          placeholder="Skriv for å søke..."
          [(ngModel)]="kommune"
          [suggestions]="kommuner"
        />
        <p>Valgt: {{ kommune ?? 'ingen' }}</p>
      </app-demo-section>

      <app-demo-section title="Flervalg" [code]="flervalgCode">
        <hvi-suggestion-multiple
          label="Velg kommuner"
          placeholder="Skriv for å søke..."
          [(ngModel)]="valgteKommuner"
          [suggestions]="kommuner"
        />
        <p>Valgt: {{ valgteKommuner.join(', ') || 'ingen' }}</p>
      </app-demo-section>

      <app-demo-section
        title="Legg til nye alternativer"
        [code]="leggTilNyeAlternativerCode"
        description="Med creatable kan brukeren legge til verdier som ikke finnes i lista. Når alternativene er objekter, lager createOption objektet av teksten brukeren skrev."
      >
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
      </app-demo-section>

      <app-demo-section title="Søk i backend" [code]="backendSokCode">
        <hvi-suggestion
          label="Søk etter kommune"
          description="Søket kjøres mot et API. Skriv minst to tegn."
          placeholder="Skriv for å søke..."
          optionLabel="navn"
          dataKey="nummer"
          [filter]="false"
          [loading]="laster()"
          [(ngModel)]="valgtKommuneFraApi"
          [suggestions]="apiTreff()"
          (completeMethod)="sokIApi($event)"
        />
        <p>Valgt: {{ valgtKommuneFraApi?.navn ?? 'ingen' }}</p>
      </app-demo-section>

      <app-demo-section title="Lange lister" [code]="langeListerCode">
        <hvi-suggestion-multiple
          label="Velg sensorer"
          description="Lista inneholder 3000 sensorer, men bare 50 rendres av gangen. Skriv for å snevre inn."
          placeholder="Skriv for å søke..."
          optionLabel="navn"
          dataKey="id"
          [maxVisible]="50"
          [(ngModel)]="valgteSensorer"
          [suggestions]="sensorer"
        />
        <p>Valgt: {{ valgteSensorer.length }} av {{ sensorer.length }}</p>
      </app-demo-section>

      <app-demo-section title="Egen mal for alternativene" [code]="egenMalForAlternativeneCode">
        <hvi-suggestion
          label="Velg kommando"
          description="Søket kjøres mot en egen liste"
          placeholder="Skriv en kommando..."
          optionLabel="navn"
          dataKey="id"
          [filter]="false"
          [completeOnFocus]="true"
          [(ngModel)]="valgtKommando"
          [suggestions]="filtrerteKommandoer"
          (completeMethod)="sokKommandoer($event)"
        >
          <ng-template let-kommando #item>
            <span class="font-medium">{{ kommando.navn }}</span>
            <span class="text-xs">{{ kommando.hurtigtast }}</span>
          </ng-template>
        </hvi-suggestion>
        <p>Valgt: {{ valgtKommando?.navn ?? 'ingen' }}</p>
      </app-demo-section>

      <app-demo-section
        title="ReadOnly"
        [code]="readonlyCode"
        description="Bruk readOnly når du vil vise valgte verdier som brukeren ikke kan endre. Feltet får samme stil som Select i readonly, og valgte chips kan ikke fjernes."
      >
        <hvi-suggestion
          label="Sykehus"
          placeholder="Søk etter sykehus"
          [readOnly]="true"
          [(ngModel)]="readonlySykehus"
          [suggestions]="sykehus"
        />
        <hvi-suggestion-multiple
          label="Sykehus"
          placeholder="Søk etter sykehus"
          [readOnly]="true"
          [(ngModel)]="readonlySykehuser"
          [suggestions]="sykehus"
        />
      </app-demo-section>
    </app-demo-page>
  `,
})
export class SuggestionDemoComponent {
  readonly standardSuggestionCode = SuggestionStandardSuggestionExampleSource;
  readonly flervalgCode = SuggestionFlervalgExampleSource;
  readonly backendSokCode = SuggestionSokIBackendExampleSource;
  readonly langeListerCode = SuggestionLangeListerExampleSource;
  readonly egenMalForAlternativeneCode = SuggestionEgenMalForAlternativeneExampleSource;
  readonly readonlyCode = SuggestionReadonlyExampleSource;
  readonly leggTilNyeAlternativerCode = SuggestionLeggTilNyeAlternativerExampleSource;

  readonly kommuner = ['Sogndal', 'Bergen', 'Oslo', 'Stavanger', 'Trondheim'];

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

  kommune: string | null = 'Bergen';
  valgteKommuner: string[] = ['Bergen'];

  /**
   * Forhåndsvalgt verdi selv om `apiTreff` er tom — komponenten trenger ikke
   * at verdien finnes i forslagslista for å vise den.
   */
  valgtKommuneFraApi: Kommune | null = { nummer: '4601', navn: 'Bergen' };

  readonly apiTreff = signal<Kommune[]>([]);
  readonly laster = signal(false);

  private readonly query = new Subject<string>();

  /** Stor liste for å vise at bare `maxVisible` alternativer havner i DOM. */
  readonly sensorer: Sensor[] = Array.from({ length: 3000 }, (_, i) => ({
    id: i + 1,
    navn: `Sensor ${String(i + 1).padStart(4, '0')}`,
  }));

  valgteSensorer: Sensor[] = [];

  readonly kommandoer: Kommando[] = [
    { id: 1, navn: 'Nytt dokument', hurtigtast: '⌘N' },
    { id: 2, navn: 'Åpne', hurtigtast: '⌘O' },
    { id: 3, navn: 'Lagre', hurtigtast: '⌘S' },
    { id: 4, navn: 'Lagre som', hurtigtast: '⇧⌘S' },
    { id: 5, navn: 'Søk', hurtigtast: '⌘F' },
  ];

  filtrerteKommandoer: Kommando[] = [];
  valgtKommando: Kommando | null = null;

  constructor() {
    this.query
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => this.hentKommuner(query)),
        takeUntilDestroyed(),
      )
      .subscribe((kommuner) => {
        this.apiTreff.set(kommuner);
        this.laster.set(false);
      });
  }

  sokIApi(event: HviSuggestionCompleteEvent): void {
    if (event.query.length < 2) {
      this.apiTreff.set([]);
      this.laster.set(false);
      return;
    }

    this.laster.set(true);
    this.query.next(event.query);
  }

  sokKommandoer(event: HviSuggestionCompleteEvent): void {
    const query = event.query.toLowerCase();
    this.filtrerteKommandoer = query
      ? this.kommandoer.filter((k) => k.navn.toLowerCase().includes(query))
      : [...this.kommandoer];
  }

  /** Simulert API-kall. I en ekte app ville dette vært en `HttpClient`-forespørsel. */
  private hentKommuner(query: string) {
    const alle: Kommune[] = [
      { nummer: '4601', navn: 'Bergen' },
      { nummer: '4640', navn: 'Sogndal' },
      { nummer: '0301', navn: 'Oslo' },
      { nummer: '1103', navn: 'Stavanger' },
      { nummer: '5001', navn: 'Trondheim' },
      { nummer: '5501', navn: 'Tromsø' },
      { nummer: '4204', navn: 'Kristiansand' },
      { nummer: '3005', navn: 'Drammen' },
    ];

    const treff = alle.filter((k) => k.navn.toLowerCase().includes(query.toLowerCase()));

    return of(treff).pipe(delay(400));
  }
}
