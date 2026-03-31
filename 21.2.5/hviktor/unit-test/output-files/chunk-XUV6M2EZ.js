// projects/hviktor/src/avatar/avatar.component.ts
import { Component, Input } from "@angular/core";
import * as i0 from "@angular/core";
var _c0 = ["*"];
var HviAvatar = class _HviAvatar {
  /** The name of the person the avatar represents */
  ariaLabel;
  /** The shape of the avatar */
  variant;
  /** Initials displayed inside the avatar */
  initials;
  /** The size of the avatar */
  size;
  /** The color theme of the avatar */
  color;
  static \u0275fac = function HviAvatar_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviAvatar)();
  };
  static \u0275cmp = /* @__PURE__ */ i0.\u0275\u0275defineComponent({ type: _HviAvatar, selectors: [["hvi-avatar"]], hostAttrs: ["role", "img", 1, "ds-avatar"], hostVars: 5, hostBindings: function HviAvatar_HostBindings(rf, ctx) {
    if (rf & 2) {
      i0.\u0275\u0275attribute("aria-label", ctx.ariaLabel ?? null)("data-variant", ctx.variant ?? null)("data-initials", ctx.initials ?? null)("data-size", ctx.size ?? null)("data-color", ctx.color ?? null);
    }
  }, inputs: { ariaLabel: "ariaLabel", variant: "variant", initials: "initials", size: "size", color: "color" }, ngContentSelectors: _c0, decls: 1, vars: 0, template: function HviAvatar_Template(rf, ctx) {
    if (rf & 1) {
      i0.\u0275\u0275projectionDef();
      i0.\u0275\u0275projection(0);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassMetadata(HviAvatar, [{
    type: Component,
    args: [{
      selector: "hvi-avatar",
      standalone: true,
      template: "<ng-content />",
      host: {
        class: "ds-avatar",
        role: "img",
        "[attr.aria-label]": "ariaLabel ?? null",
        "[attr.data-variant]": "variant ?? null",
        "[attr.data-initials]": "initials ?? null",
        "[attr.data-size]": "size ?? null",
        "[attr.data-color]": "color ?? null"
      }
    }]
  }], null, { ariaLabel: [{
    type: Input
  }], variant: [{
    type: Input
  }], initials: [{
    type: Input
  }], size: [{
    type: Input
  }], color: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassDebugInfo(HviAvatar, { className: "HviAvatar", filePath: "projects/hviktor/src/avatar/avatar.component.ts", lineNumber: 33 });
})();

export {
  HviAvatar
};
//# sourceMappingURL=chunk-XUV6M2EZ.js.map
