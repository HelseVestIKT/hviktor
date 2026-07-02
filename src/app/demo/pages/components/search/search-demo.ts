import { Component, computed, signal } from '@angular/core';
import {
  HviAlert,
  HviButton,
  HviDivider,
  HviHeading,
  HviInput,
  HviLabel,
  HviList,
  HviSearch,
  HviSearchClear,
} from '@helsevestikt/hviktor-angular';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { SearchGrunnleggendeExampleSource } from './code-examples/search.grunnleggende.example.source';
import { SearchTekstExampleSource } from './code-examples/search.tekst.example.source';
import { SearchVarianterExampleSource } from './code-examples/search.varianter.example.source';
@Component({
  selector: 'app-search-demo',
  standalone: true,
  imports: [
    DemoPageComponent,
    DemoSectionComponent,
    HviSearch,
    HviSearchClear,
    HviInput,
    HviButton,
    HviLabel,
    HviDivider,
    HviAlert,
    HviList,
    HviHeading,
  ],
  template: `
    <app-demo-page componentId="search">
      <hvi-alert title="Har du husket å legge til <form> rundt søket?" class="mb-8">
        <p hviParagraph>
          Submit-knapper har som standard ingen funksjon hvis de ikke er knyttet til et
          form-element. Vi anbefaler derfor å bruke et form-element rundt komponenten og en onSubmit
          for å håndtere innsending. Form med role="search" rundt Search hjelper også noen
          skjermlesere å tolke søkefeltet som et søk. Vi har den ikke innebygd i komponenten i
          tilfelle du skal bruke søk sammen med flere input-felter i et skjema.
        </p>
      </hvi-alert>

      <!-- Grunnleggende -->
      <app-demo-section title="Grunnleggende" [code]="grunnleggendeCode">
        <form role="search">
          <hvi-search class="max-w-md">
            <input hviInput type="search" placeholder="" aria-label="Søk" />
            <button hviSearchClear aria-label="Tøm"></button>
            <button hviButton variant="primary" type="submit">Søk</button>
          </hvi-search>
        </form>
      </app-demo-section>

      <div class="mb-8 flex flex-col gap-4">
        <p><strong>Bruk search når</strong></p>
        <ul hviList>
          <li>
            brukerne trenger hjelp med å finne relevant informasjon raskt på et nettsted eller i en
            applikasjon
          </li>
          <li>
            situasjoner der brukerne skriver nøkkelord eller setninger for å finne mest relevant
            innhold oppstår
          </li>
        </ul>

        <p><strong>Unngå search når</strong></p>
        <ul hviList>
          <li>innholdet er lett å navigere uten søk</li>
          <li>
            det er en erstatning for god navigasjon. Søk skal være et supplement, ikke eneste
            navigasjonsmetode
          </li>
        </ul>
      </div>
      <!-- Varianter -->
      <app-demo-section
        title="Varianter"
        [code]="varianterCode"
        description="Du kan endre variant på Button for å tilpasse visningen. Alternativt kan du fjerne knappen for å bruke et søkefelt med ikon."
      >
        <div class="grid gap-4">
          <!-- Kun med ikon -->
          <form role="search">
            <hvi-search class="max-w-md">
              <input hviInput type="search" placeholder="" aria-label="Søk" />
              <button hviSearchClear aria-label="Tøm"></button>
            </hvi-search>
          </form>

          <hr hviDivider aria-hidden="true" />

          <!-- Med primær knapp -->
          <form role="search">
            <hvi-search class="max-w-md">
              <input hviInput type="search" placeholder="" aria-label="Søk" />
              <button hviSearchClear aria-label="Tøm"></button>
              <button hviButton variant="primary" type="submit">Søk</button>
            </hvi-search>
          </form>

          <hr hviDivider aria-hidden="true" />

          <!-- Med sekundær knapp -->
          <form role="search">
            <hvi-search class="max-w-md">
              <input hviInput type="search" placeholder="" aria-label="Søk" />
              <button hviSearchClear aria-label="Tøm"></button>
              <button hviButton variant="secondary" type="submit">Søk</button>
            </hvi-search>
          </form>
        </div>
      </app-demo-section>

      <h2 hviHeading size="md">Retningslinjer</h2>
      <p class="mb-8 max-w-3xl">
        Bredden på søkefeltet bør tilsvare lengden på søkeordene brukerne vanligvis skriver inn.
        Størrelsen på feltet er et viktig signal om hva de kan skrive inn. For eksempel bør et
        søkefelt for personnumre ha en bredde som tilsvarer et personnummer. Hovedsøkefeltet for et
        nettsted bør være bredere, slik at brukerne kan se flere ord samtidig. For å unngå at
        brukerne må scrolle i søkefeltet må vi unngå søkefelt som er så korte at deler av innholdet
        ikke synes.
      </p>

      <!-- Med Label -->
      <app-demo-section
        title="Tekst"
        [code]="tekstCode"
        description="Placeholder-tekst bør brukes med forsiktighet, da den forsvinner når brukeren skriver og kan skape forvirring. Den må også oppfylle kontrastkrav for tilgjengelighet, noe som kan gjøre teksten vanskelig å skille fra utfylt innhold. Skjermlesere håndterer placeholder-tekst ulikt, så informasjonen bør heller gis via label eller beskrivelse.
        Du bør bruke label over søkefeltet når det ikke er åpenbart hva brukeren skal søke etter, eller når søkefeltet er en del av et skjema."
      >
        <form (submit)="onCatSearchSubmit($event)" role="search">
          <label hviLabel weight="medium">Søk etter katter</label>
          <hvi-search class="max-w-md">
            <input
              hviInput
              type="search"
              placeholder=""
              name="cat-search"
              [value]="catSearchInput()"
              (input)="onCatSearchInput($event)"
            />
            <button hviSearchClear aria-label="Tøm" (click)="clearCatSearch()"></button>
            <button hviButton variant="primary" type="submit">Søk</button>
          </hvi-search>
        </form>

        @if (hasSubmittedCatSearch()) {
          <ul class="mt-4 list-disc pl-5">
            @for (breed of filteredCatBreeds(); track breed) {
              <li>{{ breed }}</li>
            }
          </ul>

          @if (filteredCatBreeds().length === 0) {
            <p class="mt-3">Ingen katteraser matcher søket.</p>
          }
        }
      </app-demo-section>
    </app-demo-page>
  `,
})
export class SearchDemoComponent {
  readonly tekstCode = SearchTekstExampleSource;

  readonly grunnleggendeCode = SearchGrunnleggendeExampleSource;
  readonly varianterCode = SearchVarianterExampleSource;

  readonly catSearchInput = signal('');
  readonly catQuery = signal('');
  readonly hasSubmittedCatSearch = signal(false);
  readonly catBreeds = [
    'Maine Coon',
    'Norsk skogkatt',
    'Bengal',
    'Ragdoll',
    'Siamese',
    'British Shorthair',
    'Perser',
    'Hellig Birma',
    'Sphynx',
    'Abyssiner',
    'Burmeser',
    'Russian Blue',
    'Devon Rex',
  ];

  readonly filteredCatBreeds = computed(() => {
    const query = this.catQuery().trim().toLowerCase();
    if (!query) {
      return [];
    }

    return this.catBreeds.filter((breed) => breed.toLowerCase().includes(query));
  });

  onCatSearchSubmit(event: Event): void {
    event.preventDefault();
    this.hasSubmittedCatSearch.set(true);
    this.catQuery.set(this.catSearchInput());
  }

  clearCatSearch(): void {
    this.catSearchInput.set('');
    this.catQuery.set('');
    this.hasSubmittedCatSearch.set(false);
  }

  onCatSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    this.catSearchInput.set(input?.value ?? '');
  }
}
