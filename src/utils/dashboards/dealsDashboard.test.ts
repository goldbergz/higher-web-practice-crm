import { getTopActiveDeals } from "./dealsDashboard";
import type { Client, Deal } from "../../types";

describe("getTopActiveDeals", () => {
  const clients: Client[] = [
    { id: "c1", name: "Alice", phone: "", email: "", company: "Acme", createdAt: "", createdBy: "u1" },
  ];

  const deals: Deal[] = [
    { id: "d1", title: "Website", clientId: "c1", amount: 50000, status: "new", createdAt: "2024-03-01T10:00:00Z", createdBy: "u1" },
    { id: "d2", title: "Mobile App", clientId: "c1", amount: 100000, status: "in_progress", createdAt: "2024-03-15T10:00:00Z", createdBy: "u1" },
  ];

  it("returns limited deals with formatted fields", () => {
    const result = getTopActiveDeals(deals, clients, 5);
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe("Website");
    expect(result[0].client).toBe("Alice");
    expect(result[0].amount).toContain("₽");
    expect(result[0].status).toBe("Новая");
    expect(result[0].completedAt).toBe("—");
  });

  it("respects limit parameter", () => {
    const result = getTopActiveDeals(deals, clients, 1);
    expect(result).toHaveLength(1);
  });

  it("returns empty array for empty input", () => {
    const result = getTopActiveDeals([], [], 5);
    expect(result).toHaveLength(0);
  });
});
