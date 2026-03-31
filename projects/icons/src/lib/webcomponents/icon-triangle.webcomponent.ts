import { HviIconBase } from '../base-icon.webcomponent';

export class HviIconTriangle extends HviIconBase {
  protected get path(): string {
    return 'M12 2.25C12.2731 2.25 12.5245 2.3984 12.6565 2.63743L22.1828 19.8874C22.3111 20.1198 22.3071 20.4026 22.1722 20.6312C22.0373 20.8597 21.7917 21 21.5263 21H2.47372C2.20832 21 1.96268 20.8597 1.8278 20.6312C1.69292 20.4026 1.68888 20.1198 1.81719 19.8874L11.3435 2.63743C11.4755 2.3984 11.7269 2.25 12 2.25ZM3.74468 19.5H20.2553L12 4.55142L3.74468 19.5Z';
  }
}

// Register the custom element (only in browser environment)
if (typeof customElements !== 'undefined' && !customElements.get('hvi-icon-triangle')) {
  customElements.define('hvi-icon-triangle', HviIconTriangle);
}
