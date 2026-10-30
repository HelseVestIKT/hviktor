// Auto-generated - do not edit manually
export const FileUploadFlereFilerExampleSource = `import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HviFileUpload } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-file-upload-flere-filer-example',
  standalone: true,
  imports: [HviFileUpload],
  template: \`
    <hvi-file-upload
      label="Vedlegg"
      description="Du kan laste opp inntil 5 filer i pdf-format"
      accept=".pdf"
      multiple
      [(value)]="vedlegg"
    />
  \`,
})
export class FileUploadFlereFilerExampleComponent {
  readonly vedlegg = signal<File[]>([]);
}
`;
