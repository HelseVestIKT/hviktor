import { Component, CUSTOM_ELEMENTS_SCHEMA, input, TemplateRef, viewChild } from '@angular/core';

@Component({
  selector: 'hvi-suggestion-option',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: ` <ng-template #tpl><ng-content /></ng-template> `,

  host: {},
})
export class HviSuggestionOption {
  templateRef = viewChild<TemplateRef<unknown>>('tpl');

  value = input.required<string>();
  label = input.required<string>();
}
