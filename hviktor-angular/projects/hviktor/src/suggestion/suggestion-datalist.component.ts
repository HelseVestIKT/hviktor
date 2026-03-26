import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChildren, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import '@u-elements/u-datalist';
import { HviSuggestionOption } from './suggestion-option';

@Component({
  selector: 'hvi-suggestion-datalist',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgTemplateOutlet],
  template: `
    <u-datalist>
      @for (option of options(); track option) {
        <u-option [attr.data-value]="value" [attr.data-label]="label">
          <ng-container *ngTemplateOutlet="option.templateRef()" />
        </u-option>
      }
    </u-datalist>
  `,
  host: {
    style: 'display: contents;',
  },
})
export class HviSuggestionDatalist {
  readonly options = contentChildren(HviSuggestionOption, {
    descendants: true,
  });

  @Input() value: string | undefined;
  @Input() label: string | undefined;
}
