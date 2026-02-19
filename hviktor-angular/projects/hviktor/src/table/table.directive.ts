import { booleanAttribute, Directive, Input } from '@angular/core';

/**
 * @summary
 * Table brukes for å vise strukturert informasjon på en ryddig og oversiktlig måte.
 * Tabeller kan gjøre det enklere for brukerne å skanne og sammenligne informasjon.
 *
 * @example
 * ```html
 * <table hviTable zebra border>
 *   <caption>Pasientoversikt</caption>
 *   <thead>
 *     <tr>
 *       <th>Navn</th>
 *       <th>Avdeling</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td>Ola Nordmann</td>
 *       <td>Medisinsk</td>
 *     </tr>
 *   </tbody>
 * </table>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/docs/table/code}
 */
@Directive({
  selector: '[hviTable]',
  standalone: true,
  host: {
    class: 'ds-table',
    '[attr.data-zebra]': 'zebra || null',
    '[attr.data-border]': 'border || null',
    '[attr.data-hover]': 'hover || null',
    '[attr.data-sticky-header]': 'stickyHeader || null',
  },
})
export class HviTable {
  /** Gir tabellen zebrastriper (annenhver rad har alternativ bakgrunn) */
  @Input({ transform: booleanAttribute }) zebra = false;

  /** Gir tabellen en avrundet kant rundt */
  @Input({ transform: booleanAttribute }) border = false;

  /** Gir tabellen hover-effekt på rader */
  @Input({ transform: booleanAttribute }) hover = false;

  /** Gjør tabellens header sticky (fester seg til toppen ved scrolling) */
  @Input({ transform: booleanAttribute }) stickyHeader = false;
}
