import {
  getCompletedDealsReport,
  getDealStagesReport,
  sortSalesReport,
  sortStagesReport,
} from "./dealsReports";

import type { Client, Deal } from "../../types";

describe("getCompletedDealsReport", () => {
  const clients: Client[] = [
    {
      id: "c1",
      name: "Alice",
      phone: "",
      email: "",
      company: "Acme",
      createdAt: "2024-01-01",
      createdBy: "u1",
    },
  ];

  const todayStr = new Date().toISOString();
  const lastYear = new Date();
  lastYear.setFullYear(lastYear.getFullYear() - 1);
  const lastYearStr = lastYear.toISOString();

  const deals: Deal[] = [
    {
      id: "d1",
      title: "Website",
      clientId: "c1",
      amount: 50000,
      status: "completed",
      createdAt: "2024-01-01",
      completedAt: todayStr,
      createdBy: "u1",
    },
    {
      id: "d2",
      title: "Not done",
      clientId: "c1",
      amount: 30000,
      status: "new",
      createdAt: "2024-01-01",
      createdBy: "u1",
    },
    {
      id: "d3",
      title: "Old completed",
      clientId: "c1",
      amount: 10000,
      status: "completed",
      createdAt: "2023-01-01",
      completedAt: lastYearStr,
      createdBy: "u1",
    },
  ];

  it("returns only completed deals within period", () => {
    const result = getCompletedDealsReport(deals, clients, "month");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Website");
    expect(result[0].clientName).toBe("Alice");
    expect(result[0].amount).toBe(50000);
  });

  it("filters out deals outside period", () => {
    const result = getCompletedDealsReport([deals[2]], clients, "week");
    expect(result).toHaveLength(0);
  });
});

describe("getDealStagesReport", () => {
  const deals: Deal[] = [
    {
      id: "d1",
      title: "D1",
      clientId: "c1",
      amount: 100,
      status: "new",
      createdAt: new Date().toISOString(),
      createdBy: "u1",
    },
    {
      id: "d2",
      title: "D2",
      clientId: "c1",
      amount: 200,
      status: "new",
      createdAt: new Date().toISOString(),
      createdBy: "u1",
    },
    {
      id: "d3",
      title: "D3",
      clientId: "c1",
      amount: 300,
      status: "completed",
      createdAt: new Date().toISOString(),
      createdBy: "u1",
    },
  ];

  it("groups deals by stage and filters zero-count stages", () => {
    const result = getDealStagesReport(deals, "month");
    const newStage = result.find((r) => r.stage === "new");
    const completedStage = result.find((r) => r.stage === "completed");
    expect(newStage?.dealsCount).toBe(2);
    expect(newStage?.totalAmount).toBe(300);
    expect(completedStage?.dealsCount).toBe(1);
    expect(completedStage?.totalAmount).toBe(300);
  });

  it("omits stages with zero deals", () => {
    const result = getDealStagesReport([], "month");
    expect(result).toHaveLength(0);
  });
});

describe("sortSalesReport", () => {
  const data = [
    {
      dealId: "1",
      title: "Beta",
      clientName: "B",
      amount: 200,
      completedAt: "2024-01-01",
    },
    {
      dealId: "2",
      title: "Alpha",
      clientName: "A",
      amount: 100,
      completedAt: "2024-01-02",
    },
  ];

  it("sorts by string key ascending", () => {
    const sorted = sortSalesReport(data, { key: "title", direction: "asc" });
    expect(sorted[0].title).toBe("Alpha");
    expect(sorted[1].title).toBe("Beta");
  });

  it("sorts by string key descending", () => {
    const sorted = sortSalesReport(data, { key: "title", direction: "desc" });
    expect(sorted[0].title).toBe("Beta");
    expect(sorted[1].title).toBe("Alpha");
  });

  it("sorts by amount ascending", () => {
    const sorted = sortSalesReport(data, { key: "amount", direction: "asc" });
    expect(sorted[0].amount).toBe(100);
    expect(sorted[1].amount).toBe(200);
  });

  it("returns original array when no sort config", () => {
    const sorted = sortSalesReport(data, null);
    expect(sorted).toEqual(data);
  });
});

describe("sortStagesReport", () => {
  const data = [
    { stage: "new" as const, dealsCount: 10, totalAmount: 5000 },
    { stage: "completed" as const, dealsCount: 5, totalAmount: 10000 },
  ];

  it("sorts by dealsCount", () => {
    const sorted = sortStagesReport(data, {
      key: "dealsCount",
      direction: "asc",
    });
    expect(sorted[0].dealsCount).toBe(5);
    expect(sorted[1].dealsCount).toBe(10);
  });

  it("sorts by totalAmount", () => {
    const sorted = sortStagesReport(data, {
      key: "totalAmount",
      direction: "desc",
    });
    expect(sorted[0].totalAmount).toBe(10000);
    expect(sorted[1].totalAmount).toBe(5000);
  });

  it("returns original array when no sort config", () => {
    const sorted = sortStagesReport(data, null);
    expect(sorted).toEqual(data);
  });
});
