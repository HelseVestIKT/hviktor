import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HviButton, HviFileUpload, HviParagraph } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-file-upload-sende-filene-til-et-api-example',
  standalone: true,
  imports: [HviButton, HviFileUpload, HviParagraph, ReactiveFormsModule],
  template: `
    <form [formGroup]="soknad" (ngSubmit)="send()" class="space-y-4">
      <hvi-file-upload
        label="Vedlegg til søknaden"
        description="Legg ved CV og attester i pdf-format"
        accept=".pdf"
        multiple
        required
        formControlName="vedlegg"
        [error]="visVedleggFeil() ? 'Du må legge ved minst én fil' : undefined"
      />
      <button hviButton type="submit">Send søknad</button>
      @if (sendt(); as filnavn) {
        <p hviParagraph role="status">Klar til å sende {{ filnavn }} til /api/soknad</p>
      }
    </form>
  `,
})
export class FileUploadSendeFileneTilEtApiExampleComponent {
  readonly soknad = new FormGroup({
    vedlegg: new FormControl<File[]>([], { nonNullable: true, validators: Validators.required }),
  });
  readonly forsoktSendt = signal(false);
  readonly sendt = signal('');

  visVedleggFeil(): boolean {
    return this.forsoktSendt() && this.soknad.controls.vedlegg.invalid;
  }

  send(): void {
    this.forsoktSendt.set(true);
    if (this.soknad.invalid) return;

    const formData = new FormData();
    for (const fil of this.soknad.controls.vedlegg.value) {
      formData.append('vedlegg', fil, fil.name);
    }

    // I en ekte løsning sender du formData til API-et ditt, f.eks. med HttpClient:
    // this.http.post('/api/soknad', formData).subscribe();
    const antall = formData.getAll('vedlegg').length;
    this.sendt.set(antall === 1 ? '1 fil' : antall + ' filer');
  }
}
