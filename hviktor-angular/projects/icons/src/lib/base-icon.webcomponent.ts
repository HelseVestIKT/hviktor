export abstract class HviIconBase extends HTMLElement {
  private _size: 'sm' | 'md' | 'lg' = 'md';
  private _shadow: ShadowRoot;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['size'];
  }

  get size(): 'sm' | 'md' | 'lg' {
    return this._size;
  }

  set size(value: 'sm' | 'md' | 'lg') {
    this._size = value;
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'size' && oldValue !== newValue) {
      this._size = (newValue as 'sm' | 'md' | 'lg') || 'md';
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  protected abstract get path(): string;

  protected get sizePx(): number {
    const sizeMap = { sm: 16, md: 24, lg: 32 };
    return sizeMap[this._size];
  }

  private render() {
    this._shadow.innerHTML = `
      <style>
        :host {
          display: inline-block;
          line-height: 0;
        }
        svg {
          display: block;
        }
      </style>
      <svg
        width="${this.sizePx}"
        height="${this.sizePx}"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" d="${this.path}" />
      </svg>
    `;
  }
}
