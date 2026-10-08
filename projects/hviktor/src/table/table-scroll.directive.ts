import { afterNextRender, DestroyRef, Directive, ElementRef, inject } from '@angular/core';

let nextCaptionId = 0;

/**
 * @summary
 * Lar en tabell scrolle horisontalt når den ikke får plass, i stedet for at kolonneoverskrifter
 * og sorteringsikoner brytes over flere linjer. Legg direktivet på et element rundt tabellen.
 *
 * Når innholdet faktisk scroller, blir beholderen fokuserbar (`tabindex="0"`) og en navngitt
 * region, slik at tastaturbrukere kan scrolle med piltastene. Navnet hentes fra tabellens
 * `<caption>` med mindre du selv setter `aria-label` eller `aria-labelledby`. Attributter du
 * setter selv (`tabindex`, `role`, `aria-label`, `aria-labelledby`) blir ikke overstyrt.
 *
 * Med `stickyHeader` må beholderen ha en høyde (f.eks. `max-height`), fordi overskriften da
 * fester seg til toppen av beholderen og ikke til siden.
 *
 * @example
 * ```html
 * <div hviTableScroll>
 *   <table hviTable [value]="personer" #table="hviTable">
 *     <caption>Ansattoversikt</caption>
 *     <thead>
 *       <tr>
 *         <th hviSortableColumn="navn" scope="col"><button type="button">Navn</button></th>
 *         <th hviSortableColumn="epost" scope="col"><button type="button">E-post</button></th>
 *       </tr>
 *     </thead>
 *     <tbody>…</tbody>
 *   </table>
 * </div>
 * ```
 */
@Directive({
  selector: '[hviTableScroll]',
  standalone: true,
  host: {
    class: 'hvi-table-scroll',
  },
})
export class HviTableScroll {
  private readonly host: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  private manageTabindex = true;
  private manageRole = true;
  private manageName = true;

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      this.manageTabindex = !this.host.hasAttribute('tabindex');
      this.manageRole = !this.host.hasAttribute('role');
      this.manageName =
        !this.host.hasAttribute('aria-label') && !this.host.hasAttribute('aria-labelledby');

      this.update();

      if (typeof ResizeObserver === 'undefined') return;

      // Følg med både på beholderen (vindusbredde) og tabellen (innhold, f.eks. ny side eller filter)
      let observedTable: HTMLTableElement | null = null;
      const resizeObserver = new ResizeObserver(() => this.update());
      const observeTable = () => {
        const table = this.host.querySelector('table');
        if (table === observedTable) return;
        if (observedTable) resizeObserver.unobserve(observedTable);
        if (table) resizeObserver.observe(table);
        observedTable = table;
        this.update();
      };

      resizeObserver.observe(this.host);
      observeTable();

      // Tabellen kan rendres senere (f.eks. inne i @if)
      const mutationObserver = new MutationObserver(observeTable);
      mutationObserver.observe(this.host, { childList: true });

      destroyRef.onDestroy(() => {
        resizeObserver.disconnect();
        mutationObserver.disconnect();
      });
    });
  }

  /** Oppdaterer tilgjengelighetsattributter ut fra om innholdet faktisk scroller. */
  private update(): void {
    const scrollable = this.host.scrollWidth > this.host.clientWidth;

    if (this.manageTabindex) {
      this.setAttr('tabindex', scrollable ? '0' : null);
    }

    let hasName = !this.manageName;
    if (this.manageName) {
      const caption = this.host.querySelector<HTMLElement>('table > caption');
      if (scrollable && caption) {
        if (!caption.id) caption.id = `hvi-table-caption-${++nextCaptionId}`;
        this.setAttr('aria-labelledby', caption.id);
        hasName = true;
      } else {
        this.setAttr('aria-labelledby', null);
      }
    }

    if (this.manageRole) {
      // En region uten navn er ikke et landemerke, så rollen settes bare når vi har et navn
      this.setAttr('role', scrollable && hasName ? 'region' : null);
    }
  }

  private setAttr(name: string, value: string | null): void {
    if (value === null) {
      this.host.removeAttribute(name);
    } else if (this.host.getAttribute(name) !== value) {
      this.host.setAttribute(name, value);
    }
  }
}
