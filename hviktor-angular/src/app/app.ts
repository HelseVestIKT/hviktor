import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HviAvatar, HviAlert, HviButton, HviHeading, HviParagraph, HviDivider, HviCard, HviDetails, HviDetailsSummary, HviDetailsContent, HviCardBlock, HviLabel, HviBreadcrumbs, HviBadgePosition, HviBadge, HviFieldset, HviField, HviFieldDescription, HviFieldOptional, HviFieldAffix, HviFieldAffixes, HviInput, HviChipLabel, HviChipButton, HviDialog  } from '@helsevestikt/hviktor';
import '@u-elements/u-details';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HviButton, HviAlert, HviAvatar, HviBadge, HviDetails, HviDivider, HviDetailsSummary, HviDetailsContent, HviHeading, HviParagraph, HviCard, HviCardBlock, HviLabel, HviBreadcrumbs, HviBadgePosition, HviFieldset, HviField, HviFieldDescription, HviFieldOptional, HviFieldAffix, HviFieldAffixes, HviInput, HviChipLabel, HviChipButton, HviDialog],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly dialogOpen = signal(false);

  protected openDialog(): void {
    this.dialogOpen.set(true);
  }

  protected closeDialog(): void {
    this.dialogOpen.set(false);
  }

  protected handleDialogChange(isOpen: boolean): void {
    this.dialogOpen.set(isOpen);
  }
}
