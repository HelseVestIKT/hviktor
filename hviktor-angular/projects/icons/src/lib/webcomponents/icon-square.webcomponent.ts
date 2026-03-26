import { HviIconBase } from '../base-icon.webcomponent';

export class HviIconSquare extends HviIconBase {
  protected get path(): string {
    return 'M3.25 4C3.25 3.58579 3.58579 3.25 4 3.25H20C20.4142 3.25 20.75 3.58579 20.75 4V20C20.75 20.4142 20.4142 20.75 20 20.75H4C3.58579 20.75 3.25 20.4142 3.25 20V4ZM4.75 4.75V19.25H19.25V4.75H4.75Z';
  }
}

// Register the custom element (only in browser environment)
if (typeof customElements !== 'undefined' && !customElements.get('hvi-icon-square')) {
  customElements.define('hvi-icon-square', HviIconSquare);
}
