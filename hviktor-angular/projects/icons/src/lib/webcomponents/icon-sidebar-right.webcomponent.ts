import { HviIconBase } from '../base-icon.webcomponent';

export class HviIconSidebarRight extends HviIconBase {
  protected get path(): string {
    return 'M4 3.25C3.58579 3.25 3.25 3.58579 3.25 4V20C3.25 20.4142 3.58579 20.75 4 20.75H20C20.4142 20.75 20.75 20.4142 20.75 20V4C20.75 3.58579 20.4142 3.25 20 3.25H4ZM14.25 4.75H4.75V19.25H14.25V4.75ZM15.75 19.25V4.75H19.25V19.25H15.75Z';
  }
}

// Register the custom element (only in browser environment)
if (typeof customElements !== 'undefined' && !customElements.get('hvi-icon-sidebar-right')) {
  customElements.define('hvi-icon-sidebar-right', HviIconSidebarRight);
}
