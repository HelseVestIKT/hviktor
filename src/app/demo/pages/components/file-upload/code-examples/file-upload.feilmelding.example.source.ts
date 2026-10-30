// Auto-generated - do not edit manually
export const FileUploadFeilmeldingExampleSource = `import { Component, computed, signal } from '@angular/core';
import { HviFileUpload } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-file-upload-feilmelding-example',
  standalone: true,
  imports: [HviFileUpload],
  template: \`
    <hvi-file-upload
      label="Last opp CV"
      description="Filen må være mindre enn 1 MB"
      [error]="cvFeil()"
      [(value)]="cv"
    />
  \`,
})
export class FileUploadFeilmeldingExampleComponent {
  readonly cv = signal<File[]>([]);
  readonly cvFeil = computed(() =>
    this.cv().some((fil) => fil.size > 1024 * 1024) ? 'Filen er større enn 1 MB' : undefined,
  );
}
`;
