import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HviHeading, HviLink, HviParagraph } from '@helsevestikt/hviktor-angular';
import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import { PageTocComponent, TocItem } from '../../shared/page-toc';

hljs.registerLanguage('css', css);
hljs.registerLanguage('xml', xml);

function highlight(code: string, language: string): string {
  return hljs.highlight(code, { language }).value;
}

const IMPORTS_CODE = [
  "@import '@helsevestikt/hviktor-angular/tailwind.css';",
  "@import '@helsevestikt/hviktor-angular/styles.css';",
  "@import 'tailwindcss';",
].join('\n');

const BEFORE_CODE = `<div
  style="
    background-color: var(--ds-color-background-tinted);
    border-bottom: 1px solid var(--ds-color-border-subtle);
  "
>`;

const AFTER_CODE = `<div class="bg-background-tinted border-b border-border-subtle">`;

@Component({
  selector: 'app-tailwind-setup-page',
  imports: [HviHeading, HviLink, HviParagraph, PageTocComponent, RouterLink],
  template: `
    <div class="xl:flex xl:gap-8">
      <article class="min-w-0 flex-1">
        <header class="mb-8">
          <h1 hviHeading size="xl">Oppsett</h1>
          <p hviParagraph class="max-w-2xl">
            Med Tailwind CSS kan du bruke temaets farger, avstander, hjørner, skygger og
            tekststørrelser som klasser i stedet for <code>var(--ds-…)</code>. Se alle klassene
            under <a hviLink routerLink="/tailwind">Klasser</a>.
          </p>
        </header>

        <section class="mb-12" aria-labelledby="ng-add">
          <h2 hviHeading size="md" id="ng-add" class="mb-3 scroll-mt-24">Med ng add</h2>
          <p hviParagraph class="max-w-2xl">
            Velger du Tailwind når du kjører <code>ng add &#64;helsevestikt/hviktor-angular</code>,
            settes alt opp for deg. Krever Tailwind CSS v4, som ng add installerer på Angular 18 og
            nyere. Tar du i bruk Tailwind senere, kan du kjøre ng add på nytt.
          </p>
        </section>

        <section class="mb-12" aria-labelledby="importer">
          <h2 hviHeading size="md" id="importer" class="mb-3 scroll-mt-24">Importer</h2>
          <p hviParagraph class="max-w-2xl">
            Har du allerede Tailwind CSS v4, legger du importene inn i
            <code>src/styles.css</code> i denne rekkefølgen:
          </p>
          <pre
            class="m-0 overflow-x-auto"
          ><code class="hljs block whitespace-pre!" [innerHTML]="importsHtml"></code></pre>
          <p hviParagraph class="max-w-2xl">
            <code>tailwind.css</code> må stå først. Den sørger for at Tailwinds reset kommer før
            Designsystemet, og at Tailwind-klassene vinner over stilen til komponentene.
          </p>
        </section>

        <section class="mb-12" aria-labelledby="intellisense">
          <h2 hviHeading size="md" id="intellisense" class="mb-3 scroll-mt-24">
            Forslag i VS Code
          </h2>
          <p hviParagraph class="max-w-2xl">
            Installer
            <a
              hviLink
              href="https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss"
              target="_blank"
              rel="noopener noreferrer"
              >Tailwind CSS IntelliSense</a
            >. Da får du forslag til klassene mens du skriver, med fargen ved siden av.
          </p>
        </section>

        <section class="mb-12" aria-labelledby="for-og-etter">
          <h2 hviHeading size="md" id="for-og-etter" class="mb-3 scroll-mt-24">Før og etter</h2>
          <h3 hviHeading size="xs" class="mb-2">Før</h3>
          <pre
            class="m-0 overflow-x-auto"
          ><code class="hljs block whitespace-pre!" [innerHTML]="beforeHtml"></code></pre>
          <h3 hviHeading size="xs" class="mt-6 mb-2">Etter</h3>
          <pre
            class="m-0 overflow-x-auto"
          ><code class="hljs block whitespace-pre!" [innerHTML]="afterHtml"></code></pre>
        </section>
      </article>

      <app-page-toc [items]="toc" />
    </div>
  `,
})
export class TailwindSetupPage {
  protected readonly importsHtml = highlight(IMPORTS_CODE, 'css');
  protected readonly beforeHtml = highlight(BEFORE_CODE, 'xml');
  protected readonly afterHtml = highlight(AFTER_CODE, 'xml');

  protected readonly toc: TocItem[] = [
    { id: 'ng-add', title: 'Med ng add' },
    { id: 'importer', title: 'Importer' },
    { id: 'intellisense', title: 'Forslag i VS Code' },
    { id: 'for-og-etter', title: 'Før og etter' },
  ];
}
