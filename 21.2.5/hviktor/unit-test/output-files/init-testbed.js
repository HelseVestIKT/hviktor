import {
  __decorateElement,
  __decoratorStart,
  __runInitializers
} from "./chunk-RSTWSNOR.js";

// angular:test-bed-init:angular:test-bed-init
import { NgModule } from "@angular/core";
import { getTestBed, \u0275getCleanupHook as getCleanupHook } from "@angular/core/testing";
import { BrowserTestingModule, platformBrowserTesting } from "@angular/platform-browser/testing";
import { afterEach, beforeEach } from "vitest";
var providers = [];
beforeEach(getCleanupHook(false));
afterEach(getCleanupHook(true));
var ANGULAR_TESTBED_SETUP = /* @__PURE__ */ Symbol.for("@angular/cli/testbed-setup");
var _TestModule_decorators, _init;
if (!globalThis[ANGULAR_TESTBED_SETUP]) {
  globalThis[ANGULAR_TESTBED_SETUP] = true;
  _TestModule_decorators = [NgModule({
    providers: [...providers]
  })];
  class TestModule {
  }
  _init = __decoratorStart(null);
  TestModule = __decorateElement(_init, 0, "TestModule", _TestModule_decorators, TestModule);
  __runInitializers(_init, 1, TestModule);
  getTestBed().initTestEnvironment([BrowserTestingModule, TestModule], platformBrowserTesting(), {
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true
  });
}
//# sourceMappingURL=init-testbed.js.map
