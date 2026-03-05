import { Component } from '@angular/core';
import { HviHeading, HviLogo } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-logo-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent, HviLogo, HviHeading],
  template: `
    <app-demo-page
      title="Logo"
      description="Logo viser foretakslogoer for Helse Vest. Logoen responderer automatisk på applikasjonens light/dark mode."
    >
      <app-demo-section title="Størrelser">
        <div class="flex flex-wrap items-end gap-8">
          <div class="flex flex-col items-start gap-1">
            <span class="text-xs text-gray-500">sm (160px)</span>
            <hvi-logo company="helse-vest" size="sm" />
          </div>
          <div class="flex flex-col items-start gap-1">
            <span class="text-xs text-gray-500">md (240px) – standard</span>
            <hvi-logo company="helse-vest" size="md" />
          </div>
          <div class="flex flex-col items-start gap-1">
            <span class="text-xs text-gray-500">lg (320px)</span>
            <hvi-logo company="helse-vest" size="lg" />
          </div>
        </div>
        <p class="mt-4 text-sm">Bytt fargetema i headeren for å se logoen i dark mode.</p>
      </app-demo-section>

      <app-demo-section title="Varianter">
        <h3 hviHeading>hvikt</h3>
        <hvi-logo company="helse-vest-ikt" size="md" />
      </app-demo-section>
    </app-demo-page>
  `,
})
export class LogoDemoComponent {}
