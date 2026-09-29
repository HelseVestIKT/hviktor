import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HviButton, HviCard, HviLink, HviParagraph } from '@helsevestikt/hviktor-angular';
import { HviIconArrowDown } from '../../../../../../projects/icons/src/lib/components/icon-arrow-down.component';
import { HviIconArrowLeft } from '../../../../../../projects/icons/src/lib/components/icon-arrow-left.component';
import { HviIconArrowRight } from '../../../../../../projects/icons/src/lib/components/icon-arrow-right.component';
import { HviIconArrowUp } from '../../../../../../projects/icons/src/lib/components/icon-arrow-up.component';
import { HviIconExclamationmarkTriangle } from '../../../../../../projects/icons/src/lib/components/icon-exclamationmark-triangle.component';
import { HviIconPerson } from '../../../../../../projects/icons/src/lib/components/icon-person.component';
import { HviIconTriangle } from '../../../../../../projects/icons/src/lib/components/icon-triangle.component';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-icon-demo',
  standalone: true,
  imports: [
    HviCard,
    HviButton,
    HviLink,
    HviParagraph,
    DemoPageComponent,
    DemoSectionComponent,
    HviIconArrowDown,
    HviIconArrowLeft,
    HviIconArrowRight,
    HviIconArrowUp,
    HviIconExclamationmarkTriangle,
    HviIconPerson,
    HviIconTriangle,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <app-demo-page componentId="icon">
      <app-demo-section title="Tilgjengelige ikoner">
        <div class="flex flex-wrap gap-4">
          <hvi-card>
            <hvi-icon-arrow-left></hvi-icon-arrow-left>
            <p hviParagraph>ArrowLeft</p>
          </hvi-card>
          <hvi-card>
            <hvi-icon-arrow-up></hvi-icon-arrow-up>
            <p hviParagraph>ArrowUp</p>
          </hvi-card>
          <hvi-card>
            <hvi-icon-arrow-right></hvi-icon-arrow-right>
            <p hviParagraph>ArrowRight</p>
          </hvi-card>
          <hvi-card>
            <hvi-icon-arrow-down></hvi-icon-arrow-down>
            <p hviParagraph>ArrowDown</p>
          </hvi-card>
          <hvi-card>
            <hvi-icon-person></hvi-icon-person>
            <p hviParagraph>Person</p>
          </hvi-card>
          <hvi-card>
            <hvi-icon-exclamationmark-triangle></hvi-icon-exclamationmark-triangle>
            <p hviParagraph>ExclamationmarkTriangle</p>
          </hvi-card>
          <hvi-card>
            <hvi-icon-triangle></hvi-icon-triangle>
            <p hviParagraph>Triangle</p>
          </hvi-card>
        </div>
      </app-demo-section>

      <app-demo-section title="Størrelser">
        <div class="flex flex-wrap gap-4">
          <hvi-card>
            <hvi-icon-arrow-left size="sm"></hvi-icon-arrow-left>
            <p hviParagraph>sm</p>
          </hvi-card>
          <hvi-card>
            <hvi-icon-arrow-left></hvi-icon-arrow-left>
            <p hviParagraph>md</p>
          </hvi-card>
          <hvi-card>
            <hvi-icon-arrow-left size="lg"></hvi-icon-arrow-left>
            <p hviParagraph>lg</p>
          </hvi-card>
          <hvi-card>
            <hvi-icon-arrow-left size="lg"></hvi-icon-arrow-left>
            <p hviParagraph>xl</p>
          </hvi-card>
        </div>
      </app-demo-section>

      <app-demo-section title="Brukseksempler">
        <div class="flex flex-wrap items-center gap-4">
          <button hviButton color="brand1">
            <hvi-icon-arrow-left></hvi-icon-arrow-left>
            Button with icon
          </button>
          <button hviButton color="brand1" variant="tertiary">
            <hvi-icon-arrow-left></hvi-icon-arrow-left>
            Button with icon
          </button>
          <a hviLink href="#">
            <hvi-icon-arrow-left></hvi-icon-arrow-left>
            Link med ikon venstre
          </a>
          <a hviLink href="#">
            Link med ikon høyre
            <hvi-icon-arrow-right></hvi-icon-arrow-right>
          </a>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class IconDemoComponent {}
