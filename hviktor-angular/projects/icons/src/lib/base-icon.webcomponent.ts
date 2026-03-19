export interface HviIconSizeChangeDetail {
  previousSize: 'sm' | 'md' | 'lg';
  size: 'sm' | 'md' | 'lg';
}

export interface HviIconElement extends HTMLElement {
  size: 'sm' | 'md' | 'lg';

  addEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: 'hvi-size-change',
    listener: (event: CustomEvent<HviIconSizeChangeDetail>) => void,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;

  removeEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown,
    options?: boolean | EventListenerOptions,
  ): void;
  removeEventListener(
    type: 'hvi-size-change',
    listener: (event: CustomEvent<HviIconSizeChangeDetail>) => void,
    options?: boolean | EventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void;
}

export interface HviIconAttributes {
  size?: 'sm' | 'md' | 'lg';
  onhvisizechange?: (event: CustomEvent<HviIconSizeChangeDetail>) => void;
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName: `hvi-icon-${string}`]: HviIconElement;
  }

  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [tagName: `hvi-icon-${string}`]: HviIconAttributes;
    }
  }
}

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
    const previousSize = this._size;
    this._size = value;
    this.render();
    this.emitSizeChange(previousSize, this._size);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'size' && oldValue !== newValue) {
      const previousSize = this._size;
      this._size = (newValue as 'sm' | 'md' | 'lg') || 'md';
      this.render();
      this.emitSizeChange(previousSize, this._size);
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

  private emitSizeChange(previousSize: 'sm' | 'md' | 'lg', size: 'sm' | 'md' | 'lg') {
    if (previousSize === size) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent<HviIconSizeChangeDetail>('hvi-size-change', {
        detail: {
          previousSize,
          size,
        },
        bubbles: true,
        composed: true,
      }),
    );
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
