import { HviIconBase } from '../base-icon.webcomponent';

export class HviIconMinus extends HviIconBase {
  protected get path(): string {
    return 'M4.75 12.0001C4.75 11.5858 5.08579 11.2501 5.5 11.2501L18.5 11.2501C18.9142 11.2501 19.25 11.5858 19.25 12.0001C19.25 12.4143 18.9142 12.7501 18.5 12.7501L5.5 12.7501C5.08579 12.7501 4.75 12.4143 4.75 12.0001Z';
  }
}

// Register the custom element (only in browser environment)
if (typeof customElements !== 'undefined' && !customElements.get('hvi-icon-minus')) {
  customElements.define('hvi-icon-minus', HviIconMinus);
}
