import { HviIconBase } from '../base-icon.webcomponent';

export class HviIconBookmarkFill extends HviIconBase {
  protected get path(): string {
    return 'M6.25 5C6.25 4.0335 7.0335 3.25 8 3.25H16C16.9665 3.25 17.75 4.0335 17.75 5V20C17.75 20.3033 17.5673 20.5768 17.287 20.6929C17.0068 20.809 16.6842 20.7448 16.4697 20.5303L12 16.0607L7.53033 20.5303C7.31583 20.7448 6.99324 20.809 6.71299 20.6929C6.43273 20.5768 6.25 20.3033 6.25 20V5Z';
  }
}

// Register the custom element (only in browser environment)
if (typeof customElements !== 'undefined' && !customElements.get('hvi-icon-bookmark-fill')) {
  customElements.define('hvi-icon-bookmark-fill', HviIconBookmarkFill);
}
