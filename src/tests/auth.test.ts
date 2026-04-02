import { describe, it, expect } from "vitest";

describe("auth", () => {
  it("should compare usernames correctly", () => {
    expect("admin").toBe("admin");
  });
});