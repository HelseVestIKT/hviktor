import { Component } from '@angular/core';
import { HviFileUpload } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-file-upload-med-beskrivelse-example',
  standalone: true,
  imports: [HviFileUpload],
  template: `
    <hvi-file-upload
      label="Last opp profilbilde"
      dropzoneDescription="Bildet vises for andre brukere i løsningen"
    />
  `,
})
export class FileUploadMedBeskrivelseExampleComponent {}
