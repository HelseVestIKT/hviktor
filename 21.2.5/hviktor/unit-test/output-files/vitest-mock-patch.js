// angular:vitest-mock-patch:angular:vitest-mock-patch
import { vi } from "vitest";
var error = new Error(
  'The "vi.mock" and related methods are not supported for relative imports with the Angular unit-test system. Please use Angular TestBed for mocking dependencies.'
);
var { mock, doMock, importMock, unmock, doUnmock } = vi;
function patch(original) {
  return (path, ...args) => {
    if (typeof path === "string" && /^[./]/.test(path)) {
      throw error;
    }
    return original(path, ...args);
  };
}
vi.mock = patch(mock);
vi.doMock = patch(doMock);
vi.importMock = patch(importMock);
vi.unmock = patch(unmock);
vi.doUnmock = patch(doUnmock);
//# sourceMappingURL=vitest-mock-patch.js.map
