import {
  HviAvatar
} from "./chunk-XUV6M2EZ.js";
import {
  HviAlert
} from "./chunk-IETNDFMC.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-RSTWSNOR.js";

// projects/hviktor/src/avatar-stack/avatar-stack.directive.ts
import { Directive, Input } from "@angular/core";
import * as i0 from "@angular/core";
var HviAvatarStack = class _HviAvatarStack {
  /** variant */
  variant;
  /** Plassering av popover relativt til trigger */
  expandable;
  suffix;
  gap;
  static \u0275fac = function HviAvatarStack_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviAvatarStack)();
  };
  static \u0275dir = /* @__PURE__ */ i0.\u0275\u0275defineDirective({ type: _HviAvatarStack, selectors: [["figure", "hviAvatarStack", ""]], hostAttrs: [1, "ds-avatar-stack"], hostVars: 4, hostBindings: function HviAvatarStack_HostBindings(rf, ctx) {
    if (rf & 2) {
      i0.\u0275\u0275attribute("data-variant", ctx.variant)("data-expandable", ctx.expandable)("data-suffix", ctx.suffix)("data-avatar-stack-gap", ctx.gap);
    }
  }, inputs: { variant: "variant", expandable: "expandable", suffix: "suffix", gap: "gap" } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassMetadata(HviAvatarStack, [{
    type: Directive,
    args: [{
      selector: "figure[hviAvatarStack]",
      standalone: true,
      host: {
        class: "ds-avatar-stack",
        "[attr.data-variant]": "variant",
        "[attr.data-expandable]": "expandable",
        "[attr.data-suffix]": "suffix",
        "[attr.data-avatar-stack-gap]": "gap"
      }
    }]
  }], null, { variant: [{
    type: Input
  }], expandable: [{
    type: Input
  }], suffix: [{
    type: Input
  }], gap: [{
    type: Input
  }] });
})();

// projects/hviktor/src/badge/badge-position.component.ts
import { Component, Input as Input2 } from "@angular/core";
import * as i02 from "@angular/core";
var _c0 = ["*"];
var HviBadgePosition = class _HviBadgePosition {
  /** Overlap of the badge */
  overlap = "rectangle";
  /** Placement of the badge */
  placement = "top-right";
  static \u0275fac = function HviBadgePosition_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviBadgePosition)();
  };
  static \u0275cmp = /* @__PURE__ */ i02.\u0275\u0275defineComponent({ type: _HviBadgePosition, selectors: [["hvi-badge-position"]], hostAttrs: [1, "ds-badge--position"], hostVars: 2, hostBindings: function HviBadgePosition_HostBindings(rf, ctx) {
    if (rf & 2) {
      i02.\u0275\u0275attribute("data-overlap", ctx.overlap)("data-placement", ctx.placement);
    }
  }, inputs: { overlap: "overlap", placement: "placement" }, ngContentSelectors: _c0, decls: 1, vars: 0, template: function HviBadgePosition_Template(rf, ctx) {
    if (rf & 1) {
      i02.\u0275\u0275projectionDef();
      i02.\u0275\u0275projection(0);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i02.\u0275setClassMetadata(HviBadgePosition, [{
    type: Component,
    args: [{
      selector: "hvi-badge-position",
      standalone: true,
      template: "<ng-content />",
      host: {
        class: "ds-badge--position",
        "[attr.data-overlap]": "overlap",
        "[attr.data-placement]": "placement"
      }
    }]
  }], null, { overlap: [{
    type: Input2
  }], placement: [{
    type: Input2
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i02.\u0275setClassDebugInfo(HviBadgePosition, { className: "HviBadgePosition", filePath: "projects/hviktor/src/badge/badge-position.component.ts", lineNumber: 13 });
})();

// projects/hviktor/src/badge/badge.component.ts
import { Component as Component2, Input as Input3 } from "@angular/core";
import * as i03 from "@angular/core";
var _c02 = ["*"];
var HviBadge = class _HviBadge {
  /** The variants of the badge */
  variant;
  /** count text of the badge*/
  count;
  /** The color theme of the badge */
  color;
  static \u0275fac = function HviBadge_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviBadge)();
  };
  static \u0275cmp = /* @__PURE__ */ i03.\u0275\u0275defineComponent({ type: _HviBadge, selectors: [["hvi-badge"]], hostAttrs: [1, "ds-badge"], hostVars: 3, hostBindings: function HviBadge_HostBindings(rf, ctx) {
    if (rf & 2) {
      i03.\u0275\u0275attribute("data-variant", ctx.variant ?? null)("data-count", ctx.count ?? null)("data-color", ctx.color ?? null);
    }
  }, inputs: { variant: "variant", count: "count", color: "color" }, ngContentSelectors: _c02, decls: 1, vars: 0, template: function HviBadge_Template(rf, ctx) {
    if (rf & 1) {
      i03.\u0275\u0275projectionDef();
      i03.\u0275\u0275projection(0);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i03.\u0275setClassMetadata(HviBadge, [{
    type: Component2,
    args: [{
      selector: "hvi-badge",
      standalone: true,
      template: "<ng-content />",
      host: {
        class: "ds-badge",
        "[attr.data-variant]": "variant ?? null",
        "[attr.data-count]": "count ?? null",
        "[attr.data-color]": "color ?? null"
      }
    }]
  }], null, { variant: [{
    type: Input3
  }], count: [{
    type: Input3
  }], color: [{
    type: Input3
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i03.\u0275setClassDebugInfo(HviBadge, { className: "HviBadge", filePath: "projects/hviktor/src/badge/badge.component.ts", lineNumber: 14 });
})();

// projects/hviktor/src/breadcrumbs/breadcrumbs.component.ts
import { Component as Component3, Input as Input4 } from "@angular/core";
import * as i04 from "@angular/core";
var _c03 = ["hviBreadcrumbs", ""];
function HviBreadcrumbs_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    i04.\u0275\u0275domElementStart(0, "a", 0);
    i04.\u0275\u0275text(1);
    i04.\u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i04.\u0275\u0275nextContext();
    i04.\u0275\u0275domProperty("href", ctx_r0.backLink.href, i04.\u0275\u0275sanitizeUrl);
    i04.\u0275\u0275attribute("aria-label", ctx_r0.backLink.ariaLabel ?? null);
    i04.\u0275\u0275advance();
    i04.\u0275\u0275textInterpolate1(" ", ctx_r0.backLink.label, " ");
  }
}
function HviBreadcrumbs_For_3_Template(rf, ctx) {
  if (rf & 1) {
    i04.\u0275\u0275domElementStart(0, "li")(1, "a", 0);
    i04.\u0275\u0275text(2);
    i04.\u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const \u0275$index_7_r3 = ctx.$index;
    const \u0275$count_7_r4 = ctx.$count;
    i04.\u0275\u0275advance();
    i04.\u0275\u0275domProperty("href", item_r2.href, i04.\u0275\u0275sanitizeUrl);
    i04.\u0275\u0275attribute("aria-label", item_r2.ariaLabel ?? null)("aria-current", \u0275$index_7_r3 === \u0275$count_7_r4 - 1 ? "page" : null);
    i04.\u0275\u0275advance();
    i04.\u0275\u0275textInterpolate1(" ", item_r2.label, " ");
  }
}
var HviBreadcrumbs = class _HviBreadcrumbs {
  /** Accessible label for the breadcrumb navigation */
  ariaLabel = "Du er her:";
  /** Optional back link object */
  backLink;
  /** Array of breadcrumb items */
  items = [];
  static \u0275fac = function HviBreadcrumbs_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviBreadcrumbs)();
  };
  static \u0275cmp = /* @__PURE__ */ i04.\u0275\u0275defineComponent({ type: _HviBreadcrumbs, selectors: [["nav", "hviBreadcrumbs", ""]], hostAttrs: ["role", "navigation", 1, "ds-breadcrumbs"], hostVars: 1, hostBindings: function HviBreadcrumbs_HostBindings(rf, ctx) {
    if (rf & 2) {
      i04.\u0275\u0275attribute("aria-label", ctx.ariaLabel ?? null);
    }
  }, inputs: { ariaLabel: "ariaLabel", backLink: "backLink", items: "items" }, attrs: _c03, decls: 4, vars: 1, consts: [[1, "ds-link", 3, "href"]], template: function HviBreadcrumbs_Template(rf, ctx) {
    if (rf & 1) {
      i04.\u0275\u0275conditionalCreate(0, HviBreadcrumbs_Conditional_0_Template, 2, 3, "a", 0);
      i04.\u0275\u0275domElementStart(1, "ol");
      i04.\u0275\u0275repeaterCreate(2, HviBreadcrumbs_For_3_Template, 3, 4, "li", null, i04.\u0275\u0275repeaterTrackByIdentity);
      i04.\u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      i04.\u0275\u0275conditional(ctx.backLink ? 0 : -1);
      i04.\u0275\u0275advance(2);
      i04.\u0275\u0275repeater(ctx.items);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i04.\u0275setClassMetadata(HviBreadcrumbs, [{
    type: Component3,
    args: [{
      selector: "nav[hviBreadcrumbs]",
      standalone: true,
      template: `
    <!-- Back link (optional) -->
    @if (backLink) {
      <a class="ds-link" [href]="backLink.href" [attr.aria-label]="backLink.ariaLabel ?? null">
        {{ backLink.label }}
      </a>
    }

    <ol>
      @for (item of items; let last = $last; track item) {
        <li>
          <a
            class="ds-link"
            [href]="item.href"
            [attr.aria-label]="item.ariaLabel ?? null"
            [attr.aria-current]="last ? 'page' : null"
          >
            {{ item.label }}
          </a>
        </li>
      }
    </ol>
  `,
      host: {
        class: "ds-breadcrumbs",
        role: "navigation",
        "[attr.aria-label]": "ariaLabel ?? null"
      }
    }]
  }], null, { ariaLabel: [{
    type: Input4
  }], backLink: [{
    type: Input4
  }], items: [{
    type: Input4
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i04.\u0275setClassDebugInfo(HviBreadcrumbs, { className: "HviBreadcrumbs", filePath: "projects/hviktor/src/breadcrumbs/breadcrumbs.component.ts", lineNumber: 65 });
})();

// projects/hviktor/src/button/button.directive.ts
import { booleanAttribute, Directive as Directive2, Input as Input5 } from "@angular/core";
import * as i05 from "@angular/core";
var HviButton = class _HviButton {
  /** The size of the button */
  size;
  /** Used to change the appearance of the button. */
  variant;
  /** The type of button */
  type;
  /** The color of the button */
  color;
  /** If you have only an icon in the button, you can set icon="true" to make it square.
   * If you have other content, such as text, the button will automatically have space around the icon.
   */
  icon = false;
  /** Sets the button in a loading state.
   * Loading indicators such as spinners must be added manually, e.g., with hvi-spinner
   */
  loading = false;
  /** Makes the button full width */
  fullWidth = false;
  static \u0275fac = function HviButton_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviButton)();
  };
  static \u0275dir = /* @__PURE__ */ i05.\u0275\u0275defineDirective({ type: _HviButton, selectors: [["button", "hviButton", ""], ["a", "hviButton", ""]], hostAttrs: [1, "ds-button"], hostVars: 7, hostBindings: function HviButton_HostBindings(rf, ctx) {
    if (rf & 2) {
      i05.\u0275\u0275attribute("type", ctx.type)("data-size", ctx.size)("data-variant", ctx.variant)("data-color", ctx.color)("data-fullwidth", ctx.fullWidth ? "" : null)("data-icon", ctx.icon ? "" : null)("aria-busy", ctx.loading ? "true" : null);
    }
  }, inputs: { size: "size", variant: "variant", type: "type", color: "color", icon: [2, "icon", "icon", booleanAttribute], loading: [2, "loading", "loading", booleanAttribute], fullWidth: [2, "fullWidth", "fullWidth", booleanAttribute] } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i05.\u0275setClassMetadata(HviButton, [{
    type: Directive2,
    args: [{
      selector: "button[hviButton], a[hviButton]",
      standalone: true,
      host: {
        class: "ds-button",
        "[attr.type]": "type",
        "[attr.data-size]": "size",
        "[attr.data-variant]": "variant",
        "[attr.data-color]": "color",
        "[attr.data-fullwidth]": 'fullWidth ? "" : null',
        "[attr.data-icon]": 'icon ? "" : null',
        "[attr.aria-busy]": 'loading ? "true" : null'
      }
    }]
  }], null, { size: [{
    type: Input5
  }], variant: [{
    type: Input5
  }], type: [{
    type: Input5
  }], color: [{
    type: Input5
  }], icon: [{
    type: Input5,
    args: [{ transform: booleanAttribute }]
  }], loading: [{
    type: Input5,
    args: [{ transform: booleanAttribute }]
  }], fullWidth: [{
    type: Input5,
    args: [{ transform: booleanAttribute }]
  }] });
})();

// projects/hviktor/src/card/card-block.directive.ts
import { Directive as Directive3 } from "@angular/core";
import * as i06 from "@angular/core";
var HviCardBlock = class _HviCardBlock {
  static \u0275fac = function HviCardBlock_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviCardBlock)();
  };
  static \u0275dir = /* @__PURE__ */ i06.\u0275\u0275defineDirective({ type: _HviCardBlock, selectors: [["", "hviCardBlock", ""]], hostAttrs: [1, "ds-card__block"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i06.\u0275setClassMetadata(HviCardBlock, [{
    type: Directive3,
    args: [{
      selector: "[hviCardBlock]",
      standalone: true,
      host: { class: "ds-card__block" }
    }]
  }], null, null);
})();

// projects/hviktor/src/card/card.component.ts
import { Component as Component4, Input as Input6 } from "@angular/core";
import * as i07 from "@angular/core";
var _c04 = ["*"];
var HviCard = class _HviCard {
  /** Sets the background of the card */
  variant;
  /** The color theme of the card */
  color;
  /** Maximum width of the card, for example '320px' or '20rem' */
  maxWidth;
  static \u0275fac = function HviCard_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviCard)();
  };
  static \u0275cmp = /* @__PURE__ */ i07.\u0275\u0275defineComponent({ type: _HviCard, selectors: [["hvi-card"]], hostAttrs: [1, "ds-card"], hostVars: 4, hostBindings: function HviCard_HostBindings(rf, ctx) {
    if (rf & 2) {
      i07.\u0275\u0275attribute("data-variant", ctx.variant)("data-color", ctx.color);
      i07.\u0275\u0275styleProp("max-width", ctx.maxWidth);
    }
  }, inputs: { variant: "variant", color: "color", maxWidth: "maxWidth" }, ngContentSelectors: _c04, decls: 1, vars: 0, template: function HviCard_Template(rf, ctx) {
    if (rf & 1) {
      i07.\u0275\u0275projectionDef();
      i07.\u0275\u0275projection(0);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i07.\u0275setClassMetadata(HviCard, [{
    type: Component4,
    args: [{
      selector: "hvi-card",
      standalone: true,
      template: "<ng-content />",
      host: {
        class: "ds-card",
        "[attr.data-variant]": "variant",
        "[attr.data-color]": "color",
        "[style.max-width]": "maxWidth"
      }
    }]
  }], null, { variant: [{
    type: Input6
  }], color: [{
    type: Input6
  }], maxWidth: [{
    type: Input6
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i07.\u0275setClassDebugInfo(HviCard, { className: "HviCard", filePath: "projects/hviktor/src/card/card.component.ts", lineNumber: 28 });
})();

// projects/hviktor/src/chip/chip-button.directive.ts
import { booleanAttribute as booleanAttribute2, Directive as Directive4, Input as Input7 } from "@angular/core";
import * as i08 from "@angular/core";
var HviChipButton = class _HviChipButton {
  /** Whether the chip is removable*/
  removable = false;
  static \u0275fac = function HviChipButton_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviChipButton)();
  };
  static \u0275dir = /* @__PURE__ */ i08.\u0275\u0275defineDirective({ type: _HviChipButton, selectors: [["button", "hviChip", ""]], hostAttrs: [1, "ds-chip"], hostVars: 1, hostBindings: function HviChipButton_HostBindings(rf, ctx) {
    if (rf & 2) {
      i08.\u0275\u0275attribute("data-removable", ctx.removable ? "true" : null);
    }
  }, inputs: { removable: [2, "removable", "removable", booleanAttribute2] } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i08.\u0275setClassMetadata(HviChipButton, [{
    type: Directive4,
    args: [{
      selector: "button[hviChip]",
      standalone: true,
      host: {
        class: "ds-chip",
        "[attr.data-removable]": 'removable ? "true" : null'
      }
    }]
  }], null, { removable: [{
    type: Input7,
    args: [{ transform: booleanAttribute2 }]
  }] });
})();

// projects/hviktor/src/chip/chip-label.directive.ts
import { Directive as Directive5 } from "@angular/core";
import * as i09 from "@angular/core";
var HviChipLabel = class _HviChipLabel {
  static \u0275fac = function HviChipLabel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviChipLabel)();
  };
  static \u0275dir = /* @__PURE__ */ i09.\u0275\u0275defineDirective({ type: _HviChipLabel, selectors: [["label", "hviChip", ""]], hostAttrs: [1, "ds-chip"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i09.\u0275setClassMetadata(HviChipLabel, [{
    type: Directive5,
    args: [{
      selector: "label[hviChip]",
      standalone: true,
      host: {
        class: "ds-chip"
      }
    }]
  }], null, null);
})();

// projects/hviktor/src/details/details-content.component.ts
import { Component as Component5 } from "@angular/core";
import * as i010 from "@angular/core";
var _c05 = ["*"];
var HviDetailsContent = class _HviDetailsContent {
  static \u0275fac = function HviDetailsContent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviDetailsContent)();
  };
  static \u0275cmp = /* @__PURE__ */ i010.\u0275\u0275defineComponent({ type: _HviDetailsContent, selectors: [["hvi-details-content"]], ngContentSelectors: _c05, decls: 1, vars: 0, template: function HviDetailsContent_Template(rf, ctx) {
    if (rf & 1) {
      i010.\u0275\u0275projectionDef();
      i010.\u0275\u0275projection(0);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i010.\u0275setClassMetadata(HviDetailsContent, [{
    type: Component5,
    args: [{
      selector: "hvi-details-content",
      template: `<ng-content />`
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i010.\u0275setClassDebugInfo(HviDetailsContent, { className: "HviDetailsContent", filePath: "projects/hviktor/src/details/details-content.component.ts", lineNumber: 7 });
})();

// projects/hviktor/src/details/details-summary.component.ts
import { Component as Component6 } from "@angular/core";
import * as i011 from "@angular/core";
var _c06 = ["*"];
var HviDetailsSummary = class _HviDetailsSummary {
  static \u0275fac = function HviDetailsSummary_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviDetailsSummary)();
  };
  static \u0275cmp = /* @__PURE__ */ i011.\u0275\u0275defineComponent({ type: _HviDetailsSummary, selectors: [["hvi-details-summary"]], ngContentSelectors: _c06, decls: 1, vars: 0, template: function HviDetailsSummary_Template(rf, ctx) {
    if (rf & 1) {
      i011.\u0275\u0275projectionDef();
      i011.\u0275\u0275projection(0);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i011.\u0275setClassMetadata(HviDetailsSummary, [{
    type: Component6,
    args: [{
      selector: "hvi-details-summary",
      template: `<ng-content />`
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i011.\u0275setClassDebugInfo(HviDetailsSummary, { className: "HviDetailsSummary", filePath: "projects/hviktor/src/details/details-summary.component.ts", lineNumber: 7 });
})();

// projects/hviktor/src/details/details.component.ts
import { Component as Component7, CUSTOM_ELEMENTS_SCHEMA, Input as Input8 } from "@angular/core";
import "@u-elements/u-details";
import * as i012 from "@angular/core";
var _c07 = [[["hvi-details-summary"]], [["hvi-details-content"]]];
var _c1 = ["hvi-details-summary", "hvi-details-content"];
var HviDetails = class _HviDetails {
  /** Variant of the details component */
  variant = "default";
  /** Control open state of the details component */
  open = false;
  /** Set default open state of the details component */
  defaultOpen = false;
  /** Event handler for toggle event */
  onToggle = () => {
  };
  handleToggle(event) {
    console.log("Toggled!", event);
  }
  static \u0275fac = function HviDetails_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviDetails)();
  };
  static \u0275cmp = /* @__PURE__ */ i012.\u0275\u0275defineComponent({ type: _HviDetails, selectors: [["hvi-details"]], inputs: { variant: "variant", open: "open", defaultOpen: "defaultOpen", onToggle: "onToggle" }, ngContentSelectors: _c1, decls: 6, vars: 3, consts: [["detailsRef", ""], [1, "ds-details", 3, "toggle"]], template: function HviDetails_Template(rf, ctx) {
    if (rf & 1) {
      i012.\u0275\u0275projectionDef(_c07);
      i012.\u0275\u0275domElementStart(0, "u-details", 1, 0);
      i012.\u0275\u0275domListener("toggle", function HviDetails_Template_u_details_toggle_0_listener($event) {
        return ctx.onToggle($event);
      });
      i012.\u0275\u0275domElementStart(2, "u-summary");
      i012.\u0275\u0275projection(3);
      i012.\u0275\u0275domElementEnd();
      i012.\u0275\u0275domElementStart(4, "div");
      i012.\u0275\u0275projection(5, 1);
      i012.\u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      i012.\u0275\u0275attribute("data-variant", ctx.variant)("defaultOpen", ctx.defaultOpen || void 0)("open", ctx.open || void 0);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i012.\u0275setClassMetadata(HviDetails, [{
    type: Component7,
    args: [{
      selector: "hvi-details",
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      standalone: true,
      template: ` <u-details
    #detailsRef
    class="ds-details"
    [attr.data-variant]="variant"
    [attr.defaultOpen]="defaultOpen || undefined"
    [attr.open]="open || undefined"
    (toggle)="onToggle($event)"
  >
    <u-summary>
      <ng-content select="hvi-details-summary" />
    </u-summary>
    <div>
      <ng-content select="hvi-details-content" />
    </div>
  </u-details>`,
      host: {}
    }]
  }], null, { variant: [{
    type: Input8
  }], open: [{
    type: Input8
  }], defaultOpen: [{
    type: Input8
  }], onToggle: [{
    type: Input8
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i012.\u0275setClassDebugInfo(HviDetails, { className: "HviDetails", filePath: "projects/hviktor/src/details/details.component.ts", lineNumber: 43 });
})();

// projects/hviktor/src/dialog/dialog-block.directive.ts
import { Directive as Directive6 } from "@angular/core";
import * as i013 from "@angular/core";
var HviDialogBlock = class _HviDialogBlock {
  static \u0275fac = function HviDialogBlock_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviDialogBlock)();
  };
  static \u0275dir = /* @__PURE__ */ i013.\u0275\u0275defineDirective({ type: _HviDialogBlock, selectors: [["", "hviDialogBlock", ""]], hostAttrs: [1, "ds-dialog__block"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i013.\u0275setClassMetadata(HviDialogBlock, [{
    type: Directive6,
    args: [{
      selector: "[hviDialogBlock]",
      standalone: true,
      host: {
        class: "ds-dialog__block"
      }
    }]
  }], null, null);
})();

// projects/hviktor/src/dialog/dialog.directive.ts
import { Directive as Directive7, ElementRef, EventEmitter, HostListener, inject, Input as Input9, Output } from "@angular/core";
import * as i014 from "@angular/core";
var HviDialog = class _HviDialog {
  id;
  set open(value) {
    this.setOpen(Boolean(value));
  }
  get open() {
    return this.element.open;
  }
  modal = true;
  openChange = new EventEmitter();
  element = inject(ElementRef).nativeElement;
  openModal() {
    this.setOpen(true);
  }
  close() {
    this.setOpen(false);
  }
  handleClose() {
    this.openChange.emit(false);
  }
  handleCancel(event) {
    event.preventDefault();
    this.setOpen(false);
  }
  setOpen(shouldOpen) {
    if (shouldOpen) {
      if (this.element.open) {
        return;
      }
      if (this.modal) {
        this.element.showModal();
      } else {
        this.element.show();
      }
      this.openChange.emit(true);
      return;
    }
    if (!this.element.open) {
      return;
    }
    this.element.close();
  }
  static \u0275fac = function HviDialog_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviDialog)();
  };
  static \u0275dir = /* @__PURE__ */ i014.\u0275\u0275defineDirective({ type: _HviDialog, selectors: [["dialog", "hviDialog", ""]], hostAttrs: ["id", "{{ id }}", 1, "ds-dialog"], hostBindings: function HviDialog_HostBindings(rf, ctx) {
    if (rf & 1) {
      i014.\u0275\u0275listener("close", function HviDialog_close_HostBindingHandler() {
        return ctx.handleClose();
      })("cancel", function HviDialog_cancel_HostBindingHandler($event) {
        return ctx.handleCancel($event);
      });
    }
  }, inputs: { id: "id", open: "open", modal: "modal" }, outputs: { openChange: "openChange" } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i014.\u0275setClassMetadata(HviDialog, [{
    type: Directive7,
    args: [{
      selector: "dialog[hviDialog]",
      standalone: true,
      host: {
        class: "ds-dialog",
        id: "{{ id }}"
      }
    }]
  }], null, { id: [{
    type: Input9
  }], open: [{
    type: Input9
  }], modal: [{
    type: Input9
  }], openChange: [{
    type: Output
  }], handleClose: [{
    type: HostListener,
    args: ["close"]
  }], handleCancel: [{
    type: HostListener,
    args: ["cancel", ["$event"]]
  }] });
})();

// projects/hviktor/src/divider/divider.directive.ts
import { Directive as Directive8 } from "@angular/core";
import * as i015 from "@angular/core";
var HviDivider = class _HviDivider {
  static \u0275fac = function HviDivider_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviDivider)();
  };
  static \u0275dir = /* @__PURE__ */ i015.\u0275\u0275defineDirective({ type: _HviDivider, selectors: [["hr", "hviDivider", ""]], hostAttrs: ["aria-hidden", "true", 1, "ds-divider"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i015.\u0275setClassMetadata(HviDivider, [{
    type: Directive8,
    args: [{
      selector: "hr[hviDivider]",
      standalone: true,
      host: {
        class: "ds-divider",
        "aria-hidden": "true"
      }
    }]
  }], null, null);
})();

// projects/hviktor/src/dropdown/dropdown.component.ts
import { Component as Component8, EventEmitter as EventEmitter2, HostListener as HostListener2, Input as Input10, Output as Output2 } from "@angular/core";
import "@digdir/designsystemet-web";
import * as i016 from "@angular/core";
var _c08 = ["*"];
var HviDropdown = class _HviDropdown {
  /** ID to target the popover */
  id;
  /** Popover type - 'auto' lukkes ved klikk utenfor, 'manual' krever manuell lukking */
  type = "auto";
  /** Variant */
  variant;
  /** Plassering av dropdown relativt til trigger */
  dropdownPlacement = "bottom";
  /** Aktiver automatisk repositjonering hvis det ikke er plass */
  autoPlacement = true;
  /** Event når dropdown åpnes */
  opened = new EventEmitter2();
  /** Event når dropdown lukkes */
  closed = new EventEmitter2();
  onToggle(event) {
    if (event.newState === "open") {
      this.opened.emit();
    } else {
      this.closed.emit();
    }
  }
  static \u0275fac = function HviDropdown_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviDropdown)();
  };
  static \u0275cmp = /* @__PURE__ */ i016.\u0275\u0275defineComponent({ type: _HviDropdown, selectors: [["hvi-dropdown"]], hostAttrs: [1, "ds-popover", "ds-dropdown"], hostVars: 5, hostBindings: function HviDropdown_HostBindings(rf, ctx) {
    if (rf & 1) {
      i016.\u0275\u0275listener("toggle", function HviDropdown_toggle_HostBindingHandler($event) {
        return ctx.onToggle($event);
      });
    }
    if (rf & 2) {
      i016.\u0275\u0275domProperty("id", ctx.id);
      i016.\u0275\u0275attribute("popover", ctx.type)("data-variant", ctx.variant)("data-placement", ctx.dropdownPlacement)("data-autoplacement", ctx.autoPlacement ? "" : null);
    }
  }, inputs: { id: "id", type: "type", variant: "variant", dropdownPlacement: "dropdownPlacement", autoPlacement: "autoPlacement" }, outputs: { opened: "opened", closed: "closed" }, ngContentSelectors: _c08, decls: 1, vars: 0, template: function HviDropdown_Template(rf, ctx) {
    if (rf & 1) {
      i016.\u0275\u0275projectionDef();
      i016.\u0275\u0275projection(0);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i016.\u0275setClassMetadata(HviDropdown, [{
    type: Component8,
    args: [{
      selector: "hvi-dropdown",
      standalone: true,
      template: "<ng-content />",
      host: {
        class: "ds-popover ds-dropdown",
        "[id]": "id",
        "[attr.popover]": "type",
        "[attr.data-variant]": "variant",
        "[attr.data-placement]": "dropdownPlacement",
        "[attr.data-autoplacement]": 'autoPlacement ? "" : null'
      }
    }]
  }], null, { id: [{
    type: Input10
  }], type: [{
    type: Input10
  }], variant: [{
    type: Input10
  }], dropdownPlacement: [{
    type: Input10
  }], autoPlacement: [{
    type: Input10
  }], opened: [{
    type: Output2
  }], closed: [{
    type: Output2
  }], onToggle: [{
    type: HostListener2,
    args: ["toggle", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i016.\u0275setClassDebugInfo(HviDropdown, { className: "HviDropdown", filePath: "projects/hviktor/src/dropdown/dropdown.component.ts", lineNumber: 39 });
})();

// projects/hviktor/src/forms/error-summary/error-summary.component.ts
import { Component as Component9, CUSTOM_ELEMENTS_SCHEMA as CUSTOM_ELEMENTS_SCHEMA2, ElementRef as ElementRef2, inject as inject3, Input as Input12 } from "@angular/core";
import "@digdir/designsystemet-web";

// projects/hviktor/src/forms/form/form.directive.ts
import { booleanAttribute as booleanAttribute3, computed, Directive as Directive9, EventEmitter as EventEmitter3, HostListener as HostListener3, inject as inject2, Input as Input11, Output as Output3, signal } from "@angular/core";
import { FormGroupDirective, Validators } from "@angular/forms";
import * as i017 from "@angular/core";
function analyzeFormRequired(formGroup) {
  const controls = Object.values(formGroup.controls);
  if (controls.length === 0)
    return "none";
  let requiredCount = 0;
  for (const control of controls) {
    if (control.hasValidator(Validators.required) || control.hasValidator(Validators.requiredTrue)) {
      requiredCount++;
    }
  }
  if (requiredCount === 0)
    return "none";
  if (requiredCount === controls.length)
    return "all-required";
  return "mixed";
}
var HviForm = class _HviForm {
  /** Emits when the form has been submitted */
  hviSubmitted = new EventEmitter3();
  /** True after first submit attempt */
  submitted = false;
  /** Optional focus target (e.g. HviErrorSummaryComponent) */
  focusOnInvalid;
  /**
   * Skru av/på automatisk required-tag-visning for child-komponenter.
   * Default `true`. Sett til `false` for manuell kontroll.
   */
  showRequiredTags = true;
  // Optional injection: present when the form uses [formGroup] and ReactiveFormsModule is in scope
  formGroupDir = inject2(FormGroupDirective, { optional: true });
  /** Internal signal som oppdateres ved submit og init */
  _requiredMode = signal("none", ...ngDevMode ? [{ debugName: "_requiredMode" }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Analysert required-modus for FormGroup-en.
   * - `'all-required'` – alle validerte controls er required
   * - `'mixed'` – blanding av required og optional
   * - `'none'` – ingen required-validering
   */
  requiredMode = computed(() => this._requiredMode(), ...ngDevMode ? [{ debugName: "requiredMode" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Oppdater required-analyse. Kalles automatisk ved submit, men kan kalles manuelt. */
  refreshRequiredMode() {
    const form = this.formGroupDir?.form;
    if (!form) {
      this._requiredMode.set("none");
      return;
    }
    this._requiredMode.set(analyzeFormRequired(form));
  }
  onSubmit(event) {
    this.submitted = true;
    this.hviSubmitted.emit();
    const form = this.formGroupDir?.form;
    if (!form)
      return;
    form.markAllAsTouched();
    if (form.invalid) {
      event.preventDefault();
      queueMicrotask(() => this.focusOnInvalid?.focus?.());
    }
  }
  ngOnInit() {
    this.refreshRequiredMode();
  }
  static \u0275fac = function HviForm_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviForm)();
  };
  static \u0275dir = /* @__PURE__ */ i017.\u0275\u0275defineDirective({ type: _HviForm, selectors: [["form", "hviForm", ""]], hostBindings: function HviForm_HostBindings(rf, ctx) {
    if (rf & 1) {
      i017.\u0275\u0275listener("submit", function HviForm_submit_HostBindingHandler($event) {
        return ctx.onSubmit($event);
      });
    }
  }, inputs: { focusOnInvalid: "focusOnInvalid", showRequiredTags: [2, "showRequiredTags", "showRequiredTags", booleanAttribute3] }, outputs: { hviSubmitted: "hviSubmitted" }, exportAs: ["hviForm"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i017.\u0275setClassMetadata(HviForm, [{
    type: Directive9,
    args: [{
      selector: "form[hviForm]",
      standalone: true,
      exportAs: "hviForm"
    }]
  }], null, { hviSubmitted: [{
    type: Output3
  }], focusOnInvalid: [{
    type: Input11
  }], showRequiredTags: [{
    type: Input11,
    args: [{ transform: booleanAttribute3 }]
  }], onSubmit: [{
    type: HostListener3,
    args: ["submit", ["$event"]]
  }] });
})();

// projects/hviktor/src/forms/error-summary/error-summary.component.ts
import * as i018 from "@angular/core";
var _forTrack0 = ($index, $item) => $item.href;
function HviErrorSummary_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    i018.\u0275\u0275domElementStart(0, "h1", 1);
    i018.\u0275\u0275text(1);
    i018.\u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i018.\u0275\u0275nextContext();
    i018.\u0275\u0275advance();
    i018.\u0275\u0275textInterpolate(ctx_r0.heading);
  }
}
function HviErrorSummary_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    i018.\u0275\u0275domElementStart(0, "h3", 1);
    i018.\u0275\u0275text(1);
    i018.\u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i018.\u0275\u0275nextContext();
    i018.\u0275\u0275advance();
    i018.\u0275\u0275textInterpolate(ctx_r0.heading);
  }
}
function HviErrorSummary_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    i018.\u0275\u0275domElementStart(0, "h4", 1);
    i018.\u0275\u0275text(1);
    i018.\u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i018.\u0275\u0275nextContext();
    i018.\u0275\u0275advance();
    i018.\u0275\u0275textInterpolate(ctx_r0.heading);
  }
}
function HviErrorSummary_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    i018.\u0275\u0275domElementStart(0, "h5", 1);
    i018.\u0275\u0275text(1);
    i018.\u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i018.\u0275\u0275nextContext();
    i018.\u0275\u0275advance();
    i018.\u0275\u0275textInterpolate(ctx_r0.heading);
  }
}
function HviErrorSummary_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    i018.\u0275\u0275domElementStart(0, "h6", 1);
    i018.\u0275\u0275text(1);
    i018.\u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i018.\u0275\u0275nextContext();
    i018.\u0275\u0275advance();
    i018.\u0275\u0275textInterpolate(ctx_r0.heading);
  }
}
function HviErrorSummary_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    i018.\u0275\u0275domElementStart(0, "h2", 1);
    i018.\u0275\u0275text(1);
    i018.\u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i018.\u0275\u0275nextContext();
    i018.\u0275\u0275advance();
    i018.\u0275\u0275textInterpolate(ctx_r0.heading);
  }
}
function HviErrorSummary_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = i018.\u0275\u0275getCurrentView();
    i018.\u0275\u0275domElementStart(0, "li")(1, "a", 3);
    i018.\u0275\u0275domListener("click", function HviErrorSummary_For_9_Template_a_click_1_listener($event) {
      const err_r3 = i018.\u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = i018.\u0275\u0275nextContext();
      return i018.\u0275\u0275resetView(ctx_r0.onLinkClick($event, err_r3.href));
    });
    i018.\u0275\u0275text(2);
    i018.\u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const err_r3 = ctx.$implicit;
    i018.\u0275\u0275advance();
    i018.\u0275\u0275domProperty("href", err_r3.href, i018.\u0275\u0275sanitizeUrl);
    i018.\u0275\u0275advance();
    i018.\u0275\u0275textInterpolate(err_r3.message);
  }
}
var DEFAULT_ERROR_PRIORITY = [
  "required",
  "minlength",
  "maxlength",
  "email",
  "pattern",
  "min",
  "max"
];
var HviErrorSummary = class _HviErrorSummary {
  el = inject3(ElementRef2);
  /** Heading text shown above the list */
  heading = "For \xE5 g\xE5 videre m\xE5 du rette opp f\xF8lgende feil:";
  /** Heading level for the heading element (1-6). Defaults to 2 per DS */
  headingLevel = 2;
  /**
   * Manual mode: items displayed in the summary.
   * If non-empty, manual mode takes precedence over auto mode.
   */
  errors = [];
  /** Auto mode: reactive form to derive errors from */
  form;
  /**
   * Auto mode: messages per controlName.
   * Example:
   * {
   *   firstName: { required: 'Fornavn er påkrevd', minlength: 'Fornavn må være minst 2 tegn' },
   *   phone: { required: 'Telefon er påkrevd', pattern: 'Telefonnummer kan kun inneholde siffer' }
   * }
   */
  messages;
  /**
   * Auto mode: map controlName -> element id.
   * Default is `id === controlName`.
   */
  idMap;
  /** Auto mode: error key priority (first match wins) */
  errorPriority = DEFAULT_ERROR_PRIORITY;
  /** When to show errors from the form controls */
  showWhen = "submitted";
  focus() {
    this.el.nativeElement.querySelector("ds-error-summary")?.focus();
  }
  /**
   * Handles click on error links to prevent Angular Router navigation
   * and instead focus/scroll to the target element.
   */
  onLinkClick(event, href) {
    event.preventDefault();
    const id = href.startsWith("#") ? href.slice(1) : href;
    const target = document.getElementById(id);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
  get computedErrors() {
    if (this.errors?.length)
      return this.errors;
    const form = this.form;
    const messages = this.messages;
    if (!form || !messages)
      return [];
    const items = [];
    for (const controlName of Object.keys(form.controls)) {
      const ctrl = form.controls[controlName];
      if (!ctrl?.invalid)
        continue;
      const errs = ctrl.errors ?? {};
      const msgMap = messages[controlName] ?? {};
      const message = this.pickMessage(errs, msgMap);
      if (!message)
        continue;
      const id = this.idMap?.[controlName] ?? controlName;
      items.push({ message, href: `#${id}` });
    }
    return items;
  }
  pickMessage(errors, messages) {
    for (const key of this.errorPriority) {
      if (errors[key] && messages[key])
        return messages[key];
    }
    for (const key of Object.keys(errors)) {
      if (messages[key])
        return messages[key];
    }
    return Object.keys(errors).length ? "Ugyldig verdi" : "";
  }
  hviForm = inject3(HviForm, { optional: true });
  get shouldShow() {
    if (this.computedErrors.length === 0)
      return false;
    switch (this.showWhen) {
      case "always":
        return true;
      case "touched":
        return (this.hviForm?.submitted ?? false) || this.anyInvalidTouched();
      case "submitted":
      default:
        return this.hviForm?.submitted ?? false;
    }
  }
  anyInvalidTouched() {
    const form = this.form;
    if (!form)
      return false;
    for (const name of Object.keys(form.controls)) {
      const c = form.controls[name];
      if (c?.invalid && c.touched)
        return true;
    }
    return false;
  }
  static \u0275fac = function HviErrorSummary_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviErrorSummary)();
  };
  static \u0275cmp = /* @__PURE__ */ i018.\u0275\u0275defineComponent({ type: _HviErrorSummary, selectors: [["hvi-error-summary"]], inputs: { heading: "heading", headingLevel: "headingLevel", errors: "errors", form: "form", messages: "messages", idMap: "idMap", errorPriority: "errorPriority", showWhen: "showWhen" }, decls: 10, vars: 2, consts: [[1, "ds-error-summary", 3, "hidden"], [1, "ds-heading"], [1, "ds-list"], ["data-color", "neutral", 1, "ds-link", 3, "click", "href"]], template: function HviErrorSummary_Template(rf, ctx) {
    if (rf & 1) {
      i018.\u0275\u0275domElementStart(0, "ds-error-summary", 0);
      i018.\u0275\u0275conditionalCreate(1, HviErrorSummary_Case_1_Template, 2, 1, "h1", 1)(2, HviErrorSummary_Case_2_Template, 2, 1, "h3", 1)(3, HviErrorSummary_Case_3_Template, 2, 1, "h4", 1)(4, HviErrorSummary_Case_4_Template, 2, 1, "h5", 1)(5, HviErrorSummary_Case_5_Template, 2, 1, "h6", 1)(6, HviErrorSummary_Case_6_Template, 2, 1, "h2", 1);
      i018.\u0275\u0275domElementStart(7, "ul", 2);
      i018.\u0275\u0275repeaterCreate(8, HviErrorSummary_For_9_Template, 3, 2, "li", null, _forTrack0);
      i018.\u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      let tmp_1_0;
      i018.\u0275\u0275domProperty("hidden", !ctx.shouldShow);
      i018.\u0275\u0275advance();
      i018.\u0275\u0275conditional((tmp_1_0 = ctx.headingLevel) === 1 ? 1 : tmp_1_0 === 3 ? 2 : tmp_1_0 === 4 ? 3 : tmp_1_0 === 5 ? 4 : tmp_1_0 === 6 ? 5 : 6);
      i018.\u0275\u0275advance(7);
      i018.\u0275\u0275repeater(ctx.computedErrors);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: contents;\n}"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i018.\u0275setClassMetadata(HviErrorSummary, [{
    type: Component9,
    args: [{ selector: "hvi-error-summary", schemas: [CUSTOM_ELEMENTS_SCHEMA2], standalone: true, template: `
    <ds-error-summary class="ds-error-summary" [hidden]="!shouldShow">
      @switch (headingLevel) {
        @case (1) {
          <h1 class="ds-heading">{{ heading }}</h1>
        }
        @case (3) {
          <h3 class="ds-heading">{{ heading }}</h3>
        }
        @case (4) {
          <h4 class="ds-heading">{{ heading }}</h4>
        }
        @case (5) {
          <h5 class="ds-heading">{{ heading }}</h5>
        }
        @case (6) {
          <h6 class="ds-heading">{{ heading }}</h6>
        }
        @default {
          <h2 class="ds-heading">{{ heading }}</h2>
        }
      }

      <ul class="ds-list">
        @for (err of computedErrors; track err.href) {
          <li>
            <a
              class="ds-link"
              data-color="neutral"
              [href]="err.href"
              (click)="onLinkClick($event, err.href)"
              >{{ err.message }}</a
            >
          </li>
        }
      </ul>
    </ds-error-summary>
  `, styles: ["/* angular:styles/component:css;0b8eaf4efc082689f4f52fcf987c9ec87d7d8b5ccdc8cbf50297844afb1e276d;C:/Utvikling/git/Hviktor/hviktor-angular/projects/hviktor/src/forms/error-summary/error-summary.component.ts */\n:host {\n  display: contents;\n}\n"] }]
  }], null, { heading: [{
    type: Input12
  }], headingLevel: [{
    type: Input12
  }], errors: [{
    type: Input12
  }], form: [{
    type: Input12
  }], messages: [{
    type: Input12
  }], idMap: [{
    type: Input12
  }], errorPriority: [{
    type: Input12
  }], showWhen: [{
    type: Input12
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i018.\u0275setClassDebugInfo(HviErrorSummary, { className: "HviErrorSummary", filePath: "projects/hviktor/src/forms/error-summary/error-summary.component.ts", lineNumber: 138 });
})();

// projects/hviktor/src/forms/field/field-affix.component.ts
import { Component as Component10 } from "@angular/core";
import * as i019 from "@angular/core";
var _c09 = ["*"];
var HviFieldAffix = class _HviFieldAffix {
  static \u0275fac = function HviFieldAffix_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviFieldAffix)();
  };
  static \u0275cmp = /* @__PURE__ */ i019.\u0275\u0275defineComponent({ type: _HviFieldAffix, selectors: [["hvi-field-affix"]], hostAttrs: [1, "ds-field-affix"], hostVars: 1, hostBindings: function HviFieldAffix_HostBindings(rf, ctx) {
    if (rf & 2) {
      i019.\u0275\u0275attribute("aria-hidden", true);
    }
  }, ngContentSelectors: _c09, decls: 1, vars: 0, template: function HviFieldAffix_Template(rf, ctx) {
    if (rf & 1) {
      i019.\u0275\u0275projectionDef();
      i019.\u0275\u0275projection(0);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i019.\u0275setClassMetadata(HviFieldAffix, [{
    type: Component10,
    args: [{
      selector: "hvi-field-affix",
      template: `<ng-content />`,
      host: {
        class: "ds-field-affix",
        "[aria-hidden]": "true"
      }
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i019.\u0275setClassDebugInfo(HviFieldAffix, { className: "HviFieldAffix", filePath: "projects/hviktor/src/forms/field/field-affix.component.ts", lineNumber: 28 });
})();

// projects/hviktor/src/forms/field/field-affixes.component.ts
import { Component as Component11 } from "@angular/core";
import * as i020 from "@angular/core";
var _c010 = ["*"];
var HviFieldAffixes = class _HviFieldAffixes {
  static \u0275fac = function HviFieldAffixes_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviFieldAffixes)();
  };
  static \u0275cmp = /* @__PURE__ */ i020.\u0275\u0275defineComponent({ type: _HviFieldAffixes, selectors: [["hvi-field-affixes"]], hostAttrs: [1, "ds-field-affixes"], ngContentSelectors: _c010, decls: 1, vars: 0, template: function HviFieldAffixes_Template(rf, ctx) {
    if (rf & 1) {
      i020.\u0275\u0275projectionDef();
      i020.\u0275\u0275projection(0);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i020.\u0275setClassMetadata(HviFieldAffixes, [{
    type: Component11,
    args: [{
      selector: "hvi-field-affixes",
      template: `<ng-content />`,
      host: {
        class: "ds-field-affixes"
      }
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i020.\u0275setClassDebugInfo(HviFieldAffixes, { className: "HviFieldAffixes", filePath: "projects/hviktor/src/forms/field/field-affixes.component.ts", lineNumber: 27 });
})();

// projects/hviktor/src/forms/field/field-counter.component.ts
import { Component as Component12, input } from "@angular/core";
import * as i021 from "@angular/core";
var HviFieldCounter = class _HviFieldCounter {
  /** Maximum allowed characters */
  limit = input.required(...ngDevMode ? [{ debugName: "limit" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Label template when limit is exceeded. Use %d for the count. */
  over = input(...ngDevMode ? [void 0, { debugName: "over" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Label template for remaining characters. Use %d for the count. */
  under = input(...ngDevMode ? [void 0, { debugName: "under" }] : (
    /* istanbul ignore next */
    []
  ));
  static \u0275fac = function HviFieldCounter_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviFieldCounter)();
  };
  static \u0275cmp = /* @__PURE__ */ i021.\u0275\u0275defineComponent({ type: _HviFieldCounter, selectors: [["hvi-field-counter"]], inputs: { limit: [1, "limit"], over: [1, "over"], under: [1, "under"] }, decls: 1, vars: 3, consts: [["data-field", "counter", 1, "ds-validation-message"]], template: function HviFieldCounter_Template(rf, ctx) {
    if (rf & 1) {
      i021.\u0275\u0275domElement(0, "p", 0);
    }
    if (rf & 2) {
      i021.\u0275\u0275attribute("data-limit", ctx.limit())("data-over", ctx.over() ?? null)("data-under", ctx.under() ?? null);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: contents;\n}"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i021.\u0275setClassMetadata(HviFieldCounter, [{
    type: Component12,
    args: [{ selector: "hvi-field-counter", standalone: true, template: `<p
    class="ds-validation-message"
    data-field="counter"
    [attr.data-limit]="limit()"
    [attr.data-over]="over() ?? null"
    [attr.data-under]="under() ?? null"
  ></p>`, styles: ["/* angular:styles/component:css;0b8eaf4efc082689f4f52fcf987c9ec87d7d8b5ccdc8cbf50297844afb1e276d;C:/Utvikling/git/Hviktor/hviktor-angular/projects/hviktor/src/forms/field/field-counter.component.ts */\n:host {\n  display: contents;\n}\n"] }]
  }], null, { limit: [{ type: i021.Input, args: [{ isSignal: true, alias: "limit", required: true }] }], over: [{ type: i021.Input, args: [{ isSignal: true, alias: "over", required: false }] }], under: [{ type: i021.Input, args: [{ isSignal: true, alias: "under", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i021.\u0275setClassDebugInfo(HviFieldCounter, { className: "HviFieldCounter", filePath: "projects/hviktor/src/forms/field/field-counter.component.ts", lineNumber: 33 });
})();

// projects/hviktor/src/forms/field/field-description.directive.ts
import { Directive as Directive10 } from "@angular/core";
import * as i022 from "@angular/core";
var HviFieldDescription = class _HviFieldDescription {
  static \u0275fac = function HviFieldDescription_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviFieldDescription)();
  };
  static \u0275dir = /* @__PURE__ */ i022.\u0275\u0275defineDirective({ type: _HviFieldDescription, selectors: [["", "hviFieldDescription", ""]], hostAttrs: ["data-field", "description"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i022.\u0275setClassMetadata(HviFieldDescription, [{
    type: Directive10,
    args: [{
      selector: "[hviFieldDescription]",
      standalone: true,
      host: {
        "data-field": "description"
      }
    }]
  }], null, null);
})();

// projects/hviktor/src/forms/field/field-optional.directive.ts
import { Directive as Directive11 } from "@angular/core";
import * as i023 from "@angular/core";
var HviFieldOptional = class _HviFieldOptional {
  static \u0275fac = function HviFieldOptional_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviFieldOptional)();
  };
  static \u0275dir = /* @__PURE__ */ i023.\u0275\u0275defineDirective({ type: _HviFieldOptional, selectors: [["", "hviFieldOptional", ""]], hostAttrs: ["data-field", "optional"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i023.\u0275setClassMetadata(HviFieldOptional, [{
    type: Directive11,
    args: [{
      selector: "[hviFieldOptional]",
      standalone: true,
      host: {
        "data-field": "optional"
      }
    }]
  }], null, null);
})();

// projects/hviktor/src/forms/field/field-validation.directive.ts
import { Directive as Directive12 } from "@angular/core";
import * as i024 from "@angular/core";
var HviFieldValidation = class _HviFieldValidation {
  static \u0275fac = function HviFieldValidation_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviFieldValidation)();
  };
  static \u0275dir = /* @__PURE__ */ i024.\u0275\u0275defineDirective({ type: _HviFieldValidation, selectors: [["", "hviFieldValidation", ""]], hostAttrs: ["data-field", "validation", 1, "ds-validation-message"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i024.\u0275setClassMetadata(HviFieldValidation, [{
    type: Directive12,
    args: [{
      selector: "[hviFieldValidation]",
      standalone: true,
      host: {
        class: "ds-validation-message",
        "data-field": "validation"
      }
    }]
  }], null, null);
})();

// projects/hviktor/src/forms/field/field.component.ts
import { Component as Component13, CUSTOM_ELEMENTS_SCHEMA as CUSTOM_ELEMENTS_SCHEMA3, Input as Input14 } from "@angular/core";
import "@digdir/designsystemet-web";
import * as i025 from "@angular/core";
var _c011 = ["*"];
var HviField = class _HviField {
  /** Position of toggle inputs (radio, checkbox, switch) in field */
  position;
  static \u0275fac = function HviField_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviField)();
  };
  static \u0275cmp = /* @__PURE__ */ i025.\u0275\u0275defineComponent({ type: _HviField, selectors: [["hvi-field"]], inputs: { position: "position" }, ngContentSelectors: _c011, decls: 2, vars: 1, consts: [[1, "ds-field"]], template: function HviField_Template(rf, ctx) {
    if (rf & 1) {
      i025.\u0275\u0275projectionDef();
      i025.\u0275\u0275domElementStart(0, "ds-field", 0);
      i025.\u0275\u0275projection(1);
      i025.\u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      i025.\u0275\u0275attribute("data-position", ctx.position ?? null);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: contents;\n}"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i025.\u0275setClassMetadata(HviField, [{
    type: Component13,
    args: [{ selector: "hvi-field", schemas: [CUSTOM_ELEMENTS_SCHEMA3], standalone: true, template: '<ds-field class="ds-field" [attr.data-position]="position ?? null"><ng-content /></ds-field>', styles: ["/* angular:styles/component:css;0b8eaf4efc082689f4f52fcf987c9ec87d7d8b5ccdc8cbf50297844afb1e276d;C:/Utvikling/git/Hviktor/hviktor-angular/projects/hviktor/src/forms/field/field.component.ts */\n:host {\n  display: contents;\n}\n"] }]
  }], null, { position: [{
    type: Input14
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i025.\u0275setClassDebugInfo(HviField, { className: "HviField", filePath: "projects/hviktor/src/forms/field/field.component.ts", lineNumber: 28 });
})();

// projects/hviktor/src/forms/fieldset/fieldset.directive.ts
import { Directive as Directive13 } from "@angular/core";
import * as i026 from "@angular/core";
var HviFieldset = class _HviFieldset {
  static \u0275fac = function HviFieldset_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviFieldset)();
  };
  static \u0275dir = /* @__PURE__ */ i026.\u0275\u0275defineDirective({ type: _HviFieldset, selectors: [["fieldset", "hviFieldset", ""]], hostAttrs: [1, "ds-fieldset"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i026.\u0275setClassMetadata(HviFieldset, [{
    type: Directive13,
    args: [{
      selector: "fieldset[hviFieldset]",
      standalone: true,
      host: {
        class: "ds-fieldset"
      }
    }]
  }], null, null);
})();

// projects/hviktor/src/forms/input/input.directive.ts
import { booleanAttribute as booleanAttribute4, Directive as Directive14, HostListener as HostListener4, Input as Input15 } from "@angular/core";
import * as i027 from "@angular/core";
var HviInput = class _HviInput {
  /** Supported input types */
  type;
  /** Set size attribute on input element */
  size;
  /** Set role, e.g. `switch` when `checkbox` or `radio` */
  role;
  _disabled = false;
  _readOnly = false;
  set disabled(value) {
    this._disabled = value;
  }
  get disabled() {
    return this._disabled;
  }
  set readOnly(value) {
    this._readOnly = value;
  }
  get readOnly() {
    return this._readOnly;
  }
  set readonly(value) {
    this._readOnly = value;
  }
  get isToggle() {
    return this.type === "checkbox" || this.type === "radio";
  }
  onClick(event) {
    if (this._readOnly && this.isToggle) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
  onChange(event) {
    if (this._readOnly && this.isToggle) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
  onKeydown(event) {
    if (!this._readOnly || !this.isToggle)
      return;
    const keyboardEvent = event;
    if (keyboardEvent.key === " " || keyboardEvent.key === "Spacebar" || keyboardEvent.key === "Enter") {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
  static \u0275fac = function HviInput_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviInput)();
  };
  static \u0275dir = /* @__PURE__ */ i027.\u0275\u0275defineDirective({ type: _HviInput, selectors: [["input", "hviInput", ""], ["textarea", "hviInput", ""]], hostAttrs: [1, "ds-input"], hostVars: 5, hostBindings: function HviInput_HostBindings(rf, ctx) {
    if (rf & 1) {
      i027.\u0275\u0275listener("click", function HviInput_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      })("change", function HviInput_change_HostBindingHandler($event) {
        return ctx.onChange($event);
      })("keydown", function HviInput_keydown_HostBindingHandler($event) {
        return ctx.onKeydown($event);
      });
    }
    if (rf & 2) {
      i027.\u0275\u0275attribute("type", ctx.type ?? null)("size", ctx.size ?? null)("disabled", ctx._disabled ? "" : null)("readonly", ctx._readOnly ? "" : null)("role", ctx.role ?? null);
    }
  }, inputs: { type: "type", size: "size", role: "role", disabled: [2, "disabled", "disabled", booleanAttribute4], readOnly: [2, "readOnly", "readOnly", booleanAttribute4], readonly: [2, "readonly", "readonly", booleanAttribute4] } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i027.\u0275setClassMetadata(HviInput, [{
    type: Directive14,
    args: [{
      selector: "input[hviInput], textarea[hviInput]",
      standalone: true,
      host: {
        class: "ds-input",
        "[attr.type]": "type ?? null",
        "[attr.size]": "size ?? null",
        "[attr.disabled]": '_disabled ? "" : null',
        "[attr.readonly]": '_readOnly ? "" : null',
        "[attr.role]": "role ?? null"
      }
    }]
  }], null, { type: [{
    type: Input15
  }], size: [{
    type: Input15
  }], role: [{
    type: Input15
  }], disabled: [{
    type: Input15,
    args: [{ transform: booleanAttribute4 }]
  }], readOnly: [{
    type: Input15,
    args: [{ transform: booleanAttribute4 }]
  }], readonly: [{
    type: Input15,
    args: [{ transform: booleanAttribute4 }]
  }], onClick: [{
    type: HostListener4,
    args: ["click", ["$event"]]
  }], onChange: [{
    type: HostListener4,
    args: ["change", ["$event"]]
  }], onKeydown: [{
    type: HostListener4,
    args: ["keydown", ["$event"]]
  }] });
})();

// projects/hviktor/src/forms/validation/control-invalid/control-invalid.directive.ts
import { Directive as Directive15, HostBinding, inject as inject4 } from "@angular/core";
import { NgControl } from "@angular/forms";
import * as i028 from "@angular/core";
var HviControlInvalid = class _HviControlInvalid {
  ngControl = inject4(NgControl, { self: true, optional: true });
  hviForm = inject4(HviForm, { optional: true });
  get ariaInvalid() {
    const control = this.ngControl?.control;
    if (!control)
      return null;
    const submitted = this.hviForm?.submitted ?? false;
    const show = control.invalid && (control.touched || submitted);
    return show ? "true" : null;
  }
  static \u0275fac = function HviControlInvalid_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviControlInvalid)();
  };
  static \u0275dir = /* @__PURE__ */ i028.\u0275\u0275defineDirective({ type: _HviControlInvalid, selectors: [["", "hviControlInvalid", ""]], hostVars: 1, hostBindings: function HviControlInvalid_HostBindings(rf, ctx) {
    if (rf & 2) {
      i028.\u0275\u0275attribute("aria-invalid", ctx.ariaInvalid);
    }
  } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i028.\u0275setClassMetadata(HviControlInvalid, [{
    type: Directive15,
    args: [{
      selector: "[hviControlInvalid]",
      standalone: true
    }]
  }], null, { ariaInvalid: [{
    type: HostBinding,
    args: ["attr.aria-invalid"]
  }] });
})();

// projects/hviktor/src/forms/validation/validation-message/validation-message.directive.ts
import { Directive as Directive16, Input as Input16, inject as inject5 } from "@angular/core";
import { ControlContainer } from "@angular/forms";
import * as i029 from "@angular/core";
var DEFAULT_ERROR_PRIORITY2 = [
  "required",
  "minlength",
  "maxlength",
  "email",
  "pattern",
  "min",
  "max"
];
var HviValidationMessage = class _HviValidationMessage {
  /**
   * Control name in the nearest parent FormGroup (matches formControlName).
   * Example: hviValidationMessage="firstName"
   */
  controlName;
  /**
   * Map errorKey -> message, e.g. { required: 'Påkrevd', minlength: 'Minst 2 tegn' }
   */
  messages = {};
  /**
   * Optional error priority order. Defaults to a sensible order.
   */
  errorPriority = DEFAULT_ERROR_PRIORITY2;
  container = inject5(ControlContainer, { optional: true });
  hviForm = inject5(HviForm, { optional: true });
  get control() {
    const group = this.container?.control;
    if (!group || !this.controlName)
      return null;
    return group.get(this.controlName);
  }
  get message() {
    const ctrl = this.control;
    if (!ctrl)
      return "";
    const submitted = this.hviForm?.submitted ?? false;
    const show = ctrl.invalid && (ctrl.touched || submitted);
    if (!show)
      return "";
    const errors = ctrl.errors ?? {};
    for (const key of this.errorPriority) {
      if (errors[key] && this.messages[key])
        return this.messages[key];
    }
    for (const key of Object.keys(errors)) {
      if (this.messages[key])
        return this.messages[key];
    }
    return "Ugyldig verdi";
  }
  static \u0275fac = function HviValidationMessage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviValidationMessage)();
  };
  static \u0275dir = /* @__PURE__ */ i029.\u0275\u0275defineDirective({ type: _HviValidationMessage, selectors: [["", "hviValidationMessage", ""]], hostVars: 2, hostBindings: function HviValidationMessage_HostBindings(rf, ctx) {
    if (rf & 2) {
      i029.\u0275\u0275domProperty("textContent", ctx.message)("hidden", !ctx.message);
    }
  }, inputs: { controlName: [0, "hviValidationMessage", "controlName"], messages: "messages", errorPriority: "errorPriority" } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i029.\u0275setClassMetadata(HviValidationMessage, [{
    type: Directive16,
    args: [{
      selector: "[hviValidationMessage]",
      standalone: true,
      host: {
        // Sett tekstinnhold direkte på elementet (typisk <p hviFieldValidation ...>)
        "[textContent]": "message",
        // Skjul elementet når det ikke er noen feilmelding
        "[hidden]": "!message"
      }
    }]
  }], null, { controlName: [{
    type: Input16,
    args: ["hviValidationMessage"]
  }], messages: [{
    type: Input16
  }], errorPriority: [{
    type: Input16
  }] });
})();

// projects/hviktor/src/forms/validators/validator-bundle.ts
function hviValidators(bundles) {
  return {
    validators: bundles.map((b) => b.validator),
    messages: bundles.reduce((acc, b) => __spreadProps(__spreadValues({}, acc), { [b.key]: b.message }), {})
  };
}
function hviExtractValidators(bundles) {
  return bundles.map((b) => b.validator);
}
function hviExtractMessages(bundles) {
  return bundles.reduce((acc, b) => __spreadProps(__spreadValues({}, acc), { [b.key]: b.message }), {});
}

// projects/hviktor/src/forms/validators/validators.ts
import { Validators as Validators2 } from "@angular/forms";
function hviRequired(message) {
  return { validator: Validators2.required, key: "required", message };
}
function hviRequiredTrue(message) {
  return { validator: Validators2.requiredTrue, key: "required", message };
}
function hviMinLength(length, message) {
  return { validator: Validators2.minLength(length), key: "minlength", message };
}
function hviMaxLength(length, message) {
  return { validator: Validators2.maxLength(length), key: "maxlength", message };
}
function hviEmail(message) {
  return { validator: Validators2.email, key: "email", message };
}
function hviPattern(pattern, message) {
  return { validator: Validators2.pattern(pattern), key: "pattern", message };
}
function hviMin(min, message) {
  return { validator: Validators2.min(min), key: "min", message };
}
function hviMax(max, message) {
  return { validator: Validators2.max(max), key: "max", message };
}
function hviCustom(key, validator, message) {
  return { validator, key, message };
}
function hviNullValidator() {
  return { validator: Validators2.nullValidator, key: "null", message: "" };
}

// projects/hviktor/src/forms/kits.ts
import { ReactiveFormsModule } from "@angular/forms";

// projects/hviktor/src/required-tag/required-tag.component.ts
import { Component as Component15, Input as Input18 } from "@angular/core";

// projects/hviktor/src/tag/tag.component.ts
import { Component as Component14, Input as Input17 } from "@angular/core";
import * as i030 from "@angular/core";
var _c012 = ["*"];
var HviTag = class _HviTag {
  /** The variants of the tag */
  variant;
  /** The sizes of the tag */
  size;
  /** The color theme of the tag */
  color;
  static \u0275fac = function HviTag_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviTag)();
  };
  static \u0275cmp = /* @__PURE__ */ i030.\u0275\u0275defineComponent({ type: _HviTag, selectors: [["hvi-tag"]], hostAttrs: [1, "ds-tag"], hostVars: 3, hostBindings: function HviTag_HostBindings(rf, ctx) {
    if (rf & 2) {
      i030.\u0275\u0275attribute("data-variant", ctx.variant ?? null)("data-size", ctx.size ?? null)("data-color", ctx.color ?? null);
    }
  }, inputs: { variant: "variant", size: "size", color: "color" }, ngContentSelectors: _c012, decls: 1, vars: 0, template: function HviTag_Template(rf, ctx) {
    if (rf & 1) {
      i030.\u0275\u0275projectionDef();
      i030.\u0275\u0275projection(0);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i030.\u0275setClassMetadata(HviTag, [{
    type: Component14,
    args: [{
      selector: "hvi-tag",
      standalone: true,
      template: "<ng-content />",
      host: {
        class: "ds-tag",
        "[attr.data-variant]": "variant ?? null",
        "[attr.data-size]": "size ?? null",
        "[attr.data-color]": "color ?? null"
      }
    }]
  }], null, { variant: [{
    type: Input17
  }], size: [{
    type: Input17
  }], color: [{
    type: Input17
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i030.\u0275setClassDebugInfo(HviTag, { className: "HviTag", filePath: "projects/hviktor/src/tag/tag.component.ts", lineNumber: 26 });
})();

// projects/hviktor/src/required-tag/required-tag.component.ts
import * as i031 from "@angular/core";
function HviRequiredTag_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    i031.\u0275\u0275text(0, " Alle felt m\xE5 fylles ut ");
  }
}
function HviRequiredTag_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    i031.\u0275\u0275text(0, " M\xE5 fylles ut ");
  }
}
function HviRequiredTag_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    i031.\u0275\u0275text(0, " Valgfritt ");
  }
}
var HviRequiredTag = class _HviRequiredTag {
  /**
   * Bestemmer tekst og farge på taggen.
   * - `required` (default): "Må fylles ut" (warning)
   * - `optional`: "Valgfritt" (info)
   * - `all-required`: "Alle felt må fylles ut" (warning)
   */
  mode = "required";
  static \u0275fac = function HviRequiredTag_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviRequiredTag)();
  };
  static \u0275cmp = /* @__PURE__ */ i031.\u0275\u0275defineComponent({ type: _HviRequiredTag, selectors: [["hvi-required-tag"]], hostAttrs: [2, "display", "contents"], inputs: { mode: "mode" }, decls: 4, vars: 2, consts: [["variant", "default", "size", "sm", 3, "color"]], template: function HviRequiredTag_Template(rf, ctx) {
    if (rf & 1) {
      i031.\u0275\u0275elementStart(0, "hvi-tag", 0);
      i031.\u0275\u0275conditionalCreate(1, HviRequiredTag_Case_1_Template, 1, 0)(2, HviRequiredTag_Case_2_Template, 1, 0)(3, HviRequiredTag_Case_3_Template, 1, 0);
      i031.\u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_1_0;
      i031.\u0275\u0275property("color", ctx.mode === "optional" ? "info" : "warning");
      i031.\u0275\u0275advance();
      i031.\u0275\u0275conditional((tmp_1_0 = ctx.mode) === "all-required" ? 1 : tmp_1_0 === "required" ? 2 : tmp_1_0 === "optional" ? 3 : -1);
    }
  }, dependencies: [HviTag], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i031.\u0275setClassMetadata(HviRequiredTag, [{
    type: Component15,
    args: [{
      selector: "hvi-required-tag",
      standalone: true,
      imports: [HviTag],
      template: `
    <hvi-tag variant="default" size="sm" [color]="mode === 'optional' ? 'info' : 'warning'">
      @switch (mode) {
        @case ('all-required') {
          Alle felt m\xE5 fylles ut
        }
        @case ('required') {
          M\xE5 fylles ut
        }
        @case ('optional') {
          Valgfritt
        }
      }
    </hvi-tag>
  `,
      host: {
        style: "display: contents"
      }
    }]
  }], null, { mode: [{
    type: Input18
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i031.\u0275setClassDebugInfo(HviRequiredTag, { className: "HviRequiredTag", filePath: "projects/hviktor/src/required-tag/required-tag.component.ts", lineNumber: 47 });
})();

// projects/hviktor/src/forms/kits.ts
var HviFieldKit = [
  HviField,
  HviFieldValidation,
  HviFieldDescription,
  HviFieldOptional,
  HviFieldAffix,
  HviFieldAffixes,
  HviFieldCounter,
  HviRequiredTag
];
var HviValidationKit = [
  ReactiveFormsModule,
  HviForm,
  HviControlInvalid,
  HviValidationMessage
];
var HviForms = [
  ...HviValidationKit,
  ...HviFieldKit,
  HviInput,
  HviFieldset,
  HviErrorSummary
];

// projects/hviktor/src/heading/heading.directive.ts
import { Directive as Directive17, Input as Input19 } from "@angular/core";
import * as i032 from "@angular/core";
var HviHeading = class _HviHeading {
  /** The size of the heading */
  size;
  static \u0275fac = function HviHeading_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviHeading)();
  };
  static \u0275dir = /* @__PURE__ */ i032.\u0275\u0275defineDirective({ type: _HviHeading, selectors: [["h1", "hviHeading", ""], ["h2", "hviHeading", ""], ["h3", "hviHeading", ""], ["h4", "hviHeading", ""], ["h5", "hviHeading", ""], ["h6", "hviHeading", ""]], hostAttrs: [1, "ds-heading"], hostVars: 1, hostBindings: function HviHeading_HostBindings(rf, ctx) {
    if (rf & 2) {
      i032.\u0275\u0275attribute("data-size", ctx.size);
    }
  }, inputs: { size: "size" } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i032.\u0275setClassMetadata(HviHeading, [{
    type: Directive17,
    args: [{
      selector: "h1[hviHeading], h2[hviHeading], h3[hviHeading], h4[hviHeading], h5[hviHeading], h6[hviHeading]",
      standalone: true,
      host: {
        class: "ds-heading",
        "[attr.data-size]": "size"
      }
    }]
  }], null, { size: [{
    type: Input19
  }] });
})();

// projects/hviktor/src/label/label.directive.ts
import { Directive as Directive18, Input as Input20 } from "@angular/core";
import * as i033 from "@angular/core";
var HviLabel = class _HviLabel {
  /** The font weight of the label */
  weight;
  static \u0275fac = function HviLabel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviLabel)();
  };
  static \u0275dir = /* @__PURE__ */ i033.\u0275\u0275defineDirective({ type: _HviLabel, selectors: [["label", "hviLabel", ""], ["legend", "hviLabel", ""]], hostAttrs: [1, "ds-label"], hostVars: 1, hostBindings: function HviLabel_HostBindings(rf, ctx) {
    if (rf & 2) {
      i033.\u0275\u0275attribute("data-weight", ctx.weight ?? null);
    }
  }, inputs: { weight: "weight" } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i033.\u0275setClassMetadata(HviLabel, [{
    type: Directive18,
    args: [{
      selector: "label[hviLabel], legend[hviLabel]",
      standalone: true,
      host: {
        class: "ds-label",
        "[attr.data-weight]": "weight ?? null"
      }
    }]
  }], null, { weight: [{
    type: Input20
  }] });
})();

// projects/hviktor/src/link/link.directive.ts
import { Directive as Directive19, Input as Input21 } from "@angular/core";
import * as i034 from "@angular/core";
var HviLink = class _HviLink {
  /** Used to change the appearance of the link. */
  color = "default";
  static \u0275fac = function HviLink_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviLink)();
  };
  static \u0275dir = /* @__PURE__ */ i034.\u0275\u0275defineDirective({ type: _HviLink, selectors: [["a", "hviLink", ""]], hostAttrs: [1, "ds-link"], hostVars: 1, hostBindings: function HviLink_HostBindings(rf, ctx) {
    if (rf & 2) {
      i034.\u0275\u0275attribute("data-color", ctx.color);
    }
  }, inputs: { color: "color" } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i034.\u0275setClassMetadata(HviLink, [{
    type: Directive19,
    args: [{
      selector: "a[hviLink]",
      standalone: true,
      host: {
        class: "ds-link",
        "[attr.data-color]": "color"
      }
    }]
  }], null, { color: [{
    type: Input21
  }] });
})();

// projects/hviktor/src/list/list.directive.ts
import { Directive as Directive20 } from "@angular/core";
import * as i035 from "@angular/core";
var HviList = class _HviList {
  static \u0275fac = function HviList_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviList)();
  };
  static \u0275dir = /* @__PURE__ */ i035.\u0275\u0275defineDirective({ type: _HviList, selectors: [["ol", "hviList", ""], ["ul", "hviList", ""]], hostAttrs: [1, "ds-list"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i035.\u0275setClassMetadata(HviList, [{
    type: Directive20,
    args: [{
      selector: "ol[hviList], ul[hviList]",
      standalone: true,
      host: {
        class: "ds-list"
      }
    }]
  }], null, null);
})();

// projects/hviktor/src/logo/logos/logo-dots.ts
var LOGO_DOTS = {
  viewBox: "0 0 65 65",
  width: 65,
  height: 65,
  label: "Helse Vest logo",
  paths: [
    // Accent dots
    // Top
    {
      d: "M39.9945 9.52374C39.9945 13.6821 36.6286 17.0493 32.4743 17.0493C28.3201 17.0493 24.9594 13.6839 24.9594 9.52374C24.9594 5.36354 28.3216 2 32.4725 2C36.6234 2 39.9926 5.3672 39.9926 9.52374H39.9945Z",
      fill: "accent"
    },
    // Center
    {
      d: "M39.9945 32.482C39.9945 36.6331 36.6286 40.0021 32.4743 40.0021C28.3201 40.0021 24.9594 36.6331 24.9594 32.482C24.9594 28.331 28.3216 24.9531 32.4743 24.9531C36.627 24.9531 39.9945 28.3221 39.9945 32.482Z",
      fill: "accent"
    },
    // Right
    {
      d: "M62.9656 32.482C62.9656 36.6331 59.5978 40.0021 55.447 40.0021C51.2961 40.0021 47.9283 36.6331 47.9283 32.482C47.9283 28.331 51.2943 24.9531 55.447 24.9531C59.5997 24.9531 62.9656 28.3221 62.9656 32.482Z",
      fill: "accent"
    },
    // Bottom
    {
      d: "M39.9945 55.4799C39.9945 59.6346 36.6286 63 32.4743 63C28.3201 63 24.9594 59.6328 24.9594 55.4799C24.9594 51.327 28.3216 47.9492 32.4743 47.9492C36.627 47.9492 39.9945 51.3234 39.9945 55.4799Z",
      fill: "accent"
    },
    // Themed dot
    {
      d: "M17.0373 32.482C17.0373 36.6331 13.6732 40.0021 9.51863 40.0021C5.36409 40.0021 2 36.6331 2 32.482C2 28.331 5.36775 24.9531 9.51863 24.9531C13.6695 24.9531 17.0373 28.3221 17.0373 32.482Z",
      fill: "themed"
    }
  ]
};

// projects/hviktor/src/logo/logo-shared.ts
var DOTS = [
  // Top
  {
    d: "M39.9945 9.52374C39.9945 13.6821 36.6286 17.0493 32.4743 17.0493C28.3201 17.0493 24.9594 13.6839 24.9594 9.52374C24.9594 5.36354 28.3216 2 32.4725 2C36.6234 2 39.9926 5.3672 39.9926 9.52374H39.9945Z",
    fill: "accent"
  },
  // Center
  {
    d: "M39.9945 32.482C39.9945 36.6331 36.6286 40.0021 32.4743 40.0021C28.3201 40.0021 24.9594 36.6331 24.9594 32.482C24.9594 28.331 28.3216 24.9531 32.4743 24.9531C36.627 24.9531 39.9945 28.3221 39.9945 32.482Z",
    fill: "accent"
  },
  // Right
  {
    d: "M62.9656 32.482C62.9656 36.6331 59.5978 40.0021 55.447 40.0021C51.2961 40.0021 47.9283 36.6331 47.9283 32.482C47.9283 28.331 51.2943 24.9531 55.447 24.9531C59.5997 24.9531 62.9656 28.3221 62.9656 32.482Z",
    fill: "accent"
  },
  // Bottom
  {
    d: "M39.9945 55.4799C39.9945 59.6346 36.6286 63 32.4743 63C28.3201 63 24.9594 59.6328 24.9594 55.4799C24.9594 51.327 28.3216 47.9492 32.4743 47.9492C36.627 47.9492 39.9945 51.3234 39.9945 55.4799Z",
    fill: "accent"
  }
];
var THEMED_DOT = [
  {
    d: "M17.0373 32.482C17.0373 36.6331 13.6732 40.0021 9.51863 40.0021C5.36409 40.0021 2 36.6331 2 32.482C2 28.331 5.36775 24.9531 9.51863 24.9531C13.6695 24.9531 17.0373 28.3221 17.0373 32.482Z",
    fill: "themed"
  }
];
var HELSE = [
  // H
  {
    d: "M100.095 44.2324V33.3638H86.1084V44.2324H83.1603V20.4799H86.1084V30.6648H100.095V20.4799H103.043V44.2324H100.095Z",
    fill: "themed"
  },
  // E
  {
    d: "M110.883 44.2324V20.4799H124.222V22.9633H113.831V30.8808H122.424V33.3641H113.831V41.7494H124.546V44.2327H110.883V44.2324Z",
    fill: "themed"
  },
  // L
  {
    d: "M130.263 44.2324V20.4799H133.211V41.7494H143.818V44.2327H130.263V44.2324Z",
    fill: "themed"
  },
  // S
  {
    d: "M160.035 24.5105C158.812 23.7907 158.309 23.5388 157.554 23.2869C156.655 22.999 155.216 22.783 154.282 22.783C151.585 22.783 149.751 24.1146 149.751 26.1301C149.751 27.8936 150.794 28.793 155.612 31.3483C157.23 32.2121 158.488 33.0039 159.351 33.7597C160.502 34.7314 161.185 36.3509 161.185 38.0785C161.185 42.145 158.165 44.7003 153.383 44.7003C151.765 44.7003 150.254 44.4124 148.996 43.9085C148.097 43.5486 147.486 43.1887 145.94 42.145L147.45 39.8057C148.78 40.7054 149.355 41.0293 150.182 41.3532C151.225 41.7491 152.376 41.9651 153.598 41.9651C156.403 41.9651 158.093 40.6334 158.093 38.3661C158.093 37.6823 157.985 37.1064 157.733 36.6745C157.338 35.9547 156.655 35.2709 155.72 34.7311C155.324 34.5151 153.994 33.8313 151.765 32.6077C148.205 30.7002 146.695 28.8287 146.695 26.3814C146.695 22.6028 149.824 20.0835 154.534 20.0835C155.9 20.0835 157.302 20.2634 158.524 20.6593C159.495 20.9832 160.071 21.2711 161.401 22.0629L160.035 24.5099V24.5105Z",
    fill: "themed"
  },
  // E
  {
    d: "M167.262 44.2324V20.4799H180.602V22.9633H170.21V30.8808H178.804V33.3641H170.21V41.7494H180.925V44.2327H167.262V44.2324Z",
    fill: "themed"
  }
];
function buildLogo(label, companyPaths, viewBox = "0 0 240 65", width = 240, height = 65) {
  return {
    viewBox,
    width,
    height,
    label,
    paths: [...DOTS, ...THEMED_DOT, ...HELSE, ...companyPaths]
  };
}

// projects/hviktor/src/logo/logos/logo-hbe.ts
var LOGO_HBE = buildLogo("Helse Bergen logo", [
  // B
  {
    d: "M207.347 43.9684H197.525V19.8636H206.251C209.391 19.8636 210.962 20.2654 212.276 21.4707C213.444 22.4934 214.175 24.21 214.175 25.7802C214.175 27.1316 213.663 28.556 212.787 29.5784C211.728 30.7836 210.743 31.2219 208.844 31.3315C212.495 31.4046 214.795 33.7786 214.795 37.5402C214.795 41.704 212.166 43.9684 207.347 43.9684ZM205.339 23.5157H202.345V29.7248H205.083C207.676 29.7248 209.063 28.6291 209.063 26.584C209.063 24.6483 207.676 23.516 205.339 23.516V23.5157ZM205.339 33.6325H202.345V40.2798H205.339C206.763 40.2798 207.42 40.1703 208.113 39.8416C209.136 39.3302 209.756 38.271 209.756 37.0292C209.756 34.8378 208.186 33.6325 205.339 33.6325Z",
    fill: "themed"
  },
  // E
  {
    d: "M219.323 43.9684V19.8636H234.001V23.7714H223.924V29.7245H232.175V33.6322H223.924V40.0604H234.476V43.9681H219.323L219.323 43.9684Z",
    fill: "themed"
  },
  // R
  {
    d: "M251.417 43.9684L245.904 34.3265H243.604V43.9684H239.003V19.8636H247.036C250.541 19.8636 252.148 20.3019 253.572 21.6533C254.886 22.8586 255.543 24.6117 255.543 26.8762C255.543 28.7389 255.105 30.2361 254.229 31.4049C253.316 32.5736 252.476 33.085 250.468 33.6328L256.456 43.9687H251.417V43.9684ZM246.598 23.7714H243.604V30.4187H246.598C249.519 30.4187 250.797 29.3961 250.797 26.9855C250.797 24.6845 249.592 23.7714 246.598 23.7714Z",
    fill: "themed"
  },
  // G
  {
    d: "M277.78 43.6397C275.224 44.2241 273.727 44.4433 271.719 44.4433C263.723 44.4433 258.173 39.3299 258.173 31.8794C258.173 28.227 259.56 25.0497 262.153 22.6757C264.635 20.4115 267.41 19.4619 271.573 19.4619C273.325 19.4619 275.078 19.6445 276.611 20.0098C277.78 20.302 278.51 20.5576 280.189 21.2878L279.094 25.1228C278.218 24.7941 277.56 24.5749 277.122 24.4288C275.406 23.8445 273.69 23.5523 272.157 23.5523C266.753 23.5523 262.992 26.8759 262.992 31.6602C262.992 36.5907 267.118 40.3526 272.485 40.3526C273.581 40.3526 274.201 40.243 275.625 39.8413V33.1939H280.226V43.0551L277.78 43.6394V43.6397Z",
    fill: "themed"
  },
  // E
  {
    d: "M286.178 43.9684V19.8636H300.856V23.7714H290.779V29.7245H299.03V33.6322H290.779V40.0604H301.331V43.9681H286.178L286.178 43.9684Z",
    fill: "themed"
  },
  // N
  {
    d: "M321.923 44.1876L311.59 28.5925L310.787 27.1316C310.641 26.8394 310.568 26.6933 310.458 26.2915V43.9684H306.077V19.8636H311.371L321.119 35.13C321.813 36.2257 322.105 36.9927 322.397 37.7597V19.8636H326.743V44.1876H321.923Z",
    fill: "themed"
  }
], "0 0 330 65", 330, 65);

// projects/hviktor/src/logo/logos/logo-hbe-hus.ts
var LOGO_HBE_HUS = {
  viewBox: "0 0 348 65",
  width: 348,
  height: 65,
  label: "Haukeland universitetssjukehus logo",
  paths: [
    // Accent dots
    {
      d: "M38.6034 9.41943C38.6034 13.3194 35.4433 16.4766 31.5395 16.4766C27.6358 16.4766 24.4756 13.3194 24.4756 9.41943C24.4756 5.51943 27.6358 2.36229 31.5395 2.36229C35.4433 2.36229 38.6034 5.51943 38.6034 9.41943Z",
      fill: "accent"
    },
    {
      d: "M38.6034 30.9623C38.6034 34.8623 35.4433 38.0194 31.5395 38.0194C27.6358 38.0194 24.4756 34.8623 24.4756 30.9623C24.4756 27.0623 27.6358 23.9052 31.5395 23.9052C35.4433 23.9052 38.6034 27.0623 38.6034 30.9623Z",
      fill: "accent"
    },
    {
      d: "M60.198 30.9623C60.198 34.8623 57.0379 38.0194 53.1341 38.0194C49.2304 38.0194 46.0702 34.8623 46.0702 30.9623C46.0702 27.0623 49.2304 23.9052 53.1341 23.9052C57.0379 23.9052 60.198 27.0623 60.198 30.9623Z",
      fill: "accent"
    },
    {
      d: "M38.6034 52.5361C38.6034 56.4361 35.4433 59.5932 31.5395 59.5932C27.6358 59.5932 24.4756 56.4361 24.4756 52.5361C24.4756 48.6361 27.6358 45.479 31.5395 45.479C35.4433 45.479 38.6034 48.6361 38.6034 52.5361Z",
      fill: "accent"
    },
    // Themed dot
    {
      d: "M17.0088 30.9623C17.0088 34.8623 13.8487 38.0194 9.94491 38.0194C6.04116 38.0194 2.88098 34.8623 2.88098 30.9623C2.88098 27.0623 6.04116 23.9052 9.94491 23.9052C13.8487 23.9052 17.0088 27.0623 17.0088 30.9623Z",
      fill: "themed"
    },
    // HELSE
    {
      d: "M95.2078 38.0504V27.867H82.1024V38.0504H79.345V15.8266H82.1024V25.3599H95.2078V15.8266H97.9652V38.0504H95.2078Z",
      fill: "themed"
    },
    {
      d: "M105.308 38.0504V15.8266H117.825V18.148H108.096V25.5456H116.152V27.867H108.096V35.7289H118.135V38.0504H105.308Z",
      fill: "themed"
    },
    { d: "M123.464 38.0504V15.8266H126.221V35.7289H136.166V38.0504H123.464Z", fill: "themed" },
    {
      d: "M151.378 19.5718C150.232 18.8909 149.767 18.6742 149.055 18.4266C148.218 18.148 146.855 17.9623 145.988 17.9623C143.447 17.9623 141.743 19.2004 141.743 21.0885C141.743 22.729 142.734 23.5647 147.227 25.9789C148.745 26.7837 149.922 27.5266 150.728 28.2385C151.812 29.1361 152.432 30.6528 152.432 32.2932C152.432 36.1004 149.612 38.4837 145.12 38.4837C143.602 38.4837 142.177 38.2051 140.999 37.7409C140.163 37.4004 139.574 37.0599 138.118 36.1004L139.543 33.9028C140.782 34.7385 141.34 35.048 142.115 35.3575C143.106 35.729 144.16 35.9147 145.306 35.9147C147.939 35.9147 149.519 34.6766 149.519 32.5409C149.519 31.8909 149.427 31.3647 149.179 30.9623C148.807 30.2813 148.156 29.6623 147.289 29.1361C146.917 28.9194 145.678 28.3004 143.571 27.1551C140.225 25.3599 138.831 23.6266 138.831 21.3361C138.831 17.8075 141.774 15.4551 146.173 15.4551C147.444 15.4551 148.776 15.6099 149.922 15.9813C150.821 16.2909 151.378 16.5385 152.618 17.2813L151.378 19.5718Z",
      fill: "themed"
    },
    {
      d: "M158.133 38.0504V15.8266H170.649V18.148H160.89V25.5456H168.945V27.867H160.89V35.7289H170.928V38.0504H158.133Z",
      fill: "themed"
    },
    // BERGEN
    {
      d: "M192.956 38.0504H183.879V15.8266H191.934C194.846 15.8266 196.272 16.198 197.511 17.3123C198.595 18.2409 199.277 19.8504 199.277 21.2742C199.277 22.5123 198.812 23.8432 198.007 24.7718C197.015 25.8861 196.117 26.2885 194.382 26.3813C197.759 26.4432 199.865 28.6409 199.865 32.1075C199.834 35.9456 197.418 38.0504 192.956 38.0504ZM191.128 19.1694H188.371V24.8956H190.912C193.297 24.8956 194.598 23.8742 194.598 21.9861C194.537 20.2218 193.266 19.1694 191.128 19.1694ZM191.128 28.517H188.371V34.6456H191.128C192.43 34.6456 193.049 34.5528 193.7 34.2432C194.629 33.7789 195.218 32.7885 195.218 31.6432C195.187 29.6313 193.731 28.517 191.128 28.517Z",
      fill: "themed"
    },
    {
      d: "M204.017 38.0504V15.8266H217.556V19.417H208.262V24.8956H215.883V28.4861H208.262V34.398H217.99V37.9885L204.017 38.0504Z",
      fill: "themed"
    },
    {
      d: "M233.636 38.0504L228.555 29.167H226.417V38.0504H222.173V15.8266H229.577C232.799 15.8266 234.287 16.2289 235.619 17.467C236.827 18.5813 237.447 20.1909 237.447 22.2956C237.447 23.998 237.044 25.3909 236.239 26.4742C235.402 27.5575 234.627 28.0218 232.769 28.517L238.283 38.0504H233.636ZM229.175 19.417H226.417V25.5456H229.175C231.87 25.5456 233.047 24.5861 233.047 22.3885C233.078 20.2528 231.963 19.417 229.175 19.417Z",
      fill: "themed"
    },
    {
      d: "M257.957 37.7409C255.602 38.267 254.208 38.4837 252.349 38.4837C244.976 38.4837 239.832 33.7789 239.832 26.9075C239.832 23.5337 241.103 20.6242 243.519 18.4266C245.812 16.3528 248.384 15.4551 252.225 15.4551C253.836 15.4551 255.447 15.6099 256.873 15.9504C257.957 16.2289 258.639 16.4456 260.188 17.1266L259.165 20.6551C258.36 20.3456 257.74 20.1599 257.337 20.0051C255.757 19.479 254.177 19.2004 252.752 19.2004C247.764 19.2004 244.294 22.2647 244.294 26.6909C244.294 31.2409 248.105 34.7075 253.062 34.7075C254.084 34.7075 254.642 34.6147 255.974 34.2432V28.1147H260.219V37.2147L257.957 37.7409Z",
      fill: "themed"
    },
    {
      d: "M265.703 38.0504V15.8266H279.242V19.417H269.947V24.8956H277.569V28.4861H269.947V34.398H279.675V37.9885L265.703 38.0504Z",
      fill: "themed"
    },
    {
      d: "M298.698 38.2361L289.156 23.8742L288.412 22.5123C288.288 22.2337 288.196 22.1099 288.103 21.7385V38.0504H284.044V15.8266H288.939L297.924 29.9099C298.575 30.9313 298.822 31.6123 299.101 32.3242V15.8266H303.098V38.267H298.698V38.2361Z",
      fill: "themed"
    },
    // Haukeland universitetssjukehus (second line)
    {
      d: "M89.0734 59.098V53.0004H81.2039V59.098H79.5309V45.7266H81.2039V51.4528H89.0734V45.7266H90.7464V59.098H89.0734Z",
      fill: "themed"
    },
    {
      d: "M101.187 59.3456C99.9171 59.2528 99.4834 58.9432 99.3904 58.0766C98.9257 58.479 98.7088 58.6337 98.43 58.8194C97.8723 59.129 97.1287 59.3456 96.4781 59.3456C94.991 59.3456 94.0305 58.3861 94.0305 56.9313C94.0305 55.6004 94.7431 54.7028 96.0753 54.3932L99.2665 53.6504V51.979C99.2665 51.2361 98.7088 50.8337 97.5315 50.8337C96.5711 50.8337 96.1373 51.0813 96.1373 51.6385C96.1373 51.7313 96.1683 51.8242 96.2303 51.979L94.6811 52.2885C94.5262 52.0409 94.5262 51.948 94.5262 51.7313C94.5262 50.5242 95.8585 49.6885 97.8413 49.6885C99.7003 49.6885 100.847 50.5551 100.847 51.979V57.6123C100.878 57.8599 101.125 58.0147 101.59 58.1075L101.187 59.3456ZM99.2665 54.8885L95.8275 55.7861C95.6106 56.2194 95.5796 56.4051 95.5796 56.7766C95.5796 57.5194 96.0753 57.9837 96.8189 57.9837C97.5005 57.9837 97.9652 57.767 99.2975 56.8075V54.8885H99.2665Z",
      fill: "themed"
    },
    {
      d: "M110.327 59.098V57.2099C109.243 58.6956 108.065 59.4075 106.671 59.4075C105.06 59.4075 104.224 58.5099 104.224 56.8385V49.967H105.742V56.467C105.742 57.6123 106.052 58.0766 106.826 58.0766C107.787 58.0766 109.243 57.0551 110.296 55.6004V49.998H111.845V59.1599C111.876 59.098 110.327 59.098 110.327 59.098Z",
      fill: "themed"
    },
    {
      d: "M115.191 59.098V44.3337H116.709V59.098H115.191ZM120.551 59.098L116.771 54.1147L120.551 49.9361H122.534L118.63 54.1456L122.565 59.098H120.551Z",
      fill: "themed"
    },
    {
      d: "M125.013 54.3623C125.013 56.5908 126.159 57.9528 128.018 57.9528C128.823 57.9528 129.412 57.7361 130.403 57.0551L131.023 58.2623C129.66 59.098 128.885 59.3766 127.708 59.3766C125.168 59.3766 123.432 57.4266 123.432 54.548C123.432 51.6385 125.167 49.7194 127.77 49.7194C129.908 49.7194 131.302 51.2361 131.302 53.5266V54.4242L125.013 54.3623ZM127.646 51.0504C126.376 51.0504 125.477 51.8242 125.137 53.248H129.629C129.598 51.8242 128.885 51.0504 127.646 51.0504Z",
      fill: "themed"
    },
    { d: "M133.688 59.098V44.3337H135.206V59.098H133.688Z", fill: "themed" },
    {
      d: "M145.12 59.3456C143.85 59.2528 143.416 58.9432 143.323 58.0766C142.858 58.479 142.641 58.6337 142.363 58.8194C141.805 59.129 141.061 59.3456 140.411 59.3456C138.924 59.3456 137.963 58.3861 137.963 56.9313C137.963 55.6004 138.676 54.7028 140.008 54.3932L143.199 53.6504V51.979C143.199 51.2361 142.641 50.8337 141.464 50.8337C140.504 50.8337 140.07 51.0813 140.07 51.6385C140.07 51.7313 140.101 51.8242 140.163 51.979L138.614 52.2885C138.459 52.0409 138.459 51.948 138.459 51.7313C138.459 50.5242 139.791 49.6885 141.774 49.6885C143.633 49.6885 144.779 50.5551 144.779 51.979V57.6123C144.81 57.8599 145.058 58.0147 145.523 58.1075L145.12 59.3456ZM143.199 54.8885L139.76 55.7861C139.543 56.2194 139.512 56.4051 139.512 56.7766C139.512 57.5194 140.008 57.9837 140.752 57.9837C141.433 57.9837 141.898 57.767 143.23 56.8075L143.199 54.8885Z",
      fill: "themed"
    },
    {
      d: "M154.384 59.098V52.598C154.384 51.979 154.353 51.7932 154.229 51.5147C154.074 51.2052 153.733 51.0194 153.299 51.0194C152.37 51.0194 151.378 51.7004 149.767 53.4647V59.0671H148.249V49.9051H149.767V51.8242C150.387 51.1123 150.573 50.9266 151.038 50.5551C151.719 49.9671 152.649 49.6575 153.485 49.6575C155.096 49.6575 155.902 50.4932 155.902 52.1956V59.0671L154.384 59.098Z",
      fill: "themed"
    },
    {
      d: "M165.289 59.098V57.9528C164.484 58.8504 163.399 59.3766 162.253 59.3766C159.991 59.3766 158.411 57.4885 158.411 54.7956C158.411 51.8551 160.363 49.7194 163.09 49.7194C164.05 49.7194 164.701 49.9051 165.289 50.3385V44.3647H166.839V59.129L165.289 59.098ZM165.289 53.1242C165.289 52.4123 165.258 52.2266 165.104 51.917C164.856 51.4218 164.205 51.1432 163.245 51.1432C161.293 51.1432 160.053 52.5361 160.053 54.7337C160.053 56.5909 161.076 57.9218 162.501 57.9218C163.059 57.9218 163.709 57.7051 164.298 57.3028C164.639 57.0551 164.856 56.8385 165.289 56.3123C165.289 56.2813 165.289 53.1242 165.289 53.1242Z",
      fill: "themed"
    },
    {
      d: "M181.276 59.098V57.2099C180.192 58.6956 179.015 59.4075 177.62 59.4075C176.009 59.4075 175.173 58.5099 175.173 56.8385V49.967H176.691V56.467C176.691 57.6123 177.001 58.0766 177.775 58.0766C178.736 58.0766 180.192 57.0551 181.245 55.6004V49.998H182.794V59.1599H181.276V59.098Z",
      fill: "themed"
    },
    {
      d: "M192.337 59.098V52.598C192.337 51.979 192.306 51.7932 192.182 51.5147C192.027 51.2052 191.686 51.0194 191.252 51.0194C190.323 51.0194 189.332 51.7004 187.721 53.4647V59.0671H186.202V49.9051H187.721V51.8242C188.34 51.1123 188.526 50.9266 188.991 50.5551C189.672 49.9671 190.602 49.6575 191.438 49.6575C193.049 49.6575 193.855 50.4932 193.855 52.1956V59.0671L192.337 59.098Z",
      fill: "themed"
    },
    {
      d: "M198.038 47.7075C197.48 47.7075 197.046 47.2742 197.046 46.717C197.046 46.1599 197.48 45.7266 198.038 45.7266C198.595 45.7266 199.029 46.1599 199.029 46.717C199.029 47.2742 198.595 47.7075 198.038 47.7075ZM197.263 59.098V49.9361H198.781V59.098H197.263Z",
      fill: "themed"
    },
    {
      d: "M205.721 59.3456H204.327L200.857 49.9051H202.53L205.07 57.3337L205.101 57.7051L205.132 57.3647L207.611 49.9051H209.284L205.721 59.3456Z",
      fill: "themed"
    },
    {
      d: "M212.042 54.3623C212.042 56.5908 213.188 57.9528 215.047 57.9528C215.852 57.9528 216.441 57.7361 217.432 57.0551L218.052 58.2623C216.689 59.098 215.914 59.3766 214.737 59.3766C212.196 59.3766 210.461 57.4266 210.461 54.548C210.461 51.6385 212.196 49.7194 214.799 49.7194C216.937 49.7194 218.331 51.2361 218.331 53.5266V54.4242L212.042 54.3623ZM214.675 51.0504C213.405 51.0504 212.506 51.8242 212.165 53.248H216.658C216.658 51.8242 215.945 51.0504 214.675 51.0504Z",
      fill: "themed"
    },
    {
      d: "M225.147 51.5766C224.837 51.3289 224.682 51.2051 224.496 51.2051C223.939 51.2051 223.195 52.0408 222.328 53.6194V59.098H220.809V49.9361H222.328V51.6075C223.474 50.1528 224.032 49.7194 224.713 49.7194C225.054 49.7194 225.488 49.9361 225.891 50.3385L225.147 51.5766Z",
      fill: "themed"
    },
    {
      d: "M230.538 59.3456C230.166 59.3456 229.732 59.3147 229.268 59.2218C228.4 59.067 227.997 58.9123 227.099 58.448L227.718 57.179L228.183 57.4266C229.082 57.9218 229.949 58.0456 230.507 58.0456C231.436 58.0456 232.118 57.5504 232.118 56.8385C232.118 56.6218 232.025 56.3432 231.932 56.2194C231.56 55.6932 231.126 55.4147 229.515 54.7647C227.718 54.0218 227.13 53.4028 227.13 52.2885C227.13 50.679 228.462 49.6885 230.6 49.6885C230.972 49.6885 231.405 49.7194 231.777 49.7813C232.459 49.9051 232.799 50.029 233.574 50.4623L232.83 51.7004C232.242 51.329 231.994 51.2051 231.498 51.0813C231.126 50.9885 230.786 50.9266 230.445 50.9266C229.422 50.9266 228.741 51.3909 228.741 52.0718C228.741 52.2885 228.834 52.5051 228.958 52.629C229.329 53.0004 229.577 53.1242 231.219 53.8361C233.171 54.6409 233.698 55.2599 233.698 56.7147C233.729 58.3551 232.552 59.3456 230.538 59.3456Z",
      fill: "themed"
    },
    {
      d: "M237.478 47.7075C236.92 47.7075 236.486 47.2742 236.486 46.717C236.486 46.1599 236.92 45.7266 237.478 45.7266C238.036 45.7266 238.469 46.1599 238.469 46.717C238.469 47.2742 238.005 47.7075 237.478 47.7075ZM236.703 59.098V49.9361H238.221V59.098H236.703Z",
      fill: "themed"
    },
    {
      d: "M243.55 59.3456C242.497 59.3456 241.784 58.5099 241.784 57.3028V51.2051H240.235V50.3075L241.784 49.9361V47.2432H243.302V49.9051H245.719V51.1742H243.302V56.4051C243.302 56.498 243.333 57.2409 243.364 57.4266C243.395 57.6742 243.581 57.829 243.891 57.829C244.263 57.829 244.573 57.6742 245.223 57.179L245.843 58.2004C244.79 59.098 244.294 59.3456 243.55 59.3456Z",
      fill: "themed"
    },
    {
      d: "M248.693 54.3623C248.693 56.5908 249.84 57.9528 251.699 57.9528C252.504 57.9528 253.093 57.7361 254.084 57.0551L254.704 58.2623C253.341 59.098 252.566 59.3766 251.389 59.3766C248.848 59.3766 247.113 57.4266 247.113 54.548C247.113 51.6385 248.848 49.7194 251.451 49.7194C253.589 49.7194 254.983 51.2361 254.983 53.5266V54.4242L248.693 54.3623ZM251.327 51.0504C250.057 51.0504 249.158 51.8242 248.817 53.248H253.31C253.279 51.8242 252.566 51.0504 251.327 51.0504Z",
      fill: "themed"
    },
    {
      d: "M259.32 59.3456C258.267 59.3456 257.554 58.5099 257.554 57.3028V51.2051H256.005V50.3075L257.554 49.9361V47.2432H259.072V49.9051H261.489V51.1742H259.072V56.4051C259.072 56.498 259.103 57.2409 259.134 57.4266C259.165 57.6742 259.351 57.829 259.661 57.829C260.033 57.829 260.343 57.6742 260.993 57.179L261.613 58.2004C260.559 59.098 260.064 59.3456 259.32 59.3456Z",
      fill: "themed"
    },
    {
      d: "M266.601 59.3456C266.229 59.3456 265.795 59.3147 265.331 59.2218C264.463 59.067 264.06 58.9123 263.162 58.448L263.782 57.179L264.246 57.4266C265.145 57.9218 266.012 58.0456 266.57 58.0456C267.499 58.0456 268.181 57.5504 268.181 56.8385C268.181 56.6218 268.088 56.3432 267.995 56.2194C267.623 55.6932 267.19 55.4147 265.579 54.7647C263.782 54.0218 263.193 53.4028 263.193 52.2885C263.193 50.679 264.525 49.6885 266.663 49.6885C267.035 49.6885 267.469 49.7194 267.84 49.7813C268.522 49.9051 268.863 50.029 269.637 50.4623L268.894 51.7004C268.305 51.329 268.057 51.2051 267.561 51.0813C267.19 50.9885 266.849 50.9266 266.508 50.9266C265.486 50.9266 264.804 51.3909 264.804 52.0718C264.804 52.2885 264.897 52.5051 265.021 52.629C265.393 53.0004 265.641 53.1242 267.283 53.8361C269.234 54.6409 269.761 55.2599 269.761 56.7147C269.823 58.3551 268.615 59.3456 266.601 59.3456Z",
      fill: "themed"
    },
    {
      d: "M275.679 59.3456C275.307 59.3456 274.873 59.3147 274.408 59.2218C273.541 59.067 273.138 58.9123 272.24 58.448L272.859 57.179L273.324 57.4266C274.223 57.9218 275.09 58.0456 275.648 58.0456C276.577 58.0456 277.259 57.5504 277.259 56.8385C277.259 56.6218 277.166 56.3432 277.073 56.2194C276.701 55.6932 276.267 55.4147 274.656 54.7647C272.859 54.0218 272.271 53.4028 272.271 52.2885C272.271 50.679 273.603 49.6885 275.741 49.6885C276.113 49.6885 276.546 49.7194 276.918 49.7813C277.6 49.9051 277.94 50.029 278.715 50.4623L277.971 51.7004C277.383 51.329 277.135 51.2051 276.639 51.0813C276.267 50.9885 275.927 50.9266 275.586 50.9266C274.563 50.9266 273.882 51.3909 273.882 52.0718C273.882 52.2885 273.975 52.5051 274.099 52.629C274.47 53.0004 274.718 53.1242 276.36 53.8361C278.312 54.6409 278.839 55.2599 278.839 56.7147C278.87 58.3551 277.662 59.3456 275.679 59.3456Z",
      fill: "themed"
    },
    {
      d: "M282.278 62.6575C281.906 63.3075 281.72 63.5551 281.132 64.267L280.109 63.4313C280.791 62.4718 280.977 62.1932 281.287 61.5742C281.627 60.8932 281.782 60.2123 281.782 59.2218V49.9361H283.3V60.6147C282.867 61.6051 282.681 62.0075 282.278 62.6575ZM282.526 47.6766C281.968 47.6766 281.534 47.2432 281.534 46.6861C281.534 46.129 281.968 45.6956 282.526 45.6956C283.084 45.6956 283.517 46.129 283.517 46.6861C283.517 47.2432 283.084 47.6766 282.526 47.6766Z",
      fill: "themed"
    },
    {
      d: "M292.812 59.098V57.2099C291.728 58.6956 290.55 59.4075 289.156 59.4075C287.545 59.4075 286.708 58.5099 286.708 56.8385V49.967H288.227V56.467C288.227 57.6123 288.536 58.0766 289.311 58.0766C290.271 58.0766 291.728 57.0551 292.781 55.6004V49.998H294.33V59.1599H292.812V59.098Z",
      fill: "themed"
    },
    {
      d: "M297.645 59.098V44.3337H299.163V59.098H297.645ZM303.005 59.098L299.225 54.1147L303.005 49.9361H304.988L301.084 54.1456L305.019 59.098H303.005Z",
      fill: "themed"
    },
    {
      d: "M307.466 54.3623C307.466 56.5908 308.613 57.9528 310.472 57.9528C311.277 57.9528 311.866 57.7361 312.857 57.0551L313.477 58.2623C312.114 59.098 311.339 59.3766 310.162 59.3766C307.621 59.3766 305.886 57.4266 305.886 54.548C305.886 51.6385 307.621 49.7194 310.224 49.7194C312.362 49.7194 313.756 51.2361 313.756 53.5266V54.4242L307.466 54.3623ZM310.1 51.0504C308.83 51.0504 307.931 51.8242 307.59 53.248H312.083C312.052 51.8242 311.339 51.0504 310.1 51.0504Z",
      fill: "themed"
    },
    {
      d: "M322.152 59.098V52.598C322.152 51.979 322.121 51.7932 321.997 51.5147C321.842 51.2051 321.501 51.0194 321.099 51.0194C320.138 51.0194 319.147 51.7004 317.567 53.4647V59.067H316.049V44.3028H317.567V51.8242C318.186 51.1123 318.372 50.9266 318.806 50.5551C319.519 49.9671 320.417 49.6575 321.285 49.6575C322.896 49.6575 323.701 50.4932 323.701 52.1956V59.067L322.152 59.098Z",
      fill: "themed"
    },
    {
      d: "M333.089 59.098V57.2099C332.004 58.6956 330.827 59.4075 329.433 59.4075C327.822 59.4075 326.985 58.5099 326.985 56.8385V49.967H328.503V56.467C328.503 57.6123 328.813 58.0766 329.588 58.0766C330.548 58.0766 332.004 57.0551 333.058 55.6004V49.998H334.607V59.1599H333.089V59.098Z",
      fill: "themed"
    },
    {
      d: "M340.927 59.3456C340.555 59.3456 340.122 59.3147 339.657 59.2218C338.789 59.067 338.387 58.9123 337.488 58.448L338.108 57.179L338.573 57.4266C339.471 57.9218 340.339 58.0456 340.896 58.0456C341.826 58.0456 342.507 57.5504 342.507 56.8385C342.507 56.6218 342.414 56.3432 342.321 56.2194C341.95 55.6932 341.516 55.4147 339.905 54.7647C338.108 54.0218 337.519 53.4028 337.519 52.2885C337.519 50.679 338.851 49.6885 340.989 49.6885C341.361 49.6885 341.795 49.7194 342.166 49.7813C342.848 49.9051 343.189 50.029 343.963 50.4623L343.22 51.7004C342.631 51.329 342.383 51.2051 341.919 51.0813C341.547 50.9885 341.206 50.9266 340.865 50.9266C339.843 50.9266 339.161 51.3909 339.161 52.0718C339.161 52.2885 339.254 52.5051 339.378 52.629C339.75 53.0004 339.998 53.1242 341.64 53.8361C343.592 54.6409 344.118 55.2599 344.118 56.7147C344.149 58.3551 342.941 59.3456 340.927 59.3456Z",
      fill: "themed"
    }
  ]
};

// projects/hviktor/src/logo/logos/logo-hfd.ts
var LOGO_HFD = buildLogo("Helse F\xF8rde logo", [
  // F
  {
    d: "M202.553 24.3372V30.5463H211.04V34.4175H202.553V44.5343H197.944V20.4295H212.905V24.3372H202.553H202.553Z",
    fill: "themed"
  },
  // Ø
  {
    d: "M227.72 45.0091C224.72 45.0091 221.977 44.1325 219.416 42.3429L216.856 44.9726L214.771 43.0368L217.514 40.5167C215.612 37.7774 214.88 35.5497 214.88 32.5183C214.88 25.0677 220.075 19.9909 227.647 19.9909C231.158 19.9909 233.828 20.831 235.987 22.5841L238.401 20.21L240.522 22.1093L237.926 24.5929C239.645 26.8209 240.522 29.4871 240.522 32.4817C240.522 39.8227 235.218 45.0091 227.72 45.0091ZM227.647 23.7894C223.148 23.7894 219.782 27.4783 219.782 32.4087C219.782 34.3445 220.148 35.7686 220.953 37.0837L232.658 25.7982C231.012 24.3738 229.549 23.7894 227.647 23.7894ZM234.487 27.9163L222.781 39.2383C224.281 40.5167 225.964 41.1741 227.793 41.1741C232.219 41.1741 235.621 37.4487 235.621 32.5183C235.621 30.619 235.328 29.4137 234.487 27.9163Z",
    fill: "themed"
  },
  // R
  {
    d: "M257.386 44.5343L251.862 34.8923H249.558V44.5343H244.949V20.4295H252.996C256.508 20.4295 258.117 20.8678 259.544 22.2192C260.861 23.4245 261.519 25.1776 261.519 27.4421C261.519 29.3048 261.08 30.802 260.202 31.9707C259.288 33.1395 258.446 33.6508 256.434 34.1987L262.434 44.5346L257.386 44.5343ZM252.557 24.3372H249.558V30.9846H252.557C255.483 30.9846 256.764 29.9619 256.764 27.5513C256.764 25.2503 255.557 24.3372 252.557 24.3372Z",
    fill: "themed"
  },
  // D
  {
    d: "M284.784 40.9915C282.552 43.3655 279.37 44.5343 275.017 44.5343H266.092V20.4295H275.054C279.626 20.4295 282.479 21.4522 284.857 23.9723C286.942 26.2003 288.112 29.268 288.112 32.409C288.112 35.6231 286.905 38.7276 284.783 40.9918L284.784 40.9915ZM280.358 25.9078C279.078 24.9581 277.212 24.4833 274.578 24.4833H270.92V40.4801H274.578C280.065 40.4801 283.138 37.5948 283.138 32.4452C283.138 29.7059 282.077 27.1858 280.358 25.9075L280.358 25.9078Z",
    fill: "themed"
  },
  // E
  {
    d: "M292.32 44.5343V20.4295H307.025V24.3372H296.929V30.2903H305.196V34.1981H296.929V40.6262H307.5V44.534H292.32L292.32 44.5343Z",
    fill: "themed"
  }
], "0 0 309 65", 309, 65);

// projects/hviktor/src/logo/logos/logo-hfo.ts
var LOGO_HFO = buildLogo("Helse Fonna logo", [
  // F
  {
    d: "M202.363 24.3372V30.5463H210.841V34.4175H202.363V44.5343H197.758V20.4295H212.705V24.3372H202.363H202.363Z",
    fill: "themed"
  },
  // O
  {
    d: "M227.506 45.0091C219.978 45.0091 214.679 39.8227 214.679 32.4817C214.679 25.0312 219.868 19.9912 227.506 19.9912C235.144 19.9912 240.296 25.0315 240.296 32.4817C240.296 39.8227 234.997 45.0091 227.506 45.0091ZM227.506 23.972C222.938 23.972 219.576 27.6241 219.576 32.4817C219.576 37.3759 222.938 40.9915 227.506 40.9915C232.037 40.9915 235.399 37.3756 235.399 32.4817C235.399 27.6244 232.038 23.972 227.506 23.972Z",
    fill: "themed"
  },
  // N
  {
    d: "M260.798 44.7534L250.456 29.1584L249.652 27.6974C249.506 27.4052 249.433 27.2591 249.323 26.8574V44.5343H244.938V20.4295H250.237L259.994 35.6958C260.688 36.7916 260.981 37.5586 261.273 38.3256V20.4295H265.622V44.7534H260.798Z",
    fill: "themed"
  },
  // N
  {
    d: "M287.622 44.7534L277.28 29.1584L276.476 27.6974C276.33 27.4052 276.257 27.2591 276.147 26.8574V44.5343H271.762V20.4295H277.06L286.818 35.6958C287.512 36.7916 287.805 37.5586 288.097 38.3256V20.4295H292.446V44.7534H287.622Z",
    fill: "themed"
  },
  // A
  {
    d: "M312.838 44.5343L310.938 38.5812H302.862L300.888 44.5343H296.064L304.798 20.4295H308.928L317.662 44.5343H312.838ZM306.882 25.9443L304.104 34.6732H309.695L306.882 25.9443Z",
    fill: "themed"
  }
], "0 0 320 65", 320, 65);

// projects/hviktor/src/logo/logos/logo-hst.ts
var LOGO_HST = buildLogo("Helse Stavanger logo", [
  // S
  {
    d: "M210.981 26.0356C208.424 24.9034 206.343 24.319 204.736 24.319C202.581 24.319 201.193 25.1955 201.193 26.5469C201.193 27.5696 201.777 28.1905 203.494 29.1036C207.183 31.0759 209.593 32.6099 210.725 33.7418C211.748 34.7645 212.369 36.3715 212.369 38.0516C212.369 42.3611 209.228 44.8813 203.896 44.8813C203.165 44.8813 202.435 44.8447 201.741 44.7352C200.025 44.516 199.221 44.2238 196.701 43.0551L195.13 42.3246L197.066 38.0878C198.819 39.0375 199.549 39.4027 200.499 39.7679C201.704 40.2062 203.019 40.4619 203.969 40.4619C206.087 40.4619 207.475 39.5123 207.475 38.0513C207.475 37.0286 206.927 36.3347 205.357 35.4581L201.631 33.3397C197.358 30.8926 196.043 29.2856 196.043 26.6562C196.043 25.4509 196.408 24.2091 196.993 23.2963C197.395 22.6754 198.015 22.0545 198.782 21.5066C200.536 20.3014 202.033 19.8996 204.845 19.8996C206.452 19.8996 207.877 20.0822 209.374 20.5205C210.543 20.8857 211.2 21.1414 212.807 21.9084L210.981 26.0356Z",
    fill: "themed"
  },
  // T
  {
    d: "M225.992 24.2094V44.4065H221.39V24.2094H214.159V20.3017H233.224V24.2094H225.992Z",
    fill: "themed"
  },
  // A
  {
    d: "M248.564 44.4065L246.664 38.4534H238.593L236.621 44.4065H231.8L240.528 20.3017H244.655L253.384 44.4065H248.564ZM242.611 25.8165L239.835 34.5453H245.423L242.611 25.8165Z",
    fill: "themed"
  },
  // V
  {
    d: "M264.598 45.1001H261.384L252.436 20.3014H257.476L262.991 36.5904C263.1 36.9556 263.21 37.3574 263.246 37.7226C263.246 37.3939 263.283 37.1382 263.465 36.5904L268.725 20.3014H273.546L264.598 45.1001Z",
    fill: "themed"
  },
  // A
  {
    d: "M289.397 44.4065L287.497 38.4534H279.426L277.454 44.4065H272.633L281.361 20.3017H285.488L294.217 44.4065H289.397ZM283.444 25.8165L280.668 34.5453H286.256L283.444 25.8165Z",
    fill: "themed"
  },
  // N
  {
    d: "M313.648 44.6256L303.312 29.0305L302.508 27.5696C302.362 27.2774 302.289 27.1313 302.18 26.7295V44.4065H297.797V20.3017H303.093L312.844 35.568C313.538 36.6637 313.83 37.4307 314.122 38.1977V20.3017H318.469V44.6256H313.648Z",
    fill: "themed"
  },
  // G
  {
    d: "M342.757 44.0777C340.2 44.6621 338.703 44.8813 336.694 44.8813C328.696 44.8813 323.144 39.7679 323.144 32.3174C323.144 28.665 324.532 25.4877 327.125 23.1137C329.609 20.8495 332.385 19.8999 336.548 19.8999C338.301 19.8999 340.055 20.0825 341.589 20.4478C342.757 20.7399 343.488 20.9956 345.168 21.7258L344.072 25.5608C343.195 25.2321 342.538 25.0129 342.1 24.8668C340.383 24.2824 338.666 23.9903 337.133 23.9903C331.728 23.9903 327.966 27.3139 327.966 32.0982C327.966 37.0286 332.092 40.7906 337.461 40.7906C338.557 40.7906 339.178 40.681 340.602 40.2793V33.6319H345.204V43.493L342.757 44.0777Z",
    fill: "themed"
  },
  // E
  {
    d: "M351.158 44.4065V20.3017H365.84V24.2094H355.76V30.1625H364.014V34.0702H355.76V40.4984H366.315V44.4061H351.158L351.158 44.4065Z",
    fill: "themed"
  },
  // R
  {
    d: "M383.261 44.4065L377.747 34.7645H375.446V44.4065H370.844V20.3017H378.878C382.385 20.3017 383.992 20.74 385.416 22.0913C386.731 23.2966 387.389 25.0498 387.389 27.3142C387.389 29.177 386.95 30.6741 386.074 31.8429C385.161 33.0116 384.321 33.523 382.312 34.0708L388.302 44.4068H383.261V44.4065ZM378.441 24.2094H375.446V30.8567H378.441C381.362 30.8567 382.64 29.8341 382.64 27.4235C382.64 25.1225 381.435 24.2094 378.441 24.2094Z",
    fill: "themed"
  }
], "0 0 391 65", 391, 65);

// projects/hviktor/src/logo/logos/logo-hst-sus.ts
var LOGO_HST_SUS = {
  viewBox: "0 0 363 65",
  width: 363,
  height: 65,
  label: "Stavanger universitetssjukehus logo",
  paths: [
    // Accent dots
    {
      d: "M38.5511 9.41943C38.5511 13.3194 35.3952 16.4766 31.4967 16.4766C27.5983 16.4766 24.4424 13.3194 24.4424 9.41943C24.4424 5.51943 27.5983 2.36229 31.4967 2.36229C35.3952 2.36229 38.5511 5.51943 38.5511 9.41943Z",
      fill: "accent"
    },
    {
      d: "M38.5511 30.9623C38.5511 34.8623 35.3952 38.0194 31.4967 38.0194C27.5983 38.0194 24.4424 34.8623 24.4424 30.9623C24.4424 27.0623 27.5983 23.9051 31.4967 23.9051C35.3952 23.9051 38.5511 27.0623 38.5511 30.9623Z",
      fill: "accent"
    },
    {
      d: "M60.1164 30.9623C60.1164 34.8623 56.9605 38.0194 53.062 38.0194C49.1636 38.0194 46.0077 34.8623 46.0077 30.9623C46.0077 27.0623 49.1636 23.9051 53.062 23.9051C56.9605 23.9051 60.1164 27.0623 60.1164 30.9623Z",
      fill: "accent"
    },
    {
      d: "M38.5511 52.5361C38.5511 56.4361 35.3952 59.5932 31.4967 59.5932C27.5983 59.5932 24.4424 56.4361 24.4424 52.5361C24.4424 48.6361 27.5983 45.479 31.4967 45.479C35.3952 45.479 38.5511 48.6361 38.5511 52.5361Z",
      fill: "accent"
    },
    // Themed dot
    {
      d: "M16.9858 30.9623C16.9858 34.8623 13.8299 38.0194 9.93143 38.0194C6.03297 38.0194 2.87708 34.8623 2.87708 30.9623C2.87708 27.0623 6.03297 23.9051 9.93143 23.9051C13.8299 23.9051 16.9858 27.0623 16.9858 30.9623Z",
      fill: "themed"
    },
    // HELSE
    {
      d: "M94.4022 37.8145V27.6318H81.2913V37.8145H78.5277V15.5613H81.2913V25.1033H94.4022V15.5613H97.1658V37.8148L94.4022 37.8145Z",
      fill: "themed"
    },
    {
      d: "M104.514 37.8145V15.5613H117.018V17.8877H107.278V25.3057H115.333V27.6321H107.278V35.4881H117.321V37.8145H104.514Z",
      fill: "themed"
    },
    {
      d: "M122.681 37.8145V15.5613H125.444V35.4881H135.387V37.8145H122.68H122.681Z",
      fill: "themed"
    },
    {
      d: "M150.588 19.3375C149.442 18.663 148.97 18.4272 148.262 18.191C147.419 17.9214 146.071 17.719 145.195 17.719C142.667 17.719 140.948 18.9664 140.948 20.8548C140.948 22.507 141.926 23.3499 146.442 25.7437C147.959 26.5531 149.138 27.2947 149.947 28.0029C151.026 28.9132 151.666 30.4305 151.666 32.049C151.666 35.859 148.835 38.2531 144.352 38.2531C142.836 38.2531 141.42 37.9832 140.24 37.5112C139.398 37.1741 138.825 36.8367 137.376 35.859L138.791 33.6672C140.038 34.5104 140.578 34.8137 141.353 35.117C142.33 35.4878 143.409 35.6903 144.555 35.6903C147.184 35.6903 148.768 34.4426 148.768 32.3186C148.768 31.6779 148.667 31.1384 148.431 30.7339C148.06 30.0594 147.419 29.419 146.543 28.9132C146.173 28.7108 144.925 28.0701 142.836 26.9239C139.499 25.1367 138.084 23.3836 138.084 21.0906C138.084 17.5503 141.016 15.1902 145.431 15.1902C146.711 15.1902 148.026 15.3589 149.172 15.7297C150.082 16.033 150.621 16.3029 151.868 17.0449L150.588 19.3375Z",
      fill: "themed"
    },
    {
      d: "M157.363 37.8145V15.5613H169.867V17.8877H160.126V25.3057H168.182V27.6321H160.126V35.4881H170.17V37.8145H157.363Z",
      fill: "themed"
    },
    // STAVANGER
    {
      d: "M195.617 20.8548C193.258 19.8095 191.337 19.27 189.854 19.27C187.865 19.27 186.585 20.0794 186.585 21.3268C186.585 22.2709 187.124 22.8441 188.708 23.6869C192.112 25.5075 194.337 26.9239 195.382 27.9689C196.325 28.9129 196.898 30.3968 196.898 31.9475C196.898 35.9261 194 38.2528 189.079 38.2528C188.405 38.2528 187.731 38.2191 187.09 38.1179C185.506 37.9154 184.764 37.6458 182.439 36.5668L180.99 35.8924L182.776 31.9809C184.394 32.8578 185.068 33.1949 185.944 33.532C187.056 33.9365 188.27 34.1727 189.146 34.1727C191.101 34.1727 192.382 33.2961 192.382 31.9475C192.382 31.0035 191.876 30.3627 190.427 29.5536L186.989 27.5981C183.046 25.3389 181.833 23.8553 181.833 21.4277C181.833 20.315 182.17 19.1685 182.709 18.3257C183.079 17.7524 183.652 17.1792 184.36 16.6734C185.978 15.5607 187.36 15.1899 189.955 15.1899C191.438 15.1899 192.753 15.3586 194.135 15.7631C195.213 16.1002 195.82 16.3364 197.303 17.0442L195.618 20.8542L195.617 20.8548Z",
      fill: "themed"
    },
    {
      d: "M209.47 19.1688V37.8145H205.223V19.1688H198.55V15.561H216.143V19.1688H209.47Z",
      fill: "themed"
    },
    {
      d: "M230.3 37.8145L228.547 32.3186H221.098L219.279 37.8145H214.83L222.885 15.561H226.693L234.749 37.8145H230.3ZM224.806 20.6524L222.245 28.7108H227.401L224.806 20.6524Z",
      fill: "themed"
    },
    {
      d: "M245.096 38.4552H242.13L233.872 15.5613H238.524L243.613 30.5992C243.714 30.9363 243.815 31.3071 243.849 31.6445C243.849 31.3411 243.883 31.105 244.051 30.5992L248.905 15.5613H253.354L245.096 38.4552Z",
      fill: "themed"
    },
    {
      d: "M267.981 37.8145L266.228 32.3186H258.78L256.96 37.8145H252.511L260.566 15.561H264.375L272.43 37.8145H267.981ZM262.487 20.6524L259.926 28.7108H265.083L262.487 20.6524Z",
      fill: "themed"
    },
    {
      d: "M290.361 38.017L280.823 23.6198L280.081 22.2709C279.946 22.0013 279.879 21.8663 279.778 21.4955V37.8148H275.734V15.5613H280.621L289.619 29.6552C290.26 30.6667 290.529 31.3749 290.799 32.0828V15.5613H294.81V38.017H290.361H290.361Z",
      fill: "themed"
    },
    {
      d: "M317.223 37.5112C314.864 38.0507 313.482 38.2531 311.628 38.2531C304.247 38.2531 299.124 33.5326 299.124 26.6543C299.124 23.2827 300.405 20.349 302.798 18.1576C305.09 16.0671 307.651 15.1905 311.494 15.1905C313.112 15.1905 314.73 15.3592 316.145 15.6963C317.224 15.9659 317.898 16.202 319.448 16.8762L318.437 20.4165C317.628 20.1132 317.021 19.9107 316.617 19.7758C315.033 19.2363 313.449 18.9664 312.033 18.9664C307.045 18.9664 303.574 22.0347 303.574 26.4516C303.574 31.0035 307.382 34.4763 312.337 34.4763C313.348 34.4763 313.921 34.3751 315.235 34.0043V27.8677H319.482V36.9714L317.224 37.5109L317.223 37.5112Z",
      fill: "themed"
    },
    {
      d: "M324.976 37.8145V15.5613H338.525V19.1691H329.223V24.665H336.84V28.2728H329.223V34.207H338.963V37.8148L324.976 37.8145Z",
      fill: "themed"
    },
    {
      d: "M354.602 37.8145L349.513 28.9132H347.389V37.8145H343.142V15.5613H350.557C353.793 15.5613 355.276 15.9659 356.59 17.2135C357.804 18.3263 358.41 19.9445 358.41 22.035C358.41 23.7544 358.006 25.137 357.197 26.216C356.354 27.295 355.579 27.7671 353.725 28.2728L359.253 37.8148H354.602L354.602 37.8145ZM350.153 19.1688H347.389V25.3054H350.153C352.849 25.3054 354.029 24.3614 354.029 22.1359C354.029 20.0116 352.917 19.1688 350.153 19.1688Z",
      fill: "themed"
    },
    // stavanger universitetssjukehus (subtitle)
    // s
    {
      d: "M86.3441 47.9929C85.6529 47.5862 85.3683 47.4438 84.9416 47.3014C84.4336 47.1386 83.6205 47.0167 83.0917 47.0167C81.5673 47.0167 80.5305 47.7691 80.5305 48.9079C80.5305 49.9042 81.1199 50.4125 83.8435 51.8564C84.7581 52.3445 85.4698 52.7918 85.9577 53.2186C86.608 53.7677 86.9945 54.6826 86.9945 55.6589C86.9945 57.9568 85.2869 59.4004 82.5837 59.4004C81.6691 59.4004 80.8151 59.2376 80.1038 58.9528C79.5958 58.7495 79.2498 58.5461 78.3761 57.9565L79.2301 56.6348C79.9822 57.143 80.3074 57.3263 80.7749 57.5092C81.3643 57.733 82.0147 57.855 82.7059 57.855C84.2912 57.855 85.2467 57.1025 85.2467 55.8214C85.2467 55.4351 85.1857 55.1098 85.0434 54.8659C84.8197 54.4592 84.4336 54.0729 83.9051 53.7677C83.6814 53.6457 82.9293 53.2595 81.6691 52.568C79.6567 51.4902 78.8031 50.4329 78.8031 49.0502C78.8031 46.9151 80.5713 45.4916 83.2343 45.4916C84.0066 45.4916 84.7996 45.5932 85.4908 45.817C86.0394 45.9999 86.3649 46.1627 87.117 46.61L86.3447 47.9929H86.3441Z",
      fill: "themed"
    },
    // t
    {
      d: "M91.8326 59.4007C90.7757 59.4007 90.0644 58.5669 90.0644 57.347V51.2058H88.5195V50.3109L90.0644 49.9246V47.2405H91.5888V49.9246H94.0281V51.2058H91.5888V56.4522C91.5888 56.5336 91.6296 57.3062 91.6497 57.469C91.6903 57.7333 91.853 57.8757 92.1782 57.8757C92.5643 57.8757 92.8691 57.7129 93.5198 57.2251L94.15 58.2419C93.0727 59.1367 92.5647 59.401 91.8329 59.401L91.8326 59.4007Z",
      fill: "themed"
    },
    // a
    {
      d: "M102.769 59.4007C101.508 59.3193 101.061 58.994 100.98 58.1196C100.512 58.5263 100.309 58.6888 100.004 58.8516C99.4352 59.1769 98.7034 59.3803 98.0531 59.3803C96.5692 59.3803 95.5936 58.4245 95.5936 56.9604C95.5936 55.6183 96.3049 54.7235 97.6465 54.3982L100.838 53.6457V51.9783C100.838 51.2259 100.269 50.8396 99.0896 50.8396C98.1341 50.8396 97.687 51.1039 97.687 51.6326C97.687 51.7341 97.7075 51.8155 97.7684 51.9783L96.2236 52.3036C96.0812 52.0597 96.0608 51.9579 96.0608 51.7344C96.0608 50.5143 97.4024 49.6807 99.3742 49.6807C101.224 49.6807 102.383 50.5551 102.383 51.9786V57.6318C102.423 57.8757 102.667 58.0385 103.135 58.1199L102.769 59.4007ZM100.838 54.9269L97.3823 55.8217C97.1586 56.2488 97.1181 56.4522 97.1181 56.818C97.1181 57.5501 97.606 58.0178 98.3578 58.0178C99.049 58.0178 99.5165 57.794 100.838 56.8385V54.9269Z",
      fill: "themed"
    },
    // v
    {
      d: "M109.375 59.4007H107.973L104.517 49.9246H106.184L108.725 57.3873L108.766 57.7534L108.786 57.4077L111.286 49.9246H112.953L109.375 59.4007Z",
      fill: "themed"
    },
    // a
    {
      d: "M121.531 59.4007C120.271 59.3193 119.824 58.994 119.742 58.1196C119.275 58.5263 119.072 58.6888 118.767 58.8516C118.198 59.1769 117.466 59.3803 116.816 59.3803C115.332 59.3803 114.356 58.4245 114.356 56.9604C114.356 55.6183 115.067 54.7235 116.409 54.3982L119.6 53.6457V51.9783C119.6 51.2259 119.031 50.8396 117.852 50.8396C116.897 50.8396 116.449 51.1039 116.449 51.6326C116.449 51.7341 116.47 51.8155 116.531 51.9783L114.986 52.3036C114.844 52.0597 114.823 51.9579 114.823 51.7344C114.823 50.5143 116.165 49.6807 118.137 49.6807C119.986 49.6807 121.145 50.5551 121.145 51.9786V57.6318C121.186 57.8757 121.43 58.0385 121.897 58.1199L121.531 59.4007ZM119.6 54.9269L116.145 55.8217C115.921 56.2488 115.881 56.4522 115.881 56.818C115.881 57.5501 116.368 58.0178 117.12 58.0178C117.811 58.0178 118.279 57.794 119.6 56.8385V54.9269Z",
      fill: "themed"
    },
    // n
    {
      d: "M130.821 59.1364V52.6088C130.821 51.9988 130.78 51.7954 130.679 51.5311C130.537 51.2262 130.171 51.043 129.744 51.043C128.809 51.043 127.812 51.7344 126.207 53.5034V59.1361H124.682V49.9243H126.207V51.8561C126.837 51.1442 127.02 50.9612 127.467 50.5954C128.158 50.0057 129.073 49.6804 129.926 49.6804C131.553 49.6804 132.345 50.514 132.345 52.2427V59.1361H130.821L130.821 59.1364Z",
      fill: "themed"
    },
    // g
    {
      d: "M142.001 51.2058C142.367 51.7549 142.55 52.3649 142.55 53.1171C142.55 54.9878 140.903 56.5946 138.972 56.5946C138.85 56.5946 138.667 56.5741 138.403 56.5537C138.342 56.5537 138.241 56.5333 138.098 56.5333C137.244 57.2452 136.899 57.6516 136.899 57.9159C136.899 58.1601 137.102 58.2412 137.671 58.2412H141.106C142.814 58.2412 143.586 58.9123 143.586 60.3968C143.586 62.5523 141.371 64.2807 138.606 64.2807C136.675 64.2807 135.008 63.2639 135.008 62.0642C135.008 61.7998 135.11 61.4745 135.293 61.1084C135.557 60.6001 135.821 60.2541 136.513 59.5224C135.578 59.258 135.191 58.9528 135.191 58.4242C135.191 57.8345 135.761 57.143 137.001 56.1263C135.842 55.4958 135.232 54.4793 135.232 53.1982C135.232 51.1241 136.757 49.6801 138.911 49.6801C139.582 49.6801 139.968 49.7615 140.863 50.0664H142.265L143.932 49.924V51.2051H142.001V51.2058ZM141.107 59.6446H137.672L137.367 60.1123C136.777 61.0273 136.594 61.3934 136.594 61.7392C136.594 62.4306 137.509 62.9185 138.749 62.9185C140.619 62.9185 142.306 61.8203 142.306 60.58C142.306 59.9495 141.92 59.6446 141.107 59.6446H141.107ZM138.81 50.8396C137.692 50.8396 136.777 51.8768 136.777 53.1375C136.777 54.3982 137.691 55.4354 138.83 55.4354C139.988 55.4354 140.883 54.4391 140.883 53.1375C140.883 51.8564 139.968 50.8396 138.809 50.8396H138.81Z",
      fill: "themed"
    },
    // e
    {
      d: "M146.799 54.3982C146.799 56.6351 147.937 57.9976 149.807 57.9976C150.62 57.9976 151.21 57.7739 152.206 57.0827L152.815 58.2824C151.453 59.1364 150.681 59.4007 149.482 59.4007C146.92 59.4007 145.193 57.4485 145.193 54.5406C145.193 51.6125 146.92 49.6807 149.543 49.6807C151.697 49.6807 153.1 51.2058 153.1 53.5037V54.3985H146.798L146.799 54.3982ZM149.441 51.0634C148.161 51.0634 147.266 51.836 146.921 53.2595H151.433C151.413 51.836 150.702 51.0634 149.441 51.0634Z",
      fill: "themed"
    },
    // r
    {
      d: "M159.951 51.5921C159.645 51.3277 159.483 51.2262 159.3 51.2262C158.731 51.2262 157.999 52.0597 157.125 53.646V59.1364H155.601V49.9246H157.125V51.5921C158.264 50.128 158.833 49.6807 159.524 49.6807C159.869 49.6807 160.296 49.9045 160.703 50.3112L159.951 51.5921Z",
      fill: "themed"
    },
    // u
    {
      d: "M173.57 59.1364V57.2251C172.493 58.7095 171.293 59.4211 169.911 59.4211C168.305 59.4211 167.452 58.5263 167.452 56.8388V49.925H168.976V56.4525C168.976 57.5912 169.301 58.0589 170.074 58.0589C171.05 58.0589 172.513 57.0217 173.57 55.558V49.9253H175.115V59.137H173.57V59.1364Z",
      fill: "themed"
    },
    // n
    {
      d: "M184.669 59.1364V52.6088C184.669 51.9988 184.628 51.7954 184.526 51.5311C184.384 51.2262 184.018 51.043 183.591 51.043C182.656 51.043 181.66 51.7344 180.054 53.5034V59.1361H178.53V49.9243H180.054V51.8561C180.685 51.1442 180.868 50.9612 181.315 50.5954C182.006 50.0057 182.92 49.6804 183.774 49.6804C185.4 49.6804 186.193 50.514 186.193 52.2427V59.1361H184.668L184.669 59.1364Z",
      fill: "themed"
    },
    // i
    {
      d: "M190.381 47.7081C189.832 47.7081 189.385 47.2606 189.385 46.7118C189.385 46.163 189.833 45.7154 190.381 45.7154C190.93 45.7154 191.377 46.163 191.377 46.7118C191.377 47.2606 190.93 47.7081 190.381 47.7081ZM189.609 59.1364V49.9246H191.133V59.1364H189.609Z",
      fill: "themed"
    },
    // v
    {
      d: "M198.085 59.4007H196.683L193.227 49.9246H194.894L197.435 57.3873L197.476 57.7534L197.496 57.4077L199.996 49.9246H201.663L198.085 59.4007H198.085Z",
      fill: "themed"
    },
    // e
    {
      d: "M204.448 54.3982C204.448 56.6351 205.586 57.9976 207.456 57.9976C208.269 57.9976 208.858 57.7739 209.854 57.0827L210.464 58.2824C209.102 59.1364 208.33 59.4007 207.13 59.4007C204.569 59.4007 202.842 57.4485 202.842 54.5406C202.842 51.6125 204.569 49.6807 207.191 49.6807C209.346 49.6807 210.749 51.2058 210.749 53.5037V54.3985H204.447L204.448 54.3982ZM207.09 51.0634C205.81 51.0634 204.915 51.836 204.57 53.2595H209.082C209.062 51.836 208.35 51.0634 207.09 51.0634Z",
      fill: "themed"
    },
    // r
    {
      d: "M217.599 51.5921C217.294 51.3277 217.132 51.2262 216.949 51.2262C216.38 51.2262 215.648 52.0597 214.774 53.646V59.1364H213.25V49.9246H214.774V51.5921C215.913 50.128 216.482 49.6807 217.173 49.6807C217.518 49.6807 217.945 49.9045 218.352 50.3112L217.599 51.5921Z",
      fill: "themed"
    },
    // s
    {
      d: "M223.007 59.4007C222.62 59.4007 222.193 59.3599 221.726 59.2788C220.852 59.116 220.466 58.9736 219.551 58.5062L220.181 57.2251L220.649 57.469C221.563 57.9571 222.417 58.0995 222.986 58.0995C223.921 58.0995 224.613 57.5912 224.613 56.8793C224.613 56.6555 224.531 56.3912 224.43 56.2488C224.064 55.7202 223.637 55.4558 221.99 54.7848C220.202 54.0323 219.592 53.4021 219.592 52.2838C219.592 50.6774 220.934 49.681 223.088 49.681C223.474 49.681 223.881 49.7012 224.267 49.7826C224.958 49.9045 225.283 50.0469 226.056 50.474L225.304 51.7143C224.714 51.3485 224.45 51.2262 223.982 51.1042C223.617 51.0024 223.271 50.9414 222.925 50.9414C221.889 50.9414 221.218 51.4091 221.218 52.1006C221.218 52.3244 221.299 52.5277 221.442 52.6701C221.807 53.036 222.051 53.1784 223.718 53.8698C225.67 54.6833 226.218 55.3138 226.218 56.7574C226.218 58.4047 225.019 59.401 223.007 59.401L223.007 59.4007Z",
      fill: "themed"
    },
    // i
    {
      d: "M229.959 47.7081C229.41 47.7081 228.963 47.2606 228.963 46.7118C228.963 46.163 229.41 45.7154 229.959 45.7154C230.507 45.7154 230.955 46.163 230.955 46.7118C230.955 47.2606 230.507 47.7081 229.959 47.7081ZM229.187 59.1364V49.9246H230.711V59.1364H229.187Z",
      fill: "themed"
    },
    // t
    {
      d: "M236.077 59.4007C235.02 59.4007 234.309 58.5669 234.309 57.347V51.2058H232.764V50.3109L234.309 49.9246V47.2405H235.833V49.9246H238.273V51.2058H235.833V56.4522C235.833 56.5336 235.874 57.3062 235.894 57.469C235.935 57.7333 236.098 57.8757 236.423 57.8757C236.809 57.8757 237.114 57.7129 237.764 57.2251L238.395 58.2419C237.317 59.1367 236.809 59.401 236.078 59.401L236.077 59.4007Z",
      fill: "themed"
    },
    // e
    {
      d: "M241.22 54.3982C241.22 56.6351 242.358 57.9976 244.228 57.9976C245.042 57.9976 245.631 57.7739 246.627 57.0827L247.237 58.2824C245.875 59.1364 245.102 59.4007 243.903 59.4007C241.342 59.4007 239.614 57.4485 239.614 54.5406C239.614 51.6125 241.342 49.6807 243.964 49.6807C246.119 49.6807 247.521 51.2058 247.521 53.5037V54.3985H241.22L241.22 54.3982ZM243.863 51.0634C242.582 51.0634 241.688 51.836 241.342 53.2595H245.855C245.834 51.836 245.123 51.0634 243.863 51.0634Z",
      fill: "themed"
    },
    // t
    {
      d: "M251.892 59.4007C250.835 59.4007 250.124 58.5669 250.124 57.347V51.2058H248.579V50.3109L250.124 49.9246V47.2405H251.648V49.9246H254.087V51.2058H251.648V56.4522C251.648 56.5336 251.689 57.3062 251.709 57.469C251.75 57.7333 251.912 57.8757 252.238 57.8757C252.624 57.8757 252.928 57.7129 253.579 57.2251L254.209 58.2419C253.132 59.1367 252.624 59.401 251.892 59.401L251.892 59.4007Z",
      fill: "themed"
    },
    // s
    {
      d: "M259.21 59.4007C258.824 59.4007 258.397 59.3599 257.929 59.2788C257.055 59.116 256.669 58.9736 255.755 58.5062L256.385 57.2251L256.852 57.469C257.767 57.9571 258.621 58.0995 259.19 58.0995C260.125 58.0995 260.816 57.5912 260.816 56.8793C260.816 56.6555 260.735 56.3912 260.633 56.2488C260.267 55.7202 259.84 55.4558 258.194 54.7848C256.405 54.0323 255.795 53.4021 255.795 52.2838C255.795 50.6774 257.137 49.681 259.292 49.681C259.678 49.681 260.084 49.7012 260.47 49.7826C261.161 49.9045 261.487 50.0469 262.259 50.474L261.507 51.7143C260.918 51.3485 260.653 51.2262 260.186 51.1042C259.82 51.0024 259.474 50.9414 259.129 50.9414C258.092 50.9414 257.421 51.4091 257.421 52.1006C257.421 52.3244 257.503 52.5277 257.645 52.6701C258.011 53.036 258.255 53.1784 259.922 53.8698C261.873 54.6833 262.422 55.3138 262.422 56.7574C262.422 58.4047 261.223 59.401 259.21 59.401L259.21 59.4007Z",
      fill: "themed"
    },
    // s
    {
      d: "M268.296 59.4007C267.91 59.4007 267.483 59.3599 267.015 59.2788C266.141 59.116 265.755 58.9736 264.841 58.5062L265.471 57.2251L265.938 57.469C266.853 57.9571 267.707 58.0995 268.276 58.0995C269.211 58.0995 269.902 57.5912 269.902 56.8793C269.902 56.6555 269.821 56.3912 269.719 56.2488C269.354 55.7202 268.927 55.4558 267.28 54.7848C265.491 54.0323 264.882 53.4021 264.882 52.2838C264.882 50.6774 266.223 49.681 268.378 49.681C268.764 49.681 269.17 49.7012 269.557 49.7826C270.247 49.9045 270.573 50.0469 271.345 50.474L270.593 51.7143C270.004 51.3485 269.739 51.2262 269.272 51.1042C268.906 51.0024 268.56 50.9414 268.215 50.9414C267.178 50.9414 266.507 51.4091 266.507 52.1006C266.507 52.3244 266.589 52.5277 266.731 52.6701C267.097 53.036 267.341 53.1784 269.008 53.8698C270.959 54.6833 271.508 55.3138 271.508 56.7574C271.508 58.4047 270.309 59.401 268.296 59.401L268.296 59.4007Z",
      fill: "themed"
    },
    // j
    {
      d: "M274.923 62.7355C274.537 63.3861 274.354 63.6505 273.785 64.3419L272.769 63.488C273.459 62.5322 273.643 62.2474 273.947 61.6172C274.293 60.9257 274.435 60.2346 274.435 59.2583V49.9246H275.96V60.6614C275.533 61.6782 275.329 62.0645 274.923 62.7355H274.923ZM275.187 47.6877C274.639 47.6877 274.191 47.2401 274.191 46.6914C274.191 46.1426 274.639 45.695 275.187 45.695C275.736 45.695 276.183 46.1426 276.183 46.6914C276.183 47.2401 275.736 47.6877 275.187 47.6877Z",
      fill: "themed"
    },
    // u
    {
      d: "M285.493 59.1364V57.2251C284.416 58.7095 283.216 59.4211 281.834 59.4211C280.228 59.4211 279.375 58.5263 279.375 56.8388V49.925H280.899V56.4525C280.899 57.5912 281.224 58.0589 281.997 58.0589C282.973 58.0589 284.436 57.0217 285.493 55.558V49.9253H287.038V59.137H285.493V59.1364Z",
      fill: "themed"
    },
    // k
    {
      d: "M290.372 59.1364V44.3124H291.896V59.1364H290.372ZM295.738 59.1364L291.937 54.1339L295.738 49.9246H297.73L293.807 54.1543L297.75 59.1364H295.738H295.738Z",
      fill: "themed"
    },
    // e
    {
      d: "M300.211 54.3982C300.211 56.6351 301.349 57.9976 303.219 57.9976C304.032 57.9976 304.621 57.7739 305.617 57.0827L306.227 58.2824C304.865 59.1364 304.093 59.4007 302.893 59.4007C300.332 59.4007 298.604 57.4485 298.604 54.5406C298.604 51.6125 300.332 49.6807 302.954 49.6807C305.109 49.6807 306.512 51.2058 306.512 53.5037V54.3985H300.21L300.211 54.3982ZM302.853 51.0634C301.573 51.0634 300.678 51.836 300.332 53.2595H304.845C304.825 51.836 304.113 51.0634 302.853 51.0634Z",
      fill: "themed"
    },
    // h
    {
      d: "M314.968 59.1364V52.6088C314.968 51.9988 314.948 51.7954 314.826 51.5311C314.684 51.2262 314.338 51.043 313.911 51.043C312.956 51.043 311.96 51.7344 310.374 53.5034V59.1361H308.85V44.312H310.374V51.8564C311.005 51.1445 311.167 50.9615 311.615 50.5957C312.326 50.006 313.22 49.6807 314.094 49.6807C315.721 49.6807 316.513 50.5143 316.513 52.243V59.1364H314.968Z",
      fill: "themed"
    },
    // u
    {
      d: "M325.945 59.1364V57.2251C324.868 58.7095 323.668 59.4211 322.286 59.4211C320.68 59.4211 319.827 58.5263 319.827 56.8388V49.925H321.351V56.4525C321.351 57.5912 321.676 58.0589 322.449 58.0589C323.425 58.0589 324.888 57.0217 325.945 55.558V49.9253H327.49V59.137H325.945V59.1364Z",
      fill: "themed"
    },
    // s
    {
      d: "M333.812 59.4007C333.425 59.4007 332.999 59.3599 332.531 59.2788C331.657 59.116 331.271 58.9736 330.356 58.5062L330.986 57.2251L331.454 57.469C332.369 57.9571 333.223 58.0995 333.791 58.0995C334.727 58.0995 335.418 57.5912 335.418 56.8793C335.418 56.6555 335.336 56.3912 335.235 56.2488C334.869 55.7202 334.442 55.4558 332.796 54.7848C331.007 54.0323 330.397 53.4021 330.397 52.2838C330.397 50.6774 331.739 49.681 333.893 49.681C334.279 49.681 334.686 49.7012 335.072 49.7826C335.763 49.9045 336.089 50.0469 336.861 50.474L336.109 51.7143C335.519 51.3485 335.255 51.2262 334.787 51.1042C334.422 51.0024 334.076 50.9414 333.731 50.9414C332.694 50.9414 332.023 51.4091 332.023 52.1006C332.023 52.3244 332.104 52.5277 332.247 52.6701C332.612 53.036 332.856 53.1784 334.523 53.8698C336.475 54.6833 337.024 55.3138 337.024 56.7574C337.024 58.4047 335.824 59.401 333.812 59.401L333.812 59.4007Z",
      fill: "themed"
    }
  ]
};

// projects/hviktor/src/logo/logos/logo-hve.ts
var LOGO_HVE = {
  viewBox: "0 0 240 61",
  width: 240,
  height: 61,
  label: "Helse Vest logo",
  paths: [
    // Accent dots (center)
    {
      d: "M136.787 7.41402C136.787 11.5106 133.46 14.8302 129.357 14.8302C125.254 14.8302 121.932 11.5106 121.932 7.41402C121.932 3.31748 125.259 0 129.357 0C133.456 0 136.787 3.31964 136.787 7.41402Z",
      fill: "accent"
    },
    {
      d: "M136.787 30.0374C136.787 34.1318 133.46 37.4493 129.357 37.4493C125.254 37.4493 121.932 34.1297 121.932 30.0374C121.932 25.9452 125.259 22.6188 129.357 22.6188C133.456 22.6188 136.787 25.9409 136.787 30.0374Z",
      fill: "accent"
    },
    {
      d: "M159.48 30.0374C159.48 34.1318 156.153 37.4493 152.053 37.4493C147.952 37.4493 144.625 34.1297 144.625 30.0374C144.625 25.9452 147.95 22.6188 152.053 22.6188C156.156 22.6188 159.48 25.9409 159.48 30.0374Z",
      fill: "accent"
    },
    {
      d: "M136.787 52.702C136.787 56.7942 133.46 60.116 129.357 60.116C125.254 60.116 121.932 56.7942 121.932 52.702C121.932 48.6098 125.259 45.2833 129.357 45.2833C133.456 45.2833 136.787 48.6033 136.787 52.702Z",
      fill: "accent"
    },
    // Themed dot
    {
      d: "M114.11 30.0374C114.11 34.1318 110.785 37.4493 106.682 37.4493C102.579 37.4493 99.2563 34.1297 99.2563 30.0374C99.2563 25.9452 102.581 22.6188 106.682 22.6188C110.783 22.6188 114.11 25.9409 114.11 30.0374Z",
      fill: "themed"
    },
    // HELSE
    {
      d: "M14.3338 40.0273V30.8515H2.49643V40.0273H0V19.9711H2.49643V28.5712H14.3338V19.9711H16.8302V40.0273H14.3338Z",
      fill: "themed"
    },
    {
      d: "M23.8173 40.0273V19.9711H35.1068V22.0675H26.3115V28.7529H33.5835V30.8493H26.3115V37.9287H35.3809V40.0251H23.8173V40.0273Z",
      fill: "themed"
    },
    { d: "M40.5774 40.0273V19.9711H43.0738V37.9309H52.0511V40.0273H40.5774Z", fill: "themed" },
    {
      d: "M66.1307 23.374C65.0962 22.768 64.6688 22.5535 64.0311 22.3411C63.2707 22.0982 62.0542 21.9165 61.2606 21.9165C58.979 21.9165 57.4253 23.0413 57.4253 24.744C57.4253 26.2322 58.3085 26.9914 62.3872 29.1491C63.757 29.8777 64.8222 30.5475 65.5523 31.1864C66.5253 32.0069 67.1038 33.3747 67.1038 34.8344C67.1038 38.2658 64.5482 40.4257 60.5002 40.4257C59.1303 40.4257 57.8525 40.1827 56.7873 39.7562C56.0269 39.4519 55.5095 39.1498 54.2013 38.2658L55.4788 36.292C56.6053 37.0534 57.092 37.327 57.7933 37.6003C58.6746 37.9331 59.6499 38.1148 60.6843 38.1148C63.058 38.1148 64.4893 36.99 64.4893 35.0752C64.4893 34.4974 64.3972 34.0139 64.1845 33.6483C63.8513 33.0423 63.2707 32.4644 62.4814 32.0069C62.1463 31.8256 61.0197 31.2477 59.1346 30.2148C56.1211 28.604 54.8433 27.0242 54.8433 24.9585C54.8433 21.7679 57.491 19.6405 61.4776 19.6405C62.6348 19.6405 63.8206 19.7937 64.8572 20.1265C65.6794 20.4001 66.1657 20.6431 67.2923 21.3126L66.1351 23.3783L66.1307 23.374Z",
      fill: "themed"
    },
    {
      d: "M72.6051 40.0273V19.9711H83.8947V22.0675H75.0994V28.7529H82.3713V30.8493H75.0994V37.9287H84.1687V40.0251H72.6051V40.0273Z",
      fill: "themed"
    },
    // VEST
    {
      d: "M182.5 40.6114H179.819L172.365 19.9773H176.565L181.161 33.5298C181.253 33.8341 181.343 34.169 181.373 34.4729C181.373 34.1996 181.406 33.9851 181.558 33.5298L185.939 19.9773H189.956L182.502 40.6114H182.5Z",
      fill: "themed"
    },
    {
      d: "M193.079 40.0338V19.9776H205.314V23.2295H196.915V28.1818H203.792V31.4337H196.915V36.7841H205.71V40.0338H193.079Z",
      fill: "themed"
    },
    {
      d: "M220.886 24.7505C218.753 23.8073 217.019 23.3214 215.681 23.3214C213.885 23.3214 212.728 24.0503 212.728 25.1751C212.728 26.0263 213.217 26.5426 214.646 27.3022C217.719 28.9433 219.726 30.2191 220.671 31.1601C221.523 32.0113 222.041 33.3484 222.041 34.7468C222.041 38.3336 219.424 40.43 214.979 40.43C214.372 40.43 213.763 40.3994 213.184 40.3074C211.755 40.1257 211.085 39.8831 208.985 38.909L207.676 38.303L209.287 34.7775C210.749 35.5674 211.356 35.8716 212.15 36.1759C213.153 36.5415 214.249 36.7535 215.04 36.7535C216.805 36.7535 217.962 35.9657 217.962 34.749C217.962 33.8978 217.504 33.3221 216.196 32.5913L213.092 30.8276C209.531 28.7922 208.435 27.4554 208.435 25.2671C208.435 24.2645 208.739 23.2316 209.226 22.4724C209.559 21.9561 210.079 21.4395 210.718 20.9842C212.178 19.9819 213.425 19.6473 215.77 19.6473C217.109 19.6473 218.295 19.8006 219.544 20.1636C220.518 20.4679 221.066 20.6802 222.407 21.3169L220.886 24.7505Z",
      fill: "themed"
    },
    {
      d: "M233.69 23.2295V40.0338H229.854V23.2295H223.829V19.9776H239.715V23.2295H233.69Z",
      fill: "themed"
    }
  ]
};

// projects/hviktor/src/logo/logos/logo-hvikt.ts
var LOGO_HVIKT = buildLogo("Helse Vest IKT logo", [
  // V
  {
    d: "M203.757 44.9159H200.593L191.784 20.4796H196.746L202.175 36.5306C202.283 36.8905 202.391 37.2864 202.427 37.6463C202.427 37.3224 202.463 37.0704 202.643 36.5306L207.821 20.4796H212.567L203.757 44.9159Z",
    fill: "themed"
  },
  // E
  {
    d: "M215.911 44.2324V20.4799H230.365V24.3306H220.442V30.1966H228.568V34.0473H220.442V40.3815H230.833V44.2321H215.911L215.911 44.2324Z",
    fill: "themed"
  },
  // S
  {
    d: "M248.415 26.1301C245.898 25.0144 243.848 24.4386 242.266 24.4386C240.145 24.4386 238.779 25.3023 238.779 26.6339C238.779 27.6417 239.354 28.2535 241.044 29.1532C244.675 31.0967 247.049 32.6083 248.163 33.7237C249.17 34.7314 249.781 36.315 249.781 37.9705C249.781 42.217 246.689 44.7003 241.44 44.7003C240.72 44.7003 240.001 44.6643 239.318 44.5564C237.629 44.3404 236.837 44.0525 234.356 42.9008L232.81 42.181L234.716 38.0062C236.442 38.9419 237.161 39.3018 238.096 39.6617C239.282 40.0936 240.577 40.3455 241.512 40.3455C243.597 40.3455 244.963 39.4098 244.963 37.9702C244.963 36.9625 244.424 36.2787 242.878 35.4149L239.21 33.3275C235.003 30.9161 233.709 29.3326 233.709 26.7416C233.709 25.5539 234.068 24.3303 234.644 23.4308C235.039 22.819 235.651 22.2072 236.406 21.6673C238.132 20.4797 239.606 20.0838 242.374 20.0838C243.956 20.0838 245.359 20.2637 246.833 20.6956C247.983 21.0555 248.631 21.3074 250.212 22.0632L248.415 26.1301Z",
    fill: "themed"
  },
  // T
  {
    d: "M263.194 24.3306V44.2324H258.663V24.3306H251.544V20.4799H270.313V24.3306H263.194Z",
    fill: "themed"
  },
  // I
  { d: "M283.545 44.2324V20.4799H286.493V44.2324H283.545Z", fill: "themed" },
  // K
  {
    d: "M294.331 44.2324V20.4799H297.28V44.2324H294.331ZM306.988 44.2324L297.496 32.2481L306.772 20.4799H310.152L300.875 32.0324L310.619 44.2324H306.988Z",
    fill: "themed"
  },
  // T
  {
    d: "M322.089 22.963V44.2324H319.141V22.963H311.231V20.4796H330V22.963H322.089Z",
    fill: "themed"
  }
], "0 0 336 65", 336, 65);

// projects/hviktor/src/logo/logos/logo-sav.ts
var LOGO_SAV = {
  viewBox: "0 0 496 65",
  width: 496,
  height: 65,
  label: "Sjukehusapoteka Vest logo",
  paths: [
    // Accent dots
    {
      d: "M40.2723 9.18294C40.2723 13.403 36.855 16.8201 32.6373 16.8201C28.4195 16.8201 25.0074 13.4048 25.0074 9.18294C25.0074 4.96104 28.4211 1.54761 32.6354 1.54761C36.8497 1.54761 40.2705 4.96475 40.2705 9.18294H40.2723Z",
      fill: "accent"
    },
    {
      d: "M40.2723 32.4818C40.2723 36.6944 36.855 40.1134 32.6373 40.1134C28.4195 40.1134 25.0074 36.6944 25.0074 32.4818C25.0074 28.2691 28.4211 24.8412 32.6373 24.8412C36.8534 24.8412 40.2723 28.2602 40.2723 32.4818Z",
      fill: "accent"
    },
    {
      d: "M63.5945 32.4818C63.5945 36.6944 60.1753 40.1134 55.961 40.1134C51.7467 40.1134 48.3275 36.6944 48.3275 32.4818C48.3275 28.2691 51.7449 24.8412 55.961 24.8412C60.1772 24.8412 63.5945 28.2602 63.5945 32.4818Z",
      fill: "accent"
    },
    {
      d: "M40.2723 55.8208C40.2723 60.0371 36.855 63.4524 32.6373 63.4524C28.4195 63.4524 25.0074 60.0352 25.0074 55.8208C25.0074 51.6063 28.4211 48.1783 32.6373 48.1783C36.8534 48.1783 40.2723 51.6026 40.2723 55.8208Z",
      fill: "accent"
    },
    // Themed dot
    {
      d: "M16.9645 32.4818C16.9645 36.6944 13.549 40.1134 9.33103 40.1134C5.11301 40.1134 1.69751 36.6944 1.69751 32.4818C1.69751 28.2691 5.11672 24.8412 9.33103 24.8412C13.5453 24.8412 16.9645 28.2602 16.9645 32.4818Z",
      fill: "themed"
    },
    // SJUKEHUS
    // S
    {
      d: "M98.6609 24.8668C97.4197 24.1363 96.9086 23.8807 96.142 23.625C95.2293 23.3328 93.7691 23.1137 92.8199 23.1137C90.0819 23.1137 88.2201 24.4651 88.2201 26.5104C88.2201 28.3001 89.2788 29.2128 94.1703 31.806C95.8131 32.6826 97.0908 33.4861 97.967 34.2531C99.1352 35.2393 99.8288 36.8828 99.8288 38.636C99.8288 42.7629 96.7623 45.3561 91.9073 45.3561C90.2645 45.3561 88.7312 45.0639 87.4535 44.5525C86.5408 44.1873 85.9202 43.8221 84.3505 42.7629L85.8837 40.3888C87.2345 41.3019 87.8186 41.6306 88.6582 41.9593C89.7169 42.3611 90.8851 42.5803 92.1263 42.5803C94.9738 42.5803 96.6896 41.2289 96.6896 38.9279C96.6896 38.2339 96.5801 37.6495 96.3245 37.2113C95.9229 36.4808 95.2293 35.7868 94.2802 35.239C93.8786 35.0198 92.5279 34.3259 90.2648 33.0841C86.6507 31.1483 85.1177 29.2491 85.1177 26.7654C85.1177 22.9308 88.2938 20.3741 93.0758 20.3741C94.463 20.3741 95.8864 20.5567 97.1276 20.9585C98.1133 21.2872 98.6974 21.5794 100.048 22.3829L98.6609 24.8662V24.8668Z",
      fill: "themed"
    },
    // J
    {
      d: "M107.131 49.8847C106.255 51.2726 105.707 51.9301 104.174 53.391L102.239 51.7474C103.918 49.8847 104.393 49.2273 104.904 48.278C105.597 46.8901 105.999 44.9543 105.999 42.7997V20.7765H108.992V45.5752C108.408 47.6206 108.08 48.3876 107.13 49.885L107.131 49.8847Z",
      fill: "themed"
    },
    // U
    {
      d: "M132.392 43.3473C130.603 44.8082 128.377 45.5752 125.785 45.5752C123.193 45.5752 120.93 44.8082 119.141 43.3473C117.133 41.7037 116.33 39.7683 116.33 36.6272V20.7765H119.323V35.7141C119.323 38.7091 119.543 39.5491 120.711 40.8274C121.915 42.1788 123.668 42.9093 125.749 42.9093C127.829 42.9093 129.582 42.1788 130.786 40.8274C131.954 39.5491 132.173 38.7091 132.173 35.7141V20.7765H135.167V36.6272C135.167 39.841 134.4 41.7037 132.392 43.3473H132.392Z",
      fill: "themed"
    },
    // K
    {
      d: "M142.505 44.8813V20.7765H145.498V44.8813H142.505ZM155.355 44.8813L145.717 32.7192L155.135 20.7765H158.567L149.148 32.5003L159.041 44.8813H155.355Z",
      fill: "themed"
    },
    // E
    {
      d: "M163.35 44.8813V20.7765H176.893V23.2966H166.343V31.3316H175.068V33.8517H166.343V42.3614H177.221V44.8816L163.35 44.8813Z",
      fill: "themed"
    },
    // H
    {
      d: "M200.22 44.8813V33.8514H186.019V44.8813H183.026V20.7765H186.019V31.1124H200.22V20.7765H203.213V44.8813H200.22Z",
      fill: "themed"
    },
    // U
    {
      d: "M226.614 43.3473C224.825 44.8082 222.598 45.5752 220.006 45.5752C217.415 45.5752 215.151 44.8082 213.363 43.3473C211.355 41.7037 210.552 39.7683 210.552 36.6272V20.7765H213.545V35.7141C213.545 38.7091 213.764 39.5491 214.932 40.8274C216.137 42.1788 217.889 42.9093 219.97 42.9093C222.051 42.9093 223.803 42.1788 225.008 40.8274C226.176 39.5491 226.395 38.7091 226.395 35.7141V20.7765H229.389V36.6272C229.389 39.841 228.622 41.7037 226.614 43.3473Z",
      fill: "themed"
    },
    // S
    {
      d: "M248.883 24.8668C247.641 24.1363 247.13 23.8807 246.364 23.625C245.451 23.3328 243.991 23.1137 243.042 23.1137C240.304 23.1137 238.442 24.4651 238.442 26.5104C238.442 28.3001 239.5 29.2128 244.392 31.806C246.035 32.6826 247.313 33.4861 248.189 34.2531C249.357 35.2393 250.05 36.8828 250.05 38.636C250.05 42.7629 246.984 45.3561 242.129 45.3561C240.486 45.3561 238.953 45.0639 237.675 44.5525C236.763 44.1873 236.142 43.8221 234.572 42.7629L236.105 40.3888C237.456 41.3019 238.04 41.6306 238.88 41.9593C239.939 42.3611 241.107 42.5803 242.348 42.5803C245.195 42.5803 246.911 41.2289 246.911 38.9279C246.911 38.2339 246.802 37.6495 246.546 37.2113C246.145 36.4808 245.451 35.7868 244.502 35.239C244.1 35.0198 242.75 34.3259 240.486 33.0841C236.872 31.1483 235.339 29.2491 235.339 26.7654C235.339 22.9308 238.515 20.3741 243.297 20.3741C244.685 20.3741 246.108 20.5567 247.349 20.9585C248.335 21.2872 248.919 21.5794 250.27 22.3829L248.883 24.8662V24.8668Z",
      fill: "themed"
    },
    // APOTEKA
    // A
    {
      d: "M270.458 44.8813L267.975 37.7594H258.229L255.746 44.8813H252.534L261.514 20.0822H264.726L273.67 44.8813H270.458ZM263.12 23.9903L259.177 35.0201H267.026L263.12 23.9903Z",
      fill: "themed"
    },
    // P
    {
      d: "M284.658 36.0428C283.709 36.0428 283.125 35.9698 280.935 35.7506V44.8813H277.942V20.7765H285.498C288.419 20.7765 290.025 21.2878 291.376 22.6757C292.617 23.9541 293.237 25.6342 293.237 27.8986C293.237 32.9386 289.952 36.0431 284.659 36.0431L284.658 36.0428ZM288.783 24.3193C288.053 23.5888 286.994 23.2966 285.06 23.2966H280.935V33.2308C282.614 33.4134 283.308 33.4499 284.147 33.4499C285.498 33.4499 286.484 33.3038 287.287 32.9751C289.039 32.2447 290.134 30.3454 290.134 28.0809C290.134 26.5104 289.66 25.1956 288.784 24.3193H288.783Z",
      fill: "themed"
    },
    // O
    {
      d: "M308.205 45.3561C301.196 45.3561 296.085 40.0966 296.085 32.8287C296.085 25.5973 301.196 20.3382 308.205 20.3382C315.213 20.3382 320.288 25.5976 320.288 32.8287C320.288 40.0966 315.214 45.3561 308.205 45.3561ZM308.205 22.9676C303.349 22.9676 299.37 27.4235 299.37 32.8287C299.37 38.2708 303.349 42.7264 308.205 42.7264C313.023 42.7264 317.002 38.2705 317.002 32.8287C317.002 27.4235 313.023 22.9676 308.205 22.9676Z",
      fill: "themed"
    },
    // T
    {
      d: "M333.065 23.2963V44.8813H330.072V23.2963H322.041V20.7762H341.096V23.2963H333.065Z",
      fill: "themed"
    },
    // E
    {
      d: "M345.404 44.8813V20.7765H358.947V23.2966H348.397V31.3316H357.122V33.8517H348.397V42.3614H359.276V44.8816L345.404 44.8813Z",
      fill: "themed"
    },
    // K
    {
      d: "M365.08 44.8813V20.7765H368.074V44.8813H365.08ZM377.93 44.8813L368.293 32.7192L377.711 20.7765H381.143L371.724 32.5003L381.617 44.8813H377.93Z",
      fill: "themed"
    },
    // A
    {
      d: "M400.162 44.8813L397.68 37.7594H387.933L385.451 44.8813H382.238L391.219 20.0822H394.431L403.375 44.8813H400.162ZM392.825 23.9903L388.882 35.0201H396.731L392.825 23.9903Z",
      fill: "themed"
    },
    // VEST
    // V
    {
      d: "M425.023 45.5752H421.811L412.867 20.7765H417.905L423.417 37.0655C423.526 37.4307 423.636 37.8325 423.672 38.1977C423.672 37.869 423.709 37.6133 423.891 37.0655L429.148 20.7765H433.967L425.023 45.5752Z",
      fill: "themed"
    },
    // E
    {
      d: "M437.362 44.8813V20.7765H452.037V24.6842H441.962V30.6373H450.212V34.545H441.962V40.9732H452.512V44.881H437.362L437.362 44.8813Z",
      fill: "themed"
    },
    // S
    {
      d: "M470.363 26.5104C467.807 25.3782 465.727 24.7938 464.12 24.7938C461.967 24.7938 460.58 25.6703 460.58 27.0217C460.58 28.0444 461.164 28.6653 462.879 29.5784C466.566 31.5507 468.976 33.0847 470.107 34.2166C471.13 35.2393 471.75 36.8463 471.75 38.5264C471.75 42.8359 468.611 45.3561 463.281 45.3561C462.551 45.3561 461.821 45.3195 461.127 45.21C459.412 44.9908 458.609 44.6986 456.09 43.5299L454.52 42.7994L456.455 38.5626C458.207 39.5122 458.937 39.8775 459.886 40.2427C461.091 40.681 462.405 40.9367 463.354 40.9367C465.471 40.9367 466.859 39.9871 466.859 38.5261C466.859 37.5034 466.311 36.8095 464.741 35.9329L461.018 33.8145C456.746 31.3674 455.432 29.7604 455.432 27.131C455.432 25.9257 455.797 24.6839 456.381 23.7711C456.783 23.1502 457.404 22.5293 458.17 21.9814C459.922 20.7762 461.419 20.3744 464.23 20.3744C465.836 20.3744 467.26 20.557 468.757 20.9953C469.925 21.3605 470.582 21.6162 472.188 22.3832L470.363 26.5104Z",
      fill: "themed"
    },
    // T
    {
      d: "M485.367 24.6842V44.8813H480.767V24.6842H473.539V20.7765H492.595V24.6842H485.367Z",
      fill: "themed"
    }
  ]
};

// projects/hviktor/src/logo/logo-paths.ts
var LOGOS = {
  dots: LOGO_DOTS,
  hvikt: LOGO_HVIKT,
  hve: LOGO_HVE,
  hbe: LOGO_HBE,
  "hbe-hus": LOGO_HBE_HUS,
  hfd: LOGO_HFD,
  hfo: LOGO_HFO,
  hst: LOGO_HST,
  "hst-sus": LOGO_HST_SUS,
  sav: LOGO_SAV
};

// projects/hviktor/src/logo/logo.component.ts
import { Component as Component16, computed as computed2, input as input2 } from "@angular/core";
import * as i036 from "@angular/core";
function HviLogo_For_2_Template(rf, ctx) {
  if (rf & 1) {
    i036.\u0275\u0275namespaceSVG();
    i036.\u0275\u0275domElement(0, "path");
  }
  if (rf & 2) {
    const path_r1 = ctx.$implicit;
    i036.\u0275\u0275attribute("d", path_r1.d)("fill", path_r1.fill === "accent" ? "#6CACE4" : "currentColor");
  }
}
var HviLogo = class _HviLogo {
  /** Which company logo to display */
  company = input2.required(...ngDevMode ? [{ debugName: "company" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Logo size — sm (40px), md (65px, default), lg (82px) height */
  size = input2("md", ...ngDevMode ? [{ debugName: "size" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Override the default accessible label */
  ariaLabel = input2(void 0, ...ngDevMode ? [{ debugName: "ariaLabel" }] : (
    /* istanbul ignore next */
    []
  ));
  logo = computed2(() => LOGOS[this.company()], ...ngDevMode ? [{ debugName: "logo" }] : (
    /* istanbul ignore next */
    []
  ));
  static \u0275fac = function HviLogo_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviLogo)();
  };
  static \u0275cmp = /* @__PURE__ */ i036.\u0275\u0275defineComponent({ type: _HviLogo, selectors: [["hvi-logo"]], hostAttrs: [1, "hvi-logo"], hostVars: 1, hostBindings: function HviLogo_HostBindings(rf, ctx) {
    if (rf & 2) {
      i036.\u0275\u0275attribute("data-size", ctx.size());
    }
  }, inputs: { company: [1, "company"], size: [1, "size"], ariaLabel: [1, "ariaLabel"] }, decls: 3, vars: 2, consts: [["role", "img", "xmlns", "http://www.w3.org/2000/svg"]], template: function HviLogo_Template(rf, ctx) {
    if (rf & 1) {
      i036.\u0275\u0275namespaceSVG();
      i036.\u0275\u0275domElementStart(0, "svg", 0);
      i036.\u0275\u0275repeaterCreate(1, HviLogo_For_2_Template, 1, 2, ":svg:path", null, i036.\u0275\u0275repeaterTrackByIndex);
      i036.\u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      i036.\u0275\u0275attribute("viewBox", ctx.logo().viewBox)("aria-label", ctx.ariaLabel() ?? ctx.logo().label);
      i036.\u0275\u0275advance();
      i036.\u0275\u0275repeater(ctx.logo().paths);
    }
  }, styles: ['\n[_nghost-%COMP%] {\n  display: inline-block;\n  color: #003087;\n}\n[data-color-scheme="dark"][_nghost-%COMP%], [data-color-scheme="dark"]   [_nghost-%COMP%] {\n  color: white;\n}\nsvg[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n  width: auto;\n}\n[data-size="sm"][_nghost-%COMP%] {\n  height: 46px;\n}\n[data-size="md"][_nghost-%COMP%] {\n  height: 52px;\n}\n[data-size="lg"][_nghost-%COMP%] {\n  height: 60px;\n}'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i036.\u0275setClassMetadata(HviLogo, [{
    type: Component16,
    args: [{ selector: "hvi-logo", standalone: true, template: `
    <svg
      [attr.viewBox]="logo().viewBox"
      [attr.aria-label]="ariaLabel() ?? logo().label"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
    >
      @for (path of logo().paths; track $index) {
        <path [attr.d]="path.d" [attr.fill]="path.fill === 'accent' ? '#6CACE4' : 'currentColor'" />
      }
    </svg>
  `, host: {
      class: "hvi-logo",
      "[attr.data-size]": "size()"
    }, styles: ['/* angular:styles/component:css;c35c2f2374ad17ef274f06df39f50def31bea30c5b36ad73e9519e0db7b871b2;C:/Utvikling/git/Hviktor/hviktor-angular/projects/hviktor/src/logo/logo.component.ts */\n:host {\n  display: inline-block;\n  color: #003087;\n}\n:host-context([data-color-scheme="dark"]) {\n  color: white;\n}\nsvg {\n  display: block;\n  height: 100%;\n  width: auto;\n}\n:host([data-size="sm"]) {\n  height: 46px;\n}\n:host([data-size="md"]) {\n  height: 52px;\n}\n:host([data-size="lg"]) {\n  height: 60px;\n}\n'] }]
  }], null, { company: [{ type: i036.Input, args: [{ isSignal: true, alias: "company", required: true }] }], size: [{ type: i036.Input, args: [{ isSignal: true, alias: "size", required: false }] }], ariaLabel: [{ type: i036.Input, args: [{ isSignal: true, alias: "ariaLabel", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i036.\u0275setClassDebugInfo(HviLogo, { className: "HviLogo", filePath: "projects/hviktor/src/logo/logo.component.ts", lineNumber: 70 });
})();

// projects/hviktor/src/pagination/pagination.component.ts
import { booleanAttribute as booleanAttribute5, Component as Component17, computed as computed3, EventEmitter as EventEmitter4, Input as Input23, numberAttribute, Output as Output4, signal as signal2 } from "@angular/core";
import * as i037 from "@angular/core";
function HviPagination_For_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = i037.\u0275\u0275getCurrentView();
    i037.\u0275\u0275domElementStart(0, "li")(1, "button", 2);
    i037.\u0275\u0275domListener("click", function HviPagination_For_6_Conditional_0_Template_button_click_1_listener() {
      i037.\u0275\u0275restoreView(_r1);
      const item_r2 = i037.\u0275\u0275nextContext().$implicit;
      const ctx_r2 = i037.\u0275\u0275nextContext();
      return i037.\u0275\u0275resetView(ctx_r2.goToPage(item_r2.page));
    });
    i037.\u0275\u0275text(2);
    i037.\u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const item_r2 = i037.\u0275\u0275nextContext().$implicit;
    const ctx_r2 = i037.\u0275\u0275nextContext();
    i037.\u0275\u0275advance();
    i037.\u0275\u0275attribute("data-variant", item_r2.page === ctx_r2._currentPage() ? "primary" : "tertiary")("aria-label", "Side " + item_r2.page)("aria-current", item_r2.page === ctx_r2._currentPage() ? "page" : null);
    i037.\u0275\u0275advance();
    i037.\u0275\u0275textInterpolate1(" ", item_r2.page, " ");
  }
}
function HviPagination_For_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    i037.\u0275\u0275domElement(0, "li");
  }
}
function HviPagination_For_6_Template(rf, ctx) {
  if (rf & 1) {
    i037.\u0275\u0275conditionalCreate(0, HviPagination_For_6_Conditional_0_Template, 3, 4, "li")(1, HviPagination_For_6_Conditional_1_Template, 1, 0, "li");
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    i037.\u0275\u0275conditional(item_r2.type === "page" ? 0 : item_r2.type === "ellipsis" ? 1 : -1);
  }
}
var HviPagination = class _HviPagination {
  /** Totalt antall elementer som pagineres */
  set totalItems(value) {
    this._totalItems.set(value);
  }
  /** Antall elementer per side */
  set pageSize(value) {
    this._pageSize.set(value);
  }
  /** Nåværende side (1-indeksert) */
  set currentPage(value) {
    this._currentPage.set(value);
  }
  /** Antall sider som skal vises rundt nåværende side */
  siblingCount = 1;
  /** Vis alltid første og siste side */
  showEdges = true;
  /** Vis "Forrige" og "Neste" tekst på knappene */
  showPreviousNextLabels = true;
  /** Aria-label for hele navigasjonen */
  ariaLabel = "Sidenavigering";
  /** Tekst for forrige-knappen */
  previousLabel = "Forrige";
  /** Tekst for neste-knappen */
  nextLabel = "Neste";
  /** Event som emitteres når siden endres */
  currentPageChange = new EventEmitter4();
  /** Event som emitteres med mer detaljer om sideendring */
  pageChange = new EventEmitter4();
  // Internal signals
  _totalItems = signal2(0, ...ngDevMode ? [{ debugName: "_totalItems" }] : (
    /* istanbul ignore next */
    []
  ));
  _pageSize = signal2(10, ...ngDevMode ? [{ debugName: "_pageSize" }] : (
    /* istanbul ignore next */
    []
  ));
  _currentPage = signal2(1, ...ngDevMode ? [{ debugName: "_currentPage" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Beregnet totalt antall sider */
  totalPages = computed3(() => {
    return Math.max(1, Math.ceil(this._totalItems() / this._pageSize()));
  }, ...ngDevMode ? [{ debugName: "totalPages" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Er vi på første side? */
  isFirstPage = computed3(() => this._currentPage() <= 1, ...ngDevMode ? [{ debugName: "isFirstPage" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Er vi på siste side? */
  isLastPage = computed3(() => this._currentPage() >= this.totalPages(), ...ngDevMode ? [{ debugName: "isLastPage" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Beregner hvilke elementer som skal vises i pagineringen */
  paginationItems = computed3(() => {
    const current = this._currentPage();
    const total = this.totalPages();
    const siblings = this.siblingCount;
    if (total <= 1)
      return [];
    const items = [];
    const leftSibling = Math.max(current - siblings, 1);
    const rightSibling = Math.min(current + siblings, total);
    const showLeftEllipsis = this.showEdges && leftSibling > 2;
    const showRightEllipsis = this.showEdges && rightSibling < total - 1;
    if (this.showEdges && leftSibling > 1) {
      items.push({ type: "page", page: 1 });
      if (showLeftEllipsis) {
        items.push({ type: "ellipsis" });
      }
    }
    for (let page = leftSibling; page <= rightSibling; page++) {
      items.push({ type: "page", page });
    }
    if (this.showEdges && rightSibling < total) {
      if (showRightEllipsis) {
        items.push({ type: "ellipsis" });
      }
      items.push({ type: "page", page: total });
    }
    return items;
  }, ...ngDevMode ? [{ debugName: "paginationItems" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Gå til en spesifikk side */
  goToPage(page) {
    const previousPage = this._currentPage();
    const newPage = Math.max(1, Math.min(page, this.totalPages()));
    if (newPage !== previousPage) {
      this._currentPage.set(newPage);
      this.currentPageChange.emit(newPage);
      this.pageChange.emit({ page: newPage, previousPage });
    }
  }
  /** Gå til forrige side */
  goToPrevious() {
    if (!this.isFirstPage()) {
      this.goToPage(this._currentPage() - 1);
    }
  }
  /** Gå til neste side */
  goToNext() {
    if (!this.isLastPage()) {
      this.goToPage(this._currentPage() + 1);
    }
  }
  /** Gå til første side */
  goToFirst() {
    this.goToPage(1);
  }
  /** Gå til siste side */
  goToLast() {
    this.goToPage(this.totalPages());
  }
  static \u0275fac = function HviPagination_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviPagination)();
  };
  static \u0275cmp = /* @__PURE__ */ i037.\u0275\u0275defineComponent({ type: _HviPagination, selectors: [["hvi-pagination"]], hostAttrs: [1, "hvi-pagination"], inputs: { totalItems: [2, "totalItems", "totalItems", numberAttribute], pageSize: [2, "pageSize", "pageSize", numberAttribute], currentPage: [2, "currentPage", "currentPage", numberAttribute], siblingCount: [2, "siblingCount", "siblingCount", numberAttribute], showEdges: [2, "showEdges", "showEdges", booleanAttribute5], showPreviousNextLabels: [2, "showPreviousNextLabels", "showPreviousNextLabels", booleanAttribute5], ariaLabel: "ariaLabel", previousLabel: "previousLabel", nextLabel: "nextLabel" }, outputs: { currentPageChange: "currentPageChange", pageChange: "pageChange" }, decls: 10, vars: 7, consts: [[1, "ds-pagination"], ["data-variant", "tertiary", "type", "button", 1, "ds-button", 3, "click", "disabled"], ["type", "button", 1, "ds-button", 3, "click"]], template: function HviPagination_Template(rf, ctx) {
    if (rf & 1) {
      i037.\u0275\u0275domElementStart(0, "nav", 0)(1, "ul")(2, "li")(3, "button", 1);
      i037.\u0275\u0275domListener("click", function HviPagination_Template_button_click_3_listener() {
        return ctx.goToPrevious();
      });
      i037.\u0275\u0275text(4);
      i037.\u0275\u0275domElementEnd()();
      i037.\u0275\u0275repeaterCreate(5, HviPagination_For_6_Template, 2, 1, null, null, i037.\u0275\u0275repeaterTrackByIndex);
      i037.\u0275\u0275domElementStart(7, "li")(8, "button", 1);
      i037.\u0275\u0275domListener("click", function HviPagination_Template_button_click_8_listener() {
        return ctx.goToNext();
      });
      i037.\u0275\u0275text(9);
      i037.\u0275\u0275domElementEnd()()()();
    }
    if (rf & 2) {
      i037.\u0275\u0275attribute("aria-label", ctx.ariaLabel);
      i037.\u0275\u0275advance(3);
      i037.\u0275\u0275domProperty("disabled", ctx.isFirstPage());
      i037.\u0275\u0275attribute("aria-label", ctx.previousLabel);
      i037.\u0275\u0275advance();
      i037.\u0275\u0275textInterpolate1(" ", ctx.showPreviousNextLabels ? ctx.previousLabel : "", " ");
      i037.\u0275\u0275advance();
      i037.\u0275\u0275repeater(ctx.paginationItems());
      i037.\u0275\u0275advance(3);
      i037.\u0275\u0275domProperty("disabled", ctx.isLastPage());
      i037.\u0275\u0275attribute("aria-label", ctx.nextLabel);
      i037.\u0275\u0275advance();
      i037.\u0275\u0275textInterpolate1(" ", ctx.showPreviousNextLabels ? ctx.nextLabel : "", " ");
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i037.\u0275setClassMetadata(HviPagination, [{
    type: Component17,
    args: [{
      selector: "hvi-pagination",
      standalone: true,
      template: `
    <nav [attr.aria-label]="ariaLabel" class="ds-pagination">
      <ul>
        <!-- Forrige -->
        <li>
          <button
            class="ds-button"
            data-variant="tertiary"
            type="button"
            [attr.aria-label]="previousLabel"
            [disabled]="isFirstPage()"
            (click)="goToPrevious()"
          >
            {{ showPreviousNextLabels ? previousLabel : '' }}
          </button>
        </li>

        <!-- Sidetall -->
        @for (item of paginationItems(); track $index) {
          @if (item.type === 'page') {
            <li>
              <button
                class="ds-button"
                [attr.data-variant]="item.page === _currentPage() ? 'primary' : 'tertiary'"
                type="button"
                [attr.aria-label]="'Side ' + item.page"
                [attr.aria-current]="item.page === _currentPage() ? 'page' : null"
                (click)="goToPage(item.page)"
              >
                {{ item.page }}
              </button>
            </li>
          } @else if (item.type === 'ellipsis') {
            <li></li>
          }
        }

        <!-- Neste -->
        <li>
          <button
            class="ds-button"
            data-variant="tertiary"
            type="button"
            [attr.aria-label]="nextLabel"
            [disabled]="isLastPage()"
            (click)="goToNext()"
          >
            {{ showPreviousNextLabels ? nextLabel : '' }}
          </button>
        </li>
      </ul>
    </nav>
  `,
      host: {
        class: "hvi-pagination"
      }
    }]
  }], null, { totalItems: [{
    type: Input23,
    args: [{ transform: numberAttribute, required: true }]
  }], pageSize: [{
    type: Input23,
    args: [{ transform: numberAttribute }]
  }], currentPage: [{
    type: Input23,
    args: [{ transform: numberAttribute }]
  }], siblingCount: [{
    type: Input23,
    args: [{ transform: numberAttribute }]
  }], showEdges: [{
    type: Input23,
    args: [{ transform: booleanAttribute5 }]
  }], showPreviousNextLabels: [{
    type: Input23,
    args: [{ transform: booleanAttribute5 }]
  }], ariaLabel: [{
    type: Input23
  }], previousLabel: [{
    type: Input23
  }], nextLabel: [{
    type: Input23
  }], currentPageChange: [{
    type: Output4
  }], pageChange: [{
    type: Output4
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i037.\u0275setClassDebugInfo(HviPagination, { className: "HviPagination", filePath: "projects/hviktor/src/pagination/pagination.component.ts", lineNumber: 101 });
})();

// projects/hviktor/src/paragraph/paragraph.directive.ts
import { Directive as Directive21, Input as Input24 } from "@angular/core";
import * as i038 from "@angular/core";
var HviParagraph = class _HviParagraph {
  /** Adjusts the style for the length of the paragraph */
  variant;
  /** Paragraph is available in several text sizes to suit different needs */
  size;
  static \u0275fac = function HviParagraph_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviParagraph)();
  };
  static \u0275dir = /* @__PURE__ */ i038.\u0275\u0275defineDirective({ type: _HviParagraph, selectors: [["p", "hviParagraph", ""]], hostAttrs: [1, "ds-paragraph"], hostVars: 2, hostBindings: function HviParagraph_HostBindings(rf, ctx) {
    if (rf & 2) {
      i038.\u0275\u0275attribute("data-variant", ctx.variant ?? null)("data-size", ctx.size ?? null);
    }
  }, inputs: { variant: "variant", size: "size" } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i038.\u0275setClassMetadata(HviParagraph, [{
    type: Directive21,
    args: [{
      selector: "p[hviParagraph]",
      standalone: true,
      host: {
        class: "ds-paragraph",
        "[attr.data-variant]": "variant ?? null",
        "[attr.data-size]": "size ?? null"
      }
    }]
  }], null, { variant: [{
    type: Input24
  }], size: [{
    type: Input24
  }] });
})();

// projects/hviktor/src/popover/popover.component.ts
import { Component as Component18, EventEmitter as EventEmitter5, HostListener as HostListener5, Input as Input25, Output as Output5 } from "@angular/core";
import "@digdir/designsystemet-web";
import * as i039 from "@angular/core";
var _c013 = ["*"];
var HviPopover = class _HviPopover {
  /** Popover type - 'auto' lukkes ved klikk utenfor eller Escape, 'manual' krever manuell lukking */
  type = "auto";
  /** Visuell variant */
  variant = "default";
  /** Farge-tema */
  color = "neutral";
  /** Plassering av popover relativt til trigger */
  placement = "top";
  /** Aktiver automatisk repositjonering hvis det ikke er plass */
  autoPlacement = true;
  /** Event når popover åpnes */
  opened = new EventEmitter5();
  /** Event når popover lukkes */
  closed = new EventEmitter5();
  onToggle(event) {
    if (event.newState === "open") {
      this.opened.emit();
    } else {
      this.closed.emit();
    }
  }
  static \u0275fac = function HviPopover_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviPopover)();
  };
  static \u0275cmp = /* @__PURE__ */ i039.\u0275\u0275defineComponent({ type: _HviPopover, selectors: [["hvi-popover"]], hostAttrs: [1, "ds-popover"], hostVars: 5, hostBindings: function HviPopover_HostBindings(rf, ctx) {
    if (rf & 1) {
      i039.\u0275\u0275listener("toggle", function HviPopover_toggle_HostBindingHandler($event) {
        return ctx.onToggle($event);
      });
    }
    if (rf & 2) {
      i039.\u0275\u0275attribute("popover", ctx.type)("data-variant", ctx.variant)("data-color", ctx.color)("data-placement", ctx.placement)("data-autoplacement", ctx.autoPlacement ? "" : null);
    }
  }, inputs: { type: "type", variant: "variant", color: "color", placement: "placement", autoPlacement: "autoPlacement" }, outputs: { opened: "opened", closed: "closed" }, ngContentSelectors: _c013, decls: 1, vars: 0, template: function HviPopover_Template(rf, ctx) {
    if (rf & 1) {
      i039.\u0275\u0275projectionDef();
      i039.\u0275\u0275projection(0);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i039.\u0275setClassMetadata(HviPopover, [{
    type: Component18,
    args: [{
      selector: "hvi-popover",
      standalone: true,
      template: "<ng-content />",
      host: {
        class: "ds-popover",
        "[attr.popover]": "type",
        "[attr.data-variant]": "variant",
        "[attr.data-color]": "color",
        "[attr.data-placement]": "placement",
        "[attr.data-autoplacement]": 'autoPlacement ? "" : null'
      }
    }]
  }], null, { type: [{
    type: Input25
  }], variant: [{
    type: Input25
  }], color: [{
    type: Input25
  }], placement: [{
    type: Input25
  }], autoPlacement: [{
    type: Input25
  }], opened: [{
    type: Output5
  }], closed: [{
    type: Output5
  }], onToggle: [{
    type: HostListener5,
    args: ["toggle", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i039.\u0275setClassDebugInfo(HviPopover, { className: "HviPopover", filePath: "projects/hviktor/src/popover/popover.component.ts", lineNumber: 30 });
})();

// projects/hviktor/src/search/search-clear.directive.ts
import { Directive as Directive22, ElementRef as ElementRef3, HostListener as HostListener6, inject as inject6 } from "@angular/core";
import * as i040 from "@angular/core";
var HviSearchClear = class _HviSearchClear {
  elementRef = inject6(ElementRef3);
  onClick(event) {
    event.preventDefault();
    const searchContainer = this.elementRef.nativeElement.closest(".ds-search");
    if (!searchContainer)
      return;
    const input3 = searchContainer.querySelector("input");
    if (input3) {
      input3.value = "";
      input3.dispatchEvent(new Event("input", { bubbles: true }));
      input3.focus();
    }
  }
  static \u0275fac = function HviSearchClear_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviSearchClear)();
  };
  static \u0275dir = /* @__PURE__ */ i040.\u0275\u0275defineDirective({ type: _HviSearchClear, selectors: [["button", "hviSearchClear", ""]], hostAttrs: ["type", "reset", 1, "ds-button"], hostVars: 2, hostBindings: function HviSearchClear_HostBindings(rf, ctx) {
    if (rf & 1) {
      i040.\u0275\u0275listener("click", function HviSearchClear_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      });
    }
    if (rf & 2) {
      i040.\u0275\u0275attribute("data-icon", "true")("data-variant", "tertiary");
    }
  } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i040.\u0275setClassMetadata(HviSearchClear, [{
    type: Directive22,
    args: [{
      selector: "button[hviSearchClear]",
      standalone: true,
      host: {
        class: "ds-button",
        "[attr.data-icon]": '"true"',
        "[attr.data-variant]": '"tertiary"',
        type: "reset"
      }
    }]
  }], null, { onClick: [{
    type: HostListener6,
    args: ["click", ["$event"]]
  }] });
})();

// projects/hviktor/src/search/search.component.ts
import { Component as Component19 } from "@angular/core";
import * as i041 from "@angular/core";
var _c014 = ["*"];
var HviSearch = class _HviSearch {
  static \u0275fac = function HviSearch_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviSearch)();
  };
  static \u0275cmp = /* @__PURE__ */ i041.\u0275\u0275defineComponent({ type: _HviSearch, selectors: [["hvi-search"]], hostAttrs: [1, "ds-search"], ngContentSelectors: _c014, decls: 1, vars: 0, template: function HviSearch_Template(rf, ctx) {
    if (rf & 1) {
      i041.\u0275\u0275projectionDef();
      i041.\u0275\u0275projection(0);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i041.\u0275setClassMetadata(HviSearch, [{
    type: Component19,
    args: [{
      selector: "hvi-search",
      standalone: true,
      template: "<ng-content />",
      host: {
        class: "ds-search"
      }
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i041.\u0275setClassDebugInfo(HviSearch, { className: "HviSearch", filePath: "projects/hviktor/src/search/search.component.ts", lineNumber: 56 });
})();

// projects/hviktor/src/select/select.directive.ts
import { booleanAttribute as booleanAttribute6, Directive as Directive23, HostListener as HostListener7, Input as Input26 } from "@angular/core";
import * as i042 from "@angular/core";
var HviSelect = class _HviSelect {
  /** Defines the width of Select, where "auto" matches the content width. */
  width;
  _readOnly = false;
  _disabled = false;
  /** Disabled Select. */
  set disabled(value) {
    this._disabled = value;
  }
  get disabled() {
    return this._disabled;
  }
  /** Readonly Select. */
  set readOnly(value) {
    this._readOnly = value;
  }
  get readOnly() {
    return this._readOnly;
  }
  onMouseDown(event) {
    if (this._readOnly) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
  onChange(event) {
    if (this._readOnly) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
  onKeydown(event) {
    if (!this._readOnly)
      return;
    if (event.key === " " || event.key === "Spacebar" || event.key === "Enter") {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
  static \u0275fac = function HviSelect_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviSelect)();
  };
  static \u0275dir = /* @__PURE__ */ i042.\u0275\u0275defineDirective({ type: _HviSelect, selectors: [["select", "hviSelect", ""]], hostAttrs: [1, "ds-select", "ds-input"], hostVars: 3, hostBindings: function HviSelect_HostBindings(rf, ctx) {
    if (rf & 1) {
      i042.\u0275\u0275listener("mousedown", function HviSelect_mousedown_HostBindingHandler($event) {
        return ctx.onMouseDown($event);
      })("change", function HviSelect_change_HostBindingHandler($event) {
        return ctx.onChange($event);
      })("keydown", function HviSelect_keydown_HostBindingHandler($event) {
        return ctx.onKeydown($event);
      });
    }
    if (rf & 2) {
      i042.\u0275\u0275attribute("data-width", ctx.width)("readonly", ctx._readOnly ? "" : null)("disabled", ctx._disabled ? "" : null);
    }
  }, inputs: { width: "width", disabled: [2, "disabled", "disabled", booleanAttribute6], readOnly: [2, "readOnly", "readOnly", booleanAttribute6] } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i042.\u0275setClassMetadata(HviSelect, [{
    type: Directive23,
    args: [{
      selector: "select[hviSelect]",
      standalone: true,
      host: {
        class: "ds-select ds-input",
        "[attr.data-width]": "width",
        "[attr.readonly]": '_readOnly ? "" : null',
        "[attr.disabled]": '_disabled ? "" : null'
      }
    }]
  }], null, { width: [{
    type: Input26
  }], disabled: [{
    type: Input26,
    args: [{ transform: booleanAttribute6 }]
  }], readOnly: [{
    type: Input26,
    args: [{ transform: booleanAttribute6 }]
  }], onMouseDown: [{
    type: HostListener7,
    args: ["mousedown", ["$event"]]
  }], onChange: [{
    type: HostListener7,
    args: ["change", ["$event"]]
  }], onKeydown: [{
    type: HostListener7,
    args: ["keydown", ["$event"]]
  }] });
})();

// projects/hviktor/src/skeleton/skeleton.component.ts
import { Component as Component20, Input as Input27 } from "@angular/core";
import * as i043 from "@angular/core";
var _c015 = ["*"];
var HviSkeleton = class _HviSkeleton {
  variant = "rectangle";
  width;
  height;
  static \u0275fac = function HviSkeleton_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviSkeleton)();
  };
  static \u0275cmp = /* @__PURE__ */ i043.\u0275\u0275defineComponent({ type: _HviSkeleton, selectors: [["hvi-skeleton"]], hostAttrs: [1, "ds-skeleton"], hostVars: 6, hostBindings: function HviSkeleton_HostBindings(rf, ctx) {
    if (rf & 2) {
      i043.\u0275\u0275attribute("aria-hidden", true)("data-variant", ctx.variant);
      i043.\u0275\u0275styleProp("width", ctx.width)("height", ctx.height);
    }
  }, inputs: { variant: "variant", width: "width", height: "height" }, ngContentSelectors: _c015, decls: 1, vars: 0, template: function HviSkeleton_Template(rf, ctx) {
    if (rf & 1) {
      i043.\u0275\u0275projectionDef();
      i043.\u0275\u0275projection(0);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i043.\u0275setClassMetadata(HviSkeleton, [{
    type: Component20,
    args: [{
      selector: "hvi-skeleton",
      standalone: true,
      template: "<ng-content />",
      host: {
        class: "ds-skeleton",
        "[attr.aria-hidden]": "true",
        "[attr.data-variant]": "variant",
        "[style.width]": "width",
        "[style.height]": "height"
      }
    }]
  }], null, { variant: [{
    type: Input27
  }], width: [{
    type: Input27
  }], height: [{
    type: Input27
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i043.\u0275setClassDebugInfo(HviSkeleton, { className: "HviSkeleton", filePath: "projects/hviktor/src/skeleton/skeleton.component.ts", lineNumber: 27 });
})();

// projects/hviktor/src/skip-link/skip-link.directive.ts
import { Directive as Directive24, ElementRef as ElementRef4, HostListener as HostListener8, inject as inject7 } from "@angular/core";
import * as i044 from "@angular/core";
var HviSkipLink = class _HviSkipLink {
  el = inject7(ElementRef4);
  /**
   * Handles click to prevent Angular Router navigation
   * and instead focus/scroll to the target element.
   */
  onClick(event) {
    const href = this.el.nativeElement.getAttribute("href");
    if (!href?.startsWith("#"))
      return;
    event.preventDefault();
    const id = href.slice(1);
    const target = document.getElementById(id);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  static \u0275fac = function HviSkipLink_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviSkipLink)();
  };
  static \u0275dir = /* @__PURE__ */ i044.\u0275\u0275defineDirective({ type: _HviSkipLink, selectors: [["a", "hviSkipLink", ""]], hostAttrs: [1, "ds-skip-link"], hostBindings: function HviSkipLink_HostBindings(rf, ctx) {
    if (rf & 1) {
      i044.\u0275\u0275listener("click", function HviSkipLink_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      });
    }
  } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i044.\u0275setClassMetadata(HviSkipLink, [{
    type: Directive24,
    args: [{
      selector: "a[hviSkipLink]",
      standalone: true,
      host: {
        class: "ds-skip-link"
      }
    }]
  }], null, { onClick: [{
    type: HostListener8,
    args: ["click", ["$event"]]
  }] });
})();

// projects/hviktor/src/spinner/spinner.component.ts
import { Component as Component21, Input as Input28 } from "@angular/core";
import * as i045 from "@angular/core";
var HviSpinner = class _HviSpinner {
  /** Accessible label describing what is loading */
  label;
  /** Size of the spinner */
  size;
  static \u0275fac = function HviSpinner_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviSpinner)();
  };
  static \u0275cmp = /* @__PURE__ */ i045.\u0275\u0275defineComponent({ type: _HviSpinner, selectors: [["hvi-spinner"]], hostAttrs: [2, "display", "contents"], inputs: { label: "label", size: "size" }, decls: 3, vars: 2, consts: [["role", "img", "viewBox", "0 0 50 50", 1, "ds-spinner"], ["cx", "25", "cy", "25", "r", "20", "fill", "none", "stroke-width", "5", 1, "ds-spinner__background"], ["cx", "25", "cy", "25", "r", "20", "fill", "none", "stroke-width", "5", 1, "ds-spinner__circle"]], template: function HviSpinner_Template(rf, ctx) {
    if (rf & 1) {
      i045.\u0275\u0275namespaceSVG();
      i045.\u0275\u0275domElementStart(0, "svg", 0);
      i045.\u0275\u0275domElement(1, "circle", 1)(2, "circle", 2);
      i045.\u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      i045.\u0275\u0275attribute("aria-label", ctx.label)("data-size", ctx.size);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i045.\u0275setClassMetadata(HviSpinner, [{
    type: Component21,
    args: [{
      selector: "hvi-spinner",
      standalone: true,
      template: `
    <svg
      [attr.aria-label]="label"
      class="ds-spinner"
      role="img"
      viewBox="0 0 50 50"
      [attr.data-size]="size"
    >
      <circle class="ds-spinner__background" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
      <circle class="ds-spinner__circle" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
    </svg>
  `,
      host: {
        style: "display: contents;"
      }
    }]
  }], null, { label: [{
    type: Input28,
    args: [{ required: true }]
  }], size: [{
    type: Input28
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i045.\u0275setClassDebugInfo(HviSpinner, { className: "HviSpinner", filePath: "projects/hviktor/src/spinner/spinner.component.ts", lineNumber: 38 });
})();

// projects/hviktor/src/table/table-sort.directive.ts
import { Directive as Directive26, HostListener as HostListener9, inject as inject8, Input as Input30 } from "@angular/core";

// projects/hviktor/src/table/table.directive.ts
import { booleanAttribute as booleanAttribute7, computed as computed4, Directive as Directive25, EventEmitter as EventEmitter6, Input as Input29, numberAttribute as numberAttribute2, Output as Output6, signal as signal3 } from "@angular/core";
import * as i046 from "@angular/core";
var HviTable = class _HviTable {
  /** Gir tabellen zebrastriper (annenhver rad har alternativ bakgrunn) */
  zebra = false;
  /** Gir tabellen en avrundet kant rundt */
  border = false;
  /** Gir tabellen hover-effekt på rader */
  hover = false;
  /** Gjør tabellens header sticky (fester seg til toppen ved scrolling) */
  stickyHeader = false;
  /** Data som skal vises i tabellen */
  set value(data) {
    this._value.set(data ?? []);
  }
  /** Felt som data skal sorteres etter (valgfri initial verdi) */
  set sortField(field) {
    if (field) {
      this._sortField.set(field);
    }
  }
  /** Sorteringsretning: 1 = ascending, -1 = descending, 0 = none */
  set sortOrder(order) {
    this._sortOrder.set(order);
  }
  /** Felt som global søk skal søke i */
  globalFilterFields = [];
  /** Aktiver paginering */
  paginator = false;
  /** Antall rader per side (når paginator er aktivert) */
  set rows(value) {
    this._rows.set(value);
  }
  /** Indeks for første rad som vises (0-basert) */
  set first(value) {
    this._first.set(value);
  }
  /** Event som emitteres når sortering endres */
  sortChange = new EventEmitter6();
  /** Event som emitteres når side endres */
  pageChange = new EventEmitter6();
  /** Event som emitteres med nåværende side (1-basert, for two-way binding) */
  currentPageChange = new EventEmitter6();
  // Internal signals
  _value = signal3([], ...ngDevMode ? [{ debugName: "_value" }] : (
    /* istanbul ignore next */
    []
  ));
  _sortField = signal3(null, ...ngDevMode ? [{ debugName: "_sortField" }] : (
    /* istanbul ignore next */
    []
  ));
  _sortOrder = signal3(0, ...ngDevMode ? [{ debugName: "_sortOrder" }] : (
    /* istanbul ignore next */
    []
  ));
  // 0 = none, 1 = asc, -1 = desc
  _globalFilter = signal3(null, ...ngDevMode ? [{ debugName: "_globalFilter" }] : (
    /* istanbul ignore next */
    []
  ));
  _rows = signal3(10, ...ngDevMode ? [{ debugName: "_rows" }] : (
    /* istanbul ignore next */
    []
  ));
  _first = signal3(0, ...ngDevMode ? [{ debugName: "_first" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Kun sortert data (uten søk) - for bakoverkompatibilitet */
  sortedValue = computed4(() => {
    return this.applySorting(this._value());
  }, ...ngDevMode ? [{ debugName: "sortedValue" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Filtrert og sortert data - bruk denne i template */
  filteredValue = computed4(() => {
    const data = this._value();
    const filtered = this.applyGlobalFilter(data);
    return this.applySorting(filtered);
  }, ...ngDevMode ? [{ debugName: "filteredValue" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Paginert, filtrert og sortert data - bruk denne når paginator er aktivert */
  paginatedValue = computed4(() => {
    const data = this.filteredValue();
    if (!this.paginator)
      return data;
    const first = this._first();
    const rows = this._rows();
    return data.slice(first, first + rows);
  }, ...ngDevMode ? [{ debugName: "paginatedValue" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Antall rader etter søk */
  totalFilteredRecords = computed4(() => this.filteredValue().length, ...ngDevMode ? [{ debugName: "totalFilteredRecords" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Antall rader totalt (før søk) */
  totalRecords = computed4(() => this._value().length, ...ngDevMode ? [{ debugName: "totalRecords" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Totalt antall sider */
  pageCount = computed4(() => {
    if (!this.paginator)
      return 1;
    return Math.max(1, Math.ceil(this.totalFilteredRecords() / this._rows()));
  }, ...ngDevMode ? [{ debugName: "pageCount" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Nåværende side (1-basert) */
  currentPage = computed4(() => {
    return Math.floor(this._first() / this._rows()) + 1;
  }, ...ngDevMode ? [{ debugName: "currentPage" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Er vi på første side? */
  isFirstPage = computed4(() => this._first() === 0, ...ngDevMode ? [{ debugName: "isFirstPage" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Er vi på siste side? */
  isLastPage = computed4(() => {
    return this._first() + this._rows() >= this.totalFilteredRecords();
  }, ...ngDevMode ? [{ debugName: "isLastPage" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Nåværende sorteringsfelt */
  currentSortField = computed4(() => this._sortField(), ...ngDevMode ? [{ debugName: "currentSortField" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Nåværende sorteringsretning som SortDirection */
  currentSortDirection = computed4(() => {
    const order = this._sortOrder();
    if (order === 1)
      return "ascending";
    if (order === -1)
      return "descending";
    return "none";
  }, ...ngDevMode ? [{ debugName: "currentSortDirection" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Nåværende søkeverdi */
  currentGlobalFilter = computed4(() => this._globalFilter(), ...ngDevMode ? [{ debugName: "currentGlobalFilter" }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Global søk - søker på tvers av alle felt i globalFilterFields.
   * @param value Søkeverdi
   */
  filterGlobal(value) {
    this._globalFilter.set(value?.trim() || null);
  }
  /**
   * Nullstiller søk.
   */
  clearFilter() {
    this._globalFilter.set(null);
  }
  /**
   * Nullstiller hele tabellen (sortering og søk).
   */
  clear() {
    this._sortField.set(null);
    this._sortOrder.set(0);
    this._globalFilter.set(null);
    this._first.set(0);
  }
  // ========== Paginering ==========
  /**
   * Gå til en spesifikk side (1-basert).
   */
  goToPage(page) {
    const totalPages = this.pageCount();
    const validPage = Math.max(1, Math.min(page, totalPages));
    const newFirst = (validPage - 1) * this._rows();
    if (newFirst !== this._first()) {
      this._first.set(newFirst);
      this.emitPageEvent();
    }
  }
  /**
   * Gå til første side.
   */
  goToFirstPage() {
    this.goToPage(1);
  }
  /**
   * Gå til siste side.
   */
  goToLastPage() {
    this.goToPage(this.pageCount());
  }
  /**
   * Gå til forrige side.
   */
  goToPreviousPage() {
    if (!this.isFirstPage()) {
      this.goToPage(this.currentPage() - 1);
    }
  }
  /**
   * Gå til neste side.
   */
  goToNextPage() {
    if (!this.isLastPage()) {
      this.goToPage(this.currentPage() + 1);
    }
  }
  /**
   * Endre antall rader per side.
   */
  setRows(rows) {
    this._rows.set(rows);
    this._first.set(0);
    this.emitPageEvent();
  }
  emitPageEvent() {
    this.pageChange.emit({
      first: this._first(),
      rows: this._rows(),
      page: this.currentPage(),
      pageCount: this.pageCount()
    });
    this.currentPageChange.emit(this.currentPage());
  }
  /**
   * Sorterer tabellen etter et felt.
   * Kalles av hviSortableColumn directive.
   */
  sort(field) {
    const currentField = this._sortField();
    const currentOrder = this._sortOrder();
    let newOrder;
    if (currentField === field) {
      if (currentOrder === 1) {
        newOrder = -1;
      } else if (currentOrder === -1) {
        newOrder = 0;
      } else {
        newOrder = 1;
      }
    } else {
      newOrder = 1;
    }
    this._sortField.set(newOrder === 0 ? null : field);
    this._sortOrder.set(newOrder);
    const direction = newOrder === 1 ? "ascending" : newOrder === -1 ? "descending" : "none";
    this.sortChange.emit({ field, direction });
  }
  /**
   * Henter sorteringsretning for et spesifikt felt.
   * Brukes av hviSortableColumn for å vise riktig aria-sort.
   */
  getSortDirection(field) {
    if (this._sortField() !== field) {
      return "none";
    }
    return this.currentSortDirection();
  }
  // ========== Private methods ==========
  applyGlobalFilter(data) {
    const globalFilter = this._globalFilter();
    const globalFields = this.globalFilterFields;
    if (!globalFilter || globalFields.length === 0 || data.length === 0) {
      return data;
    }
    const searchTerm = globalFilter.toLowerCase();
    return data.filter((item) => {
      return globalFields.some((field) => {
        const value = this.getFieldValue(item, field);
        return String(value ?? "").toLowerCase().includes(searchTerm);
      });
    });
  }
  applySorting(data) {
    const field = this._sortField();
    const order = this._sortOrder();
    if (!field || order === 0 || data.length === 0) {
      return data;
    }
    return [...data].sort((a, b) => {
      const valueA = this.getFieldValue(a, field);
      const valueB = this.getFieldValue(b, field);
      let comparison = 0;
      if (valueA == null && valueB == null) {
        comparison = 0;
      } else if (valueA == null) {
        comparison = -1;
      } else if (valueB == null) {
        comparison = 1;
      } else if (typeof valueA === "string" && typeof valueB === "string") {
        comparison = valueA.localeCompare(valueB, "nb");
      } else if (typeof valueA === "number" && typeof valueB === "number") {
        comparison = valueA - valueB;
      } else {
        comparison = String(valueA).localeCompare(String(valueB), "nb");
      }
      return order * comparison;
    });
  }
  /**
   * Henter verdi fra et objekt basert på felt-path (støtter nested: "user.name")
   */
  getFieldValue(obj, field) {
    const keys = field.split(".");
    let value = obj;
    for (const key of keys) {
      if (value == null)
        return null;
      value = value[key];
    }
    return value;
  }
  static \u0275fac = function HviTable_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviTable)();
  };
  static \u0275dir = /* @__PURE__ */ i046.\u0275\u0275defineDirective({ type: _HviTable, selectors: [["", "hviTable", ""]], hostAttrs: [1, "ds-table"], hostVars: 4, hostBindings: function HviTable_HostBindings(rf, ctx) {
    if (rf & 2) {
      i046.\u0275\u0275attribute("data-zebra", ctx.zebra || null)("data-border", ctx.border || null)("data-hover", ctx.hover || null)("data-sticky-header", ctx.stickyHeader || null);
    }
  }, inputs: { zebra: [2, "zebra", "zebra", booleanAttribute7], border: [2, "border", "border", booleanAttribute7], hover: [2, "hover", "hover", booleanAttribute7], stickyHeader: [2, "stickyHeader", "stickyHeader", booleanAttribute7], value: "value", sortField: "sortField", sortOrder: "sortOrder", globalFilterFields: "globalFilterFields", paginator: [2, "paginator", "paginator", booleanAttribute7], rows: [2, "rows", "rows", numberAttribute2], first: [2, "first", "first", numberAttribute2] }, outputs: { sortChange: "sortChange", pageChange: "pageChange", currentPageChange: "currentPageChange" }, exportAs: ["hviTable"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i046.\u0275setClassMetadata(HviTable, [{
    type: Directive25,
    args: [{
      selector: "[hviTable]",
      standalone: true,
      exportAs: "hviTable",
      host: {
        class: "ds-table",
        "[attr.data-zebra]": "zebra || null",
        "[attr.data-border]": "border || null",
        "[attr.data-hover]": "hover || null",
        "[attr.data-sticky-header]": "stickyHeader || null"
      }
    }]
  }], null, { zebra: [{
    type: Input29,
    args: [{ transform: booleanAttribute7 }]
  }], border: [{
    type: Input29,
    args: [{ transform: booleanAttribute7 }]
  }], hover: [{
    type: Input29,
    args: [{ transform: booleanAttribute7 }]
  }], stickyHeader: [{
    type: Input29,
    args: [{ transform: booleanAttribute7 }]
  }], value: [{
    type: Input29
  }], sortField: [{
    type: Input29
  }], sortOrder: [{
    type: Input29
  }], globalFilterFields: [{
    type: Input29
  }], paginator: [{
    type: Input29,
    args: [{ transform: booleanAttribute7 }]
  }], rows: [{
    type: Input29,
    args: [{ transform: numberAttribute2 }]
  }], first: [{
    type: Input29,
    args: [{ transform: numberAttribute2 }]
  }], sortChange: [{
    type: Output6
  }], pageChange: [{
    type: Output6
  }], currentPageChange: [{
    type: Output6
  }] });
})();

// projects/hviktor/src/table/table-sort.directive.ts
import * as i047 from "@angular/core";
var HviSortableColumn = class _HviSortableColumn {
  table = inject8(HviTable, { optional: true });
  /**
   * Feltet som denne kolonnen sorterer etter.
   * Må matche property-navn i data-objektene.
   */
  field;
  /**
   * Henter sorteringsretning fra parent table.
   */
  get sortDirection() {
    return this.table?.getSortDirection(this.field) ?? "none";
  }
  onClick(event) {
    const target = event.target;
    if (target.tagName === "BUTTON" || target.closest("button")) {
      this.table?.sort(this.field);
    }
  }
  static \u0275fac = function HviSortableColumn_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviSortableColumn)();
  };
  static \u0275dir = /* @__PURE__ */ i047.\u0275\u0275defineDirective({ type: _HviSortableColumn, selectors: [["th", "hviSortableColumn", ""]], hostVars: 1, hostBindings: function HviSortableColumn_HostBindings(rf, ctx) {
    if (rf & 1) {
      i047.\u0275\u0275listener("click", function HviSortableColumn_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      });
    }
    if (rf & 2) {
      i047.\u0275\u0275attribute("aria-sort", ctx.sortDirection);
    }
  }, inputs: { field: [0, "hviSortableColumn", "field"] } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i047.\u0275setClassMetadata(HviSortableColumn, [{
    type: Directive26,
    args: [{
      selector: "th[hviSortableColumn]",
      standalone: true,
      host: {
        "[attr.aria-sort]": "sortDirection"
      }
    }]
  }], null, { field: [{
    type: Input30,
    args: [{ required: true, alias: "hviSortableColumn" }]
  }], onClick: [{
    type: HostListener9,
    args: ["click", ["$event"]]
  }] });
})();

// projects/hviktor/src/tabs/tab-panel.component.ts
import { Component as Component22, Input as Input31, ViewChild } from "@angular/core";
import "@u-elements/u-tabs";
import * as i048 from "@angular/core";
var _c016 = ["content"];
var _c12 = ["*"];
function HviTabPanel_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    i048.\u0275\u0275projection(0);
  }
}
var HviTabPanel = class _HviTabPanel {
  templateRef;
  /** When this value is selected, render this TabPanel. Must match the value of a Tab. */
  value;
  static \u0275fac = function HviTabPanel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviTabPanel)();
  };
  static \u0275cmp = /* @__PURE__ */ i048.\u0275\u0275defineComponent({ type: _HviTabPanel, selectors: [["hvi-tab-panel"]], viewQuery: function HviTabPanel_Query(rf, ctx) {
    if (rf & 1) {
      i048.\u0275\u0275viewQuery(_c016, 7);
    }
    if (rf & 2) {
      let _t;
      i048.\u0275\u0275queryRefresh(_t = i048.\u0275\u0275loadQuery()) && (ctx.templateRef = _t.first);
    }
  }, inputs: { value: "value" }, ngContentSelectors: _c12, decls: 2, vars: 0, consts: [["content", ""]], template: function HviTabPanel_Template(rf, ctx) {
    if (rf & 1) {
      i048.\u0275\u0275projectionDef();
      i048.\u0275\u0275domTemplate(0, HviTabPanel_ng_template_0_Template, 1, 0, "ng-template", null, 0, i048.\u0275\u0275templateRefExtractor);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i048.\u0275setClassMetadata(HviTabPanel, [{
    type: Component22,
    args: [{
      selector: "hvi-tab-panel",
      standalone: true,
      template: `
    <ng-template #content>
      <ng-content />
    </ng-template>
  `
    }]
  }], null, { templateRef: [{
    type: ViewChild,
    args: ["content", { static: true }]
  }], value: [{
    type: Input31,
    args: [{ required: true }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i048.\u0275setClassDebugInfo(HviTabPanel, { className: "HviTabPanel", filePath: "projects/hviktor/src/tabs/tab-panel.component.ts", lineNumber: 23 });
})();

// projects/hviktor/src/tabs/tab.component.ts
import { Component as Component23, Input as Input32, ViewChild as ViewChild2 } from "@angular/core";
import "@u-elements/u-tabs";
import * as i049 from "@angular/core";
var _c017 = ["content"];
var _c13 = ["*"];
function HviTab_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    i049.\u0275\u0275projection(0);
  }
}
var HviTab = class _HviTab {
  templateRef;
  /** Unique value that will be set in the Tabs components state when the tab is activated */
  value;
  static \u0275fac = function HviTab_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviTab)();
  };
  static \u0275cmp = /* @__PURE__ */ i049.\u0275\u0275defineComponent({ type: _HviTab, selectors: [["hvi-tab"]], viewQuery: function HviTab_Query(rf, ctx) {
    if (rf & 1) {
      i049.\u0275\u0275viewQuery(_c017, 7);
    }
    if (rf & 2) {
      let _t;
      i049.\u0275\u0275queryRefresh(_t = i049.\u0275\u0275loadQuery()) && (ctx.templateRef = _t.first);
    }
  }, inputs: { value: "value" }, ngContentSelectors: _c13, decls: 2, vars: 0, consts: [["content", ""]], template: function HviTab_Template(rf, ctx) {
    if (rf & 1) {
      i049.\u0275\u0275projectionDef();
      i049.\u0275\u0275domTemplate(0, HviTab_ng_template_0_Template, 1, 0, "ng-template", null, 0, i049.\u0275\u0275templateRefExtractor);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i049.\u0275setClassMetadata(HviTab, [{
    type: Component23,
    args: [{
      selector: "hvi-tab",
      standalone: true,
      template: `
    <ng-template #content>
      <ng-content />
    </ng-template>
  `
    }]
  }], null, { templateRef: [{
    type: ViewChild2,
    args: ["content", { static: true }]
  }], value: [{
    type: Input32,
    args: [{ required: true }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i049.\u0275setClassDebugInfo(HviTab, { className: "HviTab", filePath: "projects/hviktor/src/tabs/tab.component.ts", lineNumber: 21 });
})();

// projects/hviktor/src/tabs/tabs.component.ts
import { NgTemplateOutlet } from "@angular/common";
import { Component as Component24, ContentChildren, CUSTOM_ELEMENTS_SCHEMA as CUSTOM_ELEMENTS_SCHEMA4, EventEmitter as EventEmitter7, Input as Input33, Output as Output7, ViewChild as ViewChild3 } from "@angular/core";
import "@u-elements/u-tabs";
import * as i050 from "@angular/core";
var _c018 = ["uTabsRef"];
var _c14 = ["*"];
var _forTrack02 = ($index, $item) => $item.value;
function HviTabs_For_4_Template(rf, ctx) {
  if (rf & 1) {
    i050.\u0275\u0275elementStart(0, "u-tab");
    i050.\u0275\u0275elementContainer(1, 3);
    i050.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r1 = ctx.$implicit;
    i050.\u0275\u0275attribute("data-value", tab_r1.value);
    i050.\u0275\u0275advance();
    i050.\u0275\u0275property("ngTemplateOutlet", tab_r1.templateRef);
  }
}
function HviTabs_For_6_Template(rf, ctx) {
  if (rf & 1) {
    i050.\u0275\u0275elementStart(0, "u-tabpanel");
    i050.\u0275\u0275elementContainer(1, 3);
    i050.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const panel_r2 = ctx.$implicit;
    i050.\u0275\u0275attribute("data-value", panel_r2.value);
    i050.\u0275\u0275advance();
    i050.\u0275\u0275property("ngTemplateOutlet", panel_r2.templateRef);
  }
}
var HviTabs = class _HviTabs {
  uTabsRef;
  tabs;
  panels;
  /** Controlled state for Tabs component */
  value;
  /** Default selected tab value */
  defaultValue;
  /** Callback when selected tab changes */
  valueChange = new EventEmitter7();
  ngAfterContentInit() {
    setTimeout(() => {
      this.setupTabs();
    });
  }
  setupTabs() {
    const uTabs = this.uTabsRef?.nativeElement;
    if (!uTabs)
      return;
    if (this.defaultValue) {
      const tabsArray = this.tabs.toArray();
      const index = tabsArray.findIndex((t) => t.value === this.defaultValue);
      if (index >= 0) {
        uTabs.selectedIndex = index;
      }
    }
    uTabs.addEventListener("click", (event) => {
      const target = event.target;
      const tab = target.closest("u-tab");
      if (tab) {
        const value = tab.getAttribute("data-value");
        if (value) {
          this.valueChange.emit(value);
        }
      }
    });
  }
  static \u0275fac = function HviTabs_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviTabs)();
  };
  static \u0275cmp = /* @__PURE__ */ i050.\u0275\u0275defineComponent({ type: _HviTabs, selectors: [["hvi-tabs"]], contentQueries: function HviTabs_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      i050.\u0275\u0275contentQuery(dirIndex, HviTab, 4)(dirIndex, HviTabPanel, 4);
    }
    if (rf & 2) {
      let _t;
      i050.\u0275\u0275queryRefresh(_t = i050.\u0275\u0275loadQuery()) && (ctx.tabs = _t);
      i050.\u0275\u0275queryRefresh(_t = i050.\u0275\u0275loadQuery()) && (ctx.panels = _t);
    }
  }, viewQuery: function HviTabs_Query(rf, ctx) {
    if (rf & 1) {
      i050.\u0275\u0275viewQuery(_c018, 5);
    }
    if (rf & 2) {
      let _t;
      i050.\u0275\u0275queryRefresh(_t = i050.\u0275\u0275loadQuery()) && (ctx.uTabsRef = _t.first);
    }
  }, inputs: { value: "value", defaultValue: "defaultValue" }, outputs: { valueChange: "valueChange" }, ngContentSelectors: _c14, decls: 9, vars: 0, consts: [["uTabsRef", ""], [1, "ds-tabs"], [2, "display", "none"], [3, "ngTemplateOutlet"]], template: function HviTabs_Template(rf, ctx) {
    if (rf & 1) {
      i050.\u0275\u0275projectionDef();
      i050.\u0275\u0275elementStart(0, "u-tabs", 1, 0)(2, "u-tablist");
      i050.\u0275\u0275repeaterCreate(3, HviTabs_For_4_Template, 2, 2, "u-tab", null, _forTrack02);
      i050.\u0275\u0275elementEnd();
      i050.\u0275\u0275repeaterCreate(5, HviTabs_For_6_Template, 2, 2, "u-tabpanel", null, _forTrack02);
      i050.\u0275\u0275elementEnd();
      i050.\u0275\u0275elementStart(7, "div", 2);
      i050.\u0275\u0275projection(8);
      i050.\u0275\u0275elementEnd();
    }
    if (rf & 2) {
      i050.\u0275\u0275advance(3);
      i050.\u0275\u0275repeater(ctx.tabs);
      i050.\u0275\u0275advance(2);
      i050.\u0275\u0275repeater(ctx.panels);
    }
  }, dependencies: [NgTemplateOutlet], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i050.\u0275setClassMetadata(HviTabs, [{
    type: Component24,
    args: [{
      selector: "hvi-tabs",
      schemas: [CUSTOM_ELEMENTS_SCHEMA4],
      standalone: true,
      imports: [NgTemplateOutlet],
      template: `
    <u-tabs #uTabsRef class="ds-tabs">
      <u-tablist>
        @for (tab of tabs; track tab.value) {
          <u-tab [attr.data-value]="tab.value">
            <ng-container [ngTemplateOutlet]="tab.templateRef" />
          </u-tab>
        }
      </u-tablist>
      @for (panel of panels; track panel.value) {
        <u-tabpanel [attr.data-value]="panel.value">
          <ng-container [ngTemplateOutlet]="panel.templateRef" />
        </u-tabpanel>
      }
    </u-tabs>
    <!-- Hidden slot to capture content -->
    <div style="display: none">
      <ng-content />
    </div>
  `,
      host: {}
    }]
  }], null, { uTabsRef: [{
    type: ViewChild3,
    args: ["uTabsRef"]
  }], tabs: [{
    type: ContentChildren,
    args: [HviTab]
  }], panels: [{
    type: ContentChildren,
    args: [HviTabPanel]
  }], value: [{
    type: Input33
  }], defaultValue: [{
    type: Input33
  }], valueChange: [{
    type: Output7
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i050.\u0275setClassDebugInfo(HviTabs, { className: "HviTabs", filePath: "projects/hviktor/src/tabs/tabs.component.ts", lineNumber: 61 });
})();

// projects/hviktor/src/textfield/textfield.component.ts
import { booleanAttribute as booleanAttribute8, Component as Component25, forwardRef, inject as inject9, Input as Input34 } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import * as i051 from "@angular/core";
function HviTextfield_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    i051.\u0275\u0275element(0, "hvi-required-tag", 1);
  }
  if (rf & 2) {
    i051.\u0275\u0275property("mode", ctx);
  }
}
function HviTextfield_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    i051.\u0275\u0275elementStart(0, "span", 2);
    i051.\u0275\u0275text(1);
    i051.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i051.\u0275\u0275nextContext();
    i051.\u0275\u0275advance();
    i051.\u0275\u0275textInterpolate(ctx_r0.description);
  }
}
function HviTextfield_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    i051.\u0275\u0275elementStart(0, "hvi-field-affix");
    i051.\u0275\u0275text(1);
    i051.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i051.\u0275\u0275nextContext();
    i051.\u0275\u0275advance();
    i051.\u0275\u0275textInterpolate(ctx_r0.prefix);
  }
}
function HviTextfield_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = i051.\u0275\u0275getCurrentView();
    i051.\u0275\u0275elementStart(0, "textarea", 7);
    i051.\u0275\u0275listener("input", function HviTextfield_Conditional_7_Template_textarea_input_0_listener($event) {
      i051.\u0275\u0275restoreView(_r2);
      const ctx_r0 = i051.\u0275\u0275nextContext();
      return i051.\u0275\u0275resetView(ctx_r0._handleInput($event));
    })("blur", function HviTextfield_Conditional_7_Template_textarea_blur_0_listener() {
      i051.\u0275\u0275restoreView(_r2);
      const ctx_r0 = i051.\u0275\u0275nextContext();
      return i051.\u0275\u0275resetView(ctx_r0._onTouched());
    });
    i051.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i051.\u0275\u0275nextContext();
    i051.\u0275\u0275property("id", ctx_r0.inputId)("disabled", ctx_r0._disabled)("readOnly", ctx_r0._readOnly)("value", ctx_r0._value);
    i051.\u0275\u0275attribute("name", ctx_r0.name ?? null)("rows", ctx_r0.rows ?? null)("placeholder", ctx_r0.placeholder ?? null)("maxlength", ctx_r0.maxLength ?? null)("aria-invalid", ctx_r0.error ? "true" : null)("required", ctx_r0._required ? "" : null)("autocomplete", ctx_r0.autocomplete ?? null);
  }
}
function HviTextfield_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = i051.\u0275\u0275getCurrentView();
    i051.\u0275\u0275elementStart(0, "input", 8);
    i051.\u0275\u0275listener("input", function HviTextfield_Conditional_8_Template_input_input_0_listener($event) {
      i051.\u0275\u0275restoreView(_r3);
      const ctx_r0 = i051.\u0275\u0275nextContext();
      return i051.\u0275\u0275resetView(ctx_r0._handleInput($event));
    })("blur", function HviTextfield_Conditional_8_Template_input_blur_0_listener() {
      i051.\u0275\u0275restoreView(_r3);
      const ctx_r0 = i051.\u0275\u0275nextContext();
      return i051.\u0275\u0275resetView(ctx_r0._onTouched());
    });
    i051.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i051.\u0275\u0275nextContext();
    i051.\u0275\u0275property("id", ctx_r0.inputId)("type", ctx_r0.type)("disabled", ctx_r0._disabled)("readOnly", ctx_r0._readOnly)("value", ctx_r0._value);
    i051.\u0275\u0275attribute("name", ctx_r0.name ?? null)("size", ctx_r0.size ?? null)("placeholder", ctx_r0.placeholder ?? null)("maxlength", ctx_r0.maxLength ?? null)("aria-invalid", ctx_r0.error ? "true" : null)("required", ctx_r0._required ? "" : null)("autocomplete", ctx_r0.autocomplete ?? null);
  }
}
function HviTextfield_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    i051.\u0275\u0275elementStart(0, "hvi-field-affix");
    i051.\u0275\u0275text(1);
    i051.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i051.\u0275\u0275nextContext();
    i051.\u0275\u0275advance();
    i051.\u0275\u0275textInterpolate(ctx_r0.suffix);
  }
}
function HviTextfield_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    i051.\u0275\u0275element(0, "hvi-field-counter", 5);
  }
  if (rf & 2) {
    const ctx_r0 = i051.\u0275\u0275nextContext();
    i051.\u0275\u0275property("limit", ctx_r0.counterLimit);
  }
}
function HviTextfield_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    i051.\u0275\u0275elementStart(0, "span", 6);
    i051.\u0275\u0275text(1);
    i051.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i051.\u0275\u0275nextContext();
    i051.\u0275\u0275advance();
    i051.\u0275\u0275textInterpolate(ctx_r0.error);
  }
}
var nextId = 0;
var HviTextfield = class _HviTextfield {
  /** Label for the textfield */
  label;
  /** Description text below the label */
  description;
  /** Prefix text displayed before the input */
  prefix;
  /** Suffix text displayed after the input */
  suffix;
  /** Error message for the field */
  error;
  /** Character counter limit. Displays a counter below the field. */
  counterLimit;
  /**
   * Manuell overstyring av required-tag-mode.
   * Når satt, vises taggen uavhengig av HviForm-kontekst.
   * - `'required'`: "Må fylles ut" (warning)
   * - `'optional'`: "Valgfritt" (info)
   *
   * Når IKKE satt og feltet er inne i en `<form hviForm>`, bestemmes mode automatisk:
   * - Form er `'all-required'` → ingen tag per felt (vis `all-required` øverst i form)
   * - Form er `'mixed'` → `'required'` hvis feltet er required, `'optional'` hvis ikke
   * - Form er `'none'` → ingen tag
   */
  requiredMode;
  /** Autocomplete attribute for the input, e.g. 'given-name', 'email'. */
  autocomplete;
  /** Injisert HviForm for automatisk required-tag-beregning */
  hviForm = inject9(HviForm, { optional: true });
  /**
   * Beregnet required-tag-mode basert på manuell overstyring eller HviForm-kontekst.
   * Returnerer `null` hvis ingen tag skal vises.
   */
  get effectiveRequiredMode() {
    if (this.requiredMode)
      return this.requiredMode;
    const form = this.hviForm;
    if (!form || !form.showRequiredTags)
      return null;
    const formMode = form.requiredMode();
    switch (formMode) {
      case "all-required":
        return null;
      case "mixed":
        return this._required ? "required" : "optional";
      case "none":
      default:
        return null;
    }
  }
  /** Render a textarea instead of input for multiline support */
  multiline = false;
  /** Supported input types */
  type = "text";
  /** Number of rows for textarea (multiline mode) */
  rows;
  /** Width of input in character count */
  size;
  /** Placeholder text */
  placeholder;
  /** Name attribute for the input */
  name;
  /** Id attribute for the input. Auto-generated if not provided. */
  id;
  /** Max length attribute for the input */
  maxLength;
  /** Initial value for the input */
  set value(v) {
    this._value = v ?? "";
  }
  _value = "";
  _disabled = false;
  _readOnly = false;
  _required = false;
  set required(value) {
    this._required = value;
  }
  set disabled(value) {
    this._disabled = value;
  }
  set readOnly(value) {
    this._readOnly = value;
  }
  _uniqueId = nextId++;
  _onChange = () => {
  };
  _onTouched = () => {
  };
  get inputId() {
    return this.id ?? `hvi-textfield-${this._uniqueId}`;
  }
  _handleInput(event) {
    const target = event.target;
    this._value = target.value;
    this._onChange(this._value);
  }
  // ControlValueAccessor
  writeValue(value) {
    this._value = value ?? "";
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this._disabled = isDisabled;
  }
  static \u0275fac = function HviTextfield_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviTextfield)();
  };
  static \u0275cmp = /* @__PURE__ */ i051.\u0275\u0275defineComponent({ type: _HviTextfield, selectors: [["hvi-textfield"]], inputs: { label: "label", description: "description", prefix: "prefix", suffix: "suffix", error: "error", counterLimit: "counterLimit", requiredMode: "requiredMode", autocomplete: "autocomplete", multiline: [2, "multiline", "multiline", booleanAttribute8], type: "type", rows: "rows", size: "size", placeholder: "placeholder", name: "name", id: "id", maxLength: "maxLength", value: "value", required: [2, "required", "required", booleanAttribute8], disabled: [2, "disabled", "disabled", booleanAttribute8], readOnly: [2, "readOnly", "readOnly", booleanAttribute8] }, features: [i051.\u0275\u0275ProvidersFeature([
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _HviTextfield),
      multi: true
    }
  ])], decls: 12, vars: 9, consts: [["hviLabel", "", "weight", "medium"], [3, "mode"], ["hviFieldDescription", ""], ["hviInput", "", 3, "id", "disabled", "readOnly", "value"], ["hviInput", "", 3, "id", "type", "disabled", "readOnly", "value"], [3, "limit"], ["hviFieldValidation", ""], ["hviInput", "", 3, "input", "blur", "id", "disabled", "readOnly", "value"], ["hviInput", "", 3, "input", "blur", "id", "type", "disabled", "readOnly", "value"]], template: function HviTextfield_Template(rf, ctx) {
    if (rf & 1) {
      i051.\u0275\u0275elementStart(0, "hvi-field")(1, "label", 0);
      i051.\u0275\u0275text(2);
      i051.\u0275\u0275conditionalCreate(3, HviTextfield_Conditional_3_Template, 1, 1, "hvi-required-tag", 1);
      i051.\u0275\u0275elementEnd();
      i051.\u0275\u0275conditionalCreate(4, HviTextfield_Conditional_4_Template, 2, 1, "span", 2);
      i051.\u0275\u0275elementStart(5, "hvi-field-affixes");
      i051.\u0275\u0275conditionalCreate(6, HviTextfield_Conditional_6_Template, 2, 1, "hvi-field-affix");
      i051.\u0275\u0275conditionalCreate(7, HviTextfield_Conditional_7_Template, 1, 11, "textarea", 3)(8, HviTextfield_Conditional_8_Template, 1, 12, "input", 4);
      i051.\u0275\u0275conditionalCreate(9, HviTextfield_Conditional_9_Template, 2, 1, "hvi-field-affix");
      i051.\u0275\u0275elementEnd();
      i051.\u0275\u0275conditionalCreate(10, HviTextfield_Conditional_10_Template, 1, 1, "hvi-field-counter", 5);
      i051.\u0275\u0275conditionalCreate(11, HviTextfield_Conditional_11_Template, 2, 1, "span", 6);
      i051.\u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_2_0;
      i051.\u0275\u0275advance();
      i051.\u0275\u0275attribute("for", ctx.inputId);
      i051.\u0275\u0275advance();
      i051.\u0275\u0275textInterpolate1(" ", ctx.label, " ");
      i051.\u0275\u0275advance();
      i051.\u0275\u0275conditional((tmp_2_0 = ctx.effectiveRequiredMode) ? 3 : -1, tmp_2_0);
      i051.\u0275\u0275advance();
      i051.\u0275\u0275conditional(ctx.description ? 4 : -1);
      i051.\u0275\u0275advance(2);
      i051.\u0275\u0275conditional(ctx.prefix ? 6 : -1);
      i051.\u0275\u0275advance();
      i051.\u0275\u0275conditional(ctx.multiline ? 7 : 8);
      i051.\u0275\u0275advance(2);
      i051.\u0275\u0275conditional(ctx.suffix ? 9 : -1);
      i051.\u0275\u0275advance();
      i051.\u0275\u0275conditional(ctx.counterLimit ? 10 : -1);
      i051.\u0275\u0275advance();
      i051.\u0275\u0275conditional(ctx.error ? 11 : -1);
    }
  }, dependencies: [
    HviField,
    HviLabel,
    HviInput,
    HviFieldAffixes,
    HviFieldAffix,
    HviFieldCounter,
    HviFieldDescription,
    HviFieldValidation,
    HviRequiredTag
  ], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i051.\u0275setClassMetadata(HviTextfield, [{
    type: Component25,
    args: [{ selector: "hvi-textfield", standalone: true, imports: [
      HviField,
      HviLabel,
      HviInput,
      HviFieldAffixes,
      HviFieldAffix,
      HviFieldCounter,
      HviFieldDescription,
      HviFieldValidation,
      HviRequiredTag
    ], providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => HviTextfield),
        multi: true
      }
    ], template: `
    <hvi-field>
      <label hviLabel [attr.for]="inputId" weight="medium">
        {{ label }}
        @if (effectiveRequiredMode; as mode) {
          <hvi-required-tag [mode]="mode" />
        }
      </label>
      @if (description) {
        <span hviFieldDescription>{{ description }}</span>
      }
      <hvi-field-affixes>
        @if (prefix) {
          <hvi-field-affix>{{ prefix }}</hvi-field-affix>
        }
        @if (multiline) {
          <textarea
            hviInput
            [id]="inputId"
            [attr.name]="name ?? null"
            [attr.rows]="rows ?? null"
            [attr.placeholder]="placeholder ?? null"
            [disabled]="_disabled"
            [readOnly]="_readOnly"
            [attr.maxlength]="maxLength ?? null"
            [attr.aria-invalid]="error ? 'true' : null"
            [attr.required]="_required ? '' : null"
            [attr.autocomplete]="autocomplete ?? null"
            [value]="_value"
            (input)="_handleInput($event)"
            (blur)="_onTouched()"
          ></textarea>
        } @else {
          <input
            hviInput
            [id]="inputId"
            [type]="type"
            [attr.name]="name ?? null"
            [attr.size]="size ?? null"
            [attr.placeholder]="placeholder ?? null"
            [disabled]="_disabled"
            [readOnly]="_readOnly"
            [attr.maxlength]="maxLength ?? null"
            [attr.aria-invalid]="error ? 'true' : null"
            [attr.required]="_required ? '' : null"
            [attr.autocomplete]="autocomplete ?? null"
            [value]="_value"
            (input)="_handleInput($event)"
            (blur)="_onTouched()"
          />
        }
        @if (suffix) {
          <hvi-field-affix>{{ suffix }}</hvi-field-affix>
        }
      </hvi-field-affixes>
      @if (counterLimit) {
        <hvi-field-counter [limit]="counterLimit" />
      }
      @if (error) {
        <span hviFieldValidation>{{ error }}</span>
      }
    </hvi-field>
  `, styles: ["/* angular:styles/component:css;c483ff224f1484acb700866912871b7e5c89b6f8fd751c798859cf5ef8b16b4a;C:/Utvikling/git/Hviktor/hviktor-angular/projects/hviktor/src/textfield/textfield.component.ts */\n:host {\n  display: block;\n}\n"] }]
  }], null, { label: [{
    type: Input34
  }], description: [{
    type: Input34
  }], prefix: [{
    type: Input34
  }], suffix: [{
    type: Input34
  }], error: [{
    type: Input34
  }], counterLimit: [{
    type: Input34
  }], requiredMode: [{
    type: Input34
  }], autocomplete: [{
    type: Input34
  }], multiline: [{
    type: Input34,
    args: [{ transform: booleanAttribute8 }]
  }], type: [{
    type: Input34
  }], rows: [{
    type: Input34
  }], size: [{
    type: Input34
  }], placeholder: [{
    type: Input34
  }], name: [{
    type: Input34
  }], id: [{
    type: Input34
  }], maxLength: [{
    type: Input34
  }], value: [{
    type: Input34
  }], required: [{
    type: Input34,
    args: [{ transform: booleanAttribute8 }]
  }], disabled: [{
    type: Input34,
    args: [{ transform: booleanAttribute8 }]
  }], readOnly: [{
    type: Input34,
    args: [{ transform: booleanAttribute8 }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i051.\u0275setClassDebugInfo(HviTextfield, { className: "HviTextfield", filePath: "projects/hviktor/src/textfield/textfield.component.ts", lineNumber: 125 });
})();

// projects/hviktor/src/toggle-group/toggle-group-item.directive.ts
import { booleanAttribute as booleanAttribute9, computed as computed5, Directive as Directive27, ElementRef as ElementRef5, inject as inject10, Input as Input36, signal as signal5 } from "@angular/core";

// projects/hviktor/src/toggle-group/toggle-group.component.ts
import { Component as Component26, ContentChildren as ContentChildren2, EventEmitter as EventEmitter8, forwardRef as forwardRef2, Input as Input35, Output as Output8, signal as signal4 } from "@angular/core";
import { NG_VALUE_ACCESSOR as NG_VALUE_ACCESSOR2 } from "@angular/forms";
import * as i052 from "@angular/core";
var _c019 = ["*"];
var nextGroupId = 0;
var HviToggleGroup = class _HviToggleGroup {
  items;
  registeredItems = [];
  /** The variant of the toggle group */
  _variant = signal4("primary", ...ngDevMode ? [{ debugName: "_variant" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Form element name */
  _name = signal4(`togglegroup-name-${++nextGroupId}`, ...ngDevMode ? [{ debugName: "_name" }] : (
    /* istanbul ignore next */
    []
  ));
  /** The currently selected value */
  _value = signal4(void 0, ...ngDevMode ? [{ debugName: "_value" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Event emitted when value changes */
  valueChange = new EventEmitter8();
  // ControlValueAccessor callbacks
  onChange = () => {
  };
  onTouched = () => {
  };
  set value(val) {
    this._value.set(val);
    this.updateItemStates();
  }
  set variant(val) {
    this._variant.set(val);
  }
  set name(val) {
    if (val)
      this._name.set(val);
  }
  /** Register an item with this group */
  registerItem(item) {
    this.registeredItems.push(item);
    if (this._value() === item.value) {
      item.setSelected(true);
    }
  }
  /** Unregister an item from this group */
  unregisterItem(item) {
    const index = this.registeredItems.indexOf(item);
    if (index > -1) {
      this.registeredItems.splice(index, 1);
    }
  }
  /** Select an item and update all states */
  selectItem(item) {
    this._value.set(item.value);
    this.updateItemStates();
    this.valueChange.emit(item.value);
    this.onChange(item.value);
    this.onTouched();
  }
  /** Handle keyboard navigation (roving tabindex) */
  handleKeydown(event, currentItem) {
    const items = this.registeredItems;
    const currentIndex = items.indexOf(currentItem);
    let nextIndex = null;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (currentIndex + 1) % items.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (currentIndex - 1 + items.length) % items.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = items.length - 1;
        break;
      case " ":
      case "Enter":
        this.selectItem(currentItem);
        event.preventDefault();
        return;
      default:
        return;
    }
    if (nextIndex !== null) {
      event.preventDefault();
      const nextItem = items[nextIndex];
      nextItem.focus();
      this.selectItem(nextItem);
    }
  }
  updateItemStates() {
    const currentValue = this._value();
    for (const item of this.registeredItems) {
      item.setSelected(item.value === currentValue);
    }
  }
  // ControlValueAccessor implementation
  writeValue(value) {
    this._value.set(value);
    this.updateItemStates();
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  static \u0275fac = function HviToggleGroup_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviToggleGroup)();
  };
  static \u0275cmp = /* @__PURE__ */ i052.\u0275\u0275defineComponent({ type: _HviToggleGroup, selectors: [["hvi-toggle-group"]], contentQueries: function HviToggleGroup_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      i052.\u0275\u0275contentQuery(dirIndex, HviToggleGroupItemToken, 4);
    }
    if (rf & 2) {
      let _t;
      i052.\u0275\u0275queryRefresh(_t = i052.\u0275\u0275loadQuery()) && (ctx.items = _t);
    }
  }, hostAttrs: ["role", "radiogroup", 1, "ds-toggle-group"], hostVars: 2, hostBindings: function HviToggleGroup_HostBindings(rf, ctx) {
    if (rf & 2) {
      i052.\u0275\u0275domProperty("tabIndex", 0);
      i052.\u0275\u0275attribute("data-variant", ctx._variant());
    }
  }, inputs: { value: "value", variant: "variant", name: "name" }, outputs: { valueChange: "valueChange" }, features: [i052.\u0275\u0275ProvidersFeature([
    {
      provide: NG_VALUE_ACCESSOR2,
      useExisting: forwardRef2(() => _HviToggleGroup),
      multi: true
    }
  ])], ngContentSelectors: _c019, decls: 1, vars: 0, template: function HviToggleGroup_Template(rf, ctx) {
    if (rf & 1) {
      i052.\u0275\u0275projectionDef();
      i052.\u0275\u0275projection(0);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i052.\u0275setClassMetadata(HviToggleGroup, [{
    type: Component26,
    args: [{
      selector: "hvi-toggle-group",
      standalone: true,
      template: "<ng-content />",
      host: {
        class: "ds-toggle-group",
        role: "radiogroup",
        "[attr.data-variant]": "_variant()",
        "[tabindex]": "0"
      },
      providers: [
        {
          provide: NG_VALUE_ACCESSOR2,
          useExisting: forwardRef2(() => HviToggleGroup),
          multi: true
        }
      ]
    }]
  }], null, { items: [{
    type: ContentChildren2,
    args: [forwardRef2(() => HviToggleGroupItemToken)]
  }], valueChange: [{
    type: Output8
  }], value: [{
    type: Input35
  }], variant: [{
    type: Input35
  }], name: [{
    type: Input35
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i052.\u0275setClassDebugInfo(HviToggleGroup, { className: "HviToggleGroup", filePath: "projects/hviktor/src/toggle-group/toggle-group.component.ts", lineNumber: 59 });
})();
var HviToggleGroupItemToken = /* @__PURE__ */ Symbol("HviToggleGroupItem");

// projects/hviktor/src/toggle-group/toggle-group-item.directive.ts
import * as i053 from "@angular/core";
var nextId2 = 0;
var HviToggleGroupItem = class _HviToggleGroupItem {
  group = inject10(HviToggleGroup);
  elementRef = inject10(ElementRef5);
  /** Unique ID for this item */
  id = `togglegroup-item-${++nextId2}`;
  /** The value of this toggle item */
  value;
  /** Toggle icon-only styling */
  icon = false;
  /** Internal signal for tracking selection state */
  _isSelected = signal5(false, ...ngDevMode ? [{ debugName: "_isSelected" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Whether this item is currently selected */
  isSelected = this._isSelected.asReadonly();
  /** Computed variant based on selection state */
  computedVariant = computed5(() => {
    return this._isSelected() ? this.group._variant() : "tertiary";
  }, ...ngDevMode ? [{ debugName: "computedVariant" }] : (
    /* istanbul ignore next */
    []
  ));
  ngOnInit() {
    this.group.registerItem(this);
  }
  ngOnDestroy() {
    this.group.unregisterItem(this);
  }
  /** Update the selected state (called by parent group) */
  setSelected(selected) {
    this._isSelected.set(selected);
  }
  /** Focus this item's button element */
  focus() {
    this.elementRef.nativeElement.focus();
  }
  onClick() {
    this.group.selectItem(this);
  }
  onKeydown(event) {
    this.group.handleKeydown(event, this);
  }
  static \u0275fac = function HviToggleGroupItem_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviToggleGroupItem)();
  };
  static \u0275dir = /* @__PURE__ */ i053.\u0275\u0275defineDirective({ type: _HviToggleGroupItem, selectors: [["button", "hviToggleGroupItem", ""]], hostAttrs: ["type", "button", "role", "radio", 1, "ds-button"], hostVars: 9, hostBindings: function HviToggleGroupItem_HostBindings(rf, ctx) {
    if (rf & 1) {
      i053.\u0275\u0275listener("click", function HviToggleGroupItem_click_HostBindingHandler() {
        return ctx.onClick();
      })("keydown", function HviToggleGroupItem_keydown_HostBindingHandler($event) {
        return ctx.onKeydown($event);
      });
    }
    if (rf & 2) {
      i053.\u0275\u0275domProperty("id", ctx.id)("tabIndex", ctx.isSelected() ? 0 : -1);
      i053.\u0275\u0275attribute("value", ctx.value)("name", ctx.group._name())("aria-checked", ctx.isSelected())("aria-current", ctx.isSelected())("data-variant", ctx.computedVariant())("data-icon", ctx.icon ? "" : null)("data-roving-tabindex-item", "true");
    }
  }, inputs: { value: "value", icon: [2, "icon", "icon", booleanAttribute9] } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i053.\u0275setClassMetadata(HviToggleGroupItem, [{
    type: Directive27,
    args: [{
      selector: "button[hviToggleGroupItem]",
      standalone: true,
      host: {
        class: "ds-button",
        type: "button",
        role: "radio",
        "[id]": "id",
        "[attr.value]": "value",
        "[attr.name]": "group._name()",
        "[attr.aria-checked]": "isSelected()",
        "[attr.aria-current]": "isSelected()",
        "[attr.data-variant]": "computedVariant()",
        "[attr.data-icon]": 'icon ? "" : null',
        "[attr.data-roving-tabindex-item]": '"true"',
        "[tabindex]": "isSelected() ? 0 : -1",
        "(click)": "onClick()",
        "(keydown)": "onKeydown($event)"
      }
    }]
  }], null, { value: [{
    type: Input36,
    args: [{ required: true }]
  }], icon: [{
    type: Input36,
    args: [{ transform: booleanAttribute9 }]
  }] });
})();

// projects/hviktor/src/tooltip/tooltip.directive.ts
import { Directive as Directive28, Input as Input37 } from "@angular/core";
import "@digdir/designsystemet-web";
import * as i054 from "@angular/core";
var HviTooltip = class _HviTooltip {
  /** Tooltip content */
  hviTooltip = "";
  /** Placement of the tooltip relative to the trigger */
  tooltipPlacement = "top";
  /** Enable auto placement when there's not enough space */
  tooltipAutoPlacement = true;
  static \u0275fac = function HviTooltip_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HviTooltip)();
  };
  static \u0275dir = /* @__PURE__ */ i054.\u0275\u0275defineDirective({ type: _HviTooltip, selectors: [["", "hviTooltip", ""]], hostVars: 3, hostBindings: function HviTooltip_HostBindings(rf, ctx) {
    if (rf & 2) {
      i054.\u0275\u0275attribute("data-tooltip", ctx.hviTooltip)("data-placement", ctx.tooltipPlacement)("data-autoplacement", ctx.tooltipAutoPlacement ? "true" : null);
    }
  }, inputs: { hviTooltip: "hviTooltip", tooltipPlacement: "tooltipPlacement", tooltipAutoPlacement: "tooltipAutoPlacement" } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i054.\u0275setClassMetadata(HviTooltip, [{
    type: Directive28,
    args: [{
      selector: "[hviTooltip]",
      standalone: true,
      host: {
        "[attr.data-tooltip]": "hviTooltip",
        "[attr.data-placement]": "tooltipPlacement",
        "[attr.data-autoplacement]": 'tooltipAutoPlacement ? "true" : null'
      }
    }]
  }], null, { hviTooltip: [{
    type: Input37,
    args: [{ required: true }]
  }], tooltipPlacement: [{
    type: Input37
  }], tooltipAutoPlacement: [{
    type: Input37
  }] });
})();
export {
  HviAlert,
  HviAvatar,
  HviAvatarStack,
  HviBadge,
  HviBadgePosition,
  HviBreadcrumbs,
  HviButton,
  HviCard,
  HviCardBlock,
  HviChipButton,
  HviChipLabel,
  HviControlInvalid,
  HviDetails,
  HviDetailsContent,
  HviDetailsSummary,
  HviDialog,
  HviDialogBlock,
  HviDivider,
  HviDropdown,
  HviErrorSummary,
  HviField,
  HviFieldAffix,
  HviFieldAffixes,
  HviFieldCounter,
  HviFieldDescription,
  HviFieldKit,
  HviFieldOptional,
  HviFieldValidation,
  HviFieldset,
  HviForm,
  HviForms,
  HviHeading,
  HviInput,
  HviLabel,
  HviLink,
  HviList,
  HviLogo,
  HviPagination,
  HviParagraph,
  HviPopover,
  HviRequiredTag,
  HviSearch,
  HviSearchClear,
  HviSelect,
  HviSkeleton,
  HviSkipLink,
  HviSortableColumn,
  HviSpinner,
  HviTab,
  HviTabPanel,
  HviTable,
  HviTabs,
  HviTag,
  HviTextfield,
  HviToggleGroup,
  HviToggleGroupItem,
  HviToggleGroupItemToken,
  HviTooltip,
  HviValidationKit,
  HviValidationMessage,
  LOGOS,
  analyzeFormRequired,
  buildLogo,
  hviCustom,
  hviEmail,
  hviExtractMessages,
  hviExtractValidators,
  hviMax,
  hviMaxLength,
  hviMin,
  hviMinLength,
  hviNullValidator,
  hviPattern,
  hviRequired,
  hviRequiredTrue,
  hviValidators
};
//# sourceMappingURL=chunk-L2SKETEP.js.map
