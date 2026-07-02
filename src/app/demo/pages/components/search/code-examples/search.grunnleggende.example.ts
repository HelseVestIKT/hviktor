import { Component } from '@angular/core';
import { HviButton, HviInput, HviSearch, HviSearchClear } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-search-grunnleggende-example',
  standalone: true,
  imports: [HviButton, HviInput, HviSearch, HviSearchClear],
  template: `
    <form role="search">
      <hvi-search class="max-w-md">
        <input hviInput type="search" placeholder="" aria-label="Søk" />
        <button hviSearchClear aria-label="Tøm"></button>
        <button hviButton variant="primary" type="submit">Søk</button>
      </hvi-search>
    </form>
  `,
})
export class SearchGrunnleggendeExampleComponent {}
