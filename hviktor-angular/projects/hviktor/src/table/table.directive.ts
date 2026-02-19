import {
  booleanAttribute,
  computed,
  Directive,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';

/** Sorteringsretninger for tabell-kolonner */
export type SortDirection = 'none' | 'ascending' | 'descending';

/** Event som emitteres ved sorteringsendring */
export interface TableSortEvent {
  field: string;
  direction: SortDirection;
}

/**
 * @summary
 * Table brukes for å vise strukturert informasjon på en ryddig og oversiktlig måte.
 * Tabeller kan gjøre det enklere for brukerne å skanne og sammenligne informasjon.
 *
 * @example
 * ```html
 * <!-- Enkel bruk med innebygd sortering og søk -->
 * <table hviTable [value]="persons" [globalFilterFields]="['navn', 'epost']" #table="hviTable">
 *   <caption>
 *     <input type="search" (input)="table.filterGlobal($event.target.value)" />
 *   </caption>
 *   <thead>
 *     <tr>
 *       <th hviSortableColumn="navn">
 *         <button>Navn</button>
 *       </th>
 *       <th>Epost</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     @for (person of table.filteredValue(); track person.id) {
 *       <tr>
 *         <td>{{ person.navn }}</td>
 *         <td>{{ person.epost }}</td>
 *       </tr>
 *     }
 *   </tbody>
 * </table>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/docs/table/code}
 */
@Directive({
  selector: '[hviTable]',
  standalone: true,
  exportAs: 'hviTable',
  host: {
    class: 'ds-table',
    '[attr.data-zebra]': 'zebra || null',
    '[attr.data-border]': 'border || null',
    '[attr.data-hover]': 'hover || null',
    '[attr.data-sticky-header]': 'stickyHeader || null',
  },
})
export class HviTable<T = unknown> {
  /** Gir tabellen zebrastriper (annenhver rad har alternativ bakgrunn) */
  @Input({ transform: booleanAttribute }) zebra = false;

  /** Gir tabellen en avrundet kant rundt */
  @Input({ transform: booleanAttribute }) border = false;

  /** Gir tabellen hover-effekt på rader */
  @Input({ transform: booleanAttribute }) hover = false;

  /** Gjør tabellens header sticky (fester seg til toppen ved scrolling) */
  @Input({ transform: booleanAttribute }) stickyHeader = false;

  /** Data som skal vises i tabellen */
  @Input()
  set value(data: T[] | null | undefined) {
    this._value.set(data ?? []);
  }

  /** Felt som data skal sorteres etter (valgfri initial verdi) */
  @Input()
  set sortField(field: string | null | undefined) {
    if (field) {
      this._sortField.set(field);
    }
  }

  /** Sorteringsretning: 1 = ascending, -1 = descending, 0 = none */
  @Input()
  set sortOrder(order: number) {
    this._sortOrder.set(order);
  }

  /** Felt som global søk skal søke i */
  @Input() globalFilterFields: string[] = [];

  /** Event som emitteres når sortering endres */
  @Output() sortChange = new EventEmitter<TableSortEvent>();

  // Internal signals
  private _value = signal<T[]>([]);
  private _sortField = signal<string | null>(null);
  private _sortOrder = signal<number>(0); // 0 = none, 1 = asc, -1 = desc
  private _globalFilter = signal<string | null>(null);

  /** Kun sortert data (uten søk) - for bakoverkompatibilitet */
  readonly sortedValue = computed(() => {
    return this.applySorting(this._value());
  });

  /** Filtrert og sortert data - bruk denne i template */
  readonly filteredValue = computed(() => {
    const data = this._value();
    const filtered = this.applyGlobalFilter(data);
    return this.applySorting(filtered);
  });

  /** Antall rader etter søk */
  readonly totalFilteredRecords = computed(() => this.filteredValue().length);

  /** Antall rader totalt (før søk) */
  readonly totalRecords = computed(() => this._value().length);

  /** Nåværende sorteringsfelt */
  readonly currentSortField = computed(() => this._sortField());

  /** Nåværende sorteringsretning som SortDirection */
  readonly currentSortDirection = computed<SortDirection>(() => {
    const order = this._sortOrder();
    if (order === 1) return 'ascending';
    if (order === -1) return 'descending';
    return 'none';
  });

  /** Nåværende søkeverdi */
  readonly currentGlobalFilter = computed(() => this._globalFilter());

  /**
   * Global søk - søker på tvers av alle felt i globalFilterFields.
   * @param value Søkeverdi
   */
  filterGlobal(value: string | null): void {
    this._globalFilter.set(value?.trim() || null);
  }

  /**
   * Nullstiller søk.
   */
  clearFilter(): void {
    this._globalFilter.set(null);
  }

  /**
   * Nullstiller hele tabellen (sortering og søk).
   */
  clear(): void {
    this._sortField.set(null);
    this._sortOrder.set(0);
    this._globalFilter.set(null);
  }

  /**
   * Sorterer tabellen etter et felt.
   * Kalles av hviSortableColumn directive.
   */
  sort(field: string): void {
    const currentField = this._sortField();
    const currentOrder = this._sortOrder();

    let newOrder: number;

    if (currentField === field) {
      // Samme felt - sykl gjennom: asc → desc → none
      if (currentOrder === 1) {
        newOrder = -1;
      } else if (currentOrder === -1) {
        newOrder = 0;
      } else {
        newOrder = 1;
      }
    } else {
      // Nytt felt - start med ascending
      newOrder = 1;
    }

    this._sortField.set(newOrder === 0 ? null : field);
    this._sortOrder.set(newOrder);

    const direction: SortDirection =
      newOrder === 1 ? 'ascending' : newOrder === -1 ? 'descending' : 'none';

    this.sortChange.emit({ field, direction });
  }

  /**
   * Henter sorteringsretning for et spesifikt felt.
   * Brukes av hviSortableColumn for å vise riktig aria-sort.
   */
  getSortDirection(field: string): SortDirection {
    if (this._sortField() !== field) {
      return 'none';
    }
    return this.currentSortDirection();
  }

  // ========== Private methods ==========

  private applyGlobalFilter(data: T[]): T[] {
    const globalFilter = this._globalFilter();
    const globalFields = this.globalFilterFields;

    if (!globalFilter || globalFields.length === 0 || data.length === 0) {
      return data;
    }

    const searchTerm = globalFilter.toLowerCase();

    return data.filter((item) => {
      return globalFields.some((field) => {
        const value = this.getFieldValue(item, field);
        return String(value ?? '')
          .toLowerCase()
          .includes(searchTerm);
      });
    });
  }

  private applySorting(data: T[]): T[] {
    const field = this._sortField();
    const order = this._sortOrder();

    if (!field || order === 0 || data.length === 0) {
      return data;
    }

    return [...data].sort((a, b) => {
      const valueA = this.getFieldValue(a, field);
      const valueB = this.getFieldValue(b, field);

      let comparison = 0;

      if (valueA == null && valueB == null) {
        comparison = 0;
      } else if (valueA == null) {
        comparison = -1;
      } else if (valueB == null) {
        comparison = 1;
      } else if (typeof valueA === 'string' && typeof valueB === 'string') {
        comparison = valueA.localeCompare(valueB, 'nb');
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        comparison = valueA - valueB;
      } else {
        comparison = String(valueA).localeCompare(String(valueB), 'nb');
      }

      return order * comparison;
    });
  }

  /**
   * Henter verdi fra et objekt basert på felt-path (støtter nested: "user.name")
   */
  private getFieldValue(obj: T, field: string): unknown {
    const keys = field.split('.');
    let value: unknown = obj;

    for (const key of keys) {
      if (value == null) return null;
      value = (value as Record<string, unknown>)[key];
    }

    return value;
  }
}
