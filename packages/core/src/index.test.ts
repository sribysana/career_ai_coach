import { describe, expect, it } from "vitest";
import { CORE_PACKAGE_VERSION } from "./index.js";

describe("core package scaffolding", () => {
  it("exposes the placeholder export", () => {
    expect(CORE_PACKAGE_VERSION).toBe("0.0.0");
  });
});
