import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

/** Sorteringsretninger for tabell-kolonner */
export type SortDirection = 'none' | 'ascending' | 'descending';

/**
 * @summary
 * Directive for sorterbare tabell-header celler.
 * Håndterer aria-sort attributt og emitter sorterings-events.
 *
 * @example
 * ```html
 * <table hviTable>
 *   <thead>
 *     <tr>
 *       <th hviTableSort [sort]="sortState.navn" (sortChange)="onSort('navn', $event)">
 *         <button type="button">Navn</button>
 *       </th>
 *       <th>Epost</th>
 *     </tr>
 *   </thead>
 * </table>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/docs/table/code}
 */
@Directive({
  selector: 'th[hviTableSort]',
  standalone: true,
  host: {
    '[attr.aria-sort]': 'sort',
  },
})
export class HviTableSort {
  /**
   * Nåværende sorteringsretning for kolonnen.
   * - 'none': Ingen sortering (viser sorteringsikon uten retning)
   * - 'ascending': Stigende rekkefølge
   * - 'descending': Synkende rekkefølge
   */
  @Input() sort: SortDirection = 'none';

  /**
   * Event som emitteres når brukeren klikker på sorteringsknappen.
   * Returnerer neste sorteringsretning basert på syklusen: none → ascending → descending → none
   */
  @Output() sortChange = new EventEmitter<SortDirection>();

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    // Bare håndter klikk på button inne i th
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      const nextSort = this.getNextSortDirection();
      this.sortChange.emit(nextSort);
    }
  }

  /**
   * Beregner neste sorteringsretning i syklusen.
   * Syklus: none → ascending → descending → none
   */
  private getNextSortDirection(): SortDirection {
    switch (this.sort) {
      case 'none':
        return 'ascending';
      case 'ascending':
        return 'descending';
      case 'descending':
        return 'none';
      default:
        return 'none';
    }
  }
}
