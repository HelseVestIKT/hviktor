import { Component } from '@angular/core';
import { HviBadge, HviBadgePosition, HviButton, HviTag } from '@helsevestikt/hviktor-angular';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { BadgeBaseVariantExampleSource } from './code-examples/badge.base-variant.example.source';
import { BadgeMedPosisjoneringExampleSource } from './code-examples/badge.med-posisjonering.example.source';
import { BadgeStatusIndikatorExampleSource } from './code-examples/badge.status-indikator.example.source';
import { BadgeStorrelserExampleSource } from './code-examples/badge.storrelser.example.source';
import { BadgeTilgjengeligNavnExampleSource } from './code-examples/badge.tilgjengelig-navn.example.source';
import { BadgeTintedVariantExampleSource } from './code-examples/badge.tinted-variant.example.source';
@Component({
  selector: 'app-badge-demo',
  standalone: true,
  imports: [HviBadge, HviBadgePosition, HviButton, DemoPageComponent, DemoSectionComponent, HviTag],
  template: `
    <app-demo-page componentId="badge">
      <app-demo-section title="Base variant" [code]="baseVariantCode">
        <div class="flex flex-wrap items-center gap-2" role="group">
          <hvi-badge color="neutral" count="9+" variant="base"></hvi-badge>
          <hvi-badge color="danger" count="9+" variant="base"></hvi-badge>
          <hvi-badge color="info" count="9+" variant="base"></hvi-badge>
          <hvi-badge color="warning" count="9+" variant="base"></hvi-badge>
          <hvi-badge color="brand1" count="9+" variant="base"></hvi-badge>
          <hvi-badge color="brand2" count="9+" variant="base"></hvi-badge>
          <hvi-badge color="brand3" count="9+" variant="base"></hvi-badge>
          <hvi-badge color="accent" count="9+" variant="base"></hvi-badge>
        </div>
      </app-demo-section>

      <app-demo-section title="Tinted variant" [code]="tintedVariantCode">
        <div class="flex flex-wrap items-center gap-2" role="group">
          <hvi-badge color="neutral" count="9+" variant="tinted"></hvi-badge>
          <hvi-badge color="danger" count="9+" variant="tinted"></hvi-badge>
          <hvi-badge color="info" count="9+" variant="tinted"></hvi-badge>
          <hvi-badge color="warning" count="9+" variant="tinted"></hvi-badge>
          <hvi-badge color="brand1" count="9+" variant="tinted"></hvi-badge>
          <hvi-badge color="brand2" count="9+" variant="tinted"></hvi-badge>
          <hvi-badge color="brand3" count="9+" variant="tinted"></hvi-badge>
          <hvi-badge color="accent" count="9+" variant="tinted"></hvi-badge>
        </div>
      </app-demo-section>

      <app-demo-section title="Størrelser" [code]="storrelserCode">
        <div class="flex flex-wrap items-center gap-2" role="group">
          <hvi-badge color="danger" count="9+" size="sm"></hvi-badge>
          <hvi-badge color="danger" count="9+" size="md"></hvi-badge>
          <hvi-badge color="danger" count="9+" size="lg"></hvi-badge>
        </div>
      </app-demo-section>

      <app-demo-section title="Status indikator" [code]="statusIndikatorCode">
        <div class="flex flex-wrap items-center gap-2" role="group">
          <hvi-badge color="success" variant="base"></hvi-badge>
          <p>Aktiv</p>
        </div>
      </app-demo-section>

      <app-demo-section title="Med posisjonering" [code]="medPosisjoneringCode">
        <div class="flex flex-wrap items-center gap-2" role="group">
          <hvi-badge-position placement="top-left">
            <hvi-badge color="danger" count="3"></hvi-badge>
            <hvi-tag color="info">Tag med badge</hvi-tag>
          </hvi-badge-position>
        </div>
      </app-demo-section>

      <app-demo-section
        title="Tilgjengelig navn"
        description="Når badgen ligger inline, blir innholdet en del av knappens tilgjengelige navn. Når badgen vises som et overlegg eller mangler lesbart innhold, må knappens aria-label beskrive hele budskapet."
        [code]="tilgjengeligNavnCode"
      >
        <div class="flex flex-wrap items-center gap-2" role="group">
          <button hviButton type="button">
            Innboks <hvi-badge color="danger" count="2"></hvi-badge>
          </button>
          <button hviButton type="button" aria-label="Innboks, 2 uleste meldinger">
            <hvi-badge-position placement="top-right">
              <hvi-badge color="danger" count="2"></hvi-badge>
              <span class="pr-4">Innboks</span>
            </hvi-badge-position>
          </button>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class BadgeDemoComponent {
  readonly storrelserCode = BadgeStorrelserExampleSource;

  readonly baseVariantCode = BadgeBaseVariantExampleSource;
  readonly tintedVariantCode = BadgeTintedVariantExampleSource;
  readonly statusIndikatorCode = BadgeStatusIndikatorExampleSource;
  readonly medPosisjoneringCode = BadgeMedPosisjoneringExampleSource;
  readonly tilgjengeligNavnCode = BadgeTilgjengeligNavnExampleSource;
}
