import { HviIconBase } from '../base-icon.webcomponent';

export class HviIconChevronUp extends HviIconBase {
  protected get path(): string {
    return 'M11.4697 7.96967C11.7626 7.67678 12.2374 7.67678 12.5303 7.96967L18.0303 13.4697C18.3232 13.7626 18.3232 14.2374 18.0303 14.5303C17.7374 14.8232 17.2626 14.8232 16.9697 14.5303L12 9.56066L7.03033 14.5303C6.73744 14.8232 6.26256 14.8232 5.96967 14.5303C5.67678 14.2374 5.67678 13.7626 5.96967 13.4697L11.4697 7.96967Z';
  }
}

// Register the custom element (only in browser environment)
if (typeof customElements !== 'undefined' && !customElements.get('hvi-icon-chevron-up')) {
  customElements.define('hvi-icon-chevron-up', HviIconChevronUp);
}
