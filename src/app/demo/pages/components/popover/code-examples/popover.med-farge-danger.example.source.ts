// Auto-generated - do not edit manually
export const PopoverMedFargeDangerExampleSource = `import { Component } from '@angular/core';
import { HviButton, HviLink, HviParagraph, HviPopover } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-popover-med-farge-danger-example',
  standalone: true,
  imports: [HviButton, HviLink, HviParagraph, HviPopover],
  template: \`
    <div class="flex flex-col gap-4">
      <p hviParagraph>
        Du kan bruke
        <code>popovertargetaction="hide"</code> på f.eks. en "Avbryt"-knapp hvis popoveren bare skal
        lukkes ved klikk. Se videre dokumentasjon på
        <a hviLink href="https://designsystemet.no/no/components/docs/popover/code" target="_blank"
          >designsystemet.no</a
        >
        for mer informasjon om kontrollert popover.
      </p>
      <div class="flex flex-wrap gap-4">
        <button hviButton color="danger" popovertarget="popoverDanger">Slett</button>
        <hvi-popover id="popoverDanger" color="danger" aria-labelledby="popoverDangerTitle">
          <p hviParagraph id="popoverDangerTitle">Er du sikker på at du vil slette?</p>
          <div class="mt-2 flex gap-2">
            <button hviButton size="sm" color="danger">Slett</button>
            <button
              hviButton
              size="sm"
              variant="tertiary"
              popovertarget="popoverDanger"
              popovertargetaction="hide"
            >
              Avbryt
            </button>
          </div>
        </hvi-popover>
      </div>
    </div>
  \`,
})
export class PopoverMedFargeDangerExampleComponent {}
`;
