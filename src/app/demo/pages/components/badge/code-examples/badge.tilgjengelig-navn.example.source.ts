// Auto-generated - do not edit manually
export const BadgeTilgjengeligNavnExampleSource = `import { Component } from '@angular/core';
import { HviBadge, HviBadgePosition, HviButton } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-badge-tilgjengelig-navn-example',
  standalone: true,
  imports: [HviBadge, HviBadgePosition, HviButton],
  template: \`
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
  \`,
})
export class BadgeTilgjengeligNavnExampleComponent {
  
}
`;
