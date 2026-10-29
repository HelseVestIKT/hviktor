import { NgTemplateOutlet } from '@angular/common';
import {
  afterRenderEffect,
  Component,
  contentChildren,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  input,
  linkedSignal,
  output,
  viewChild,
} from '@angular/core';
import '@u-elements/u-tabs';
import { HviTabPanel } from './tab-panel.component';
import { HviTab } from './tab.component';

/**
 * Tabs lar brukerne navigere mellom relaterte deler av innholdet,
 * der én del vises om gangen.
 *
 * Bruk `defaultValue` for å velge fanen som vises først, eller `[(value)]` for å
 * styre valgt fane selv – f.eks. for å bytte fane fra en knapp eller lenke.
 *
 * @example
 * ```html
 * <hvi-tabs defaultValue="tab1">
 *   <hvi-tab value="tab1">Tab 1</hvi-tab>
 *   <hvi-tab value="tab2">Tab 2</hvi-tab>
 *   <hvi-tab-panel value="tab1">Content 1</hvi-tab-panel>
 *   <hvi-tab-panel value="tab2">Content 2</hvi-tab-panel>
 * </hvi-tabs>
 * ```
 *
 * @example Styrt fra koden
 * ```html
 * <hvi-tabs [(value)]="currentTab">
 *   <hvi-tab value="tab1">Tab 1</hvi-tab>
 *   <hvi-tab value="tab2">Tab 2</hvi-tab>
 *   <hvi-tab-panel value="tab1">
 *     <button hviButton (click)="currentTab.set('tab2')">Gå til tab 2</button>
 *   </hvi-tab-panel>
 *   <hvi-tab-panel value="tab2">Content 2</hvi-tab-panel>
 * </hvi-tabs>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/docs/tabs/overview}
 */
@Component({
  selector: 'hvi-tabs',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <u-tabs class="ds-tabs">
      <u-tablist #tabList [attr.aria-label]="ariaLabel()" (click)="onTabClick($event)">
        @for (tab of tabs(); track tab.value) {
          <u-tab [attr.data-value]="tab.value">
            <ng-container [ngTemplateOutlet]="tab.templateRef" />
          </u-tab>
        }
      </u-tablist>
      @for (panel of panels(); track panel.value) {
        <u-tabpanel [attr.data-value]="panel.value">
          <ng-container [ngTemplateOutlet]="panel.templateRef" />
        </u-tabpanel>
      }
    </u-tabs>
    <!-- Hidden slot to capture content -->
    <div style="display: none">
      <ng-content />
    </div>
  `,
})
export class HviTabs {
  protected readonly tabs = contentChildren(HviTab);
  protected readonly panels = contentChildren(HviTabPanel);

  private readonly tabList = viewChild.required<ElementRef<HTMLElement>>('tabList');

  /** Accessible label for the tab list. Defaults to `'Faner'`. */
  readonly ariaLabel = input('Faner', { alias: 'aria-label' });

  /**
   * Valgt fane. Bruk `[(value)]` for å styre fanene fra koden – da oppdateres verdien
   * også når brukeren klikker på en fane.
   */
  readonly value = input<string>();

  /** Fanen som er valgt før brukeren har gjort et valg. Brukes når `value` ikke er satt. */
  readonly defaultValue = input<string>();

  /** Sendes når brukeren velger en annen fane. */
  readonly valueChange = output<string>();

  /** Valgt fane: følger `value`, og oppdateres når brukeren klikker. */
  private readonly selected = linkedSignal(() => this.value() ?? this.defaultValue());

  constructor() {
    // Hold u-tabs i synk med valgt fane, også når fanene endres.
    afterRenderEffect(() => {
      this.tabs();
      const value = this.selected();
      if (value !== undefined) this.select(value);
    });
  }

  protected onTabClick(event: Event): void {
    const tab = (event.target as Element).closest('u-tab');
    if (!tab || tab.parentElement !== this.tabList().nativeElement) return;

    const value = tab.getAttribute('data-value');
    if (value === null || value === this.selected()) return;

    this.selected.set(value);
    this.valueChange.emit(value);
  }

  private select(value: string): void {
    const tab = Array.from(this.tabList().nativeElement.children).find(
      (el) => el.getAttribute('data-value') === value,
    ) as (HTMLElement & { selected: boolean }) | undefined;

    if (tab && !tab.selected) tab.selected = true;
  }
}
