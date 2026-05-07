import { Component } from '@angular/core';
import { HviAlert } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-alert-uten-tittel-example',
  standalone: true,
  imports: [HviAlert],
  template: `
    <div class="flex flex-wrap gap-2">
      <hvi-alert color="warning">
        Vi har tekniske problemer. Vi jobber med å rette problemene.
      </hvi-alert>
    </div>
  `,
})
export class AlertUtenTittelExampleComponent {}
