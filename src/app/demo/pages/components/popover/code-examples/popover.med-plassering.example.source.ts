// Auto-generated - do not edit manually
export const PopoverMedPlasseringExampleSource = `import { Component } from '@angular/core';
import { HviButton, HviPopover } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-popover-med-plassering-example',
  standalone: true,
  imports: [HviButton, HviPopover],
  template: \`
    <div class="flex flex-wrap gap-4">
      <button hviButton variant="secondary" popovertarget="popoverTop">Top</button>
      <hvi-popover id="popoverTop" placement="top">Plassert på toppen</hvi-popover>
    
      <button hviButton variant="secondary" popovertarget="popoverBottom">Bottom</button>
      <hvi-popover id="popoverBottom" placement="bottom">Plassert på bunnen</hvi-popover>
    
      <button hviButton variant="secondary" popovertarget="popoverLeft">Left</button>
      <hvi-popover id="popoverLeft" placement="left">Plassert til venstre</hvi-popover>
    
      <button hviButton variant="secondary" popovertarget="popoverRight">Right</button>
      <hvi-popover id="popoverRight" placement="right">Plassert til høyre</hvi-popover>
    </div>
  \`,
})
export class PopoverMedPlasseringExampleComponent {
  
}
`;
