import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  HviAvatar,
  HviAlert,
  HviButton,
  HviHeading,
  HviParagraph,
  HviDivider,
  HviCard,
  HviLink,
  HviDetails,
  HviDetailsSummary,
  HviDetailsContent,
  HviCardBlock,
  HviLabel,
  HviBreadcrumbs,
  HviBadgePosition,
  HviBadge,
  HviFieldset,
  HviField,
  HviFieldDescription,
  HviFieldOptional,
  HviFieldAffix,
  HviFieldAffixes,
  HviInput,
  HviChipLabel,
  HviIcon
} from '@helsevestikt/hviktor';
// your-main-app-file.js
import '@u-elements/u-details';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HviButton,
    HviAlert,
    HviAvatar,
    HviBadge,
    HviDetails,
    HviLink,
    HviDivider,
    HviDetailsSummary,
    HviDetailsContent,
    HviHeading,
    HviParagraph,
    HviCard,
    HviCardBlock,
    HviLabel,
    HviBreadcrumbs,
    HviBadgePosition,
    HviFieldset,
    HviField,
    HviFieldDescription,
    HviFieldOptional,
    HviFieldAffix,
    HviFieldAffixes,
    HviInput,
    HviChipLabel,
    HviIcon
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hviktor-angular');
}
