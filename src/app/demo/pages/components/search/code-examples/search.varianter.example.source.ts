// Auto-generated - do not edit manually
export const SearchVarianterExampleSource = `import { Component } from '@angular/core';
import { HviButton, HviDivider, HviInput, HviSearch, HviSearchClear } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-search-varianter-example',
  standalone: true,
  imports: [HviButton, HviDivider, HviInput, HviSearch, HviSearchClear],
  template: \`
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
  \`,
})
export class SearchVarianterExampleComponent {}
`;
