import { Component } from '@angular/core';
import { HviField, HviLabel, HviSelect } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-select-gruppering-example',
  standalone: true,
  imports: [HviField, HviLabel, HviSelect],
  template: `
    <hvi-field>
      <label hviLabel for="avdeling" weight="medium">Velg avdeling</label>
      <select hviSelect id="avdeling" width="auto">
        <option value="" disabled selected>Velg avdeling</option>
        <optgroup label="Haukeland universitetssjukehus">
          <option value="hus-barn">Barne- og ungdomsklinikken</option>
          <option value="hus-kvinne">Kvinneklinikken</option>
          <option value="hus-medisin">Medisinsk klinikk</option>
          <option value="hus-ortopedi">Ortopedisk klinikk</option>
        </optgroup>
        <optgroup label="Voss sjukehus">
          <option value="voss-akutt">Akuttmottak</option>
          <option value="voss-fodsel">Fødeavdeling</option>
          <option value="voss-kirurgi">Kirurgisk avdeling</option>
          <option value="voss-medisin">Medisinsk avdeling</option>
        </optgroup>
      </select>
    </hvi-field>
  `,
})
export class SelectGrupperingExampleComponent {}
