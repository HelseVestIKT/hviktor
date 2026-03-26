import { HviIconBase } from '../base-icon.webcomponent';

export class HviIconSquareFill extends HviIconBase {
  protected get path(): string {
    return 'M3.25 4C3.25 3.58579 3.58579 3.25 4 3.25H20C20.4142 3.25 20.75 3.58579 20.75 4V20C20.75 20.4142 20.4142 20.75 20 20.75H4C3.58579 20.75 3.25 20.4142 3.25 20V4Z';
  }
}

// Register the custom element (only in browser environment)
if (typeof customElements !== 'undefined' && !customElements.get('hvi-icon-square-fill')) {
  customElements.define('hvi-icon-square-fill', HviIconSquareFill);
}
