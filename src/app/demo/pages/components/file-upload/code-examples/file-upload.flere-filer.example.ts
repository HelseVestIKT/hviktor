import { Component, signal } from '@angular/core';
import { HviFileUpload } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-file-upload-flere-filer-example',
  standalone: true,
  imports: [HviFileUpload],
  template: `
    <hvi-file-upload
      label="Vedlegg"
      description="Du kan laste opp inntil 5 filer i pdf-format"
      accept=".pdf"
      multiple
      [maxFiles]="5"
      [(value)]="vedlegg"
    />
  `,
})
export class FileUploadFlereFilerExampleComponent {
  readonly vedlegg = signal<File[]>([]);
}
