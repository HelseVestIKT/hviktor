import { HviIconBase } from '../base-icon.webcomponent';

export class HviIconCircleFill extends HviIconBase {
  protected get path(): string {
    return 'M1.5 12C1.5 6.20101 6.20101 1.5 12 1.5C17.799 1.5 22.5 6.20101 22.5 12C22.5 17.799 17.799 22.5 12 22.5C6.20101 22.5 1.5 17.799 1.5 12Z';
  }
}

// Register the custom element (only in browser environment)
if (typeof customElements !== 'undefined' && !customElements.get('hvi-icon-circle-fill')) {
  customElements.define('hvi-icon-circle-fill', HviIconCircleFill);
}
