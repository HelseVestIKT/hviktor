import { Component } from '@angular/core';
import { HviLogo } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-logo-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent, HviLogo],
  template: `
    <app-demo-page
      title="Logo"
      description="Logo viser foretakslogoer for Helse Vest. Logoen responderer automatisk på applikasjonens light/dark mode."
    >
      <app-demo-section title="Helse Vest">
        <div class="flex flex-wrap gap-4">
          <hvi-logo company="helse-vest" />
        </div>
        <p class="mt-2">Bytt fargetema i headeren for å se logoen i dark mode.</p>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class LogoDemoComponent {}
