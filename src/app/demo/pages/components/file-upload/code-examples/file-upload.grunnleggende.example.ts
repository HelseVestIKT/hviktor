import { Component } from '@angular/core';
import { HviFileUpload } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-file-upload-grunnleggende-example',
  standalone: true,
  imports: [HviFileUpload],
  template: `
    <hvi-file-upload
      label="Last opp profilbilde"
      description="Filen må være i png- eller jpg-format og mindre enn 2 MB"
      accept=".png,.jpg,.jpeg"
    />
  `,
})
export class FileUploadGrunnleggendeExampleComponent {}
