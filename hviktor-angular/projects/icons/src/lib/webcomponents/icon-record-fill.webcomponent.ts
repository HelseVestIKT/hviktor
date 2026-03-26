import { HviIconBase } from '../base-icon.webcomponent';

export class HviIconRecordFill extends HviIconBase {
  protected get path(): string {
    return 'M6.25 12C6.25 8.82436 8.82436 6.25 12 6.25C15.1756 6.25 17.75 8.82436 17.75 12C17.75 15.1756 15.1756 17.75 12 17.75C8.82436 17.75 6.25 15.1756 6.25 12Z';
  }
}

// Register the custom element (only in browser environment)
if (typeof customElements !== 'undefined' && !customElements.get('hvi-icon-record-fill')) {
  customElements.define('hvi-icon-record-fill', HviIconRecordFill);
}
