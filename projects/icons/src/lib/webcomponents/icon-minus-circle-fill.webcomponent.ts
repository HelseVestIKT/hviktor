import { HviIconBase } from '../base-icon.webcomponent';

export class HviIconMinusCircleFill extends HviIconBase {
  protected get path(): string {
    return 'M12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 17.3848 6.61522 21.75 12 21.75C17.3848 21.75 21.75 17.3848 21.75 12C21.75 6.61522 17.3848 2.25 12 2.25ZM7.5 11.25C7.08579 11.25 6.75 11.5858 6.75 12C6.75 12.4142 7.08579 12.75 7.5 12.75H16.5C16.9142 12.75 17.25 12.4142 17.25 12C17.25 11.5858 16.9142 11.25 16.5 11.25H7.5Z';
  }
}

// Register the custom element (only in browser environment)
if (typeof customElements !== 'undefined' && !customElements.get('hvi-icon-minus-circle-fill')) {
  customElements.define('hvi-icon-minus-circle-fill', HviIconMinusCircleFill);
}
