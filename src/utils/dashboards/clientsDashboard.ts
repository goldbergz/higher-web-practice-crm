import type { Client, Deal } from "../../types";

export type TopClient = {
  id: string;
  name: string;
  company: string;
  dealsCount: number;
};

export const getTopActiveClients = (
  clients: Client[],
  deals: Deal[],
  userId: string,
  limit: number = 10,
): TopClient[] => {
  const userDeals = deals.filter((d) => d.createdBy === userId);

  const clientDealCounts = new Map<string, number>();
  userDeals.forEach((deal) => {
    const count = clientDealCounts.get(deal.clientId) || 0;
    clientDealCounts.set(deal.clientId, count + 1);
  });

  const clientsWithDeals: TopClient[] = clients
    .filter((c) => !c.deleted && clientDealCounts.has(c.id))
    .map((c) => ({
      id: c.id,
      name: c.name,
      company: c.company,
      dealsCount: clientDealCounts.get(c.id) || 0,
    }));

  return clientsWithDeals
    .sort((a, b) => b.dealsCount - a.dealsCount)
    .slice(0, limit);
};
