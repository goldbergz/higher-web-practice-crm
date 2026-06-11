import { getTopActiveClients } from "./clientsDashboard";

import type { Client, Deal } from "../../types";

describe("getTopActiveClients", () => {
  const clients: Client[] = [
    {
      id: "c1",
      name: "Alice",
      phone: "",
      email: "",
      company: "Acme",
      createdAt: "",
      createdBy: "u1",
    },
    {
      id: "c2",
      name: "Bob",
      phone: "",
      email: "",
      company: "Beta",
      createdAt: "",
      createdBy: "u1",
    },
    {
      id: "c3",
      name: "Charlie",
      phone: "",
      email: "",
      company: "Gamma",
      createdAt: "",
      createdBy: "u1",
      deleted: true,
    },
  ];

  const deals: Deal[] = [
    {
      id: "d1",
      title: "D1",
      clientId: "c1",
      amount: 100,
      status: "new",
      createdAt: "",
      createdBy: "u1",
    },
    {
      id: "d2",
      title: "D2",
      clientId: "c1",
      amount: 200,
      status: "completed",
      createdAt: "",
      createdBy: "u1",
    },
    {
      id: "d3",
      title: "D3",
      clientId: "c2",
      amount: 300,
      status: "new",
      createdAt: "",
      createdBy: "u1",
    },
    {
      id: "d4",
      title: "D4",
      clientId: "c3",
      amount: 400,
      status: "new",
      createdAt: "",
      createdBy: "u1",
    },
  ];

  it("returns top clients sorted by deals count descending", () => {
    const result = getTopActiveClients(clients, deals, "u1");
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("Alice");
    expect(result[0].dealsCount).toBe(2);
    expect(result[1].name).toBe("Bob");
    expect(result[1].dealsCount).toBe(1);
  });

  it("excludes deleted clients", () => {
    const result = getTopActiveClients(clients, deals, "u1");
    expect(result.find((c) => c.id === "c3")).toBeUndefined();
  });

  it("respects limit parameter", () => {
    const result = getTopActiveClients(clients, deals, "u1", 1);
    expect(result).toHaveLength(1);
  });

  it("filters by userId", () => {
    const result = getTopActiveClients(clients, deals, "other-user");
    expect(result).toHaveLength(0);
  });
});
