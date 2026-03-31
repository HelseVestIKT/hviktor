import { HviIconBase } from '../base-icon.webcomponent';

export class HviIconStop extends HviIconBase {
  protected get path(): string {
    return 'M6.25 7C6.25 6.58579 6.58579 6.25 7 6.25H17C17.4142 6.25 17.75 6.58579 17.75 7V17C17.75 17.4142 17.4142 17.75 17 17.75H7C6.58579 17.75 6.25 17.4142 6.25 17V7ZM7.75 7.75V16.25H16.25V7.75H7.75Z';
  }
}

// Register the custom element (only in browser environment)
if (typeof customElements !== 'undefined' && !customElements.get('hvi-icon-stop')) {
  customElements.define('hvi-icon-stop', HviIconStop);
}
