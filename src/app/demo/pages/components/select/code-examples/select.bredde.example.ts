import { Component } from '@angular/core';
import { HviField, HviLabel, HviSelect } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-select-bredde-example',
  standalone: true,
  imports: [HviField, HviLabel, HviSelect],
  template: `
    <hvi-field>
      <label hviLabel for="fylke" weight="medium">Hvilket fylke bor du i?</label>
      <select hviSelect id="fylke" width="auto">
        <option value="" disabled selected>Velg fylke</option>
        <option value="agder">Agder</option>
        <option value="akershus">Akershus</option>
        <option value="buskerud">Buskerud</option>
        <option value="finnmark">Finnmark</option>
        <option value="innlandet">Innlandet</option>
        <option value="more-og-romsdal">Møre og Romsdal</option>
        <option value="nordland">Nordland</option>
        <option value="oslo">Oslo</option>
        <option value="rogaland">Rogaland</option>
        <option value="telemark">Telemark</option>
        <option value="troms">Troms</option>
        <option value="trondelag">Trøndelag</option>
        <option value="vestfold">Vestfold</option>
        <option value="vestland">Vestland</option>
        <option value="ostfold">Østfold</option>
      </select>
    </hvi-field>
  `,
})
export class SelectBreddeExampleComponent {}
