import {
  setupTestBed
} from "./chunk-PQZSX3Z2.js";
import {
  HviAvatar
} from "./chunk-XUV6M2EZ.js";
import "./chunk-RSTWSNOR.js";

// projects/hviktor/src/avatar/avatar.component.spec.ts
import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import * as i0 from "@angular/core";
describe("HviAvatar", () => {
  let fixture;
  let element;
  beforeEach(async () => {
    await setupTestBed({ imports: [HviAvatar] });
    fixture = TestBed.createComponent(HviAvatar);
    element = fixture.nativeElement;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
  it("should have ds-avatar host class", () => {
    expect(element.classList.contains("ds-avatar")).toBe(true);
  });
  it('should have role="img"', () => {
    expect(element.getAttribute("role")).toBe("img");
  });
  it("should not set data attributes when no inputs are provided", () => {
    expect(element.getAttribute("data-variant")).toBeNull();
    expect(element.getAttribute("data-initials")).toBeNull();
    expect(element.getAttribute("data-size")).toBeNull();
    expect(element.getAttribute("data-color")).toBeNull();
    expect(element.getAttribute("aria-label")).toBeNull();
  });
  describe("aria-label", () => {
    it("should set aria-label", () => {
      fixture.componentRef.setInput("ariaLabel", "Ola Nordmann");
      fixture.detectChanges();
      expect(element.getAttribute("aria-label")).toBe("Ola Nordmann");
    });
  });
  describe("variant", () => {
    it("should set data-variant to circle", () => {
      fixture.componentRef.setInput("variant", "circle");
      fixture.detectChanges();
      expect(element.getAttribute("data-variant")).toBe("circle");
    });
    it("should set data-variant to square", () => {
      fixture.componentRef.setInput("variant", "square");
      fixture.detectChanges();
      expect(element.getAttribute("data-variant")).toBe("square");
    });
  });
  describe("initials", () => {
    it("should set data-initials", () => {
      fixture.componentRef.setInput("initials", "ON");
      fixture.detectChanges();
      expect(element.getAttribute("data-initials")).toBe("ON");
    });
  });
  describe("size", () => {
    it("should set data-size to xs", () => {
      fixture.componentRef.setInput("size", "xs");
      fixture.detectChanges();
      expect(element.getAttribute("data-size")).toBe("xs");
    });
    it("should set data-size to sm", () => {
      fixture.componentRef.setInput("size", "sm");
      fixture.detectChanges();
      expect(element.getAttribute("data-size")).toBe("sm");
    });
    it("should set data-size to md", () => {
      fixture.componentRef.setInput("size", "md");
      fixture.detectChanges();
      expect(element.getAttribute("data-size")).toBe("md");
    });
    it("should set data-size to lg", () => {
      fixture.componentRef.setInput("size", "lg");
      fixture.detectChanges();
      expect(element.getAttribute("data-size")).toBe("lg");
    });
  });
  describe("color", () => {
    it("should set data-color to accent", () => {
      fixture.componentRef.setInput("color", "accent");
      fixture.detectChanges();
      expect(element.getAttribute("data-color")).toBe("accent");
    });
    it("should set data-color to brand1", () => {
      fixture.componentRef.setInput("color", "brand1");
      fixture.detectChanges();
      expect(element.getAttribute("data-color")).toBe("brand1");
    });
    it("should set data-color to brand2", () => {
      fixture.componentRef.setInput("color", "brand2");
      fixture.detectChanges();
      expect(element.getAttribute("data-color")).toBe("brand2");
    });
    it("should set data-color to brand3", () => {
      fixture.componentRef.setInput("color", "brand3");
      fixture.detectChanges();
      expect(element.getAttribute("data-color")).toBe("brand3");
    });
    it("should set data-color to neutral", () => {
      fixture.componentRef.setInput("color", "neutral");
      fixture.detectChanges();
      expect(element.getAttribute("data-color")).toBe("neutral");
    });
    it("should set data-color to danger", () => {
      fixture.componentRef.setInput("color", "danger");
      fixture.detectChanges();
      expect(element.getAttribute("data-color")).toBe("danger");
    });
  });
  describe("combined attributes", () => {
    it("should support all attributes set together", () => {
      fixture.componentRef.setInput("ariaLabel", "Ola Nordmann");
      fixture.componentRef.setInput("variant", "square");
      fixture.componentRef.setInput("initials", "ON");
      fixture.componentRef.setInput("size", "lg");
      fixture.componentRef.setInput("color", "brand1");
      fixture.detectChanges();
      expect(element.getAttribute("aria-label")).toBe("Ola Nordmann");
      expect(element.getAttribute("data-variant")).toBe("square");
      expect(element.getAttribute("data-initials")).toBe("ON");
      expect(element.getAttribute("data-size")).toBe("lg");
      expect(element.getAttribute("data-color")).toBe("brand1");
      expect(element.getAttribute("role")).toBe("img");
      expect(element.classList.contains("ds-avatar")).toBe(true);
    });
  });
});
var AvatarWithInitialsComponent = class _AvatarWithInitialsComponent {
  static \u0275fac = function AvatarWithInitialsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AvatarWithInitialsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ i0.\u0275\u0275defineComponent({ type: _AvatarWithInitialsComponent, selectors: [["ng-component"]], decls: 2, vars: 0, consts: [["ariaLabel", "Ola Nordmann"]], template: function AvatarWithInitialsComponent_Template(rf, ctx) {
    if (rf & 1) {
      i0.\u0275\u0275elementStart(0, "hvi-avatar", 0);
      i0.\u0275\u0275text(1, "ON");
      i0.\u0275\u0275elementEnd();
    }
  }, dependencies: [HviAvatar], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassMetadata(AvatarWithInitialsComponent, [{
    type: Component,
    args: [{
      standalone: true,
      imports: [HviAvatar],
      template: '<hvi-avatar ariaLabel="Ola Nordmann">ON</hvi-avatar>'
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassDebugInfo(AvatarWithInitialsComponent, { className: "AvatarWithInitialsComponent", filePath: "projects/hviktor/src/avatar/avatar.component.spec.ts", lineNumber: 156 });
})();
var AvatarWithImageComponent = class _AvatarWithImageComponent {
  static \u0275fac = function AvatarWithImageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AvatarWithImageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ i0.\u0275\u0275defineComponent({ type: _AvatarWithImageComponent, selectors: [["ng-component"]], decls: 2, vars: 0, consts: [["ariaLabel", "Ola Nordmann"], ["src", "avatar.jpg", "alt", ""]], template: function AvatarWithImageComponent_Template(rf, ctx) {
    if (rf & 1) {
      i0.\u0275\u0275elementStart(0, "hvi-avatar", 0);
      i0.\u0275\u0275element(1, "img", 1);
      i0.\u0275\u0275elementEnd();
    }
  }, dependencies: [HviAvatar], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassMetadata(AvatarWithImageComponent, [{
    type: Component,
    args: [{
      standalone: true,
      imports: [HviAvatar],
      template: '<hvi-avatar ariaLabel="Ola Nordmann"><img src="avatar.jpg" alt="" /></hvi-avatar>'
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassDebugInfo(AvatarWithImageComponent, { className: "AvatarWithImageComponent", filePath: "projects/hviktor/src/avatar/avatar.component.spec.ts", lineNumber: 163 });
})();
var AvatarWithVisibleTextComponent = class _AvatarWithVisibleTextComponent {
  static \u0275fac = function AvatarWithVisibleTextComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AvatarWithVisibleTextComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ i0.\u0275\u0275defineComponent({ type: _AvatarWithVisibleTextComponent, selectors: [["ng-component"]], decls: 4, vars: 0, consts: [["aria-hidden", "true"]], template: function AvatarWithVisibleTextComponent_Template(rf, ctx) {
    if (rf & 1) {
      i0.\u0275\u0275elementStart(0, "hvi-avatar", 0);
      i0.\u0275\u0275text(1, "ON");
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(2, "span");
      i0.\u0275\u0275text(3, "Ola Nordmann");
      i0.\u0275\u0275elementEnd();
    }
  }, dependencies: [HviAvatar], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassMetadata(AvatarWithVisibleTextComponent, [{
    type: Component,
    args: [{
      standalone: true,
      imports: [HviAvatar],
      template: `<hvi-avatar aria-hidden="true">ON</hvi-avatar><span>Ola Nordmann</span>`
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassDebugInfo(AvatarWithVisibleTextComponent, { className: "AvatarWithVisibleTextComponent", filePath: "projects/hviktor/src/avatar/avatar.component.spec.ts", lineNumber: 170 });
})();
var AvatarDefaultIconComponent = class _AvatarDefaultIconComponent {
  static \u0275fac = function AvatarDefaultIconComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AvatarDefaultIconComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ i0.\u0275\u0275defineComponent({ type: _AvatarDefaultIconComponent, selectors: [["ng-component"]], decls: 1, vars: 0, consts: [["ariaLabel", "Ola Nordmann"]], template: function AvatarDefaultIconComponent_Template(rf, ctx) {
    if (rf & 1) {
      i0.\u0275\u0275element(0, "hvi-avatar", 0);
    }
  }, dependencies: [HviAvatar], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassMetadata(AvatarDefaultIconComponent, [{
    type: Component,
    args: [{
      standalone: true,
      imports: [HviAvatar],
      template: '<hvi-avatar ariaLabel="Ola Nordmann"></hvi-avatar>'
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassDebugInfo(AvatarDefaultIconComponent, { className: "AvatarDefaultIconComponent", filePath: "projects/hviktor/src/avatar/avatar.component.spec.ts", lineNumber: 177 });
})();
describe("HviAvatar content projection", () => {
  beforeEach(async () => {
    await setupTestBed({
      imports: [
        HviAvatar,
        AvatarWithInitialsComponent,
        AvatarWithImageComponent,
        AvatarWithVisibleTextComponent,
        AvatarDefaultIconComponent
      ]
    });
  });
  it("should project initials as text content", () => {
    const fixture = TestBed.createComponent(AvatarWithInitialsComponent);
    fixture.detectChanges();
    const avatarEl = fixture.nativeElement.querySelector("hvi-avatar");
    expect(avatarEl.textContent).toContain("ON");
  });
  it("should project an image as child", () => {
    const fixture = TestBed.createComponent(AvatarWithImageComponent);
    fixture.detectChanges();
    const avatarEl = fixture.nativeElement.querySelector("hvi-avatar");
    const img = avatarEl.querySelector("img");
    expect(img).toBeTruthy();
    expect(img.getAttribute("src")).toBe("avatar.jpg");
  });
  it("should not have content when no children are provided (default icon via CSS)", () => {
    const fixture = TestBed.createComponent(AvatarDefaultIconComponent);
    fixture.detectChanges();
    const avatarEl = fixture.nativeElement.querySelector("hvi-avatar");
    expect(avatarEl.textContent.trim()).toBe("");
  });
  it("should support aria-hidden when used alongside visible text", () => {
    const fixture = TestBed.createComponent(AvatarWithVisibleTextComponent);
    fixture.detectChanges();
    const avatarEl = fixture.nativeElement.querySelector("hvi-avatar");
    expect(avatarEl.getAttribute("aria-hidden")).toBe("true");
    const nameSpan = fixture.nativeElement.querySelector("span");
    expect(nameSpan.textContent).toBe("Ola Nordmann");
  });
});
//# sourceMappingURL=spec-avatar-avatar.component.js.map
