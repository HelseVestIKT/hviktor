import {
  setupTestBed
} from "./chunk-PQZSX3Z2.js";
import {
  HviAlert
} from "./chunk-IETNDFMC.js";
import "./chunk-RSTWSNOR.js";

// projects/hviktor/src/alert/alert.component.spec.ts
import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import * as i0 from "@angular/core";
describe("HviAlert", () => {
  let fixture;
  let element;
  beforeEach(async () => {
    await setupTestBed({ imports: [HviAlert] });
    fixture = TestBed.createComponent(HviAlert);
    element = fixture.nativeElement;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
  it("should have ds-alert host class", () => {
    expect(element.classList.contains("ds-alert")).toBe(true);
  });
  it("should not set data-color when no color is provided", () => {
    expect(element.getAttribute("data-color")).toBeNull();
  });
  it("should set data-color to info", () => {
    fixture.componentRef.setInput("color", "info");
    fixture.detectChanges();
    expect(element.getAttribute("data-color")).toBe("info");
  });
  it("should set data-color to success", () => {
    fixture.componentRef.setInput("color", "success");
    fixture.detectChanges();
    expect(element.getAttribute("data-color")).toBe("success");
  });
  it("should set data-color to warning", () => {
    fixture.componentRef.setInput("color", "warning");
    fixture.detectChanges();
    expect(element.getAttribute("data-color")).toBe("warning");
  });
  it("should set data-color to danger", () => {
    fixture.componentRef.setInput("color", "danger");
    fixture.detectChanges();
    expect(element.getAttribute("data-color")).toBe("danger");
  });
});
var AlertHostComponent = class _AlertHostComponent {
  static \u0275fac = function AlertHostComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AlertHostComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ i0.\u0275\u0275defineComponent({ type: _AlertHostComponent, selectors: [["ng-component"]], decls: 2, vars: 0, template: function AlertHostComponent_Template(rf, ctx) {
    if (rf & 1) {
      i0.\u0275\u0275elementStart(0, "hvi-alert");
      i0.\u0275\u0275text(1, "Testvarsel");
      i0.\u0275\u0275elementEnd();
    }
  }, dependencies: [HviAlert], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassMetadata(AlertHostComponent, [{
    type: Component,
    args: [{
      standalone: true,
      imports: [HviAlert],
      template: "<hvi-alert>Testvarsel</hvi-alert>"
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassDebugInfo(AlertHostComponent, { className: "AlertHostComponent", filePath: "projects/hviktor/src/alert/alert.component.spec.ts", lineNumber: 59 });
})();
var AlertRichContentHostComponent = class _AlertRichContentHostComponent {
  static \u0275fac = function AlertRichContentHostComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AlertRichContentHostComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ i0.\u0275\u0275defineComponent({ type: _AlertRichContentHostComponent, selectors: [["ng-component"]], decls: 5, vars: 0, template: function AlertRichContentHostComponent_Template(rf, ctx) {
    if (rf & 1) {
      i0.\u0275\u0275elementStart(0, "hvi-alert")(1, "h2");
      i0.\u0275\u0275text(2, "Overskrift");
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(3, "p");
      i0.\u0275\u0275text(4, "Beskrivelse");
      i0.\u0275\u0275elementEnd()();
    }
  }, dependencies: [HviAlert], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassMetadata(AlertRichContentHostComponent, [{
    type: Component,
    args: [{
      standalone: true,
      imports: [HviAlert],
      template: `<hvi-alert>
    <h2>Overskrift</h2>
    <p>Beskrivelse</p>
  </hvi-alert>`
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassDebugInfo(AlertRichContentHostComponent, { className: "AlertRichContentHostComponent", filePath: "projects/hviktor/src/alert/alert.component.spec.ts", lineNumber: 69 });
})();
describe("HviAlert content projection", () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [HviAlert, AlertHostComponent, AlertRichContentHostComponent] });
  });
  it("should project text content", () => {
    const fixture = TestBed.createComponent(AlertHostComponent);
    fixture.detectChanges();
    const alertEl = fixture.nativeElement.querySelector("hvi-alert");
    expect(alertEl.textContent).toContain("Testvarsel");
  });
  it("should project heading and paragraph content", () => {
    const fixture = TestBed.createComponent(AlertRichContentHostComponent);
    fixture.detectChanges();
    const alertEl = fixture.nativeElement.querySelector("hvi-alert");
    expect(alertEl.querySelector("h2")?.textContent).toContain("Overskrift");
    expect(alertEl.querySelector("p")?.textContent).toContain("Beskrivelse");
  });
});
//# sourceMappingURL=spec-alert-alert.component.js.map
