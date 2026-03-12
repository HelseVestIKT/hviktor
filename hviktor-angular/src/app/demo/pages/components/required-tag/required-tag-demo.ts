import { Component } from '@angular/core';
import { HviLabel, HviParagraph, HviRequiredTag } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { RequiredTagEksempelExampleSource } from './code-examples/required-tag.eksempel.example.source';
@Component({
  selector: 'app-required-tag-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent, HviRequiredTag, HviLabel, HviParagraph],
  template: `
    <app-demo-page componentId="required-tag">
      <app-demo-section
        title="Eksempel"
        [code]="eksempelCode"
        description="I seg selv er RequiredTag en HviTag, men den har et sett med labels utifra hvilken mode som velges; required (default), optional eller all-required."
      >
        <div class="space-y-4">
          <div>
            <p hviParagraph>
              <code>all-required</code> brukes i starten av et skjema der alle felt er påkrevd.
            </p>
            <hvi-required-tag mode="all-required" />
          </div>

          <p hviParagraph>
            I skjema med en blanding av påkrevde og valgfrie felt skal hvert felt merkes
            individuelt.
          </p>
          <div class="flex gap-1">
            <label hviLabel>Dette feltet er påkrevd</label>
            <hvi-required-tag />
          </div>
          <div class="flex gap-1">
            <label hviLabel>Dette feltet er valgfritt</label>
            <hvi-required-tag mode="optional" />
          </div>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class RequiredTagDemoComponent {
  readonly eksempelCode = RequiredTagEksempelExampleSource;
}
