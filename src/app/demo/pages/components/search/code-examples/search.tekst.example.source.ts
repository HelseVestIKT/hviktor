// Auto-generated - do not edit manually
export const SearchTekstExampleSource = `import { Component, signal, computed } from '@angular/core';
import { HviButton, HviInput, HviLabel, HviSearch, HviSearchClear } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-search-tekst-example',
  standalone: true,
  imports: [HviButton, HviInput, HviLabel, HviSearch, HviSearchClear],
  template: \`
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
  \`,
})
export class SearchTekstExampleComponent {
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
`;
