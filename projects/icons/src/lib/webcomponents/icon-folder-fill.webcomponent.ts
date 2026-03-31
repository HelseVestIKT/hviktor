import { HviIconBase } from '../base-icon.webcomponent';

export class HviIconFolderFill extends HviIconBase {
  protected get path(): string {
    return 'M2.25 6C2.25 5.0335 3.0335 4.25 4 4.25H10C10.9665 4.25 11.75 5.0335 11.75 6V7.25H20.5C21.1904 7.25 21.75 7.80964 21.75 8.5V18.5C21.75 19.1904 21.1904 19.75 20.5 19.75H3.5C2.80964 19.75 2.25 19.1904 2.25 18.5V6Z';
  }
}

// Register the custom element (only in browser environment)
if (typeof customElements !== 'undefined' && !customElements.get('hvi-icon-folder-fill')) {
  customElements.define('hvi-icon-folder-fill', HviIconFolderFill);
}
