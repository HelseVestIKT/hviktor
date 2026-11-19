import { Component, computed, signal } from '@angular/core';
import {
  HviAlert,
  HviButton,
  HviField,
  HviHeading,
  HviInput,
  HviLabel,
  HviLink,
  HviParagraph,
  HviTag,
  HviToggleGroup,
  HviToggleGroupItem,
} from '@helsevestikt/hviktor-angular';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import { PageTocComponent, TocItem } from '../../shared/page-toc';

hljs.registerLanguage('css', css);
hljs.registerLanguage('json', json);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('bash', bash);

function highlight(code: string, language: string): string {
  return hljs.highlight(code, { language }).value;
}

type ThemeColor = 'accent' | 'brand1' | 'brand2' | 'brand3' | 'neutral';

const COLORS: { value: ThemeColor; label: string }[] = [
  { value: 'accent', label: 'accent' },
  { value: 'brand1', label: 'brand1' },
  { value: 'brand2', label: 'brand2' },
  { value: 'brand3', label: 'brand3' },
  { value: 'neutral', label: 'neutral' },
];

const DATA_COLOR_CODE = (color: ThemeColor) => `<section data-color="${color}">
  <button hviButton>Lagre</button>
  <button hviButton variant="secondary">Avbryt</button>
  <a hviLink href="#">Les mer</a>
</section>`;

const WHOLE_APP_CODE = `<body data-color="brand1">
  <app-root></app-root>
</body>`;

const CONFIG_CODE = `{
  "$schema": "https://designsystemet.no/schemas/config/latest.json",
  "output": [{ "type": "css", "dir": "./src/theme", "cleanDir": true }],
  "themes": {
    "mitt-tema": {
      "colors": {
        "accent": "#32502e",
        "brand1": "#904941",
        "brand2": "#505582",
        "brand3": "#825072",
        "neutral": "#201f2f"
      },
      "borderRadius": 4
    }
  }
}`;

const CLI_CODE = `npx @digdir/designsystemet@1.24.0 -c designsystemet.config.json`;

const NPM_SCRIPT_CODE = `"scripts": {
  "tema": "npx @digdir/designsystemet@1.24.0 -c designsystemet.config.json"
}`;

const IMPORT_CODE = [
  "@import '@helsevestikt/hviktor-angular/styles.css';",
  '/* Eget tema må komme etter hviktor, så det overstyrer hvikt-temaet. */',
  "@import './theme/mitt-tema.css';",
].join('\n');

const OVERRIDES_CODE = `"overrides": {
  "colors": {
    "accent": {
      "base-default": { "light": "#32502e" },
      "base-hover": { "light": "#2b4427" },
      "base-active": { "light": "#243a21" }
    }
  }
}`;

const FONT_CONFIG_CODE = `"typography": {
  "fontFamily": "Open Sans, Arial, sans-serif"
}`;

const FONT_CSS_CODE = `@layer ds.theme.typography.primary {
  :root,
  [data-typography='primary'] {
    --ds-font-family: 'Open Sans', Arial, sans-serif;
  }
}`;

const COLOR_SCHEME_CODE = `<!-- Følg innstillingen i operativsystemet -->
<html data-color-scheme="auto">

<!-- Tving lys eller mørk -->
<html data-color-scheme="light">
<html data-color-scheme="dark">`;

@Component({
  selector: 'app-theme-page',
  imports: [
    HviAlert,
    HviButton,
    HviField,
    HviHeading,
    HviInput,
    HviLabel,
    HviLink,
    HviParagraph,
    HviTag,
    HviToggleGroup,
    HviToggleGroupItem,
    PageTocComponent,
  ],
  template: `
    <div class="xl:flex xl:gap-8">
      <article class="min-w-0 flex-1">
        <header class="mb-8">
          <h1 hviHeading size="xl">Tema og farger</h1>
          <p hviParagraph class="max-w-2xl">
            Hviktor kommer med Helse Vest IKT sitt tema, <code>hvikt</code>, som lastes inn av
            <code>&#64;helsevestikt/hviktor-angular/styles.css</code>. I de aller fleste tilfeller
            er det ikke nødvendig å endre temaet. Av og til utvikler vi løsninger der bestiller
            ønsker sin farge som primærfarge. Her ser du hvordan du bytter farge på deler av siden,
            og hvordan du lager og bruker et eget tema når løsningen din har andre farger.
          </p>
        </header>

        <hvi-alert
          color="warning"
          title="Bytte av tema gjøres alltid i samråd med designer"
          class="mb-6"
        >
          Tema og farger er en del av løsningens visuelle identitet og påvirker blant annet kontrast
          og tilgjengelighet. Bytt bare tema eller farger på oppdrag fra designer, og bruk fargene
          og temaet designeren har bestemt.
        </hvi-alert>

        <section class="mb-6" aria-labelledby="fargene">
          <h2 hviHeading size="md" id="fargene" class="mb-3 scroll-mt-24">Fargene i temaet</h2>
          <p hviParagraph class="max-w-2xl">
            Et tema har fem hovedfarger: <code>accent</code>, <code>brand1</code>,
            <code>brand2</code>, <code>brand3</code> og <code>neutral</code>. I tillegg kommer
            støttefargene <code>info</code>, <code>success</code>, <code>warning</code> og
            <code>danger</code>. <code>accent</code> er primærfargen og brukes når ingenting annet
            er valgt.
          </p>
          <p hviParagraph class="max-w-2xl">
            Hver farge er en hel skala med tokens for bakgrunn, flater, kantlinjer, tekst og «base»
            (fyllfarge på for eksempel knapper), i både lys og mørk modus. Komponentene bruker disse
            tokenene, så du bytter aldri farge på én og én komponent.
          </p>
        </section>

        <section class="mb-6" aria-labelledby="data-color">
          <h2 hviHeading size="md" id="data-color" class="mb-3 scroll-mt-24">
            Bytt farge med data-color
          </h2>
          <p hviParagraph class="max-w-2xl">
            Sett <code>data-color</code> på et element, så bruker alt inni den fargen. Prøv:
          </p>

          <hvi-toggle-group
            [value]="color()"
            (valueChange)="color.set($any($event))"
            aria-label="Farge i eksempelet"
            size="sm"
            class="mt-4 block"
          >
            @for (c of colors; track c.value) {
              <button hviToggleGroupItem [value]="c.value">{{ c.label }}</button>
            }
          </hvi-toggle-group>

          <div
            [attr.data-color]="color()"
            class="border-neutral-border-subtle mt-4 flex flex-wrap items-center gap-4 rounded-lg border p-6"
          >
            <button hviButton>Lagre</button>
            <button hviButton variant="secondary">Avbryt</button>
            <a hviLink href="#data-color">Les mer</a>
            <hvi-tag>Merkelapp</hvi-tag>
            <hvi-field>
              <input hviInput type="checkbox" id="tema-checkbox" checked />
              <label hviLabel for="tema-checkbox">Avkrysning</label>
            </hvi-field>
          </div>
          <pre
            class="mt-4 overflow-x-auto"
          ><code class="hljs block whitespace-pre!" [innerHTML]="dataColorHtml()"></code></pre>
        </section>

        <section class="mb-6" aria-labelledby="hele-losningen">
          <h2 hviHeading size="md" id="hele-losningen" class="mb-3 scroll-mt-24">
            Ny primærfarge i hele løsningen
          </h2>
          <p hviParagraph class="max-w-2xl">
            Finnes fargen du trenger allerede i temaet, er det raskeste å sette
            <code>data-color</code> på <code>&lt;body&gt;</code>:
          </p>
          <pre
            class="m-0 overflow-x-auto"
          ><code class="hljs block whitespace-pre!" [innerHTML]="wholeAppHtml"></code></pre>
          <p hviParagraph class="max-w-2xl">
            Trenger du en farge som ikke er i <code>hvikt</code>, lager du et eget tema.
          </p>
        </section>

        <section class="mb-6" aria-labelledby="eget-tema">
          <h2 hviHeading size="md" id="eget-tema" class="mb-3 scroll-mt-24">Lag eget tema</h2>
          <ol class="ds-list max-w-2xl">
            <li>
              Lag temaet i
              <a
                hviLink
                href="https://theme.designsystemet.no/"
                target="_blank"
                rel="noopener noreferrer"
                >Temabyggeren</a
              >, skriv config-fila selv eller bruk den du får fra designer. Velg fargene løsningen
              allerede bruker.
            </li>
            <li>
              Lagre fila som <code>designsystemet.config.json</code> i rotmappa til
              Angular-prosjektet, ved siden av <code>package.json</code> og
              <code>angular.json</code>.
            </li>
            <li>Generer CSS med Designsystemets CLI fra den samme mappa (se under).</li>
            <li>
              Importer den genererte fila etter
              <code>&#64;helsevestikt/hviktor-angular/styles.css</code> i
              <code>src/styles.css</code>.
            </li>
          </ol>

          <h3 hviHeading size="xs" class="mt-6 mb-2">designsystemet.config.json</h3>
          <pre
            class="m-0 overflow-x-auto"
          ><code class="hljs block whitespace-pre!" [innerHTML]="configHtml"></code></pre>
          <p hviParagraph class="max-w-2xl">
            <code>output.dir</code> bestemmer hvor CSS-fila havner, regnet fra mappa der du kjører
            kommandoen. Fila får samme navn som temaet, her <code>src/theme/mitt-tema.css</code>.
            <code>cleanDir</code> tømmer mappa før hver generering, så bruk en egen mappe til
            temaet.
          </p>

          <h3 hviHeading size="xs" class="mt-6 mb-2">Generer CSS</h3>
          <p hviParagraph class="max-w-2xl">
            Åpne en terminal i rotmappa til prosjektet, der config-fila ligger, og kjør:
          </p>
          <pre
            class="m-0 overflow-x-auto"
          ><code class="hljs block whitespace-pre!" [innerHTML]="cliHtml"></code></pre>
          <p hviParagraph class="max-w-2xl">
            <code>npx</code> laster ned CLI-en ved behov, så du trenger ikke installere noe. Bruk
            samme versjon som <code>&#64;digdir/designsystemet-css</code> i hviktor, så tokenene
            passer til komponentene. Kjør kommandoen på nytt hver gang config-fila endres.
          </p>
          <p hviParagraph class="max-w-2xl">
            Legg gjerne kommandoen inn som et script i <code>package.json</code>, så kan du kjøre
            <code>npm run tema</code>:
          </p>
          <pre
            class="m-0 overflow-x-auto"
          ><code class="hljs block whitespace-pre!" [innerHTML]="npmScriptHtml"></code></pre>
          <p hviParagraph class="max-w-2xl">
            Den genererte fila starter med <code>&#64;charset</code>. Fjern linja hvis du får
            advarselen <code>invalid-&#64;charset</code> fra byggeverktøyet.
          </p>

          <h3 hviHeading size="xs" class="mt-6 mb-2">src/styles.css</h3>
          <pre
            class="m-0 overflow-x-auto"
          ><code class="hljs block whitespace-pre!" [innerHTML]="importHtml"></code></pre>
          <p hviParagraph class="max-w-2xl">
            Temaet legger seg i de samme CSS-lagene som <code>hvikt</code>. Siden det kommer sist,
            vinner det, og du trenger ingen <code>!important</code>.
          </p>
        </section>

        <section class="mb-6" aria-labelledby="noyaktige-farger">
          <h2 hviHeading size="md" id="noyaktige-farger" class="mb-3 scroll-mt-24">
            Nøyaktige farger
          </h2>
          <p hviParagraph class="max-w-2xl">
            CLI-en regner ut hele skalaen fra én farge. Har løsningen allerede faste farger for
            hover, aktiv eller lyse flater, kan du overstyre enkelttokens med
            <code>overrides</code> i temaet:
          </p>
          <pre
            class="m-0 overflow-x-auto"
          ><code class="hljs block whitespace-pre!" [innerHTML]="overridesHtml"></code></pre>
          <p hviParagraph class="max-w-2xl">
            Det holder å oppgi <code>light</code>; mørk modus bruker da de utregnede fargene. Sjekk
            kontrasten når du overstyrer.
          </p>
        </section>

        <section class="mb-6" aria-labelledby="font">
          <h2 hviHeading size="md" id="font" class="mb-3 scroll-mt-24">Font</h2>
          <p hviParagraph class="max-w-2xl">
            Komponentene bruker <code>--ds-font-family</code>. Setter du fonten i temaet, følger
            alle komponentene med:
          </p>
          <pre
            class="m-0 overflow-x-auto"
          ><code class="hljs block whitespace-pre!" [innerHTML]="fontConfigHtml"></code></pre>
          <p hviParagraph class="max-w-2xl">
            Et eget tema setter alltid fonten. Oppgir du ingen, blir det <code>Inter</code>, som
            hviktor ikke laster inn. Vil du beholde hviktor sin font, skriver du
            <code>"Albert Sans Variable"</code>.
          </p>
          <p hviParagraph class="max-w-2xl">
            Vil du bare bytte font og beholde <code>hvikt</code>-fargene, kan du sette variabelen
            direkte i samme lag som temaet:
          </p>
          <pre
            class="m-0 overflow-x-auto"
          ><code class="hljs block whitespace-pre!" [innerHTML]="fontCssHtml"></code></pre>
          <p hviParagraph class="max-w-2xl">
            Unngå å sette <code>font-family</code> på enkeltelementer: mange komponenter setter
            fonten på seg selv og arver den ikke fra elementet rundt.
          </p>
        </section>

        <section class="mb-6" aria-labelledby="lys-og-mork">
          <h2 hviHeading size="md" id="lys-og-mork" class="mb-3 scroll-mt-24">Lys og mørk modus</h2>
          <p hviParagraph class="max-w-2xl">
            Alle temaer har både lys og mørk modus. Velg med <code>data-color-scheme</code>, som
            også kan settes på en del av siden:
          </p>
          <pre
            class="m-0 overflow-x-auto"
          ><code class="hljs block whitespace-pre!" [innerHTML]="colorSchemeHtml"></code></pre>
        </section>
      </article>

      <app-page-toc [items]="toc" />
    </div>
  `,
})
export class ThemePage {
  protected readonly colors = COLORS;
  protected readonly color = signal<ThemeColor>('accent');

  protected readonly dataColorHtml = computed(() =>
    highlight(DATA_COLOR_CODE(this.color()), 'xml'),
  );
  protected readonly wholeAppHtml = highlight(WHOLE_APP_CODE, 'xml');
  protected readonly configHtml = highlight(CONFIG_CODE, 'json');
  protected readonly cliHtml = highlight(CLI_CODE, 'bash');
  protected readonly npmScriptHtml = highlight(NPM_SCRIPT_CODE, 'json');
  protected readonly importHtml = highlight(IMPORT_CODE, 'css');
  protected readonly overridesHtml = highlight(OVERRIDES_CODE, 'json');
  protected readonly fontConfigHtml = highlight(FONT_CONFIG_CODE, 'json');
  protected readonly fontCssHtml = highlight(FONT_CSS_CODE, 'css');
  protected readonly colorSchemeHtml = highlight(COLOR_SCHEME_CODE, 'xml');

  protected readonly toc: TocItem[] = [
    { id: 'fargene', title: 'Fargene i temaet' },
    { id: 'data-color', title: 'Bytt farge med data-color' },
    { id: 'hele-losningen', title: 'Ny primærfarge i hele løsningen' },
    { id: 'eget-tema', title: 'Lag eget tema' },
    { id: 'noyaktige-farger', title: 'Nøyaktige farger' },
    { id: 'font', title: 'Font' },
    { id: 'lys-og-mork', title: 'Lys og mørk modus' },
  ];
}
