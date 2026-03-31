// node_modules/@u-elements/u-tabs/dist/u-tabs.js
var IS_BROWSER = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.navigator !== "undefined";
var IS_ANDROID = IS_BROWSER && /android/i.test(navigator.userAgent);
var _a;
IS_BROWSER && // @ts-expect-error Typescript has not implemented userAgentData yet https://stackoverflow.com/a/71392474
/^Mac/i.test(((_a = navigator.userAgentData) == null ? void 0 : _a.platform) || navigator.platform);
var SAFE_LABELLEDBY = `${IS_ANDROID ? "data" : "aria"}-labelledby`;
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
var attachStyle = (element, css) => element.shadowRoot || element.attachShadow({ mode: "open" }).append(
  createElement("slot"),
  // Unnamed slot does automatically render all top element nodes
  createElement("style", css)
);
var observers = /* @__PURE__ */ new WeakMap();
var mutationObserver = (element, options) => {
  if (options === void 0) return observers.get(element);
  try {
    observers.get(element).disconnect();
    observers.delete(element);
  } catch (_err) {
  }
  if (options) {
    const observer = new MutationObserver(
      (detail) => element.handleEvent({ type: "mutation", detail })
    );
    observer.observe(element, options);
    observers.set(element, observer);
  }
};
var asButton = (event) => {
  var _a2;
  const isClick = event.key === " " || event.key === "Enter";
  if (isClick) (_a2 = event.preventDefault) == null ? void 0 : _a2.call(event);
  if (isClick && event.target instanceof HTMLElement)
    event.target.dispatchEvent(new MouseEvent("click", event));
  return isClick;
};
var getRoot = (node) => {
  var _a2;
  const root = ((_a2 = node.getRootNode) == null ? void 0 : _a2.call(node)) || node.ownerDocument;
  return root instanceof Document || root instanceof ShadowRoot ? root : document;
};
var id = 0;
var useId = (el) => {
  if (!el) return "";
  if (!el.id) el.id = `:${el.nodeName.toLowerCase()}${(++id).toString(32)}`;
  return el.id;
};
var createElement = (tagName, content, attrs) => {
  const el = document.createElement(tagName);
  if (content) el[tagName === "style" ? "textContent" : "innerHTML"] = content;
  return el;
};
var customElements = {
  define: (name, instance) => !IS_BROWSER || window.customElements.get(name) || window.customElements.define(name, instance)
};
var declarativeShadowRoot = (style, slot = "<slot></slot>") => `<template shadowrootmode="open">${slot}<style>${style}</style></template>`;
var UHTMLTabsStyle = DISPLAY_BLOCK;
var UHTMLTabListStyle = DISPLAY_BLOCK;
var UHTMLTabPanelStyle = DISPLAY_BLOCK;
var UHTMLTabStyle = ':host(:not([hidden])) { display: inline-block; cursor: pointer }:host([aria-disabled="true"]) { cursor: default }';
var UHTMLTabsShadowRoot = declarativeShadowRoot(UHTMLTabsStyle);
var UHTMLTabListShadowRoot = declarativeShadowRoot(UHTMLTabListStyle);
var UHTMLTabShadowRoot = declarativeShadowRoot(UHTMLTabStyle);
var UHTMLTabPanelShadowRoot = declarativeShadowRoot(UHTMLTabPanelStyle);
var ARIA_CONTROLS = "aria-controls";
var ARIA_SELECTED = "aria-selected";
var ATTR_TABS = "data-utabs";
var UHTMLTabsElement = class extends UHTMLElement {
  constructor() {
    super();
    attachStyle(this, UHTMLTabsStyle);
  }
  connectedCallback() {
    attr(this, ATTR_TABS, "");
  }
  get tabList() {
    return queryWithoutNested("tablist", this)[0] || null;
  }
  get selectedIndex() {
    return getSelectedIndex(this.tabs);
  }
  set selectedIndex(index) {
    setSelected(this.tabs[index]);
  }
  get tabs() {
    return queryWithoutNested("tab", this);
  }
  get panels() {
    return queryWithoutNested("tabpanel", this);
  }
};
var UHTMLTabListElement = class extends UHTMLElement {
  constructor() {
    super();
    attachStyle(this, UHTMLTabListStyle);
  }
  connectedCallback() {
    attr(this, "role", "tablist");
    on(this, "click,keydown", this);
    mutationObserver(this, { childList: true });
    requestAnimationFrame(() => this.handleEvent());
  }
  disconnectedCallback() {
    off(this, "click,keydown", this);
    mutationObserver(this, false);
  }
  handleEvent(event) {
    var _a2, _b;
    if (!event || event.type === "mutation") {
      const tab = this.tabs[Math.max(this.selectedIndex, 0)];
      return tab == null ? void 0 : tab.setAttribute(ARIA_SELECTED, "true");
    }
    const { key } = event;
    const tabs = [...this.tabs];
    const prev = tabs.findIndex((tab) => tab.contains(event.target));
    let next = prev;
    if (event.defaultPrevented || prev === -1) return;
    if (event.type === "click") setSelected(tabs[prev]);
    if (event.type === "keydown" && !asButton(event)) {
      if (key === "ArrowDown" || key === "ArrowRight")
        next = (prev + 1) % tabs.length;
      else if (key === "ArrowUp" || key === "ArrowLeft")
        next = (prev || tabs.length) - 1;
      else if (key === "End") next = tabs.length - 1;
      else if (key === "Home") next = 0;
      else if (key === "Tab") next = getSelectedIndex(tabs);
      else return;
      setTimeout(() => {
        attr(tabs[prev], "tabindex", "-1");
        attr(tabs[next], "tabindex", "0");
      });
      if (key !== "Tab") {
        event.preventDefault();
        (_b = (_a2 = tabs[next]).focus) == null ? void 0 : _b.call(_a2);
      }
    }
  }
  get tabsElement() {
    return getTabsElement(this);
  }
  get tabs() {
    return getTabs(this);
  }
  get selectedIndex() {
    return getSelectedIndex(this.tabs);
  }
  set selectedIndex(index) {
    setSelected(this.tabs[index]);
  }
};
var SKIP_ATTR_CHANGE_TAB = false;
var UHTMLTabElement = class extends UHTMLElement {
  // Using ES2015 syntax for backwards compatibility
  static get observedAttributes() {
    return ["id", ARIA_SELECTED, ARIA_CONTROLS];
  }
  constructor() {
    super();
    attachStyle(this, UHTMLTabStyle);
  }
  connectedCallback() {
    attr(this, "role", "tab");
    attr(this, "tabindex", this.selected ? "0" : "-1");
  }
  attributeChangedCallback() {
    if (!SKIP_ATTR_CHANGE_TAB && this.selected && this.tabList) {
      SKIP_ATTR_CHANGE_TAB = true;
      const tabs = this.tabList ? getTabs(this.tabList) : [];
      const panels = queryWithoutNested("tabpanel", this.tabsElement || this);
      const nextPanel = getPanel(this, panels[[...tabs].indexOf(this)]);
      if (nextPanel) attr(nextPanel, SAFE_LABELLEDBY, useId(this));
      let i = 0;
      for (const tab of tabs) {
        const panel = getPanel(tab, panels[i++]);
        attr(tab, "tabindex", tab === this ? "0" : "-1");
        attr(tab, ARIA_SELECTED, `${tab === this}`);
        if (panel == null ? void 0 : panel.id) attr(tab, ARIA_CONTROLS, panel.id);
        if (panel) panel.hidden = panel !== nextPanel;
      }
      SKIP_ATTR_CHANGE_TAB = false;
    }
  }
  get tabsElement() {
    return getTabsElement(this);
  }
  get tabList() {
    const tablist = this.parentElement;
    return (tablist == null ? void 0 : tablist.getAttribute("role")) === "tablist" ? tablist : null;
  }
  get selected() {
    return attr(this, ARIA_SELECTED) === "true";
  }
  set selected(value) {
    attr(this, ARIA_SELECTED, `${!!value}`);
  }
  /** Retrieves the ordinal position of an tab in a tablist. */
  get index() {
    const tablist = this.tabList;
    return tablist ? [...getTabs(tablist)].indexOf(this) : 0;
  }
  get panel() {
    return getPanel(this);
  }
};
var SKIP_ATTR_CHANGE_PANEL = false;
var UHTMLTabPanelElement = class extends UHTMLElement {
  // Using ES2015 syntax for backwards compatibility
  static get observedAttributes() {
    return ["id", "hidden"];
  }
  constructor() {
    super();
    attachStyle(this, UHTMLTabPanelStyle);
  }
  connectedCallback() {
    var _a2, _b;
    attr(this, "role", "tabpanel");
    (_b = (_a2 = this.tabsElement) == null ? void 0 : _a2.tabList) == null ? void 0 : _b.handleEvent();
    this.attributeChangedCallback();
  }
  attributeChangedCallback() {
    if (SKIP_ATTR_CHANGE_PANEL) return;
    SKIP_ATTR_CHANGE_PANEL = true;
    const hasFocusable = isFocusable(this.firstChild);
    this.hidden = getSelectedIndex(this.tabs) === -1;
    attr(this, "aria-hidden", `${this.hidden}`);
    attr(this, "tabindex", this.hidden || hasFocusable ? null : "0");
    SKIP_ATTR_CHANGE_PANEL = false;
  }
  get tabsElement() {
    return getTabsElement(this);
  }
  get tabs() {
    return getRoot(this).querySelectorAll(
      `[role="tab"][${ARIA_CONTROLS}="${this.id}"]`
    );
  }
};
var queryWithoutNested = (role, self) => self.querySelectorAll(
  `[role="${role}"]:not(:scope [role="tabpanel"] [role="${role}"])`
);
var getPanel = (tab, panel) => getRoot(tab).getElementById(attr(tab, ARIA_CONTROLS) || useId(panel));
var getSelectedIndex = (tabs) => [...tabs].findIndex((tab) => attr(tab, ARIA_SELECTED) === "true");
var getTabsElement = (self) => self.closest(`[${ATTR_TABS}]`);
var getTabs = (self) => self.querySelectorAll(`:scope > [role="tab"]`);
var setSelected = (tab) => tab && attr(tab, "aria-disabled") !== "true" && attr(tab, "aria-selected", "true");
var isFocusable = (el) => el instanceof Element && !el.matches(':disabled,[tabindex^="-"]') && el.matches(
  `[contenteditable],[controls],[href],[tabindex],input:not([type="hidden"]),select,textarea,button,summary,iframe`
);
customElements.define("u-tabs", UHTMLTabsElement);
customElements.define("u-tablist", UHTMLTabListElement);
customElements.define("u-tab", UHTMLTabElement);
customElements.define("u-tabpanel", UHTMLTabPanelElement);

export {
  UHTMLTabsStyle,
  UHTMLTabListStyle,
  UHTMLTabPanelStyle,
  UHTMLTabStyle,
  UHTMLTabsShadowRoot,
  UHTMLTabListShadowRoot,
  UHTMLTabShadowRoot,
  UHTMLTabPanelShadowRoot,
  UHTMLTabsElement,
  UHTMLTabListElement,
  UHTMLTabElement,
  UHTMLTabPanelElement
};
//# sourceMappingURL=chunk-PTTF5T72.js.map
