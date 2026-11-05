// Auto-generated - do not edit manually
export const RequiredTagModesExampleSource = `import { Component } from '@angular/core';
import { HviLink, HviParagraph, HviRequiredTag } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-required-tag-modes-example',
  standalone: true,
  imports: [HviLink, HviParagraph, HviRequiredTag],
  template: \`
    <div class="flex flex-wrap gap-2">
      <hvi-required-tag mode="required" />
      <hvi-required-tag mode="optional" />
      <hvi-required-tag mode="all-required" />
    </div>

    <div class="my-4">
      <p hviParagraph>
        Se siden om <a href="/hviktor/komponenter/form" hviLink>Form</a> for enda flere eksempler.
      </p>
    </div>
  \`,
})
export class RequiredTagModesExampleComponent {}
`;
