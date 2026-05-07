import { Component } from '@angular/core';
import {
  HviButton,
  HviCard,
  HviCardBlock,
  HviCardButton,
  HviHeading,
  HviLink,
  HviParagraph,
} from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { CardCardSomErEnKnappExampleSource } from './code-examples/card.card-som-er-en-knapp.example.source';
import { CardFargerOgVarianterExampleSource } from './code-examples/card.farger-og-varianter.example.source';
import { CardLenkekortExampleSource } from './code-examples/card.lenkekort.example.source';
import { CardMedInndelingExampleSource } from './code-examples/card.med-inndeling.example.source';
import { CardStandardExampleSource } from './code-examples/card.standard.example.source';
@Component({
  selector: 'app-card-demo',
  standalone: true,
  imports: [
    HviCard,
    HviCardBlock,
    HviButton,
    HviHeading,
    HviLink,
    HviParagraph,
    DemoPageComponent,
    DemoSectionComponent,
    HviCardButton,
  ],
  template: `
    <app-demo-page componentId="card">
      <app-demo-section title="Standard" [code]="standardCode">
        <div class="flex flex-wrap gap-4">
          <hvi-card maxWidth="320px">
            <h2 hviHeading>Lykkeland Barneskole</h2>
            <p hviParagraph>
              Lykkeland Barneskole er ein trygg og inkluderande nærskule der leik, læring og
              nysgjerrigheit går hand i hand.
            </p>
            <p hviParagraph size="sm">Solslett kommune</p>
          </hvi-card>
        </div>
      </app-demo-section>

      <app-demo-section title="Farger og varianter" [code]="fargerOgVarianterCode">
        <div class="flex flex-wrap gap-4">
          <hvi-card color="accent" variant="default" maxWidth="220px">
            <div hviCardBlock>
              <p hviParagraph>default: accent</p>
            </div>
          </hvi-card>

          <hvi-card color="brand1" variant="default" maxWidth="220px">
            <div hviCardBlock>
              <p hviParagraph>default: brand1</p>
            </div>
          </hvi-card>

          <hvi-card color="brand2" variant="tinted" maxWidth="220px">
            <div hviCardBlock>
              <p hviParagraph>tinted: brand2</p>
            </div>
          </hvi-card>

          <hvi-card color="neutral" variant="tinted" maxWidth="220px">
            <div hviCardBlock>
              <p hviParagraph>tinted: neutral</p>
            </div>
          </hvi-card>
        </div>
      </app-demo-section>

      <app-demo-section title="Med inndeling" [code]="medInndelingCode">
        <div class="flex flex-wrap gap-4">
          <hvi-card color="accent" variant="tinted" maxWidth="380px">
            <div hviCardBlock>
              <video controls width="100%">
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              </video>
            </div>
            <div hviCardBlock>
              <h3 hviHeading>Om Designsystemet</h3>
              <p hviParagraph>
                Videoen over gir en kort introduksjon til hva Designsystemet er, og hvordan det kan
                brukes i utviklingen av digitale tjenester.
              </p>
              <button hviButton variant="secondary">Vis mer</button>
            </div>
          </hvi-card>
        </div>
      </app-demo-section>

      <app-demo-section title="Lenkekort" [code]="lenkekortCode">
        <div class="flex flex-wrap gap-4">
          <hvi-card color="neutral" maxWidth="420px" clickDelegateFor="target1">
            <div hviCardBlock>
              <h2 hviHeading>
                <a
                  id="target1"
                  hviLink
                  href="https://designsystemet.no/no/components/docs/card/overview#lenkekort"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Card (åpnes i ny fane)</a
                >
              </h2>
              <p hviParagraph>
                Hvis du skal lenke til en ekstern side i en ny fane, så bør det informeres om til
                brukeren.
              </p>
              <p hviParagraph size="sm">Designsystemet.no</p>
            </div>
          </hvi-card>
          <hvi-card color="neutral" maxWidth="420px" clickDelegateFor="target2">
            <div hviCardBlock>
              <h2 hviHeading>
                <a
                  id="target2"
                  hviLink
                  href="https://helsevestikt.github.io/hviktor/komponenter/button"
                  rel="noopener noreferrer"
                  >Button</a
                >
              </h2>
              <p hviParagraph>Dette er et lenkekort som lenker til en intern side i samme fane.</p>
            </div>
          </hvi-card>
        </div>
      </app-demo-section>

      <app-demo-section title="Card som er en knapp" [code]="cardSomErEnKnappCode">
        <div class="flex flex-wrap gap-4">
          <button hviCardButton maxWidth="420px">
            <div hviCardBlock>
              <h2 hviHeading>Innstillinger og personvern</h2>
              <p hviParagraph>
                Dette åpner en dialog der du kan oppdatere personvernvalg, justere innstillinger og
                tilpasse hvordan tjenesten behandler informasjonen din. Du kan se gjennom endringene
                før du lagrer.
              </p>
              <p hviParagraph size="sm">Innstillinger og personvern</p>
            </div>
          </button>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class CardDemoComponent {
  readonly cardSomErEnKnappCode = CardCardSomErEnKnappExampleSource;
  readonly standardCode = CardStandardExampleSource;
  readonly fargerOgVarianterCode = CardFargerOgVarianterExampleSource;
  readonly medInndelingCode = CardMedInndelingExampleSource;
  readonly lenkekortCode = CardLenkekortExampleSource;
}
