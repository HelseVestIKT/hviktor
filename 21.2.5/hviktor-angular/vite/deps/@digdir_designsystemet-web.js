import {
  UHTMLTabElement,
  UHTMLTabListElement,
  UHTMLTabPanelElement,
  UHTMLTabsElement
} from "./chunk-PTTF5T72.js";
import {
  __objRest,
  __spreadProps,
  __spreadValues
} from "./chunk-46DXP6YY.js";

// node_modules/@digdir/designsystemet-web/dist/esm/utils/utils.js
var e = { passive: true, capture: true };
var t = () => typeof window < `u` && typeof document < `u`;
var n = () => t() && /^Win/i.test(navigator.userAgentData?.platform || navigator.platform);
var r = typeof HTMLElement > `u` ? class {
} : HTMLElement;
function i(e2, t2) {
  let n3;
  return function(...r5) {
    clearTimeout(n3), n3 = setTimeout(() => e2.apply(this, r5), t2);
  };
}
var a = (e2, ...n3) => !t() || window.dsWarnings === false || console.warn(`Designsystemet: ${e2}`, ...n3);
var o = (e2, t2, n3) => n3 === void 0 ? e2.getAttribute(t2) ?? null : (n3 === null ? e2.removeAttribute(t2) : e2.getAttribute(t2) !== n3 && e2.setAttribute(t2, n3), null);
var s = /^["']|["']$/g;
var c = (e2, t2) => {
  let n3 = o(e2, t2);
  return n3 ||= getComputedStyle(e2).getPropertyValue(`--_ds-${t2}`).replace(s, ``).trim() || null, n3 || a(`Missing ${t2} on:`, e2), n3;
};
var l = (e2, ...t2) => {
  let [n3, ...r5] = t2;
  for (let t3 of n3.split(` `)) e2.addEventListener(t3, ...r5);
  return () => u(e2, ...t2);
};
var u = (e2, ...t2) => {
  let [n3, ...r5] = t2;
  for (let t3 of n3.split(` `)) e2.removeEventListener(t3, ...r5);
};
var d = (e2, n3) => {
  t() && (window._dsHotReloadCleanup || (window._dsHotReloadCleanup = /* @__PURE__ */ new Map()), window._dsHotReloadCleanup?.get(e2)?.map((e3) => e3()), window._dsHotReloadCleanup?.set(e2, n3()));
};
var f = false;
var p = (e2, t2, n3) => {
  let r5 = 0, i5 = () => {
    if (!e2.isConnected) return a6();
    t2(o6), o6.takeRecords(), r5 = 0;
  }, a6 = () => o6?.disconnect?.(), o6 = new MutationObserver(() => {
    !f && !r5 && (r5 = requestAnimationFrame(i5));
  });
  return o6.observe(e2, n3), requestAnimationFrame(i5), a6;
};
var m = (e2, t2) => {
  f = true, e2.textContent = t2, requestAnimationFrame(h);
};
var h = () => {
  f = false;
};
var g = (e2, t2) => {
  let n3 = document.createElement(e2);
  if (t2) for (let [e3, r5] of Object.entries(t2)) o(n3, e3, r5);
  return n3;
};
var _ = { define: (e2, n3) => !t() || window.customElements.get(e2) || window.customElements.define(e2, n3) };
var v = 0;
function y(e2) {
  return t() ? (window.dsUseId || (window.dsUseId = 0), e2 && !e2.id && (e2.id = `:ds:${++window.dsUseId}`), e2?.id || ``) : `:ds:${++v}`;
}
var b;
var x = 0;
var S = 0;
var C = (e2) => {
  clearTimeout(S), b && m(b, `${e2}${x++ % 2 ? ` ` : ``}`), e2 && (S = setTimeout(C, 2e3, ``));
};
var w = () => {
  document.readyState === `complete` && (b || (b = g(`div`, { "aria-live": `assertive` }), b.style.overflow = `hidden`, b.style.position = `fixed`, b.style.whiteSpace = `nowrap`, b.style.width = `1px`), b.isConnected || document.body.appendChild(b));
};
d(`announce`, () => [l(document, `focus mouseover`, w, e)]);

// node_modules/@digdir/designsystemet-web/dist/esm/clickdelegatefor/clickdelegatefor.js
var r2 = `:click-delegate-hover`;
var i2 = `data-clickdelegatefor`;
var a2 = `[${i2}]`;
var o2 = (e2) => {
  let t2 = e2.button === 1 || e2.metaKey || e2.ctrlKey, n3 = e2.isTrusted && e2.button < 2 && l2(e2);
  if (!(!n3 || n3.contains(e2.target))) {
    if (t2 && n3 instanceof HTMLAnchorElement) return window.open(n3.href, void 0, n3.rel);
    e2.stopImmediatePropagation(), n3.click();
  }
};
var s2;
var c2 = (e2) => {
  let t2 = l2(e2);
  s2 !== t2 && (s2 && s2.classList.remove(r2), t2 && t2.classList.add(r2), s2 = t2);
};
var l2 = ({ target: e2 }) => {
  let t2 = (e2 instanceof Element ? e2.closest(a2) : null)?.getAttribute(i2), n3 = t2 && document.getElementById(t2) || void 0, r5 = n3 && e2.closest(`a,button,label,input,select,textarea,details,dialog,[role="button"],[popover],[contenteditable]`);
  return (!r5 || r5 === n3) && !n3?.disabled ? n3 : void 0;
};
d(`clickdelegatefor`, () => [l(window, `click auxclick`, o2, true), l(document, `mouseover`, c2, e)]);

// node_modules/@digdir/designsystemet-web/dist/esm/dialog/dialog.js
var a3 = false;
var o3 = ({ type: e2, target: n3, clientX: r5 = 0, clientY: i5 = 0 }) => {
  if (e2 === `pointerdown`) {
    let e3 = n3?.closest?.(`dialog`)?.getBoundingClientRect();
    a3 = !!(e3 && e3.top <= i5 && i5 <= e3.bottom && e3.left <= r5 && r5 <= e3.right);
  } else {
    let e3 = n3 instanceof HTMLDialogElement && !a3 && o(n3, `closedby`) === `any`;
    a3 = false, e3 && requestAnimationFrame(() => n3.open && n3.close());
  }
};
var s3 = () => {
  for (let e2 of document.querySelectorAll(`button[command="show-modal"]`)) o(e2, `aria-haspopup`, `dialog`);
};
var c3 = ({ command: e2, target: t2 }) => e2 === `--show-non-modal` && t2 instanceof HTMLDialogElement && t2.show();
d(`dialog`, () => [l(document, `command`, c3, e), l(document, `pointerdown pointerup`, o3, e), p(document, s3, { attributeFilter: [`command`], attributes: true, childList: true, subtree: true })]);

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var sides = ["top", "right", "bottom", "left"];
var alignments = ["start", "end"];
var placements = sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v5) => ({
  x: v5,
  y: v5
});
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  const firstChar = placement[0];
  return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
var lrPlacement = ["left", "right"];
var rlPlacement = ["right", "left"];
var tbPlacement = ["top", "bottom"];
var btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case "left":
    case "right":
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  const side = getSide(placement);
  return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
  return __spreadValues({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }, padding);
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x: x4,
    y: y4,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y4,
    left: x4,
    right: x4 + width,
    bottom: y4 + height,
    x: x4,
    y: y4
  };
}

// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x: x4,
    y: y4,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x: x4,
    y: y4,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var MAX_RESET_COUNT = 50;
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const platformWithDetectOverflow = platform2.detectOverflow ? platform2 : __spreadProps(__spreadValues({}, platform2), {
    detectOverflow
  });
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x: x4,
    y: y4
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let resetCount = 0;
  const middlewareData = {};
  for (let i5 = 0; i5 < middleware.length; i5++) {
    const currentMiddleware = middleware[i5];
    if (!currentMiddleware) {
      continue;
    }
    const {
      name,
      fn
    } = currentMiddleware;
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x: x4,
      y: y4,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platformWithDetectOverflow,
      elements: {
        reference,
        floating
      }
    });
    x4 = nextX != null ? nextX : x4;
    y4 = nextY != null ? nextY : y4;
    middlewareData[name] = __spreadValues(__spreadValues({}, middlewareData[name]), data);
    if (reset && resetCount < MAX_RESET_COUNT) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x: x4,
          y: y4
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i5 = -1;
    }
  }
  return {
    x: x4,
    y: y4,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const _a4 = evaluate(options, state), {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true
      } = _a4, detectOverflowOptions = __objRest(_a4, [
        "mainAxis",
        "crossAxis",
        "fallbackPlacements",
        "fallbackStrategy",
        "fallbackAxisSideDirection",
        "flipAlignment"
      ]);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every((d4) => getSideAxis(d4.placement) === initialSideAxis ? d4.overflows[0] > 0 : true)) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d4) => d4.overflows[0] <= 0).sort((a6, b4) => a6.overflows[1] - b4.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d4) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d4.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d4) => [d4.placement, d4.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a6, b4) => a6[1] - b4[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
var originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x: x4,
        y: y4,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x4 + diffCoords.x,
        y: y4 + diffCoords.y,
        data: __spreadProps(__spreadValues({}, diffCoords), {
          placement
        })
      };
    }
  };
};
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x: x4,
        y: y4,
        placement,
        platform: platform2
      } = state;
      const _a4 = evaluate(options, state), {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x5,
              y: y5
            } = _ref;
            return {
              x: x5,
              y: y5
            };
          }
        }
      } = _a4, detectOverflowOptions = __objRest(_a4, [
        "mainAxis",
        "crossAxis",
        "limiter"
      ]);
      const coords = {
        x: x4,
        y: y4
      };
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn(__spreadProps(__spreadValues({}, state), {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      }));
      return __spreadProps(__spreadValues({}, limitedCoords), {
        data: {
          x: limitedCoords.x - x4,
          y: limitedCoords.y - y4,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      });
    }
  };
};
var limitShift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    options,
    fn(state) {
      const {
        x: x4,
        y: y4,
        placement,
        rects,
        middlewareData
      } = state;
      const {
        offset: offset3 = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = evaluate(options, state);
      const coords = {
        x: x4,
        y: y4
      };
      const crossAxis = getSideAxis(placement);
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = evaluate(offset3, state);
      const computedOffset = typeof rawOffset === "number" ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : __spreadValues({
        mainAxis: 0,
        crossAxis: 0
      }, rawOffset);
      if (checkMainAxis) {
        const len = mainAxis === "y" ? "height" : "width";
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2;
        const len = mainAxis === "y" ? "width" : "height";
        const isOriginSide = originSides.has(getSide(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};
var size = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2;
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const _a4 = evaluate(options, state), {
        apply: apply2 = () => {
        }
      } = _a4, detectOverflowOptions = __objRest(_a4, [
        "apply"
      ]);
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply2(__spreadProps(__spreadValues({}, state), {
        availableWidth,
        availableHeight
      }));
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};

// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
  return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
  try {
    if (element.matches(":popover-open")) {
      return true;
    }
  } catch (_e) {
  }
  try {
    return element.matches(":modal");
  } catch (_e) {
    return false;
  }
}
var willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
var containRe = /paint|layout|strict|content/;
var isNotNone = (value) => !!value && value !== "none";
var isWebKitValue;
function isContainingBlock(elementOrCss) {
  const css = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
  return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (isWebKitValue == null) {
    isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
  }
  return isWebKitValue;
}
function isLastTraversableNode(node) {
  return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  } else {
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle2(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x4 = ($ ? round(rect.width) : rect.width) / width;
  let y4 = ($ ? round(rect.height) : rect.height) / height;
  if (!x4 || !Number.isFinite(x4)) {
    x4 = 1;
  }
  if (!y4 || !Number.isFinite(y4)) {
    y4 = 1;
  }
  return {
    x: x4,
    y: y4
  };
}
var noOffsets = createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x4 = (clientRect.left + visualOffsets.x) / scale.x;
  let y4 = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x4 *= iframeScale.x;
      y4 *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x4 += left;
      y4 += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x: x4,
    y: y4
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x4 = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y4 = htmlRect.top + scroll.scrollTop;
  return {
    x: x4,
    y: y4
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x4 = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y4 = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x4 += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x: x4,
    y: y4
  };
}
var SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x4 = 0;
  let y4 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x4 = visualViewport.offsetLeft;
      y4 = visualViewport.offsetTop;
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
      width -= clippingStableScrollbarWidth;
    }
  } else if (windowScrollbarX <= SCROLLBAR_MAX) {
    width += windowScrollbarX;
  }
  return {
    width,
    height,
    x: x4,
    y: y4
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x4 = left * scale.x;
  const y4 = top * scale.y;
  return {
    width,
    height,
    x: x4,
    y: y4
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && (currentContainingBlockComputedStyle.position === "absolute" || currentContainingBlockComputedStyle.position === "fixed") || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
  let top = firstRect.top;
  let right = firstRect.right;
  let bottom = firstRect.bottom;
  let left = firstRect.left;
  for (let i5 = 1; i5 < clippingAncestors.length; i5++) {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i5], strategy);
    top = max(rect.top, top);
    right = min(rect.right, right);
    bottom = min(rect.bottom, bottom);
    left = max(rect.left, left);
  }
  return {
    width: right - left,
    height: bottom - top,
    x: left,
    y: top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x4 = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y4 = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x: x4,
    y: y4,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle2(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function rectsAreEqual(a6, b4) {
  return a6.x === b4.x && a6.y === b4.y && a6.width === b4.width && a6.height === b4.height;
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, __spreadProps(__spreadValues({}, options), {
        // Handle <iframe>s
        root: root.ownerDocument
      }));
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    if (floating) {
      resizeObserver.observe(floating);
    }
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var offset2 = offset;
var shift2 = shift;
var flip2 = flip;
var size2 = size;
var limitShift2 = limitShift;
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = __spreadValues({
    platform
  }, options);
  const platformWithCache = __spreadProps(__spreadValues({}, mergedOptions.platform), {
    _c: cache
  });
  return computePosition(reference, floating, __spreadProps(__spreadValues({}, mergedOptions), {
    platform: platformWithCache
  }));
};

// node_modules/@digdir/designsystemet-web/dist/esm/popover/popover.js
var d2 = `data-placement`;
var f2 = `data-autoplacement`;
var p2 = /* @__PURE__ */ new Map();
function m2(e2) {
  let { newState: n3, oldState: r5, target: m6, source: h5 = e2.detail } = e2, g5 = m6 instanceof HTMLElement && o(m6, `popover`) !== null && _2(m6, `--_ds-floating`);
  if (!g5) return;
  if (n3 === `closed`) return p2.get(m6)?.();
  if (!h5) {
    let e3 = m6.getRootNode(), t2 = `[popovertarget="${m6.id}"],[commandfor="${m6.id}"]`;
    h5 = m6.id && e3?.querySelector?.(t2) || void 0;
  }
  if (!h5 || h5 === m6 || r5 && r5 === n3) return;
  let y4 = _2(m6, `--_ds-floating-overscroll`), b4 = o(m6, d2) || o(h5, d2) || g5, x4 = o(m6, f2) || o(h5, f2), S4 = parseFloat(getComputedStyle(m6, `::before`).height) || 0, C4 = b4.match(/left|right/gi) ? `Height` : `Width`, w4 = h5[`offset${C4}`] / 2 + S4;
  if (b4 === `none`) return;
  let T3 = { strategy: `absolute`, placement: b4, middleware: [offset2(S4 || 0), shift2({ padding: 10, limiter: limitShift2({ offset: { mainAxis: w4 } }) }), v2(), ...x4 === `false` ? [] : [flip2({ padding: 10, crossAxis: false })], ...y4 ? [size2({ apply({ availableHeight: e3 }) {
    y4 === `fit` && (m6.style.width = `${h5.clientWidth}px`), m6.style.maxHeight = `${Math.max(50, e3 - 20)}px`;
  } })] : []] }, E3 = autoUpdate(h5, m6, async () => {
    if (!h5?.isConnected) return p2.get(m6)?.();
    let { x: e3, y: t2 } = await computePosition2(h5, m6, T3);
    m6.style.translate = `${e3}px ${t2}px`;
  });
  p2.set(m6, () => p2.delete(m6) && E3());
}
var h2;
var g2 = ({ type: e2 }) => {
  if (e2 === `mousedown` && (h2 = false), e2 === `scroll` && h2 === false && (h2 = true), e2 === `mouseup` && h2) for (let [e3] of p2) e3.showPopover();
};
d(`popover`, () => [l(document, `mousedown scroll mouseup`, g2, true), l(document, `toggle ds-toggle-source`, m2, e)]);
var _2 = (e2, t2) => getComputedStyle(e2).getPropertyValue(t2).trim();
var v2 = () => ({ name: `arrowPseudo`, fn(e2) {
  let n3 = e2.elements.floating, r5 = e2.rects.reference, i5 = `${Math.round(r5.width / 2 + r5.x - e2.x)}px`, a6 = `${Math.round(r5.height / 2 + r5.y - e2.y)}px`;
  return n3.style.setProperty(`--_ds-floating-arrow-x`, i5), n3.style.setProperty(`--_ds-floating-arrow-y`, a6), o(n3, `data-floating`, e2.placement), e2;
} });

// node_modules/@digdir/designsystemet-web/dist/esm/readonly/readonly.js
var r3 = (t2) => (t2 instanceof HTMLSelectElement || t2 instanceof HTMLInputElement) && (t2.hasAttribute(`readonly`) || o(t2, `aria-readonly`) === `true`);
var i3 = (t2) => {
  if (t2.key !== `Tab` && r3(t2.target) && (t2.preventDefault(), t2.key?.startsWith(`Arrow`) && o(t2.target, `type`) === `radio`)) {
    let e2 = document.querySelectorAll(`input[name="${t2.target.name}"]`), n3 = t2.key?.match(/Arrow(Right|Down)/) ? 1 : -1;
    e2[(e2.length + [...e2].indexOf(t2.target) + n3) % e2.length]?.focus();
  }
};
var a4 = (e2) => {
  let t2 = e2.target?.closest?.(`label`)?.control || e2.target;
  r3(t2) && (e2.preventDefault(), t2.focus());
};
var o4 = (e2) => {
  e2.target instanceof HTMLSelectElement && r3(e2.target) && e2.preventDefault();
};
d(`readonly`, () => [l(document, `keydown`, i3), l(document, `click`, a4), l(document, `mousedown`, o4)]);

// node_modules/@digdir/designsystemet-web/dist/esm/toggle-group/toggle-group.js
var o5 = `data-toggle-group`;
var s4 = `[${o5}]`;
var c4 = i(() => {
  for (let n3 of document.querySelectorAll(s4)) o(n3, `aria-label`, c(n3, o5));
}, 0);
var l3 = (e2) => {
  let t2 = e2.target instanceof HTMLInputElement && e2.target.closest(s4);
  if (t2 && (e2.key === `Enter` && e2.target.click(), e2.key?.startsWith(`Arrow`))) {
    e2.preventDefault?.();
    let n3 = [...t2.getElementsByTagName(`input`)], r5 = n3.indexOf(e2.target), i5 = e2.key.match(/Arrow(Right|Down)/) ? 1 : -1, a6 = r5;
    for (let e3 = 0; e3 < n3.length; e3++) if (a6 = (n3.length + a6 + i5) % n3.length, !n3[a6]?.disabled) {
      n3[a6]?.focus();
      break;
    }
  }
};
d(`toggle-group`, () => [l(document, `keydown`, l3), p(document, c4, { attributeFilter: [o5], attributes: true, childList: true, subtree: true })]);

// node_modules/@digdir/designsystemet-web/dist/esm/tooltip/tooltip.js
var f3;
var p3;
var m3 = 0;
var h3 = 0;
var g3 = t() && /iPad|iPhone|iPod/.test(navigator.userAgent);
var _3 = `data-tooltip`;
var v3 = `data-color`;
var y2 = `aria-label`;
var b2 = `aria-description`;
var x2 = `[${v3}]`;
var S2 = `[${_3}]`;
var C2 = `data-color-scheme`;
var w2 = `[${C2}]`;
var T = (e2) => {
  e2 && !(e2 instanceof HTMLElement) && a(`setTooltipElement expects an HTMLElement, got: `, e2), f3 = e2 || void 0;
};
var E = i(() => {
  for (let e2 of document.querySelectorAll(S2)) {
    let i5 = e2.getAttribute(y2) || e2.getAttribute(b2), a6 = e2.getAttribute(_3) || c(e2, _3);
    if (i5 !== a6) {
      let t2 = o(e2, `role`) !== `img` && e2.textContent?.trim();
      o(e2, _3, a6), o(e2, y2, t2 ? null : a6), o(e2, b2, t2 ? a6 : null), e2.matches(`a,button,input,label,select,textarea,[tabindex]`) || a(`Missing tabindex="0" attribute on: `, e2);
    }
    let o6 = e2 === p3 && f3?.matches(`:popover-open`), s8 = o6 && a6 && f3?.textContent !== a6;
    o6 && s8 && (f3 && m(f3, a6), document.activeElement === e2 && C(a6));
  }
}, 0);
var D = ({ type: e2, target: t2 }) => {
  if (clearTimeout(m3), t2 === f3) return;
  if (e2 === `mouseover` && !p3 && !g3) {
    m3 = setTimeout(D, 300, { target: t2 });
    return;
  }
  let r5 = t2?.closest?.(`[${_3}]`);
  if (r5 === p3) return;
  if (!r5) return O();
  f3 ||= g(`div`, { class: `ds-tooltip` }), f3.isConnected || document.body.appendChild(f3);
  let i5 = r5.closest(x2), a6 = r5.closest(w2), o6 = i5 !== a6 && i5?.contains(a6);
  clearTimeout(h3), o(f3, `popover`, `manual`), o(f3, C2, a6?.getAttribute(C2) || null), o(f3, v3, o6 && i5?.getAttribute(v3) || null), m(f3, o(r5, _3)), f3.showPopover(), f3.dispatchEvent(new CustomEvent(`ds-toggle-source`, { detail: r5 })), p3 = r5;
};
var O = () => f3?.isConnected && f3.popover && f3.hidePopover();
var k = (e2) => {
  if (e2?.type === `keydown`) return e2?.key === `Escape` && O();
  e2 ? e2.target === f3 && e2.newState === `closed` && (h3 = setTimeout(k, 300)) : p3 = void 0;
};
d(`tooltip`, () => [l(document, `blur focus mouseover`, D, e), l(document, `toggle keydown`, k, e), p(document, E, { attributeFilter: [_3], attributes: true, childList: true, subtree: true })]);

// node_modules/@digdir/designsystemet-web/dist/esm/breadcrumbs/breadcrumbs.js
var s5 = `aria-label`;
var c5 = class extends r {
  _items;
  _label = null;
  _render;
  _unresize;
  _unmutate;
  static get observedAttributes() {
    return [s5];
  }
  connectedCallback() {
    this._label = c(this, s5), this._items = this.getElementsByTagName(`a`), this._render = i(() => l4(this), 100), this._unresize = l(window, `resize`, this._render), this._unmutate = p(this, this._render, { childList: true, subtree: true });
  }
  attributeChangedCallback(e2, t2, n3) {
    n3 && (this._label = n3), this._render?.();
  }
  disconnectedCallback() {
    this._unresize?.(), this._unmutate?.(), this._unresize = this._unmutate = this._render = this._items = void 0;
  }
};
var l4 = (e2) => {
  let n3 = e2._items?.[e2._items.length - 1], r5 = n3?.parentElement === e2 ? null : n3, i5 = !r5?.offsetHeight;
  o(e2, `role`, i5 ? null : `navigation`), o(e2, s5, i5 ? null : e2._label);
  for (let n4 of e2._items || []) o(n4, `aria-current`, n4 === r5 ? `page` : null);
};
_.define(`ds-breadcrumbs`, c5);

// node_modules/@digdir/designsystemet-web/dist/esm/error-summary/error-summary.js
var s6 = class extends r {
  connectedCallback() {
    l(this, `animationend`, this, e), requestAnimationFrame(() => this.handleEvent({ target: this }));
  }
  handleEvent({ target: e2 }) {
    if (e2 !== this) return;
    let t2 = this.querySelector(`h2,h3,h4,h5,h6`);
    t2 && o(this, `aria-labelledby`, y(t2)), o(this, `tabindex`, `-1`), this.focus();
  }
  disconnectedCallback() {
    u(this, `animationend`, this, e);
  }
};
_.define(`ds-error-summary`, s6);

// node_modules/@digdir/designsystemet-web/dist/esm/field/field.js
var m4 = `data-indeterminate`;
var h4 = /* @__PURE__ */ new Set();
var g4 = /* @__PURE__ */ new WeakMap();
var _4 = t() ? document.getElementsByTagName(`fieldset`) : [];
var v4 = t() && CSS.supports(`field-sizing`, `content`);
var y3 = n() ? 800 : 200;
var b3 = /* @__PURE__ */ new WeakSet();
var x3 = i(() => {
  for (let e2 of _4) o(e2, `aria-labelledby`, `${y(e2.querySelector(`legend`))} ${y(e2.querySelector(`:scope > :is([data-field="description"],legend + p)`))}`.trim() || null);
  for (let e2 of h4) {
    let t2 = [], n3 = [], i5, a6, o6 = false, s8 = false;
    for (let r5 of e2.getElementsByTagName(`*`)) if (r5 instanceof HTMLLabelElement && n3.push(r5), !r5.hidden) if (T2(r5)) i5 ? a(`Fields should only have one input element. Use <fieldset> to group multiple fields:`, e2) : i5 = r5;
    else {
      let e3 = r5.getAttribute(`data-field`);
      e3 === `counter` && (a6 = r5), e3 === `validation` ? (t2.unshift(r5), o6 = true, s8 ||= w3(r5)) : e3 && t2.push(r5);
    }
    if (!i5) a(`Field is missing input element:`, e2);
    else {
      a6 && g4.set(i5, a6);
      for (let e3 of n3) o(e3, `for`, y(i5));
      let c8 = i5.type === `radio` || i5.type === `checkbox`, l7 = e2.closest(`fieldset`)?.querySelector(`:scope > [data-field="validation"]`);
      l7 && !l7?.hidden && (o6 = true, s8 ||= w3(l7), t2.unshift(l7));
      let u4 = o(i5, m4);
      u4 && (i5.indeterminate = u4 === `true`), o(e2, `data-clickdelegatefor`, c8 ? y(i5) : null), o(i5, `aria-describedby`, t2.map(y).join(` `) || null), (o6 || b3.has(i5)) && (b3[o6 ? `add` : `delete`](i5), o(i5, `aria-invalid`, `${s8}`)), S3(i5);
    }
  }
}, 0);
var S3 = (e2) => {
  let t2 = e2.target || e2, n3 = g4.get(t2);
  if (n3?.isConnected) {
    let a6 = (Number(o(n3, `data-limit`)) || 0) - t2.value.length, o6 = a6 < 0 ? `over` : `under`, s8 = c(n3, `data-${o6}`)?.replace(`%d`, `${Math.abs(a6)}`);
    o(n3, `data-label`, s8), o(n3, `data-state`, o6), o(n3, `data-color`, a6 < 0 ? `danger` : null), e2.type === `input` && s8 && C3(t2, s8);
  }
  !v4 && t2 instanceof HTMLTextAreaElement && (t2.style.setProperty(`--_ds-field-sizing`, `auto`), t2.style.setProperty(`--_ds-field-sizing`, `${t2.scrollHeight}px`));
};
var C3 = i((e2, t2) => {
  document.activeElement === e2 && C(t2);
}, y3);
var w3 = (e2) => e2.getAttribute(`data-color`) !== `success`;
var T2 = (e2) => e2 instanceof HTMLElement && `validity` in e2 && !(e2 instanceof HTMLButtonElement) && e2.type !== `hidden`;
var E2 = class extends r {
  connectedCallback() {
    h4.add(this), x3();
  }
  disconnectedCallback() {
    h4.delete(this);
  }
};
_.define(`ds-field`, E2), d(`field`, () => [l(document, `input`, S3, e), p(document, x3, { attributeFilter: [`data-field`, `data-limit`, `hidden`, `value`, m4], attributes: true, childList: true, subtree: true })]);

// node_modules/@digdir/designsystemet-web/dist/esm/pagination/pagination.js
var s7 = `aria-label`;
var c6 = `data-current`;
var l5 = `data-total`;
var u2 = `data-href`;
var d3 = ({ current: e2 = 1, total: t2 = 10, show: n3 = 7 }) => ({ prev: e2 > 1 ? e2 - 1 : 0, next: e2 < t2 ? e2 + 1 : 0, pages: m5(e2, t2, n3).map((t3, n4) => ({ current: t3 === e2 && `page`, key: `key-${t3}-${n4}`, page: t3 })) });
var f4 = class extends r {
  _unmutate;
  _render;
  static get observedAttributes() {
    return [s7, c6, l5, u2];
  }
  connectedCallback() {
    let e2 = o(this, l5), r5 = o(this, c6);
    r5 && !e2 && a(`Missing ${l5} attribute on:`, this), e2 && !r5 && a(`Missing ${c6} attribute on:`, this), o(this, s7, c(this, s7)), o(this, `role`, `navigation`), this._render = i(() => p4(this), 0), this._unmutate = p(this, this._render, { childList: true, subtree: true });
  }
  attributeChangedCallback() {
    this._render?.();
  }
  disconnectedCallback() {
    this._unmutate?.(), this._unmutate = this._render = void 0;
  }
};
var p4 = (e2) => {
  let n3 = Number(o(e2, c6)), r5 = Number(o(e2, l5));
  if (n3 && r5) {
    let i5 = e2.querySelectorAll(`button,a`), a6 = i5.length - 2, o6 = o(e2, u2), { next: s8, prev: c8, pages: l7 } = d3({ current: n3, total: r5, show: a6 });
    i5.forEach((e3, n4) => {
      let r6 = n4 ? i5[n4 + 1] ? l7[n4 - 1]?.page : s8 : c8;
      o(e3, `aria-current`, l7[n4 - 1]?.current ? `true` : null), o(e3, `aria-label`, `${r6 ?? `hidden`}`), o(e3, `role`, r6 ? null : `none`), o(e3, `tabindex`, r6 ? null : `-1`), e3 instanceof HTMLButtonElement && o(e3, `value`, `${r6}`), o6 && e3 instanceof HTMLAnchorElement && o(e3, `href`, o6.replace(`%d`, `${r6}`));
    });
  }
};
var m5 = (e2, t2, n3 = 1 / 0) => {
  let r5 = (n3 - 1) / 2, i5 = Math.max(Math.min(e2 - Math.floor(r5), t2 - n3 + 1), 1), a6 = Math.min(Math.max(e2 + Math.ceil(r5), n3), t2), o6 = Array.from({ length: a6 + 1 - i5 }, (e3, t3) => t3 + i5);
  return n3 > 4 && i5 > 1 && o6.splice(0, 2, 1, 0), n3 > 3 && a6 < t2 && o6.splice(-2, 2, 0, t2), o6;
};
_.define(`ds-pagination`, f4);

// node_modules/@u-elements/u-combobox/dist/u-combobox.js
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a6, b4) => {
  for (var prop in b4 || (b4 = {}))
    if (__hasOwnProp.call(b4, prop))
      __defNormalProp(a6, prop, b4[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b4)) {
      if (__propIsEnum.call(b4, prop))
        __defNormalProp(a6, prop, b4[prop]);
    }
  return a6;
};
var IS_BROWSER = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.navigator !== "undefined";
var IS_ANDROID = IS_BROWSER && /android/i.test(navigator.userAgent);
var IS_IOS = IS_BROWSER && /iPad|iPhone|iPod/.test(navigator.userAgent);
var _a;
IS_BROWSER && // @ts-expect-error Typescript has not implemented userAgentData yet https://stackoverflow.com/a/71392474
/^Mac/i.test(((_a = navigator.userAgentData) == null ? void 0 : _a.platform) || navigator.platform);
var FOCUS_OUTLINE = "outline: 1px dotted; outline: 5px auto Highlight; outline: 5px auto -webkit-focus-ring-color";
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
  var _a22;
  const isClick = event.key === " " || event.key === "Enter";
  if (isClick) (_a22 = event.preventDefault) == null ? void 0 : _a22.call(event);
  if (isClick && event.target instanceof HTMLElement)
    event.target.dispatchEvent(new MouseEvent("click", event));
  return isClick;
};
var getRoot = (node) => {
  var _a22;
  const root = ((_a22 = node.getRootNode) == null ? void 0 : _a22.call(node)) || node.ownerDocument;
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
  if (attrs) for (const [key, val] of Object.entries(attrs)) attr(el, key, val);
  return el;
};
var customElements = {
  define: (name, instance) => !IS_BROWSER || window.customElements.get(name) || window.customElements.define(name, instance)
};
var getLabel = (el) => {
  var _a22;
  const label = attr(el, "aria-label") || "";
  const labels = ((_a22 = attr(el, "aria-labelledby")) == null ? void 0 : _a22.trim().split(/\s+/)) || [];
  return [
    ...labels.map((id22) => document.getElementById(id22)),
    // Get all labelledby elements
    ...Array.from(el.labels || [])
    // Get all <label> elements
  ].reduce((acc, el2) => {
    var _a32;
    return acc || ((_a32 = el2 == null ? void 0 : el2.innerText) == null ? void 0 : _a32.trim()) || "";
  }, label);
};
var LIVE;
var LIVE_SR_FIX = 0;
var speak = (text2) => {
  if (!LIVE) {
    LIVE = createElement("div");
    LIVE.style.cssText = "position:fixed;overflow:hidden;width:1px;white-space:nowrap";
    attr(LIVE, "aria-live", "assertive");
  }
  if (!LIVE.isConnected) document.body.append(LIVE);
  if (text2) LIVE.textContent = `${text2}${LIVE_SR_FIX++ % 2 ? " " : ""}`;
};
var setValue = (input, data, type = "") => {
  var _a22, _b;
  const event = { bubbles: true, composed: true, data, inputType: type };
  const proto = HTMLInputElement.prototype;
  input.dispatchEvent(new InputEvent("beforeinput", event));
  (_b = (_a22 = Object.getOwnPropertyDescriptor(proto, "value")) == null ? void 0 : _a22.set) == null ? void 0 : _b.call(input, data);
  input.dispatchEvent(new InputEvent("input", event));
  input.dispatchEvent(new Event("change", { bubbles: true }));
};
var IS_PRESS = false;
var isMouseDown = (event) => {
  if ((event == null ? void 0 : event.type) === "mouseup") IS_PRESS = false;
  if ((event == null ? void 0 : event.type) === "mousedown") {
    IS_PRESS = true;
    on(document, "mouseup", isMouseDown, { once: true });
  }
  return IS_PRESS;
};
var declarativeShadowRoot = (style, slot = "<slot></slot>") => `<template shadowrootmode="open">${slot}<style>${style}</style></template>`;
var UHTMLComboboxStyle = `:host(:not([hidden])) { display: block; -webkit-tap-highlight-color: rgba(0, 0, 0, 0) } /* Must be display block in Safari to allow focus inside */
:host(:not([data-multiple])) ::slotted(data),
:host([data-multiple="false"]) ::slotted(data) { display: none } /* Hide data if not multiple */
[role="listbox"] { position: absolute } /* Avoid affecting CSS like flex on the <u-combobox> */
::slotted(input[inputmode="none"]) { outline: none } /* Hide temporary foucs outline flash */
::slotted(del) { text-decoration: none }
::slotted(data:not([hidden])) { display: inline-block; pointer-events: none }
::slotted(data)::after { content: '\\00D7'; content: '\\00D7' / ''; padding-inline: .5ch; pointer-events: auto; cursor: pointer }
::slotted(data:focus) { ${FOCUS_OUTLINE} }`;
var UHTMLComboboxShadowRoot = declarativeShadowRoot(UHTMLComboboxStyle);
var EVENTS = "beforeinput,blur,focus,click,input,keydown,mousedown";
var EVENT_ONCE = { once: true, capture: true, passive: true };
var FALSE = "false";
var IS_MOBILE = IS_ANDROID || IS_IOS;
var MODIFIED = "​".repeat(5);
var VALUE_DELETE = "deleteContentBackward";
var VALUE_INSERT = "insertText";
var WHITE_SPACE = " ";
var TEXTS = {
  added: "Added",
  empty: "No selected",
  found: "Navigate left to find %d selected",
  invalid: "Invalid value",
  items: "Selected",
  // Note: Not announced by NVDA
  of: "of",
  remove: "Press to remove",
  removed: "Removed"
};
var UHTMLComboboxElement = class extends UHTMLElement {
  constructor() {
    super();
    this._item = "";
    this._speak = "";
    this._texts = __spreadValues2({}, TEXTS);
    this._value = "";
    if (!this.shadowRoot)
      this.attachShadow({ mode: "open" }).append(
        createElement("slot", null, {
          "aria-orientation": "horizontal",
          tabindex: "-1",
          role: "listbox",
          // Note: Not announced by JAWS
          name: "items"
        }),
        createElement("slot"),
        // Used to prevent exiting JAWS forms mode when an item is removed, using listbox as this forces JAWS to stay in forms mode without mobile keyboard opening
        createElement("div", '<div role="option" tabindex="-1"></div>', {
          "aria-hidden": "true",
          // Prevent screen readers from announcing this element
          role: "listbox"
        }),
        createElement("style", UHTMLComboboxStyle)
      );
  }
  // Using ES2015 syntax for backwards compatibility
  static get observedAttributes() {
    return Object.keys(TEXTS).map((key) => `data-sr-${key}`);
  }
  connectedCallback() {
    this._root = getRoot(this);
    on(this, EVENTS, this, true);
    mutationObserver(this, {
      attributeFilter: ["value", "id", "role"],
      // Respond to changes in <data> value or change of id or role for <datalist> to reconnect with input
      attributes: true,
      characterData: true,
      // Respond to changes in <data> textContent
      childList: true,
      subtree: true
    });
    setTimeout(render, 0, this);
    setTimeout(syncInputValue, 0, this);
  }
  attributeChangedCallback(prop, _5, val) {
    const text2 = prop.split("data-sr-")[1];
    if (TEXTS[text2]) this._texts[text2] = val || TEXTS[text2];
  }
  disconnectedCallback() {
    mutationObserver(this, false);
    off(this, EVENTS, this, true);
    this._items = this._clear = this._focus = this._control = void 0;
    this._list = this._options = this._root = this._form = void 0;
  }
  handleEvent(event) {
    const target = event.target;
    if (isDisabled(this)) return;
    if (event.type === "beforeinput") this._value = (target == null ? void 0 : target.value) || "";
    if (event.type === "blur") onBlur(this);
    if (event.type === "click") onClick(this, event);
    if (event.type === "focus") onFocus(this, event);
    if (event.type === "input") onInput(this, event);
    if (event.type === "keydown") onKeyDown(this, event);
    if (event.type === "mousedown") isMouseDown(event);
    if (event.type === "mutation") render(this, event);
  }
  get multiple() {
    var _a22;
    return ((_a22 = attr(this, "data-multiple")) != null ? _a22 : FALSE) !== FALSE;
  }
  set multiple(value) {
    attr(this, "data-multiple", value ? "" : null);
  }
  get creatable() {
    var _a22;
    return ((_a22 = attr(this, "data-creatable")) != null ? _a22 : FALSE) !== FALSE;
  }
  set creatable(value) {
    attr(this, "data-creatable", value ? "" : null);
  }
  get control() {
    var _a22;
    if (!((_a22 = this._control) == null ? void 0 : _a22.isConnected))
      this._control = this.querySelector("input");
    return this._control;
  }
  get list() {
    var _a22;
    if (!((_a22 = this._list) == null ? void 0 : _a22.isConnected))
      this._list = this.querySelector('datalist,[role="listbox"]');
    return this._list;
  }
  get clear() {
    var _a22;
    if (!((_a22 = this._clear) == null ? void 0 : _a22.isConnected)) this._clear = this.querySelector("del");
    return this._clear;
  }
  get items() {
    if (!this._items) this._items = this.getElementsByTagName("data");
    return this._items;
  }
  get options() {
    var _a22, _b;
    if (!this._options) {
      const tag = (_b = (_a22 = this.list) == null ? void 0 : _a22.querySelector('[role="option"],option')) == null ? void 0 : _b.nodeName;
      if (tag) this._options = this.getElementsByTagName(tag);
    }
    return this._options;
  }
  get values() {
    return [...this.items].map(({ value }) => value);
  }
};
var text = (el) => {
  var _a22;
  return ((_a22 = el == null ? void 0 : el.textContent) == null ? void 0 : _a22.trim()) || "";
};
var isData = (el) => el instanceof HTMLDataElement;
var isDisabled = ({ control }) => (control == null ? void 0 : control.disabled) || (control == null ? void 0 : control.readOnly) || false;
var render = (self, event) => {
  var _a22, _b;
  const { _focus, _texts, items, control, list, multiple } = self;
  if (!control) return;
  const prev = getLabel(control);
  const next = prev.endsWith(MODIFIED) ? attr(control, "data-label") : prev;
  attr(control, "data-label", next);
  let label = `${next}${multiple ? `, ${items.length ? _texts.found.replace("%d", `${items.length}`) : _texts.empty}` : ""}`;
  const edits = [];
  for (const { addedNodes, removedNodes } of (event == null ? void 0 : event.detail) || []) {
    for (const el of addedNodes) if (isData(el)) edits.unshift(el);
    for (const el of removedNodes) if (isData(el)) edits.push(el);
  }
  const shouldAnnounce = multiple ? edits.length === 1 : edits[0] === _focus;
  if (_focus && shouldAnnounce) {
    const ariaExpanded = attr(control, "aria-expanded");
    const inputMode = attr(control, "inputmode");
    const nextFocus = isData(_focus) ? control : _focus;
    const isRemove = !edits[0].isConnected;
    self._speak = `${_texts[isRemove ? "removed" : "added"]} ${text(edits[0])}, `;
    if (IS_MOBILE || _focus === control) speak(self._speak);
    if (control !== nextFocus) {
      if (IS_MOBILE) attr(control, "aria-expanded", null);
      if (IS_MOBILE) attr(control, "inputmode", "none");
      label = WHITE_SPACE;
      control.focus();
    }
    setTimeout(() => {
      var _a32;
      attr(control, "aria-expanded", ariaExpanded);
      attr(control, "inputmode", isRemove ? "none" : inputMode);
      (_a32 = nextFocus == null ? void 0 : nextFocus.focus) == null ? void 0 : _a32.call(nextFocus);
      attr(control, "inputmode", inputMode);
      self._speak = "";
      if (IS_MOBILE)
        setTimeout(render, 100, self);
      else on(self, "blur", () => render(self), EVENT_ONCE);
    }, 100);
  }
  let idx = 0;
  const select = self.querySelector("select");
  const remove = isDisabled(self) ? "" : _texts.remove;
  const itemsList = (_a22 = self.shadowRoot) == null ? void 0 : _a22.firstElementChild;
  if (itemsList) attr(itemsList, "aria-label", _texts.items);
  for (const item2 of items) {
    const option = select == null ? void 0 : select.options[idx++];
    const label2 = text(item2);
    const value = item2.value || label2;
    const aria = `${self._speak}${label2}, ${remove}`;
    attr(item2, "aria-label", aria);
    attr(item2, "aria-selected", "true");
    attr(item2, "role", "option");
    attr(item2, "slot", "items");
    attr(item2, "tabindex", "-1");
    attr(item2, "value", value);
    if (option) Object.assign(option, { textContent: label2, value });
    else select == null ? void 0 : select.appendChild(new Option(label2, value, true, true));
    if (IS_IOS) attr(item2, "title", `${idx} ${_texts.of} ${items.length}`);
  }
  if (select) attr(select, "multiple", multiple ? "" : null);
  for (const opt of [...(select == null ? void 0 : select.options) || []].slice(idx)) opt.remove();
  if (!multiple && idx > 1)
    console.warn(self, ` Multiple <data> found in single mode.`);
  if (list) {
    attr(list, "aria-multiselectable", `${multiple}`);
    attr(control, "list", useId(list));
    attr(control, "aria-label", `${self._speak}${label}${MODIFIED}`);
    if (list.hasAttribute("popover")) {
      attr(control, "popovertarget", useId(list));
      attr(list, "popover", "manual");
    }
    list._of = _texts.of;
  }
  const item = text(items[0]);
  if (item !== self._item) syncInputValue(self);
  self._item = item;
  syncClearWithInput(self);
  syncOptionsWithItems(self);
  (_b = mutationObserver(self)) == null ? void 0 : _b.takeRecords();
};
var syncClearWithInput = (self) => {
  var _a22;
  if (self.clear) attr(self.clear, "role", "button");
  if (self.clear) self.clear.hidden = !((_a22 = self.control) == null ? void 0 : _a22.value) || isDisabled(self);
};
var syncOptionsWithItems = (self) => {
  var _a22;
  const { _speak, options = [], values } = self;
  for (const opt of options) {
    const value = (_a22 = attr(opt, "value")) != null ? _a22 : text(opt);
    attr(opt, "aria-label", _speak ? `${_speak}${text(opt)}` : null);
    attr(opt, "selected", values.includes(value) ? "" : null);
  }
};
var syncInputValue = (self) => {
  const { multiple, control, items } = self;
  const value = text(items[0]);
  if (!multiple && control && value !== control.value)
    setValue(control, value, value ? VALUE_INSERT : VALUE_DELETE);
};
var dispatchMatch = (self, change = true) => {
  var _a22;
  const { _texts, options = [], creatable, control, items, multiple } = self;
  const value = ((_a22 = control == null ? void 0 : control.value) == null ? void 0 : _a22.trim()) || "";
  const query = value.toLowerCase() || null;
  let match = [...options].find(
    (opt) => (attr(opt, "label") || text(opt)).trim().toLowerCase() === query
  );
  const event = { bubbles: true, cancelable: true, detail: match };
  if (!self.dispatchEvent(new CustomEvent("comboboxbeforematch", event)))
    match = [...options].find((o6) => o6.selected);
  if (change) {
    syncOptionsWithItems(self);
    if (match) return dispatchChange(self, match, false);
    if (creatable && value) return dispatchChange(self, { value }, false);
    if (!multiple && !value && items[0]) dispatchChange(self, items[0]);
    else syncInputValue(self);
    return speak(_texts.invalid);
  }
  for (const opt of options) opt.selected = opt === match;
};
var dispatchChange = (self, item, removable = true) => {
  var _a22, _b, _c;
  const { control, items, multiple } = self;
  const add = createElement("data", item.label || item.value, {
    value: item.value
  });
  const remove = [...items].find((i5) => i5.value === item.value);
  const event = { bubbles: true, cancelable: true, detail: remove || add };
  const skip = remove && !removable;
  if (skip) return syncInputValue(self);
  if (remove === ((_a22 = getRoot(self)) == null ? void 0 : _a22.activeElement))
    (_c = (_b = self.shadowRoot) == null ? void 0 : _b.querySelector('[role="option"]')) == null ? void 0 : _c.focus();
  if (self.dispatchEvent(new CustomEvent("comboboxbeforeselect", event))) {
    if (!multiple) for (const item2 of [...items]) item2.remove();
    if (remove) remove.remove();
    else control == null ? void 0 : control.insertAdjacentElement("beforebegin", add);
    self.dispatchEvent(new CustomEvent("comboboxafterselect", event));
  }
};
var onFocus = (self, { target }) => {
  const { _form, control, multiple } = self;
  if (target instanceof HTMLElement) self._focus = target;
  if (multiple && _form === void 0 && control && target === control) {
    self._form = attr(control, "form");
    attr(control, "form", "#");
  }
  speak();
};
var onBlur = (self) => isMouseDown() || setTimeout(onBlurred, 0, self);
var onBlurred = (self) => {
  const { _focus, _root, _form, multiple, control } = self;
  if (!_focus || self.contains(_root == null ? void 0 : _root.activeElement)) return;
  if (!multiple) dispatchMatch(self);
  if (_form && control) attr(control, "form", _form);
  self._focus = self._form = void 0;
};
var onClick = (self, event) => {
  const { clientX: x4, clientY: y4, target } = event;
  const { clear, control, items } = self;
  if (clear == null ? void 0 : clear.contains(target)) {
    if (control) setValue(control, "", VALUE_DELETE);
    return control == null ? void 0 : control.focus();
  }
  for (const item of items) {
    const { top, right, bottom, left } = item.getBoundingClientRect();
    if (item.contains(target)) return dispatchChange(self, item);
    if (y4 >= top && y4 <= bottom && x4 >= left && x4 <= right) return item.focus();
  }
  if (target === self) control == null ? void 0 : control.focus();
};
var onInput = (self, event) => {
  var _a22;
  const { options = [], control, multiple } = self;
  const value = ((_a22 = control == null ? void 0 : control.value) == null ? void 0 : _a22.trim()) || "";
  const isClick = event instanceof InputEvent ? !event.inputType || event.inputType === "insertReplacementText" : !!value;
  if (isClick) {
    event.stopImmediatePropagation();
    if (control) control.value = self._value;
    for (const opt of options)
      if (opt.value && opt.value === value)
        return dispatchChange(self, opt, multiple);
  } else if (!multiple) dispatchMatch(self, false);
  syncClearWithInput(self);
};
var onKeyDown = (self, event) => {
  var _a22;
  const { clear, control, items } = self;
  const { key, repeat, target } = event;
  const isControl = control && control === target;
  const inText = isControl && control.selectionEnd;
  const isModified = event.ctrlKey || event.metaKey || event.shiftKey || event.key === "Alt";
  let index = isControl ? items.length : [...items].indexOf(target);
  if (isControl && key === "Tab" && !event.shiftKey && clear && !clear.hidden) {
    event.preventDefault();
    clear.tabIndex = 0;
    clear.focus();
    on(clear, "blur", () => attr(clear, "tabindex", null), EVENT_ONCE);
  }
  if (!isControl && asButton(event) || index === -1 || isModified) return;
  if (key === "ArrowRight" && !isControl) index += 1;
  else if (key === "ArrowLeft" && !inText) index -= 1;
  else if (key === "Enter" && isControl) return dispatchMatch(self);
  else if (key === "Backspace" && !inText) {
    event.preventDefault();
    if (!repeat && items[index]) return dispatchChange(self, items[index]);
    if (isControl) index -= 1;
  } else return isControl || (control == null ? void 0 : control.focus());
  event.preventDefault();
  (_a22 = items[Math.max(0, index)] || control) == null ? void 0 : _a22.focus();
};
customElements.define("u-combobox", UHTMLComboboxElement);

// node_modules/@digdir/designsystemet-web/dist/esm/suggestion/suggestion.js
var c7 = class extends UHTMLComboboxElement {
  _unmutate;
  _render;
  connectedCallback() {
    super.connectedCallback(), this._render = () => l6(this), this._unmutate = p(this, this._render, { childList: true }), l(this, `toggle`, u3, e);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unmutate?.(), this._unmutate = this._render = void 0, u(this, `toggle`, u3, e);
  }
};
var l6 = ({ control: e2, list: n3 }) => {
  e2 && !e2.placeholder && o(e2, `placeholder`, ` `), e2 && o(e2, `popovertarget`, y(n3) || null), n3 && o(n3, `popover`, `manual`);
};
var u3 = (e2) => {
  let t2 = e2.currentTarget, n3 = e2.newState === `open` && t2.control;
  n3 && t2.list?.dispatchEvent(new CustomEvent(`ds-toggle-source`, { detail: n3 }));
};
_.define(`ds-suggestion`, c7);

// node_modules/@digdir/designsystemet-web/dist/esm/tabs/tabs.js
var n2 = class extends UHTMLTabsElement {
};
var r4 = class extends UHTMLTabListElement {
};
var i4 = class extends UHTMLTabElement {
};
var a5 = class extends UHTMLTabPanelElement {
};
_.define(`ds-tabs`, n2), _.define(`ds-tablist`, r4), _.define(`ds-tab`, i4), _.define(`ds-tabpanel`, a5);

// node_modules/invokers-polyfill/invoker.js
function isSupported() {
  return typeof HTMLButtonElement !== "undefined" && "command" in HTMLButtonElement.prototype && "source" in ((globalThis.CommandEvent || {}).prototype || {});
}
function apply() {
  document.addEventListener(
    "invoke",
    (e2) => {
      if (e2.type == "invoke" && e2.isTrusted) {
        e2.stopImmediatePropagation();
        e2.preventDefault();
      }
    },
    true
  );
  document.addEventListener(
    "command",
    (e2) => {
      if (e2.type == "command" && e2.isTrusted) {
        e2.stopImmediatePropagation();
        e2.preventDefault();
      }
    },
    true
  );
  function enumerate(obj, key, enumerable = true) {
    Object.defineProperty(obj, key, __spreadProps(__spreadValues({}, Object.getOwnPropertyDescriptor(obj, key)), {
      enumerable
    }));
  }
  function getRootNode(node) {
    if (node && typeof node.getRootNode === "function") {
      return node.getRootNode();
    }
    if (node && node.parentNode) return getRootNode(node.parentNode);
    return node;
  }
  const commandEventSourceElements = /* @__PURE__ */ new WeakMap();
  const commandEventActions = /* @__PURE__ */ new WeakMap();
  class CommandEvent extends Event {
    constructor(type, invokeEventInit = {}) {
      super(type, invokeEventInit);
      const { source, command } = invokeEventInit;
      if (source != null && !(source instanceof Element)) {
        throw new TypeError(`source must be an element`);
      }
      commandEventSourceElements.set(this, source || null);
      commandEventActions.set(
        this,
        command !== void 0 ? String(command) : ""
      );
    }
    get [Symbol.toStringTag]() {
      return "CommandEvent";
    }
    get source() {
      if (!commandEventSourceElements.has(this)) {
        throw new TypeError("illegal invocation");
      }
      const source = commandEventSourceElements.get(this);
      if (!(source instanceof Element)) return null;
      const invokerRoot = getRootNode(source);
      if (invokerRoot !== getRootNode(this.target || document)) {
        return invokerRoot.host;
      }
      return source;
    }
    get command() {
      if (!commandEventActions.has(this)) {
        throw new TypeError("illegal invocation");
      }
      return commandEventActions.get(this);
    }
    get action() {
      throw new Error(
        "CommandEvent#action was renamed to CommandEvent#command"
      );
    }
    get invoker() {
      throw new Error(
        "CommandEvent#invoker was renamed to CommandEvent#source"
      );
    }
  }
  enumerate(CommandEvent.prototype, "source");
  enumerate(CommandEvent.prototype, "command");
  class InvokeEvent extends Event {
    constructor(type, invokeEventInit = {}) {
      super(type, invokeEventInit);
      throw new Error(
        "InvokeEvent has been deprecated, it has been renamed to `CommandEvent`"
      );
    }
  }
  const invokerAssociatedElements = /* @__PURE__ */ new WeakMap();
  function applyInvokerMixin(ElementClass) {
    Object.defineProperties(ElementClass.prototype, {
      commandForElement: {
        enumerable: true,
        configurable: true,
        set(targetElement) {
          if (this.hasAttribute("invokeaction")) {
            throw new TypeError(
              "Element has deprecated `invokeaction` attribute, replace with `command`"
            );
          } else if (this.hasAttribute("invoketarget")) {
            throw new TypeError(
              "Element has deprecated `invoketarget` attribute, replace with `commandfor`"
            );
          } else if (targetElement === null) {
            this.removeAttribute("commandfor");
            invokerAssociatedElements.delete(this);
          } else if (!(targetElement instanceof Element)) {
            throw new TypeError(`commandForElement must be an element or null`);
          } else {
            this.setAttribute("commandfor", "");
            const targetRootNode = getRootNode(targetElement);
            const thisRootNode = getRootNode(this);
            if (thisRootNode === targetRootNode || targetRootNode === this.ownerDocument) {
              invokerAssociatedElements.set(this, targetElement);
            } else {
              invokerAssociatedElements.delete(this);
            }
          }
        },
        get() {
          if (this.localName !== "button") {
            return null;
          }
          if (this.hasAttribute("invokeaction") || this.hasAttribute("invoketarget")) {
            console.warn(
              "Element has deprecated `invoketarget` or `invokeaction` attribute, use `commandfor` and `command` instead"
            );
            return null;
          }
          if (this.disabled) {
            return null;
          }
          if (this.form && this.getAttribute("type") !== "button") {
            console.warn(
              "Element with `commandFor` is a form participant. It should explicitly set `type=button` in order for `commandFor` to work"
            );
            return null;
          }
          const targetElement = invokerAssociatedElements.get(this);
          if (targetElement) {
            if (targetElement.isConnected) {
              return targetElement;
            } else {
              invokerAssociatedElements.delete(this);
              return null;
            }
          }
          const root = getRootNode(this);
          const idref = this.getAttribute("commandfor");
          if ((root instanceof Document || root instanceof ShadowRoot) && idref) {
            return root.getElementById(idref) || null;
          }
          return null;
        }
      },
      command: {
        enumerable: true,
        configurable: true,
        get() {
          const value = this.getAttribute("command") || "";
          if (value.startsWith("--")) return value;
          const valueLower = value.toLowerCase();
          switch (valueLower) {
            case "show-modal":
            case "request-close":
            case "close":
            case "toggle-popover":
            case "hide-popover":
            case "show-popover":
              return valueLower;
          }
          return "";
        },
        set(value) {
          this.setAttribute("command", value);
        }
      },
      invokeAction: {
        enumerable: false,
        configurable: true,
        get() {
          throw new Error(
            `invokeAction is deprecated. It has been renamed to command`
          );
        },
        set(value) {
          throw new Error(
            `invokeAction is deprecated. It has been renamed to command`
          );
        }
      },
      invokeTargetElement: {
        enumerable: false,
        configurable: true,
        get() {
          throw new Error(
            `invokeTargetElement is deprecated. It has been renamed to command`
          );
        },
        set(value) {
          throw new Error(
            `invokeTargetElement is deprecated. It has been renamed to command`
          );
        }
      }
    });
  }
  const onHandlers = /* @__PURE__ */ new WeakMap();
  Object.defineProperties(HTMLElement.prototype, {
    oncommand: {
      enumerable: true,
      configurable: true,
      get() {
        oncommandObserver.takeRecords();
        return onHandlers.get(this) || null;
      },
      set(handler) {
        const existing = onHandlers.get(this) || null;
        if (existing) {
          this.removeEventListener("command", existing);
        }
        onHandlers.set(
          this,
          typeof handler === "object" || typeof handler === "function" ? handler : null
        );
        if (typeof handler == "function") {
          this.addEventListener("command", handler);
        }
      }
    }
  });
  function applyOnCommandHandler(els) {
    for (const el of els) {
      el.oncommand = new Function("event", el.getAttribute("oncommand"));
    }
  }
  const oncommandObserver = new MutationObserver((records) => {
    for (const record of records) {
      const { target } = record;
      if (record.type === "childList") {
        applyOnCommandHandler(target.querySelectorAll("[oncommand]"));
      } else {
        applyOnCommandHandler([target]);
      }
    }
  });
  oncommandObserver.observe(document, {
    subtree: true,
    childList: true,
    attributeFilter: ["oncommand"]
  });
  applyOnCommandHandler(document.querySelectorAll("[oncommand]"));
  const processedEvents = /* @__PURE__ */ new WeakSet();
  function handleInvokerActivation(event) {
    if (processedEvents.has(event)) return;
    processedEvents.add(event);
    if (event.defaultPrevented) return;
    if (event.type !== "click") return;
    const oldInvoker = event.target.closest(
      "button[invoketarget], button[invokeaction], input[invoketarget], input[invokeaction]"
    );
    if (oldInvoker) {
      console.warn(
        "Elements with `invoketarget` or `invokeaction` are deprecated and should be renamed to use `commandfor` and `command` respectively"
      );
      if (oldInvoker.matches("input")) {
        throw new Error("Input elements no longer support `commandfor`");
      }
    }
    const source = event.target.closest("button[commandfor], button[command]");
    if (!source) return;
    if (source.form && source.getAttribute("type") !== "button") {
      event.preventDefault();
      throw new Error(
        "Element with `commandFor` is a form participant. It should explicitly set `type=button` in order for `commandFor` to work. In order for it to act as a Submit button, it must not have command or commandfor attributes"
      );
    }
    if (source.hasAttribute("command") !== source.hasAttribute("commandfor")) {
      const attr4 = source.hasAttribute("command") ? "command" : "commandfor";
      const missing = source.hasAttribute("command") ? "commandfor" : "command";
      throw new Error(
        `Element with ${attr4} attribute must also have a ${missing} attribute to function.`
      );
    }
    if (source.command !== "show-popover" && source.command !== "hide-popover" && source.command !== "toggle-popover" && source.command !== "show-modal" && source.command !== "request-close" && source.command !== "close" && !source.command.startsWith("--")) {
      console.warn(
        `"${source.command}" is not a valid command value. Custom commands must begin with --`
      );
      return;
    }
    const invokee = source.commandForElement;
    if (!invokee) return;
    const invokeEvent = new CommandEvent("command", {
      command: source.command,
      source,
      cancelable: true
    });
    invokee.dispatchEvent(invokeEvent);
    if (invokeEvent.defaultPrevented)
      return;
    const command = invokeEvent.command.toLowerCase();
    if (invokee.popover) {
      const canShow = !invokee.matches(":popover-open");
      const shouldShow = canShow && (command === "toggle-popover" || command === "show-popover");
      const shouldHide = !canShow && command === "hide-popover";
      if (shouldShow) {
        invokee.showPopover({ source });
      } else if (shouldHide) {
        invokee.hidePopover();
      }
    } else if (invokee.localName === "dialog") {
      const canShow = !invokee.hasAttribute("open");
      if (canShow && command == "show-modal") {
        invokee.showModal();
      } else if (!canShow && command == "close") {
        invokee.close(source.value ? source.value : void 0);
      } else if (!canShow && command == "request-close") {
        if (!HTMLDialogElement.prototype.requestClose) {
          HTMLDialogElement.prototype.requestClose = function() {
            const cancelEvent = new Event("cancel", { cancelable: true });
            this.dispatchEvent(cancelEvent);
            if (!cancelEvent.defaultPrevented) {
              this.close();
            }
          };
        }
        invokee.requestClose(source.value ? source.value : void 0);
      }
    }
  }
  function setupInvokeListeners(target) {
    target.addEventListener("click", handleInvokerActivation, true);
  }
  function observeShadowRoots(ElementClass, callback) {
    const attachShadow = ElementClass.prototype.attachShadow;
    ElementClass.prototype.attachShadow = function(init) {
      const shadow = attachShadow.call(this, init);
      callback(shadow);
      return shadow;
    };
    const attachInternals = ElementClass.prototype.attachInternals;
    ElementClass.prototype.attachInternals = function() {
      const internals = attachInternals.call(this);
      if (internals.shadowRoot) callback(internals.shadowRoot);
      return internals;
    };
  }
  applyInvokerMixin(HTMLButtonElement);
  observeShadowRoots(HTMLElement, (shadow) => {
    setupInvokeListeners(shadow);
    oncommandObserver.observe(shadow, { attributeFilter: ["oncommand"] });
    applyOnCommandHandler(shadow.querySelectorAll("[oncommand]"));
  });
  setupInvokeListeners(document);
  Object.assign(globalThis, { CommandEvent, InvokeEvent });
}

// node_modules/@digdir/designsystemet-web/node_modules/@u-elements/u-details/dist/polyfill.js
var IS_BROWSER2 = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.navigator !== "undefined";
var IS_ANDROID2 = IS_BROWSER2 && /android/i.test(navigator.userAgent);
var IS_FIREFOX = IS_BROWSER2 && /firefox/i.test(navigator.userAgent);
var _a2;
IS_BROWSER2 && // @ts-expect-error Typescript has not implemented userAgentData yet https://stackoverflow.com/a/71392474
/^Mac/i.test(((_a2 = navigator.userAgentData) == null ? void 0 : _a2.platform) || navigator.platform);
function attr2(el, name, value) {
  if (value === void 0) return el.getAttribute(name);
  if (value === null) el.removeAttribute(name);
  else if (el.getAttribute(name) !== value) el.setAttribute(name, value);
  return null;
}
var KEY = "__uDetailsPolyfillSummarys";
if (IS_BROWSER2 && IS_ANDROID2 && IS_FIREFOX && !window[KEY]) {
  window[KEY] = document.getElementsByTagName("summary");
  const handleMutation = () => {
    if (window[KEY])
      for (const summary of window[KEY]) {
        const details = summary.parentElement;
        attr2(summary, "role", "button");
        attr2(summary, "aria-expanded", `${!!details && !!details.open}`);
      }
  };
  requestAnimationFrame(handleMutation);
  new MutationObserver(handleMutation).observe(document, {
    attributeFilter: ["open"],
    attributes: true,
    childList: true,
    subtree: true
  });
}

// node_modules/@u-elements/u-datalist/dist/u-datalist.js
var __defProp2 = Object.defineProperty;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues3 = (a6, b4) => {
  for (var prop in b4 || (b4 = {}))
    if (__hasOwnProp2.call(b4, prop))
      __defNormalProp2(a6, prop, b4[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b4)) {
      if (__propIsEnum2.call(b4, prop))
        __defNormalProp2(a6, prop, b4[prop]);
    }
  return a6;
};
var IS_BROWSER3 = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.navigator !== "undefined";
var IS_ANDROID3 = IS_BROWSER3 && /android/i.test(navigator.userAgent);
var IS_IOS2 = IS_BROWSER3 && /iPad|iPhone|iPod/.test(navigator.userAgent);
var _a3;
IS_BROWSER3 && // @ts-expect-error Typescript has not implemented userAgentData yet https://stackoverflow.com/a/71392474
/^Mac/i.test(((_a3 = navigator.userAgentData) == null ? void 0 : _a3.platform) || navigator.platform);
var SAFE_LABELLEDBY = `${IS_ANDROID3 ? "data" : "aria"}-labelledby`;
var DISPLAY_BLOCK = ":host(:not([hidden])) { display: block }";
var FOCUS_OUTLINE2 = "outline: 1px dotted; outline: 5px auto Highlight; outline: 5px auto -webkit-focus-ring-color";
var UHTMLElement2 = typeof HTMLElement === "undefined" ? class {
} : HTMLElement;
function attr3(el, name, value) {
  if (value === void 0) return el.getAttribute(name);
  if (value === null) el.removeAttribute(name);
  else if (el.getAttribute(name) !== value) el.setAttribute(name, value);
  return null;
}
var events2 = (action, element, rest) => {
  for (const type of rest[0].split(",")) {
    rest[0] = type;
    Element.prototype[`${action}EventListener`].apply(element, rest);
  }
};
var on2 = (element, ...rest) => events2("add", element, rest);
var off2 = (element, ...rest) => events2("remove", element, rest);
var attachStyle = (element, css) => element.shadowRoot || element.attachShadow({ mode: "open" }).append(
  createElement2("slot"),
  // Unnamed slot does automatically render all top element nodes
  createElement2("style", css)
);
var observers2 = /* @__PURE__ */ new WeakMap();
var mutationObserver2 = (element, options) => {
  if (options === void 0) return observers2.get(element);
  try {
    observers2.get(element).disconnect();
    observers2.delete(element);
  } catch (_err) {
  }
  if (options) {
    const observer = new MutationObserver(
      (detail) => element.handleEvent({ type: "mutation", detail })
    );
    observer.observe(element, options);
    observers2.set(element, observer);
  }
};
var getRoot2 = (node) => {
  var _a22;
  const root = ((_a22 = node.getRootNode) == null ? void 0 : _a22.call(node)) || node.ownerDocument;
  return root instanceof Document || root instanceof ShadowRoot ? root : document;
};
var id2 = 0;
var useId2 = (el) => {
  if (!el) return "";
  if (!el.id) el.id = `:${el.nodeName.toLowerCase()}${(++id2).toString(32)}`;
  return el.id;
};
var createElement2 = (tagName, content, attrs) => {
  const el = document.createElement(tagName);
  if (content) el[tagName === "style" ? "textContent" : "innerHTML"] = content;
  return el;
};
var customElements2 = {
  define: (name, instance) => !IS_BROWSER3 || window.customElements.get(name) || window.customElements.define(name, instance)
};
var LIVE2;
var LIVE_SR_FIX2 = 0;
var speak2 = (text2) => {
  if (!LIVE2) {
    LIVE2 = createElement2("div");
    LIVE2.style.cssText = "position:fixed;overflow:hidden;width:1px;white-space:nowrap";
    attr3(LIVE2, "aria-live", "assertive");
  }
  if (!LIVE2.isConnected) document.body.append(LIVE2);
  if (text2) LIVE2.textContent = `${text2}${LIVE_SR_FIX2++ % 2 ? " " : ""}`;
};
var setValue2 = (input, data, type = "") => {
  var _a22, _b;
  const event = { bubbles: true, composed: true, data, inputType: type };
  const proto = HTMLInputElement.prototype;
  input.dispatchEvent(new InputEvent("beforeinput", event));
  (_b = (_a22 = Object.getOwnPropertyDescriptor(proto, "value")) == null ? void 0 : _a22.set) == null ? void 0 : _b.call(input, data);
  input.dispatchEvent(new InputEvent("input", event));
  input.dispatchEvent(new Event("change", { bubbles: true }));
};
var IS_PRESS2 = false;
var isMouseDown2 = (event) => {
  if ((event == null ? void 0 : event.type) === "mouseup") IS_PRESS2 = false;
  if ((event == null ? void 0 : event.type) === "mousedown") {
    IS_PRESS2 = true;
    on2(document, "mouseup", isMouseDown2, { once: true });
  }
  return IS_PRESS2;
};
var declarativeShadowRoot2 = (style, slot = "<slot></slot>") => `<template shadowrootmode="open">${slot}<style>${style}</style></template>`;
var DISABLED = "disabled";
var SELECTED = "selected";
var UHTMLOptionElement = class extends UHTMLElement2 {
  // Using ES2015 syntax for backwards compatibility
  static get observedAttributes() {
    return [DISABLED, SELECTED];
  }
  connectedCallback() {
    if (!IS_IOS2) this.tabIndex = -1;
    if (!this.hasAttribute("role")) attr3(this, "role", "option");
    this.attributeChangedCallback();
  }
  attributeChangedCallback() {
    attr3(this, "aria-disabled", `${this.disabled}`);
    attr3(this, "aria-selected", `${this.selected}`);
  }
  /** Sets or retrieves whether the option in the list box is the default item. */
  get defaultSelected() {
    return this[SELECTED];
  }
  set defaultSelected(value) {
    this[SELECTED] = value;
  }
  get disabled() {
    return attr3(this, DISABLED) !== null;
  }
  set disabled(value) {
    attr3(this, DISABLED, value ? "" : null);
  }
  /** Retrieves a reference to the form that the object is embedded in. */
  get form() {
    return this.closest("form");
  }
  /** Sets or retrieves the ordinal position of an option in a list box. */
  get index() {
    var _a22;
    return [
      ...((_a22 = this.parentElement) == null ? void 0 : _a22.options) || [this]
    ].indexOf(this);
  }
  /** Sets or retrieves a value that you can use to implement your own label functionality for the object. */
  get label() {
    var _a22;
    return (_a22 = attr3(this, "label")) != null ? _a22 : this.text;
  }
  set label(value) {
    attr3(this, "label", value);
  }
  get selected() {
    return attr3(this, SELECTED) !== null;
  }
  set selected(value) {
    attr3(this, SELECTED, value ? "" : null);
  }
  /** Sets or retrieves the text string specified by the option tag. */
  get text() {
    var _a22;
    return ((_a22 = this.textContent) == null ? void 0 : _a22.trim()) || "";
  }
  set text(text2) {
    this.textContent = text2;
  }
  /** Sets or retrieves the value which is returned to the server when the form control is submitted. */
  get value() {
    var _a22;
    return (_a22 = attr3(this, "value")) != null ? _a22 : this.text;
  }
  set value(value) {
    attr3(this, "value", value);
  }
};
customElements2.define("u-option", UHTMLOptionElement);
var UHTMLDataListStyle = `${DISPLAY_BLOCK}
::slotted([role="option"]) { display: block; cursor: pointer }
::slotted([role="option"]:focus) { ${FOCUS_OUTLINE2} }
::slotted([role="option"][aria-hidden="true"]),
::slotted([role="option"][disabled]),
::slotted([role="option"][hidden]) { display: none !important }`;
var UHTMLDataListShadowRoot = declarativeShadowRoot2(UHTMLDataListStyle);
var LIVE_TIMER;
var INPUT_DEBOUNCE = 0;
var IS_MOBILE2 = IS_IOS2 || IS_ANDROID3;
var EVENTS2 = "click,focusout,input,keydown,mousedown,mouseup";
var EVENTS_INPUT = "focus,focusin,blur,focusout";
var TEXTS2 = {
  singular: "%d hit",
  plural: "%d hits"
};
var UHTMLDataListElement = class extends UHTMLElement2 {
  constructor() {
    super();
    this._texts = __spreadValues3({}, TEXTS2);
    this._value = "";
    this._of = "/";
    attachStyle(this, UHTMLDataListStyle);
  }
  // Can be set by <u-combobox>
  // Using ES2015 syntax for backwards compatibility
  static get observedAttributes() {
    return ["id", ...Object.keys(TEXTS2).map((key) => `data-sr-${key}`)];
  }
  connectedCallback() {
    this.hidden = true;
    this._root = getRoot2(this);
    attr3(this, "role", "listbox");
    attr3(this, "tabindex", "-1");
    on2(this._root, "focusin", this);
    on2(this._root, "focus", this, true);
    mutationObserver2(this, {
      attributeFilter: ["disabled", "hidden", "label", "value"],
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true
    });
    setTimeout(() => this.attributeChangedCallback());
  }
  disconnectedCallback() {
    off2(this._root || this, "focus", this, true);
    off2(this._root || this, "focusin", this);
    mutationObserver2(this, false);
    disconnectInput(this);
    this._root = void 0;
  }
  attributeChangedCallback(prop, _prev, next) {
    const text2 = prop == null ? void 0 : prop.split("data-sr-")[1];
    const css = `input[list="${this.id}"]`;
    if (TEXTS2[text2]) this._texts[text2] = next || TEXTS2[text2];
    else if (this._root) {
      if (this._input) setupInput(this, this._input);
      for (const input of this._root.querySelectorAll(css))
        setupInput(this, input);
    }
  }
  handleEvent(event) {
    const { target, type } = event;
    if (event.defaultPrevented) return;
    if (type === "click") onClick2(this, event);
    if (type === "focus" || type === "focusin") onFocus2(this, event);
    if (type === "blur" || type === "focusout") onBlur2(this, event);
    if (type === "keydown") onKeyDown2(this, event);
    if (type === "mousedown" && this.contains(target))
      isMouseDown2(event);
    if (type === "mutation" || type === "input") {
      clearTimeout(INPUT_DEBOUNCE);
      INPUT_DEBOUNCE = setTimeout(onInput2, 0, this, event);
    }
  }
  get options() {
    var _a22;
    if (!this._options) {
      const tag = (_a22 = this.querySelector('[role="option"],option')) == null ? void 0 : _a22.nodeName;
      if (tag) this._options = this.getElementsByTagName(tag);
    }
    return this._options || this.getElementsByTagName("option");
  }
};
var isDisabled2 = (input) => (input == null ? void 0 : input.disabled) || (input == null ? void 0 : input.readOnly) || false;
var setExpanded = (self, open) => {
  var _a22, _b, _c;
  if (self.hidden !== open) return;
  self.hidden = isDisabled2(self == null ? void 0 : self._input) || !open;
  (_a22 = mutationObserver2(self)) == null ? void 0 : _a22.takeRecords();
  const isPopover = self.isConnected && self.popover && ((_b = self._input) == null ? void 0 : _b.isConnected) && ((_c = self._input) == null ? void 0 : _c.popoverTargetElement) === self;
  if (self._input) setupInput(self, self._input, open);
  if (isPopover) attr3(self, "popover", "manual");
  if (isPopover) self.togglePopover(open);
  if (open) onInput2(self);
};
var disconnectInput = (self) => {
  if (!self._input) return;
  off2(self._input || self, EVENTS_INPUT, self);
  off2(self._root || self, EVENTS2, self);
  setExpanded(self, false);
  self._input = void 0;
};
var setupInput = (self, input, open = false) => {
  if (self.popover) attr3(input, "popovertarget", useId2(self));
  on2(input, EVENTS_INPUT, self, true);
  attr3(input, "aria-autocomplete", "list");
  attr3(input, "aria-controls", useId2(self));
  attr3(input, "aria-expanded", `${!IS_MOBILE2 || open}`);
  attr3(input, "autocomplete", "off");
  attr3(input, "role", isDisabled2(input) ? null : "combobox");
};
var onFocus2 = (self, event) => {
  var _a22;
  const isInput = event.target instanceof HTMLInputElement;
  if (isInput && event.isTrusted) event.stopImmediatePropagation();
  if (self._input !== event.target && isInput && event.target.list === self) {
    if (self._input) disconnectInput(self);
    self._input = event.target;
    self._input.dispatchEvent(new FocusEvent("focus"));
    self._input.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
    attr3(self, SAFE_LABELLEDBY, useId2((_a22 = self._input.labels) == null ? void 0 : _a22[0]));
    on2(self._root || self, EVENTS2, self);
    setExpanded(self, attr3(self._input, "inputmode") !== "none");
    speak2();
  }
};
var onBlur2 = (self, event) => {
  if (!IS_ANDROID3 && !isMouseDown2() && self._input)
    setTimeout(onBlurred2, 0, self);
  if (event.target === self._input && event.isTrusted)
    event.stopImmediatePropagation();
};
var onBlurred2 = (self) => {
  var _a22;
  const relatedTarget = ((_a22 = self._root) == null ? void 0 : _a22.activeElement) || null;
  const input = self._input;
  if (input && input !== relatedTarget && !self.contains(relatedTarget)) {
    input.dispatchEvent(new FocusEvent("blur", { relatedTarget }));
    input.dispatchEvent(
      new FocusEvent("focusout", { bubbles: true, relatedTarget })
    );
    disconnectInput(self);
  }
};
var onClick2 = (self, { target }) => {
  var _a22;
  if (!self._input || self._input === target) return setExpanded(self, true);
  for (const opt of self.options)
    if (opt.contains(target)) {
      if (attr3(self, "aria-multiselectable") !== "true") {
        (_a22 = self._input) == null ? void 0 : _a22.focus();
        setExpanded(self, false);
      }
      return setValue2(self._input, opt.value);
    }
  if (IS_ANDROID3) onBlurred2(self);
};
var onKeyDown2 = (self, e2) => {
  var _a22;
  const { key, target, altKey, ctrlKey, shiftKey, metaKey } = e2;
  const isEscape = key === "Escape" || key === "Esc";
  if (altKey || ctrlKey || metaKey || shiftKey || key === "Tab") return;
  if (isEscape && !self.hidden) e2 == null ? void 0 : e2.preventDefault();
  setExpanded(self, !isEscape);
  const options = [...self.options].filter(
    (el) => attr3(el, "aria-hidden") !== "true" && el.offsetHeight
  );
  const prev = options.indexOf(target);
  let next = -1;
  if (key === "ArrowDown") next = (prev + 1) % options.length;
  if (key === "ArrowUp") next = (~prev ? prev : options.length) - 1;
  if (~prev) {
    if (key === "Home" || key === "PageUp") next = 0;
    if (key === "End" || key === "PageDown") next = options.length - 1;
    if (key === "Enter") {
      options[prev].click();
      return e2.preventDefault();
    }
  }
  if (options[next]) for (const option of options) option.tabIndex = -1;
  if (options[next]) e2.preventDefault();
  (_a22 = options[next] || self._input) == null ? void 0 : _a22.focus();
  if (!options[next] && key === "ArrowUp")
    setTimeout(() => {
      var _a32;
      return (_a32 = self._input) == null ? void 0 : _a32.setSelectionRange(999, 999);
    });
};
var onInput2 = (self, e2) => {
  const { _texts, _root, _input, options } = self;
  const value = (_input == null ? void 0 : _input.value.toLowerCase().trim()) || "";
  const filter = !self.hasAttribute("data-nofilter");
  const hidden = [];
  const visible = [];
  for (const opt of options) {
    const hide2 = opt.disabled || opt.hidden || filter && !opt.label.toLowerCase().includes(value);
    (hide2 ? hidden : visible).push(opt);
  }
  for (const opt of hidden) attr3(opt, "aria-hidden", "true");
  for (const opt of visible) attr3(opt, "aria-hidden", "false");
  const total = visible.length;
  clearTimeout(LIVE_TIMER);
  if ((e2 == null ? void 0 : e2.type) === "input" && value !== self._value)
    LIVE_TIMER = setTimeout(() => {
      const text2 = `${!total && self.innerText.trim() || `${_texts[total === 1 ? "singular" : "plural"]}`.replace("%d", `${total}`)}`;
      if (!self.hidden && (_root == null ? void 0 : _root.activeElement) === _input) speak2(text2);
      self._value = value;
    }, 1e3);
  let idx = 0;
  if (IS_IOS2)
    for (const opt of visible)
      attr3(opt, "title", `${++idx} ${self._of} ${total}`);
};
if (IS_BROWSER3)
  Object.defineProperty(HTMLInputElement.prototype, "list", {
    configurable: true,
    enumerable: true,
    get() {
      return getRoot2(this).getElementById(attr3(this, "list") || "");
    }
  });
customElements2.define("u-datalist", UHTMLDataListElement);

// node_modules/@digdir/designsystemet-web/dist/esm/index.js
t() && !isSupported() && apply();
export {
  c5 as DSBreadcrumbsElement,
  s6 as DSErrorSummaryElement,
  E2 as DSFieldElement,
  f4 as DSPaginationElement,
  c7 as DSSuggestionElement,
  i4 as DSTabElement,
  r4 as DSTabListElement,
  a5 as DSTabPanelElement,
  n2 as DSTabsElement,
  UHTMLDataListElement,
  UHTMLDataListShadowRoot,
  UHTMLDataListStyle,
  d3 as pagination,
  T as setTooltipElement
};
//# sourceMappingURL=@digdir_designsystemet-web.js.map
