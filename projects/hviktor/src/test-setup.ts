/**
 * Polyfill for CSS.supports() which is not available in jsdom.
 * Required because @digdir/designsystemet-web calls CSS.supports() on import.
 */
if (typeof globalThis.CSS === 'undefined') {
  Object.defineProperty(globalThis, 'CSS', { value: { supports: () => false } });
}

/**
 * Stub native popover API so @oddbird/popover-polyfill skips activation in jsdom.
 * Without this, the polyfill sets up MutationObservers and adoptedStyleSheets
 * that crash the Vitest worker process during teardown in CI.
 */
if (typeof HTMLElement !== 'undefined' && !('popover' in HTMLElement.prototype)) {
  Object.defineProperty(HTMLElement.prototype, 'popover', {
    value: null,
    writable: true,
    configurable: true,
  });
}

/**
 * Polyfill for document.adoptedStyleSheets which is not available in jsdom.
 * Required because @oddbird/popover-polyfill iterates over adoptedStyleSheets on import.
 */
if (typeof document !== 'undefined' && !document.adoptedStyleSheets) {
  Object.defineProperty(document, 'adoptedStyleSheets', { value: [], writable: true });
}

if (typeof globalThis.requestAnimationFrame === 'undefined') {
  Object.defineProperty(globalThis, 'requestAnimationFrame', {
    value: (cb: FrameRequestCallback) => setTimeout(() => cb(Date.now()), 0),
  });
}

if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'undefined') {
  Object.defineProperty(window, 'requestAnimationFrame', {
    value: globalThis.requestAnimationFrame,
  });
}

if (typeof globalThis.cancelAnimationFrame === 'undefined') {
  Object.defineProperty(globalThis, 'cancelAnimationFrame', {
    value: (id: number) => clearTimeout(id),
  });
}

if (typeof window !== 'undefined' && typeof window.cancelAnimationFrame === 'undefined') {
  Object.defineProperty(window, 'cancelAnimationFrame', {
    value: globalThis.cancelAnimationFrame,
  });
}
