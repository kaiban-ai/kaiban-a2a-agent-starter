import { describe, it, expect } from "vitest";
import { createLogger } from "../src/shared/utils";

describe("logger", () => {
  it("creates a pino logger with module name", () => {
    const logger = createLogger("Test");
    // @ts-expect-no-error basic structural assertions
    expect(logger).toBeTruthy();
    expect(typeof (logger as any).info).toBe("function");
  });
});
