// projects/hviktor/src/test-setup.ts
if (typeof globalThis.CSS === "undefined") {
  Object.defineProperty(globalThis, "CSS", { value: { supports: () => false } });
}
//# sourceMappingURL=setup-test-setup.js.map
