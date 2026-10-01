// Auto-generated - do not edit manually
export const BadgeMedPosisjoneringExampleSource = `import { Component } from '@angular/core';
import { HviBadge, HviBadgePosition, HviTag } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-badge-med-posisjonering-example',
  standalone: true,
  imports: [HviBadge, HviBadgePosition, HviTag],
  template: \`
    <div class="flex flex-wrap items-center gap-2" role="group">
      <hvi-badge-position placement="top-left">
        <hvi-badge color="danger" count="3" aria-label="3"></hvi-badge>
        <hvi-tag color="info">Tag med badge</hvi-tag>
      </hvi-badge-position>
    </div>
  \`,
})
export class BadgeMedPosisjoneringExampleComponent {
  
}
`;
