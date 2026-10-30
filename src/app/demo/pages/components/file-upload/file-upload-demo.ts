import { Component, computed, signal } from '@angular/core';
import { HviAlert, HviFileUpload, HviList } from '@helsevestikt/hviktor-angular';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { FileUploadFeilmeldingExampleSource } from './code-examples/file-upload.feilmelding.example.source';
import { FileUploadFlereFilerExampleSource } from './code-examples/file-upload.flere-filer.example.source';
import { FileUploadGrunnleggendeExampleSource } from './code-examples/file-upload.grunnleggende.example.source';
import { FileUploadMedBeskrivelseExampleSource } from './code-examples/file-upload.med-beskrivelse.example.source';
import { FileUploadSkrivebeskyttetExampleSource } from './code-examples/file-upload.skrivebeskyttet.example.source';

@Component({
  selector: 'app-file-upload-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent, HviFileUpload, HviList, HviAlert],
  template: `
    <app-demo-page componentId="file-upload">
      <hvi-alert class="mb-6"
        >File upload er fortsatt under utvikling hos
        <a
          hviLink
          href="https://designsystemet.no/no/components/docs/file-upload/code"
          target="_blank"
          rel="noopener noreferrer"
          >Designsystemet</a
        >
        og er derfor ikke helt ferdig enda</hvi-alert
      >
      <!-- Grunnleggende -->
      <app-demo-section
        title="Grunnleggende"
        [code]="grunnleggendeCode"
        description="Brukeren kan klikke i området eller slippe en fil der. Fortell alltid hvilke filtyper og størrelser som er tillatt."
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
        description="Med multiple kan brukeren velge flere filer. Verdien er alltid en liste med filer. Komponenten viser ikke valgte filer selv, så vis dem gjerne under feltet."
      >
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
      </app-demo-section>

      <!-- Feilmelding -->
      <app-demo-section
        title="Feilmelding"
        [code]="feilmeldingCode"
        description="Valider filene selv og vis en spesifikk feilmelding med error. accept filtrerer bare filvelgeren, ikke filer som slippes i området."
      >
        <hvi-file-upload
          label="Last opp CV"
          description="Filen må være mindre enn 1 MB"
          [error]="cvFeil()"
          [(value)]="cv"
        />
      </app-demo-section>

      <!-- Skrivebeskyttet -->
      <app-demo-section
        title="Skrivebeskyttet"
        [code]="skrivebeskyttetCode"
        description="Med readOnly får området en nøytral fargeskala, og filvelgeren åpnes ikke."
      >
        <hvi-file-upload label="Last opp fil" readOnly />
      </app-demo-section>
    </app-demo-page>
  `,
})
export class FileUploadDemoComponent {
  readonly grunnleggendeCode = FileUploadGrunnleggendeExampleSource;
  readonly medBeskrivelseCode = FileUploadMedBeskrivelseExampleSource;
  readonly flereFilerCode = FileUploadFlereFilerExampleSource;
  readonly feilmeldingCode = FileUploadFeilmeldingExampleSource;
  readonly skrivebeskyttetCode = FileUploadSkrivebeskyttetExampleSource;

  readonly vedlegg = signal<File[]>([]);

  readonly cv = signal<File[]>([]);
  readonly cvFeil = computed(() =>
    this.cv().some((fil) => fil.size > 1024 * 1024) ? 'Filen er større enn 1 MB' : undefined,
  );
}
