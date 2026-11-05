// Auto-generated - do not edit manually
export const ToastFilLastetOppExampleSource = `import { Component } from '@angular/core';
import { HviFileUpload } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-toast-fil-lastet-opp-example',
  standalone: true,
  imports: [HviFileUpload],
  template: \`
    <div class="max-w-md">
      <hvi-file-upload
        label="Vedlegg"
        description="Du kan laste opp inntil 5 filer i pdf-, png- eller jpg-format"
        accept=".pdf,.png,.jpg"
        multiple
        [maxFiles]="5"
        [(value)]="vedlegg"
      />
    </div>
  \`,
})
export class ToastFilLastetOppExampleComponent {
  vedlegg: File[] = [];
}
`;
