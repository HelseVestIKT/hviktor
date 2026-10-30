import { Component, signal } from '@angular/core';
import { HviFileUpload, HviList } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-file-upload-flere-filer-example',
  standalone: true,
  imports: [HviFileUpload, HviList],
  template: `
    <div class="space-y-4">
      <hvi-file-upload
        label="Vedlegg"
        description="Du kan laste opp inntil 5 filer i pdf-format"
        accept=".pdf"
        multiple
        [(value)]="vedlegg"
      />
      @if (vedlegg().length) {
        <ul hviList>
          @for (fil of vedlegg(); track fil.name) {
            <li>{{ fil.name }}</li>
          }
        </ul>
      }
    </div>
  `,
})
export class FileUploadFlereFilerExampleComponent {
  readonly vedlegg = signal<File[]>([]);
}
