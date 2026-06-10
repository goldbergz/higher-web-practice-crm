import { filterByPeriod, isThisMonth, isThisQuarter, isThisWeek, isToday } from "./period";

describe("isToday", () => {
  it("returns true for today", () => {
    const today = new Date().toISOString();
    expect(isToday(today)).toBe(true);
  });

  it("returns false for yesterday", () => {
    const yesterday = new Date(Date.now() - 86400000).toISOString();
    expect(isToday(yesterday)).toBe(false);
  });
});

describe("isThisWeek", () => {
  it("returns true for today", () => {
    expect(isThisWeek(new Date().toISOString())).toBe(true);
  });

  it("returns false for a date last month", () => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    expect(isThisWeek(lastMonth.toISOString())).toBe(false);
  });
});

describe("isThisMonth", () => {
  it("returns true for today", () => {
    expect(isThisMonth(new Date().toISOString())).toBe(true);
  });

  it("returns false for last year", () => {
    const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    expect(isThisMonth(lastYear.toISOString())).toBe(false);
  });
});

describe("isThisQuarter", () => {
  it("returns true for today", () => {
    expect(isThisQuarter(new Date().toISOString())).toBe(true);
  });

  it("returns false for a date two quarters ago", () => {
    const past = new Date();
    past.setMonth(past.getMonth() - 6);
    expect(isThisQuarter(past.toISOString())).toBe(false);
  });
});

describe("filterByPeriod", () => {
  it("returns false for undefined date", () => {
    expect(filterByPeriod(undefined, "week")).toBe(false);
  });

  it("delegates to isThisWeek for 'week'", () => {
    const today = new Date().toISOString();
    expect(filterByPeriod(today, "week")).toBe(true);
  });

  it("delegates to isThisMonth for 'month'", () => {
    const today = new Date().toISOString();
    expect(filterByPeriod(today, "month")).toBe(true);
  });

  it("delegates to isThisQuarter for 'quarter'", () => {
    const today = new Date().toISOString();
    expect(filterByPeriod(today, "quarter")).toBe(true);
  });

  it("returns false for unknown period", () => {
    expect(filterByPeriod(new Date().toISOString(), "week")).toBe(true);
  });
});
