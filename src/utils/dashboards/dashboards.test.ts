import { calculateDashboardStats } from "./dashboards";
import type { Client, Deal } from "../../types";

describe("calculateDashboardStats", () => {
  const userId = "user-1";
  const today = new Date().toISOString();

  const clients: Client[] = [
    { id: "c1", name: "Client 1", phone: "", email: "", company: "", createdAt: today, createdBy: userId },
    { id: "c2", name: "Client 2", phone: "", email: "", company: "", createdAt: today, createdBy: "other-user" },
    { id: "c3", name: "Deleted", phone: "", email: "", company: "", createdAt: today, createdBy: userId, deleted: true },
  ];

  const deals: Deal[] = [
    { id: "d1", title: "Deal 1", clientId: "c1", amount: 1000, status: "new", createdAt: today, createdBy: userId },
    { id: "d2", title: "Deal 2", clientId: "c1", amount: 2000, status: "completed", createdAt: today, completedAt: today, createdBy: userId },
    { id: "d3", title: "Other Deal", clientId: "c1", amount: 3000, status: "new", createdAt: today, createdBy: "other-user" },
  ];

  it("calculates stats correctly", () => {
    const stats = calculateDashboardStats(clients, deals, userId);

    expect(stats.clients.total).toBe(1);
    expect(stats.clients.today).toBe(1);

    expect(stats.activeDeals.total).toBe(1);
    expect(stats.activeDeals.today).toBe(1);

    expect(stats.completedDeals.total).toBe(1);
    expect(stats.completedDeals.today).toBe(1);
  });

  it("returns zero stats when no data", () => {
    const stats = calculateDashboardStats([], [], userId);
    expect(stats.clients.total).toBe(0);
    expect(stats.activeDeals.total).toBe(0);
    expect(stats.completedDeals.total).toBe(0);
  });
});
