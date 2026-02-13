import { Component } from '@angular/core';
import { HviField, HviFieldset, HviInput, HviLabel, HviParagraph } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-checkbox-demo',
  standalone: true,
  imports: [
    DemoPageComponent,
    DemoSectionComponent,
    HviFieldset,
    HviLabel,
    HviParagraph,
    HviField,
    HviInput,
  ],
  template: `
    <app-demo-page
      title="Checkbox"
      description="Checkbox gir brukerne mulighet til å velge ett eller flere alternativer."
    >
      <app-demo-section
        title="Bekrefting med checkbox"
        description="Hvis brukerne skal bekrefte noe, men ikke velge noe, kan en Checkbox stå alene. For eksempel når brukerne skal bekrefte at noe er riktig, eller samtykke til vilkår."
      >
        <fieldset hviFieldset>
          <legend hviLabel weight="medium">Bekreft at du er over 18 år</legend>
          <p hviParagraph>
            For at vi skal kunne sende deg opplysningen du ber om, må du bekrefte at du er myndig.
          </p>
          <hvi-field>
            <input hviInput type="checkbox" />
            <label hviLabel>Jeg bekrefter at jeg er over 18 år</label>
          </hvi-field>
        </fieldset>
      </app-demo-section>

      <app-demo-section
        title="Gruppering"
        description="Bruk hviFieldset og pakk hver input og label inn i hvi-field for gruppering av flere valg."
      >
        <div class="flex flex-wrap gap-2">
          <fieldset hviFieldset>
            <legend hviLabel weight="medium">Hvordan vil du helst at vi skal kontakte deg?</legend>
            <p hviParagraph>Velg alle alternativene som er relevante for deg.</p>
            <hvi-field>
              <input hviInput type="checkbox" value="epost" checked />
              <label hviLabel>Epost</label>
            </hvi-field>
            <hvi-field>
              <input hviInput type="checkbox" value="telefon" />
              <label hviLabel>Telefon</label>
            </hvi-field>
            <hvi-field>
              <input hviInput type="checkbox" value="sms" />
              <label hviLabel>SMS</label>
            </hvi-field>
          </fieldset>
        </div>
      </app-demo-section>

      <app-demo-section
        title="Med feil"
        description="Når checkbox brukes i grupper, skal feilmeldingen vises på fieldset, så den blir samlet for hele gruppen."
      >
        <fieldset hviFieldset>
          <legend hviLabel>Hvordan vil du helst at vi skal kontakte deg?</legend>
          <p hviParagraph>Velg alle alternativene som er relevante for deg.</p>
          <hvi-field>
            <input hviInput type="checkbox" value="epost" />
            <label hviLabel>Epost</label>
          </hvi-field>
          <hvi-field>
            <input hviInput type="checkbox" value="telefon" />
            <label hviLabel>Telefon</label>
          </hvi-field>
          <hvi-field>
            <input hviInput type="checkbox" value="sms" />
            <label hviLabel>SMS</label>
          </hvi-field>
          <p hviParagraph color="error">Du må velge minst ett kontaktalternativ.</p>
        </fieldset>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class CheckboxDemoComponent {}
