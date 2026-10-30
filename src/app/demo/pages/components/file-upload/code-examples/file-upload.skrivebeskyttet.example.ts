import { Component } from '@angular/core';
import { HviFileUpload } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-file-upload-skrivebeskyttet-example',
  standalone: true,
  imports: [HviFileUpload],
  template: ` <hvi-file-upload label="Last opp fil" readOnly /> `,
})
export class FileUploadSkrivebeskyttetExampleComponent {}
