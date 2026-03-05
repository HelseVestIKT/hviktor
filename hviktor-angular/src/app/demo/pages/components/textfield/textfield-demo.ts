import { Component } from '@angular/core';
import { HviTextfield } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';
@Component({
  selector: 'app-textfield-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent, HviTextfield],
  template: `
    <app-demo-page
      title="Textfield"
      description="Textfield gir brukere muligheten til å skrive fritekst eller tall. Dette er en sammensatt komponent som bruker Field, Input/Textarea og Label under panseret."
    >
      <!-- Grunnleggende -->
      <app-demo-section title="Grunnleggende" description="Et enkelt tekstfelt med label.">
        <hvi-textfield label="Label"></hvi-textfield>
      </app-demo-section>

      <!-- Med rader -->
      <app-demo-section
        title="Med rader"
        description="Bruk multiline for å rendre en textarea i stedet for input."
      >
        <hvi-textfield label="Label" [multiline]="true" [rows]="4"></hvi-textfield>
      </app-demo-section>

      <!-- Med prefiks og suffiks -->
      <app-demo-section
        title="Med prefiks og suffiks"
        description="Prefixer og suffixer er nyttige for å vise enheter, valuta eller annen relevant informasjon."
      >
        <hvi-textfield
          label="Hvor mange kroner koster det per måned?"
          prefix="NOK"
          suffix="pr. mnd"
        ></hvi-textfield>
      </app-demo-section>

      <!-- Med teller -->
      <app-demo-section
        title="Med teller"
        description="Bruk counterLimit for å vise en tegnteller under feltet."
      >
        <hvi-textfield
          label="Hvor mange kroner koster det per måned?"
          [counterLimit]="10"
        ></hvi-textfield>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class TextfieldDemoComponent {}
