import {
  getClientActivityReport,
  getNewClientsReport,
  sortClientActivityReport,
  sortNewClientsReport,
} from "./clientsReports";
import type { Client, Deal, Task } from "../../types";

describe("getNewClientsReport", () => {
  const clients: Client[] = [
    { id: "c1", name: "Alice", phone: "", email: "", company: "Acme", createdAt: new Date().toISOString(), createdBy: "u1" },
    { id: "c2", name: "Bob", phone: "", email: "", company: "Beta", createdAt: new Date().toISOString(), createdBy: "u1", deleted: true },
    { id: "c3", name: "Charlie", phone: "", email: "", company: "Gamma", createdAt: "2020-01-01", createdBy: "u1" },
  ];

  it("returns non-deleted clients within period", () => {
    const result = getNewClientsReport(clients, "month");
    expect(result).toHaveLength(1);
    expect(result[0].clientName).toBe("Alice");
  });

  it("excludes deleted clients", () => {
    const result = getNewClientsReport(clients, "month");
    expect(result.find((c) => c.clientName === "Bob")).toBeUndefined();
  });
});

describe("getClientActivityReport", () => {
  const clients: Client[] = [
    { id: "c1", name: "Alice", phone: "", email: "", company: "Acme", createdAt: "", createdBy: "u1" },
    { id: "c2", name: "Bob", phone: "", email: "", company: "Beta", createdAt: "", createdBy: "u1", deleted: true },
  ];

  const deals: Deal[] = [
    { id: "d1", title: "Deal 1", clientId: "c1", amount: 100, status: "completed", createdAt: "", createdBy: "u1" },
    { id: "d2", title: "Deal 2", clientId: "c1", amount: 200, status: "new", createdAt: "", createdBy: "u1" },
  ];

  const tasks: Task[] = [
    { id: "t1", title: "Task 1", assigneeId: "u1", status: "completed", createdAt: "", createdBy: "u1", dealId: "d1" },
    { id: "t2", title: "Task 2", assigneeId: "u1", status: "completed", createdAt: "", createdBy: "u1", dealId: "d1" },
    { id: "t3", title: "Task 3", assigneeId: "u1", status: "in_progress", createdAt: "", createdBy: "u1", dealId: "d1" },
  ];

  it("computes activity for each client", () => {
    const result = getClientActivityReport(clients, deals, tasks);
    const alice = result.find((r) => r.clientName === "Alice");
    expect(alice).toBeDefined();
    expect(alice!.dealsCount).toBe(2);
    expect(alice!.completedTasks).toBe(2);
  });

  it("excludes deleted clients", () => {
    const result = getClientActivityReport(clients, deals, tasks);
    expect(result.find((r) => r.clientName === "Bob")).toBeUndefined();
  });
});

describe("sortNewClientsReport", () => {
  const data = [
    { clientId: "1", clientName: "Beta", company: "B", createdAt: "2024-02-01" },
    { clientId: "2", clientName: "Alpha", company: "A", createdAt: "2024-01-01" },
  ];

  it("sorts by clientName ascending", () => {
    const sorted = sortNewClientsReport(data, { key: "clientName", direction: "asc" });
    expect(sorted[0].clientName).toBe("Alpha");
    expect(sorted[1].clientName).toBe("Beta");
  });

  it("returns original when no sort", () => {
    expect(sortNewClientsReport(data, null)).toEqual(data);
  });
});

describe("sortClientActivityReport", () => {
  const data = [
    { clientId: "1", clientName: "Beta", dealsCount: 5, completedTasks: 10 },
    { clientId: "2", clientName: "Alpha", dealsCount: 10, completedTasks: 5 },
  ];

  it("sorts by dealsCount", () => {
    const sorted = sortClientActivityReport(data, { key: "dealsCount", direction: "asc" });
    expect(sorted[0].dealsCount).toBe(5);
  });

  it("sorts by completedTasks", () => {
    const sorted = sortClientActivityReport(data, { key: "completedTasks", direction: "desc" });
    expect(sorted[0].completedTasks).toBe(10);
  });
});
