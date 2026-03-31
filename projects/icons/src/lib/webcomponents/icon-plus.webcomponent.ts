import { HviIconBase } from '../base-icon.webcomponent';

export class HviIconPlus extends HviIconBase {
  protected get path(): string {
    return 'M12.75 5.5C12.75 5.08579 12.4142 4.75 12 4.75C11.5858 4.75 11.25 5.08579 11.25 5.5V11.25H5.5C5.08579 11.25 4.75 11.5858 4.75 12C4.75 12.4142 5.08579 12.75 5.5 12.75H11.25V18.5C11.25 18.9142 11.5858 19.25 12 19.25C12.4142 19.25 12.75 18.9142 12.75 18.5V12.75H18.5C18.9142 12.75 19.25 12.4142 19.25 12C19.25 11.5858 18.9142 11.25 18.5 11.25H12.75V5.5Z';
  }
}

// Register the custom element (only in browser environment)
if (typeof customElements !== 'undefined' && !customElements.get('hvi-icon-plus')) {
  customElements.define('hvi-icon-plus', HviIconPlus);
}
