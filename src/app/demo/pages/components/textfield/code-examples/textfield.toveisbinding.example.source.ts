// Auto-generated - do not edit manually
export const TextfieldToveisbindingExampleSource = `import { Component, signal } from '@angular/core';
import { HviButton, HviTextfield } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-textfield-toveisbinding-example',
  standalone: true,
  imports: [HviButton, HviTextfield],
  template: \`
    <div class="space-y-4">
      <hvi-textfield label="Navn" [(value)]="navn" />
      <p>Verdi: {{ navn() || 'tom' }}</p>
      <button hviButton variant="secondary" (click)="navn.set('Kari Nordmann')">
        Sett verdi utenfra
      </button>
    </div>
  \`,
})
export class TextfieldToveisbindingExampleComponent {
  readonly navn = signal('');
}
`;
