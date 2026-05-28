import { Component } from '@angular/core';
import { HviCard, HviCardBlock, HviHeading, HviLink, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-card-lenkekort-example',
  standalone: true,
  imports: [HviCard, HviCardBlock, HviHeading, HviLink, HviParagraph],
  template: `
    <div class="flex flex-wrap gap-4">
      <hvi-card color="neutral" maxWidth="420px" clickDelegateFor="target1">
        <div hviCardBlock>
          <h2 hviHeading>
            <a id="target1" hviLink href="https://www.helse-bergen.no/" rel="noopener noreferrer"
              >Helse Bergen (helse-bergen.no)</a
            >
          </h2>
          <p hviParagraph>
            Hvis du skal lenke til en ekstern side, så bør det informeres om til brukeren.
          </p>
          <p hviParagraph size="sm">Helse Bergen</p>
        </div>
      </hvi-card>
      <hvi-card color="neutral" maxWidth="420px" clickDelegateFor="target2">
        <div hviCardBlock>
          <h2 hviHeading>
            <a
              id="target2"
              hviLink
              href="https://helsevestikt.github.io/hviktor/komponenter/fieldset"
              rel="noopener noreferrer"
              >Fieldset</a
            >
          </h2>
          <p hviParagraph>Dette er et lenkekort som lenker til en intern side.</p>
        </div>
      </hvi-card>
    </div>
  `,
})
export class CardLenkekortExampleComponent {}
