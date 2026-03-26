import { HviIconBase } from '../base-icon.webcomponent';

export class HviIconDensity1 extends HviIconBase {
  protected get path(): string {
    return 'M7 2.25C6.58579 2.25 6.25 2.58579 6.25 3V10.5C6.25 10.9142 6.58579 11.25 7 11.25H17C17.4142 11.25 17.75 10.9142 17.75 10.5V3C17.75 2.58579 17.4142 2.25 17 2.25H7ZM7.75 9.75V3.75H16.25V9.75H7.75ZM7 12.75C6.58579 12.75 6.25 13.0858 6.25 13.5V21C6.25 21.4142 6.58579 21.75 7 21.75H17C17.4142 21.75 17.75 21.4142 17.75 21V13.5C17.75 13.0858 17.4142 12.75 17 12.75H7ZM7.75 20.25V14.25H16.25V20.25H7.75Z';
  }
}

// Register the custom element (only in browser environment)
if (typeof customElements !== 'undefined' && !customElements.get('hvi-icon-density1')) {
  customElements.define('hvi-icon-density1', HviIconDensity1);
}
