import { getPageSize } from "./pageSizes";

describe("page size", () => {
  test("should return a4 dimensions for portrait", () => {
    expect(getPageSize("a4")).toEqual([595.28, 841.89]);
  });

  test("should return a4 dimensions for landscape", () => {
    expect(getPageSize("a4", "landscape")).toEqual([841.89, 595.28]);
  });

  test("should return null for unknown format", () => {
    expect(getPageSize("unknown", "landscape")).toBeNull();
  });
});
