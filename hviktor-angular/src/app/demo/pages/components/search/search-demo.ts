import { Component } from '@angular/core';
import {
  HviDivider,
  HviField,
  HviLabel,
  HviSearch,
  HviSearchButton,
  HviSearchClear,
  HviSearchInput,
} from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-search-demo',
  standalone: true,
  imports: [
    DemoPageComponent,
    DemoSectionComponent,
    HviSearch,
    HviSearchInput,
    HviSearchClear,
    HviSearchButton,
    HviField,
    HviLabel,
    HviDivider,
  ],
  template: `
    <app-demo-page
      title="Search"
      description="Search lar brukere raskt finne relevant innhold på et nettsted eller i en applikasjon. Komponenten består av et søkefelt, med eller uten en søkeknapp."
    >
      <app-demo-section title="Eksempel">
        <div hviSearch>
          <input hviSearchInput aria-label="Søk" placeholder="" />
          <button hviSearchClear aria-label="Tøm"></button>
          <button hviSearchButton>Søk</button>
        </div>
      </app-demo-section>

      <app-demo-section
        title="Varianter"
        description="Du kan endre variant på Button for å tilpasse visningen. Alternativt kan du fjerne knappen for å bruke et søkefelt med ikon."
      >
        <div class="flex flex-col gap-4">
          <!-- Kun med ikon (uten søkeknapp) -->
          <div hviSearch>
            <input hviSearchInput aria-label="Søk" placeholder="" />
            <button hviSearchClear aria-label="Tøm"></button>
          </div>

          <hr hviDivider />

          <!-- Med primary knapp -->
          <div hviSearch>
            <input hviSearchInput aria-label="Søk" placeholder="" />
            <button hviSearchClear aria-label="Tøm"></button>
            <button hviSearchButton variant="primary">Søk</button>
          </div>

          <hr hviDivider />

          <!-- Med secondary knapp -->
          <div hviSearch>
            <input hviSearchInput aria-label="Søk" placeholder="" />
            <button hviSearchClear aria-label="Tøm"></button>
            <button hviSearchButton variant="secondary">Søk</button>
          </div>
        </div>
      </app-demo-section>

      <app-demo-section
        title="Med Label"
        description="Bruk en label over søkefeltet når det ikke er åpenbart hva brukeren skal søke etter, eller når søkefeltet er en del av et skjema."
      >
        <hvi-field>
          <label hviLabel for="cat-search" weight="medium">Søk etter katter</label>
          <div hviSearch>
            <input hviSearchInput id="cat-search" name="cat-search" placeholder="" />
            <button hviSearchClear aria-label="Tøm"></button>
            <button hviSearchButton>Søk</button>
          </div>
        </hvi-field>
      </app-demo-section>

      <app-demo-section title="I skjema" description="Search inne i et form-element.">
        <form (submit)="onSubmit($event)">
          <div hviSearch>
            <input hviSearchInput aria-label="Søk" placeholder="" name="search" #searchInput />
            <button hviSearchClear aria-label="Tøm"></button>
            <button hviSearchButton>Søk</button>
          </div>
        </form>
        @if (submittedValue) {
          <p class="mt-2">Søkte etter: {{ submittedValue }}</p>
        }
      </app-demo-section>
    </app-demo-page>
  `,
})
export class SearchDemoComponent {
  submittedValue = '';

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    this.submittedValue = formData.get('search') as string;
  }
}
