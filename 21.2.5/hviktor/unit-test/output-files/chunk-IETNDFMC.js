// projects/hviktor/src/alert/alert.component.ts
import { Component, Input } from "@angular/core";
import * as i0 from "@angular/core";
var _c0 = ["*"];
var HviAlert = class _HviAlert {
  /** Sets the type of alert by changing the color and  */
  color;
  static \u0275fac = function HviAlert_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviAlert)();
  };
  static \u0275cmp = /* @__PURE__ */ i0.\u0275\u0275defineComponent({ type: _HviAlert, selectors: [["hvi-alert"]], hostAttrs: [1, "ds-alert"], hostVars: 1, hostBindings: function HviAlert_HostBindings(rf, ctx) {
    if (rf & 2) {
      i0.\u0275\u0275attribute("data-color", ctx.color);
    }
  }, inputs: { color: "color" }, ngContentSelectors: _c0, decls: 1, vars: 0, template: function HviAlert_Template(rf, ctx) {
    if (rf & 1) {
      i0.\u0275\u0275projectionDef();
      i0.\u0275\u0275projection(0);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassMetadata(HviAlert, [{
    type: Component,
    args: [{
      selector: "hvi-alert",
      standalone: true,
      template: `<ng-content />`,
      host: {
        class: "ds-alert",
        "[attr.data-color]": "color"
      }
    }]
  }], null, { color: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassDebugInfo(HviAlert, { className: "HviAlert", filePath: "projects/hviktor/src/alert/alert.component.ts", lineNumber: 26 });
})();

export {
  HviAlert
};
//# sourceMappingURL=chunk-IETNDFMC.js.map
