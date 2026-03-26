import { HviIconBase } from '../base-icon.webcomponent';

export class HviIconKnifeFill extends HviIconBase {
  protected get path(): string {
    return 'M13.9385 3.39157C14.1341 3.53254 14.25 3.75892 14.25 4.00001V20C14.25 20.4142 13.9142 20.75 13.5 20.75C13.0858 20.75 12.75 20.4142 12.75 20V13.75H12.5C10.9812 13.75 9.75 12.5188 9.75 11V7.88304C9.75 5.8385 11.0583 4.02334 12.9979 3.3768L13.2628 3.28849C13.4915 3.21226 13.743 3.25061 13.9385 3.39157Z';
  }
}

// Register the custom element (only in browser environment)
if (typeof customElements !== 'undefined' && !customElements.get('hvi-icon-knife-fill')) {
  customElements.define('hvi-icon-knife-fill', HviIconKnifeFill);
}
