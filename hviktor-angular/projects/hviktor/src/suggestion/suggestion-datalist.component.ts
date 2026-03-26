import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@u-elements/u-datalist';

@Component({
  selector: 'hvi-suggestion-datalist',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <u-datalist>
      <ng-content />
    </u-datalist>
  `,
  host: {
    style: 'display: contents;',
  },
})
export class HviSuggestionDatalist {}
