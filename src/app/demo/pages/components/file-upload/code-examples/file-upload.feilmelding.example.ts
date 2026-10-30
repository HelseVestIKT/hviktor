import { Component, computed, signal } from '@angular/core';
import { HviFileUpload } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-file-upload-feilmelding-example',
  standalone: true,
  imports: [HviFileUpload],
  template: `
    <hvi-file-upload
      label="Last opp CV"
      description="Filen må være i pdf- eller Word-format og mindre enn 1 MB"
      accept=".pdf,.doc,.docx"
      [error]="cvFeil()"
      [(value)]="cv"
    />
  `,
})
export class FileUploadFeilmeldingExampleComponent {
  readonly cv = signal<File[]>([]);
  readonly cvFeil = computed(() =>
    this.cv().some((fil) => fil.size > 1024 * 1024) ? 'Filen er større enn 1 MB' : undefined,
  );
}
