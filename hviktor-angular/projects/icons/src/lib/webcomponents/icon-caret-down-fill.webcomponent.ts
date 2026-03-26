import { HviIconBase } from '../base-icon.webcomponent';

export class HviIconCaretDownFill extends HviIconBase {
  protected get path(): string {
    return 'M5.80709 9.71299C5.92318 9.43273 6.19665 9.25 6.5 9.25H17.5C17.8033 9.25 18.0768 9.43273 18.1929 9.71299C18.309 9.99324 18.2448 10.3158 18.0303 10.5303L12.5303 16.0303C12.2374 16.3232 11.7626 16.3232 11.4697 16.0303L5.96967 10.5303C5.75517 10.3158 5.691 9.99324 5.80709 9.71299Z';
  }
}

// Register the custom element (only in browser environment)
if (typeof customElements !== 'undefined' && !customElements.get('hvi-icon-caret-down-fill')) {
  customElements.define('hvi-icon-caret-down-fill', HviIconCaretDownFill);
}
