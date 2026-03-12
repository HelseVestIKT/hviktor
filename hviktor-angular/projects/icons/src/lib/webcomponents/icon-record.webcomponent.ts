import { HviIconBase } from '../base-icon.webcomponent';

export class HviIconRecord extends HviIconBase {
  protected get path(): string {
    return 'M12 7.75C9.65279 7.75 7.75 9.65279 7.75 12C7.75 14.3472 9.65279 16.25 12 16.25C14.3472 16.25 16.25 14.3472 16.25 12C16.25 9.65279 14.3472 7.75 12 7.75ZM6.25 12C6.25 8.82436 8.82436 6.25 12 6.25C15.1756 6.25 17.75 8.82436 17.75 12C17.75 15.1756 15.1756 17.75 12 17.75C8.82436 17.75 6.25 15.1756 6.25 12Z';
  }
}

// Register the custom element (only in browser environment)
if (typeof customElements !== 'undefined' && !customElements.get('hvi-icon-record')) {
  customElements.define('hvi-icon-record', HviIconRecord);
}
