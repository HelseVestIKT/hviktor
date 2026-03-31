import "./chunk-46DXP6YY.js";

// node_modules/@u-elements/u-details/dist/u-details.js
var IS_BROWSER = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.navigator !== "undefined";
var _a;
IS_BROWSER && // @ts-expect-error Typescript has not implemented userAgentData yet https://stackoverflow.com/a/71392474
/^Mac/i.test(((_a = navigator.userAgentData) == null ? void 0 : _a.platform) || navigator.platform);
var DISPLAY_BLOCK = ":host(:not([hidden])) { display: block }";
var UHTMLElement = typeof HTMLElement === "undefined" ? class {
} : HTMLElement;
function attr(el, name, value) {
  if (value === void 0) return el.getAttribute(name);
  if (value === null) el.removeAttribute(name);
  else if (el.getAttribute(name) !== value) el.setAttribute(name, value);
  return null;
}
var events = (action, element, rest) => {
  for (const type of rest[0].split(",")) {
    rest[0] = type;
    Element.prototype[`${action}EventListener`].apply(element, rest);
  }
};
var on = (element, ...rest) => events("add", element, rest);
var off = (element, ...rest) => events("remove", element, rest);
var asButton = (event) => {
  const isClick = "key" in event && (event.key === " " || event.key === "Enter");
  if (isClick) event.preventDefault();
  if (isClick && event.target instanceof HTMLElement) event.target.click();
  return isClick;
};
var getRoot = (node) => {
  var _a2;
  const root = ((_a2 = node.getRootNode) == null ? void 0 : _a2.call(node)) || node.ownerDocument;
  return root instanceof Document || root instanceof ShadowRoot ? root : document;
};
var createElement = (tagName, text, attrs) => {
  const el = document.createElement(tagName);
  if (text) el.textContent = text;
  if (attrs) for (const [key, val] of Object.entries(attrs)) attr(el, key, val);
  return el;
};
var customElements = {
  define: (name, instance) => !IS_BROWSER || window.customElements.get(name) || window.customElements.define(name, instance)
};
var declarativeShadowRoot = (style, slot = "<slot></slot>") => `<template shadowrootmode="open">${slot}<style>${style}</style></template>`;
var UHTMLDetailsStyle = `${DISPLAY_BLOCK}
::slotted(u-summary) { cursor: pointer; display: block }
::slotted(u-summary)::before { content: ''; display: inline-block; vertical-align: middle; margin-inline: .05em .3125em; border-block: .3125em solid transparent; border-inline-start: .5em solid }
::slotted(u-summary[aria-expanded="true"])::before { rotate: 90deg }
:host > [part="details-content"]:not([hidden=""]) { display: block }`;
var UHTMLDetailsShadowRoot = declarativeShadowRoot(
  UHTMLDetailsStyle,
  '<slot name="summary"></slot><slot part="details-content" hidden="until-found"></slot>'
);
var UHTMLDetailsElement = class extends UHTMLElement {
  constructor() {
    super();
    this._content = null;
    if (!this.shadowRoot)
      this.attachShadow({ mode: "open" }).append(
        createElement("slot", null, { name: "summary" }),
        createElement("slot", null, { part: "details-content" }),
        createElement("style", UHTMLDetailsStyle)
      );
  }
  // Using ES2015 syntax for backwards compatibility
  static get observedAttributes() {
    return ["open"];
  }
  connectedCallback() {
    var _a2;
    this._content = (_a2 = this.shadowRoot) == null ? void 0 : _a2.children[1];
    attr(this, "role", "group");
    on(this._content, "beforematch", this);
    on(this, "click,keydown", this);
    this.attributeChangedCallback();
  }
  disconnectedCallback() {
    if (this._content) off(this._content, "beforematch", this);
    off(this, "click,keydown", this);
    this._content = null;
  }
  attributeChangedCallback(prop, prev, next) {
    const hide = "onbeforematch" in this ? "until-found" : true;
    const open = this.open;
    for (const el of this.children)
      if (el.nodeName === "U-SUMMARY") attr(el, "aria-expanded", `${open}`);
    if (this._content) {
      attr(this._content, "aria-hidden", `${!open}`);
      attr(this._content, "tabindex", open ? null : "-1");
      this._content.hidden = open ? false : hide;
    }
    if (open && this.name) {
      const uDetailsList = getRoot(this).querySelectorAll(
        `${this.nodeName}[name="${this.name}"]`
      );
      for (const uDetails of uDetailsList)
        if (uDetails !== this) uDetails.open = false;
    }
    if (prop === "open" && prev === null !== (next === null))
      this.dispatchEvent(new Event("toggle"));
  }
  handleEvent(event) {
    const summary = this.querySelector(":scope > u-summary");
    const isSummary = summary == null ? void 0 : summary.contains(event.target);
    if (event.defaultPrevented) return;
    if (event.type === "beforematch") this.open = true;
    if (isSummary && event.type === "keydown") asButton(event);
    if (isSummary && event.type === "click") this.open = !this.open;
  }
  get open() {
    return this.hasAttribute("open");
  }
  set open(value) {
    attr(this, "open", value ? "" : null);
  }
  get name() {
    return attr(this, "name") || "";
  }
  set name(value) {
    attr(this, "name", value);
  }
};
var UHTMLSummaryElement = class extends UHTMLElement {
  connectedCallback() {
    attr(this, "role", "button");
    this.slot = "summary";
    this.tabIndex = 0;
  }
};
customElements.define("u-details", UHTMLDetailsElement);
customElements.define("u-summary", UHTMLSummaryElement);
export {
  UHTMLDetailsElement,
  UHTMLDetailsShadowRoot,
  UHTMLDetailsStyle,
  UHTMLSummaryElement
};
//# sourceMappingURL=@u-elements_u-details.js.map
