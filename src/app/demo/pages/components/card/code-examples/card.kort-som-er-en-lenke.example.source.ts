// Auto-generated - do not edit manually
export const CardKortSomErEnLenkeExampleSource = `import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HviCardBlock, HviCardLink, HviHeading, HviParagraph } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-card-kort-som-er-en-lenke-example',
  standalone: true,
  imports: [HviCardBlock, HviCardLink, HviHeading, HviParagraph, RouterLink],
  template: \`
    <div class="flex flex-wrap gap-4">
      <a hviCardLink href="https://www.helse-bergen.no/" maxWidth="420px" rel="noopener noreferrer">
        <div hviCardBlock>
          <h2 hviHeading>Helse Bergen</h2>
          <p hviParagraph>Hele kortet er klikkbart og navigerer brukeren til en ny URL.</p>
          <p hviParagraph size="sm">helse-bergen.no</p>
        </div>
      </a>
      <a hviCardLink routerLink="/komponenter/button" maxWidth="420px">
        <div hviCardBlock>
          <h2 hviHeading>Button-komponenten</h2>
          <p hviParagraph>Internt lenkekort som navigerer til en annen side i appen.</p>
        </div>
      </a>
    </div>
  \`,
})
export class CardKortSomErEnLenkeExampleComponent {}
`;
