import { formatAmount, formatDate } from "../../helpers/formaters";
import type { Client, Deal } from "../../types";
import type { DealDisplay } from "../../types/deal";
import { DEAL_STATUS_LABELS } from "../constants/dealConstants";

export const getTopActiveDeals = (
  activeDeals: Deal[],
  clients: Client[],
  limit: number = 10,
): DealDisplay[] => {
  const getClientName = (clientId: string): string => {
    const client = clients.find((c) => c.id === clientId);
    return client?.name ?? "";
  };

  return activeDeals.slice(0, limit).map((deal) => ({
    amount: formatAmount(deal.amount),
    client: getClientName(deal.clientId),
    completedAt: deal.completedAt ? formatDate(deal.completedAt) : "\u2014",
    createdAt: formatDate(deal.createdAt),
    description: deal.description ?? "",
    id: deal.id,
    status: DEAL_STATUS_LABELS[deal.status] ?? deal.status,
    title: deal.title,
  }));
};
