import { getTotalPages, paginateData } from "./pagination";

describe("paginateData", () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it("returns first page", () => {
    expect(paginateData(data, 1, 3)).toEqual([1, 2, 3]);
  });

  it("returns second page", () => {
    expect(paginateData(data, 2, 3)).toEqual([4, 5, 6]);
  });

  it("returns last partial page", () => {
    expect(paginateData(data, 4, 3)).toEqual([10]);
  });

  it("returns all data when pageSize equals length", () => {
    expect(paginateData(data, 1, 10)).toEqual(data);
  });

  it("handles empty array", () => {
    expect(paginateData([], 1, 5)).toEqual([]);
  });
});

describe("getTotalPages", () => {
  it("calculates total pages correctly", () => {
    expect(getTotalPages(10, 3)).toBe(4);
  });

  it("returns 1 for single page", () => {
    expect(getTotalPages(3, 5)).toBe(1);
  });

  it("returns 1 for empty data", () => {
    expect(getTotalPages(0, 5)).toBe(1);
  });

  it("returns exact page count when divisible", () => {
    expect(getTotalPages(9, 3)).toBe(3);
  });
});
