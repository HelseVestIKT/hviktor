import { HviIconBase } from '../base-icon.webcomponent';

export class HviIconChatFill extends HviIconBase {
  protected get path(): string {
    return 'M3.25 6C3.25 4.48122 4.48122 3.25 6 3.25H18C19.5188 3.25 20.75 4.48122 20.75 6V15C20.75 16.5188 19.5188 17.75 18 17.75H9.20774L4.38587 20.6431C4.15417 20.7821 3.86561 20.7858 3.63048 20.6527C3.39534 20.5195 3.25 20.2702 3.25 20V6Z';
  }
}

// Register the custom element (only in browser environment)
if (typeof customElements !== 'undefined' && !customElements.get('hvi-icon-chat-fill')) {
  customElements.define('hvi-icon-chat-fill', HviIconChatFill);
}
