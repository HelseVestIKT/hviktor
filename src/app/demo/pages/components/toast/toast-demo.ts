import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  Injector,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  HviAlert,
  HviButton,
  HviFileUpload,
  HviLink,
  HviList,
  HviParagraph,
  HviSpinner,
  HviTextfield,
} from '@helsevestikt/hviktor-angular';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';
import { ToastAutomatiskLagringExampleSource } from './code-examples/toast.automatisk-lagring.example.source';
import { ToastBakgrunnsoppgaverExampleSource } from './code-examples/toast.bakgrunnsoppgaver.example.source';
import { ToastBekreftelseEtterInnsendingExampleSource } from './code-examples/toast.bekreftelse-etter-innsending.example.source';
import { ToastFilLastetOppExampleSource } from './code-examples/toast.fil-lastet-opp.example.source';
import { ToastMislykketHandlingExampleSource } from './code-examples/toast.mislykket-handling.example.source';
import { ToastVarselForHeleTjenestenExampleSource } from './code-examples/toast.varsel-for-hele-tjenesten.example.source';

@Component({
  selector: 'app-toast-demo',
  standalone: true,
  imports: [
    DemoPageComponent,
    DemoSectionComponent,
    FormsModule,
    RouterLink,
    HviAlert,
    HviButton,
    HviFileUpload,
    HviLink,
    HviList,
    HviParagraph,
    HviSpinner,
    HviTextfield,
  ],
  template: `
    <app-demo-page componentId="toast">
      <hvi-alert>Denne siden er under utvikling.</hvi-alert>
      <div class="my-8 max-w-2xl">
        <p hviParagraph>
          En toast er en kort melding som dukker opp i et hjørne av skjermen og forsvinner av seg
          selv. Verken Designsystemet eller Hviktor har en toast-komponent, fordi den har kjente
          tilgjengelighetsproblemer:
        </p>
        <ul hviList>
          <li>Meldingen forsvinner før alle rekker å lese den.</li>
          <li>Den havner langt unna innholdet den gjelder, både visuelt og i DOM-en.</li>
          <li>Den tar ikke fokus, og den er vanskelig å nå og lukke med tastatur.</li>
          <li>Skjermlesere leser den ikke alltid opp, eller leser den opp på feil tidspunkt.</li>
          <li>Brukere som forstørrer skjermen, ser den ofte ikke.</li>
          <li>Når den er borte, finnes det ingen vei tilbake til informasjonen.</li>
        </ul>
        <p hviParagraph>
          Les mer på
          <a
            hviLink
            href="https://designsystemet.no/no/components/docs/toast/overview"
            target="_blank"
            rel="noopener noreferrer"
            >Designsystemets side om toast</a
          >
          og i mønsteret for
          <a
            hviLink
            href="https://designsystemet.no/no/patterns/systemnotifications"
            target="_blank"
            rel="noopener noreferrer"
            >systemvarsler</a
          >. Eksemplene under viser hva du kan bruke i stedet, oftest en
          <a hviLink routerLink="/komponenter/alert">Alert</a> der brukeren allerede er.
        </p>
      </div>

      <app-demo-section
        title="Bekreftelse etter innsending"
        [code]="bekreftelseEtterInnsendingCode"
        description="Vis en alert i innholdet der brukeren er, eller send brukeren til en kvitteringsside. Flytt fokus til bekreftelsen, så skjermleserbrukere får den med seg, og la den bli stående til brukeren går videre."
      >
        <div class="flex max-w-md flex-col gap-4">
          @if (meldingSendt()) {
            <hvi-alert #kvittering tabindex="-1" color="success" title="Meldingen er sendt">
              <p hviParagraph>
                Vi har sendt en bekreftelse til {{ epost || 'e-postadressen din' }}. Du får svar
                innen tre virkedager.
              </p>
            </hvi-alert>
            <div>
              <button hviButton variant="secondary" type="button" (click)="nyMelding()">
                Send en ny melding
              </button>
            </div>
          } @else {
            <form class="flex flex-col gap-4" (ngSubmit)="sendMelding()">
              <hvi-textfield label="E-post" type="email" name="epost" [(ngModel)]="epost" />
              <hvi-textfield
                label="Melding"
                name="melding"
                multiline
                rows="3"
                [(ngModel)]="melding"
              />
              <div>
                <button hviButton type="submit">Send melding</button>
              </div>
            </form>
          }
        </div>
      </app-demo-section>

      <app-demo-section
        title="Mislykket handling"
        [code]="mislykketHandlingCode"
        description="Vis en alert rett ved der feilen oppsto, og fortell hva brukeren kan gjøre. En alert med fargen danger får role=alert og leses opp med en gang. Må brukeren ta et aktivt valg for å komme videre, bruk heller en dialog."
      >
        <div class="flex max-w-md flex-col gap-4">
          <hvi-textfield label="Telefonnummer" type="tel" name="telefon" [(ngModel)]="telefon" />
          <div>
            <button
              hviButton
              type="button"
              [loading]="lagrer()"
              [attr.aria-disabled]="lagrer() ? 'true' : null"
              (click)="lagreTelefon()"
            >
              Lagre
            </button>
          </div>
          @if (lagringFeilet()) {
            <hvi-alert color="danger" title="Vi klarte ikke å lagre telefonnummeret">
              <p hviParagraph>
                Det skyldes et midlertidig problem hos oss. Nummeret du skrev inn, er ikke borte.
                Prøv å lagre igjen om litt.
              </p>
            </hvi-alert>
          }
        </div>
      </app-demo-section>

      <app-demo-section
        title="Fil lastet opp"
        [code]="filLastetOppCode"
        description="Vis filen i listen over opplastede filer i stedet for å bekrefte opplastingen med en melding. File upload viser listen for deg, og skjermlesere får beskjed når filer legges til eller fjernes."
      >
        <div class="max-w-md">
          <hvi-file-upload
            label="Vedlegg"
            description="Du kan laste opp inntil 5 filer i pdf-, png- eller jpg-format"
            accept=".pdf,.png,.jpg"
            multiple
            [maxFiles]="5"
            [(value)]="vedlegg"
          />
        </div>
      </app-demo-section>

      <app-demo-section
        title="Automatisk lagring"
        [code]="automatiskLagringCode"
        description="Vis lagringsstatus rett ved innholdet som lagres. Statusteksten ligger i et element med role=status som finnes hele tiden, så skjermlesere leser opp endringene uten å avbryte brukeren."
      >
        <div class="flex max-w-md flex-col gap-2">
          <hvi-textfield
            label="Notat"
            description="Notatet lagres automatisk mens du skriver."
            name="notat"
            multiline
            rows="4"
            [(ngModel)]="notat"
            (ngModelChange)="notatEndret()"
          />
          <p hviParagraph size="sm" role="status">{{ lagringsstatus() }}</p>
        </div>
      </app-demo-section>

      <app-demo-section
        title="Bakgrunnsoppgaver"
        [code]="bakgrunnsoppgaverCode"
        description="Vis fremdrift der brukeren startet oppgaven, og la resultatet bli stående til brukeren selv går videre. Statusområdet finnes hele tiden, så skjermlesere får med seg når oppgaven starter og blir ferdig."
      >
        <div class="flex max-w-md flex-col gap-4">
          <div>
            <button
              hviButton
              type="button"
              [attr.aria-disabled]="eksport() === 'pagar' ? 'true' : null"
              (click)="startEksport()"
            >
              Eksporter rapport
            </button>
          </div>
          <div aria-live="polite">
            @if (eksport() === 'pagar') {
              <div class="flex items-center gap-2">
                <hvi-spinner label="Eksporterer" size="sm" />
                <p hviParagraph>Eksporterer rapporten. Du kan fortsette å jobbe mens du venter.</p>
              </div>
            } @else if (eksport() === 'ferdig') {
              <hvi-alert color="success" title="Rapporten er klar">
                <p hviParagraph>
                  <a
                    hviLink
                    href="data:text/csv;charset=utf-8,Avdeling%3BAntall%0AKirurgi%3B12%0AMedisin%3B8"
                    download="rapport.csv"
                    >Last ned rapport.csv</a
                  >
                </p>
              </hvi-alert>
            }
          </div>
        </div>
      </app-demo-section>

      <app-demo-section
        title="Varsel for hele tjenesten"
        [code]="varselForHeleTjenestenCode"
        description="Informasjon som gjelder hele tjenesten, som planlagt vedlikehold eller driftsforstyrrelser, vises øverst på siden og blir stående så lenge den gjelder. Se Designsystemets mønster for systemvarsler."
      >
        <hvi-alert color="warning" title="Planlagt vedlikehold torsdag kveld">
          <p hviParagraph>
            Tjenesten er utilgjengelig torsdag fra kl. 20:00 til 22:00. Det du har lagret, blir ikke
            borte.
          </p>
        </hvi-alert>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class ToastDemoComponent {
  readonly bekreftelseEtterInnsendingCode = ToastBekreftelseEtterInnsendingExampleSource;
  readonly mislykketHandlingCode = ToastMislykketHandlingExampleSource;
  readonly filLastetOppCode = ToastFilLastetOppExampleSource;
  readonly automatiskLagringCode = ToastAutomatiskLagringExampleSource;
  readonly bakgrunnsoppgaverCode = ToastBakgrunnsoppgaverExampleSource;
  readonly varselForHeleTjenestenCode = ToastVarselForHeleTjenestenExampleSource;

  private readonly injector = inject(Injector);
  private readonly kvittering = viewChild('kvittering', { read: ElementRef });

  epost = '';
  melding = '';
  readonly meldingSendt = signal(false);

  telefon = '';
  readonly lagrer = signal(false);
  readonly lagringFeilet = signal(false);

  vedlegg: File[] = [];

  notat = '';
  readonly lagringsstatus = signal('Alle endringer er lagret');
  private lagreTimer?: ReturnType<typeof setTimeout>;

  readonly eksport = signal<'ikke-startet' | 'pagar' | 'ferdig'>('ikke-startet');

  sendMelding(): void {
    this.meldingSendt.set(true);
    // Flytt fokus til bekreftelsen når den er tegnet, så skjermlesere leser den opp.
    afterNextRender(() => this.kvittering()?.nativeElement.focus(), { injector: this.injector });
  }

  nyMelding(): void {
    this.epost = '';
    this.melding = '';
    this.meldingSendt.set(false);
  }

  /** Simulerer et kall som feiler. I en ekte app ville dette vært en `HttpClient`-forespørsel. */
  lagreTelefon(): void {
    if (this.lagrer()) return;

    this.lagringFeilet.set(false);
    this.lagrer.set(true);
    setTimeout(() => {
      this.lagrer.set(false);
      this.lagringFeilet.set(true);
    }, 800);
  }

  notatEndret(): void {
    clearTimeout(this.lagreTimer);
    this.lagringsstatus.set('Lagrer …');
    this.lagreTimer = setTimeout(() => {
      const tid = new Date().toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' });
      this.lagringsstatus.set(`Lagret kl. ${tid}`);
    }, 1000);
  }

  /** Simulerer en eksport som tar litt tid. */
  startEksport(): void {
    if (this.eksport() === 'pagar') return;

    this.eksport.set('pagar');
    setTimeout(() => this.eksport.set('ferdig'), 2500);
  }
}
