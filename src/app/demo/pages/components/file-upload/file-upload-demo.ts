import { Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HviButton, HviFileUpload, HviParagraph } from '@helsevestikt/hviktor-angular';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { FileUploadFeilmeldingExampleSource } from './code-examples/file-upload.feilmelding.example.source';
import { FileUploadFlereFilerExampleSource } from './code-examples/file-upload.flere-filer.example.source';
import { FileUploadGrunnleggendeExampleSource } from './code-examples/file-upload.grunnleggende.example.source';
import { FileUploadMedBeskrivelseExampleSource } from './code-examples/file-upload.med-beskrivelse.example.source';
import { FileUploadSendeFileneTilEtApiExampleSource } from './code-examples/file-upload.sende-filene-til-et-api.example.source';

@Component({
  selector: 'app-file-upload-demo',
  standalone: true,
  imports: [
    DemoPageComponent,
    DemoSectionComponent,
    HviFileUpload,
    HviButton,
    HviParagraph,
    ReactiveFormsModule,
  ],
  template: `
    <app-demo-page componentId="file-upload">
      <!-- Grunnleggende -->
      <app-demo-section
        title="Grunnleggende"
        [code]="grunnleggendeCode"
        description="Brukeren kan klikke i området eller dra en fil dit. Området markeres når en fil dras over det, og valgt fil vises under med en knapp for å fjerne den. Fortell alltid hvilke filtyper og størrelser som er tillatt."
      >
        <hvi-file-upload
          label="Last opp profilbilde"
          description="Filen må være i png- eller jpg-format og mindre enn 2 MB"
          accept=".png,.jpg,.jpeg"
        />
      </app-demo-section>

      <!-- Med beskrivelse -->
      <app-demo-section
        title="Med beskrivelse"
        [code]="medBeskrivelseCode"
        description="Bruk dropzoneDescription for å gi en mer utfyllende beskrivelse inni opplastingsområdet."
      >
        <hvi-file-upload
          label="Last opp profilbilde"
          dropzoneDescription="Bildet vises for andre brukere i løsningen"
        />
      </app-demo-section>

      <!-- Flere filer -->
      <app-demo-section
        title="Flere filer"
        [code]="flereFilerCode"
        description="Med multiple legges nye filer til de som allerede er valgt, og samme fil kommer bare med én gang. Verdien er en liste med alle valgte filer."
      >
        <hvi-file-upload
          label="Vedlegg"
          description="Du kan laste opp inntil 5 filer i pdf-format"
          accept=".pdf"
          multiple
          [(value)]="vedlegg"
        />
      </app-demo-section>

      <!-- Feilmelding -->
      <app-demo-section
        title="Feilmelding"
        [code]="feilmeldingCode"
        description="Filer som ikke passer med accept legges ikke til, heller ikke når de slippes i området, og komponenten viser selv en feilmelding. Annen validering, som størrelse, gjør du selv og viser med error. Fjerner brukeren filen, forsvinner feilen."
      >
        <hvi-file-upload
          label="Last opp CV"
          description="Filen må være i pdf- eller Word-format og mindre enn 1 MB"
          accept=".pdf,.doc,.docx"
          [error]="cvFeil()"
          [(value)]="cv"
        />
      </app-demo-section>

      <!-- Sende filene til et API -->
      <app-demo-section
        title="Sende filene til et API"
        [code]="sendeFileneTilEtApiCode"
        description="Komponenten laster ikke opp noe selv. Verdien er en liste med File-objekter i skjemaet, og du sender dem når skjemaet sendes inn: legg filene i et FormData-objekt og post det med HttpClient. I et .NET-API tar du imot filene med [FromForm] IFormFileCollection vedlegg. Demoen har ikke noe API, så her vises bare det som ville blitt sendt."
      >
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
      </app-demo-section>
    </app-demo-page>
  `,
})
export class FileUploadDemoComponent {
  readonly grunnleggendeCode = FileUploadGrunnleggendeExampleSource;
  readonly medBeskrivelseCode = FileUploadMedBeskrivelseExampleSource;
  readonly flereFilerCode = FileUploadFlereFilerExampleSource;
  readonly feilmeldingCode = FileUploadFeilmeldingExampleSource;
  readonly sendeFileneTilEtApiCode = FileUploadSendeFileneTilEtApiExampleSource;

  readonly vedlegg = signal<File[]>([]);

  readonly cv = signal<File[]>([]);
  readonly cvFeil = computed(() =>
    this.cv().some((fil) => fil.size > 1024 * 1024) ? 'Filen er større enn 1 MB' : undefined,
  );

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
