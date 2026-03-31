import { HviIconBase } from '../base-icon.webcomponent';

export class HviIconSidebarRightFill extends HviIconBase {
  protected get path(): string {
    return 'M14.25 3.75C14.25 3.47386 14.0261 3.25 13.75 3.25H4C3.58579 3.25 3.25 3.58579 3.25 4V20C3.25 20.4142 3.58579 20.75 4 20.75H13.75C14.0261 20.75 14.25 20.5261 14.25 20.25V3.75ZM15.75 20.25C15.75 20.5261 15.9739 20.75 16.25 20.75H20C20.4142 20.75 20.75 20.4142 20.75 20V4C20.75 3.58579 20.4142 3.25 20 3.25H16.25C15.9739 3.25 15.75 3.47386 15.75 3.75V20.25Z';
  }
}

// Register the custom element (only in browser environment)
if (typeof customElements !== 'undefined' && !customElements.get('hvi-icon-sidebar-right-fill')) {
  customElements.define('hvi-icon-sidebar-right-fill', HviIconSidebarRightFill);
}
