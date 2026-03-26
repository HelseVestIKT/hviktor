import { HviIconBase } from '../base-icon.webcomponent';

export class HviIconSidebarBoth extends HviIconBase {
  protected get path(): string {
    return 'M3.25 4C3.25 3.58579 3.58579 3.25 4 3.25H20C20.4142 3.25 20.75 3.58579 20.75 4V20C20.75 20.4142 20.4142 20.75 20 20.75H4C3.58579 20.75 3.25 20.4142 3.25 20V4ZM15.75 4.75L15.75 19.25H19.25V4.75H15.75ZM14.25 4.75L14.25 19.25H9.75L9.75 4.75H14.25ZM8.25 4.75L8.25 19.25H4.75V4.75H8.25Z';
  }
}

// Register the custom element (only in browser environment)
if (typeof customElements !== 'undefined' && !customElements.get('hvi-icon-sidebar-both')) {
  customElements.define('hvi-icon-sidebar-both', HviIconSidebarBoth);
}
