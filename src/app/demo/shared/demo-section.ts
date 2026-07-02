import {
  AfterViewInit,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { HviHeading, HviParagraph } from '@helsevestikt/hviktor-angular';
import '@helsevestikt/hviktor-icons/icon-chevron-down.webcomponent';
import '@helsevestikt/hviktor-icons/icon-chevron-up.webcomponent';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';

// Register TypeScript language
hljs.registerLanguage('typescript', typescript);

/**
 * Wrapper for en demo-seksjon med tittel og innhold.
 * Bruk `class` på innholdet for å tilpasse layout.
 */
@Component({
  selector: 'app-demo-section',
  standalone: true,
  imports: [HviHeading, HviParagraph],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <section [id]="sectionId()" class="scroll-mt-24 gap-4">
      <h2 hviHeading size="md">{{ title() }}</h2>
      @if (description()) {
        <p hviParagraph class="max-w-3xl pt-2">{{ description() }}</p>
      }

      <div class="componentDisplay mt-8 scroll-mt-24 rounded-t-lg border border-neutral-300 p-6">
        <ng-content />
      </div>

      @if (code()) {
        <div
          class="mb-8 flex scroll-mt-24 justify-end rounded-b-lg border border-t-0 border-x-neutral-300 border-b-neutral-300"
        >
          <button
            class="toggleButton ds-button"
            aria-expanded="{{ showCode() ? 'true' : 'false' }}"
            (click)="toggleCode()"
          >
            @if (showCode()) {
              <hvi-icon-chevron-up />
              Skjul kode
            } @else {
              <hvi-icon-chevron-down />
              Vis kode
            }
          </button>
        </div>
      }
    </section>

    @if (showCode()) {
      <section aria-label="Vis kode" class="gap-4">
        <div class="componentDisplay mt-8 scroll-mt-24 rounded-t-lg border border-neutral-300 p-4">
          <p hviParagraph>Angular</p>
        </div>
        <div
          class="codeExample mb-8 rounded-b-lg border border-t-0 border-x-neutral-300 border-b-neutral-300 p-4"
        >
          <pre><code #codeBlock class="language-typescript rounded" tabindex="0">{{ code() }}</code></pre>
        </div>
      </section>
    }
  `,
})
export class DemoSectionComponent implements AfterViewInit {
  title = input.required<string>();
  description = input<string>();
  code = input<string>();
  showCode = signal(false);

  sectionId = computed(() =>
    this.title()
      .toLowerCase()
      .replace(/æ/g, 'ae')
      .replace(/ø/g, 'o')
      .replace(/å/g, 'a')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, ''),
  );

  codeBlock = viewChild<ElementRef<HTMLElement>>('codeBlock');

  ngAfterViewInit() {
    this.highlightCode();
  }

  toggleCode() {
    this.showCode.update((value) => !value);
    if (this.showCode()) {
      // Wait for the code block to be rendered before highlighting.
      setTimeout(() => this.highlightCode(), 0);
    }
  }

  private highlightCode() {
    const el = this.codeBlock()?.nativeElement;
    if (el && this.code()) {
      hljs.highlightElement(el);
    }
  }
}
