import { HviIconBase } from '../base-icon.webcomponent';

export class HviIconChevronRightLast extends HviIconBase {
  protected get path(): string {
    return 'M17.75 6C17.75 5.58579 17.4142 5.25 17 5.25C16.5858 5.25 16.25 5.58579 16.25 6V18C16.25 18.4142 16.5858 18.75 17 18.75C17.4142 18.75 17.75 18.4142 17.75 18V6ZM7.28033 6.21967C6.98744 5.92678 6.51256 5.92678 6.21967 6.21967C5.92678 6.51256 5.92678 6.98744 6.21967 7.28033L11.1893 12.25L6.21967 17.2197C5.92678 17.5126 5.92678 17.9874 6.21967 18.2803C6.51256 18.5732 6.98744 18.5732 7.28033 18.2803L12.7803 12.7803C13.0732 12.4874 13.0732 12.0126 12.7803 11.7197L7.28033 6.21967Z';
  }
}

// Register the custom element (only in browser environment)
if (typeof customElements !== 'undefined' && !customElements.get('hvi-icon-chevron-right-last')) {
  customElements.define('hvi-icon-chevron-right-last', HviIconChevronRightLast);
}
