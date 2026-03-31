// projects/hviktor/src/lib.spec.ts
import { describe, expect, it } from "vitest";
describe("hviktor library", () => {
  it("should be importable", async () => {
    const lib = await import("./chunk-L2SKETEP.js");
    expect(lib).toBeDefined();
  });
});
//# sourceMappingURL=spec-lib.js.map
