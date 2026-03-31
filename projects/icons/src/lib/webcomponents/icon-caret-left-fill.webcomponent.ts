import { HviIconBase } from '../base-icon.webcomponent';

export class HviIconCaretLeftFill extends HviIconBase {
  protected get path(): string {
    return 'M15.037 6.5571C15.3173 6.67318 15.5 6.94666 15.5 7.25001L15.5 18.25C15.5 18.5534 15.3173 18.8268 15.037 18.9429C14.7567 19.059 14.4342 18.9948 14.2197 18.7803L8.71965 13.2803C8.42676 12.9874 8.42676 12.5126 8.71965 12.2197L14.2197 6.71968C14.4342 6.50518 14.7567 6.44101 15.037 6.5571Z';
  }
}

// Register the custom element (only in browser environment)
if (typeof customElements !== 'undefined' && !customElements.get('hvi-icon-caret-left-fill')) {
  customElements.define('hvi-icon-caret-left-fill', HviIconCaretLeftFill);
}
