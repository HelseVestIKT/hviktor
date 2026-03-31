import { HviIconBase } from '../base-icon.webcomponent';

export class HviIconExclamationmark extends HviIconBase {
  protected get path(): string {
    return 'M12.75 6.5C12.75 6.08579 12.4142 5.75 12 5.75C11.5858 5.75 11.25 6.08579 11.25 6.5V14.5C11.25 14.9142 11.5858 15.25 12 15.25C12.4142 15.25 12.75 14.9142 12.75 14.5V6.5ZM12 16.5C11.4477 16.5 11 16.9477 11 17.5C11 18.0523 11.4477 18.5 12 18.5C12.5523 18.5 13 18.0523 13 17.5C13 16.9477 12.5523 16.5 12 16.5Z';
  }
}

// Register the custom element (only in browser environment)
if (typeof customElements !== 'undefined' && !customElements.get('hvi-icon-exclamationmark')) {
  customElements.define('hvi-icon-exclamationmark', HviIconExclamationmark);
}
