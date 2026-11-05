import { Component } from '@angular/core';
import {
  HviField,
  HviLabel,
  HviMultiSelect,
  HviMultiSelectOption,
} from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-multi-select-standard-example',
  standalone: true,
  imports: [HviField, HviLabel, HviMultiSelect],
  template: `
    <div class="flex max-w-sm flex-col gap-4">
      <hvi-field>
        <label hviLabel>Velg kommuner</label>
        <hvi-multi-select [options]="kommuner" placeholder="Velg kommuner..." />
      </hvi-field>
    </div>
  `,
})
export class MultiSelectStandardExampleComponent {
  readonly kommuner: HviMultiSelectOption[] = [
    { label: 'Oslo', value: 'oslo' },
    { label: 'Bergen', value: 'bergen' },
    { label: 'Trondheim', value: 'trondheim' },
    { label: 'Stavanger', value: 'stavanger' },
    { label: 'Tromsø', value: 'tromso' },
    { label: 'Kristiansand', value: 'kristiansand' },
    { label: 'Drammen', value: 'drammen' },
    { label: 'Fredrikstad', value: 'fredrikstad' },
    { label: 'Sandnes', value: 'sandnes' },
    { label: 'Bodø', value: 'bodo' },
  ];
}
