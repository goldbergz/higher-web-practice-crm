import type { Client } from "../types/client";
import type { DashboardStats } from "../types/dashboard";
import type { Deal, DealDisplay } from "../types/deal";
import type { Task } from "../types/task";
import { DEAL_STATUS_LABELS } from "./constants/dealConstants";
import { formatAmount, formatDate } from "./formaters";

const isToday = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

const isThisWeek = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const today = new Date();
  const startOfWeek = new Date(today);
  const dayOfWeek = today.getDay();
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  startOfWeek.setDate(today.getDate() - diff);
  startOfWeek.setHours(0, 0, 0, 0);
  return date >= startOfWeek && date <= today;
};

const isThisMonth = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth()
  );
};

const isThisQuarter = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const today = new Date();
  const currentQuarter = Math.floor(today.getMonth() / 3);
  const dateQuarter = Math.floor(date.getMonth() / 3);
  return (
    date.getFullYear() === today.getFullYear() && dateQuarter === currentQuarter
  );
};

export const calculateDashboardStats = (
  clients: Client[],
  deals: Deal[],
  userId: string,
): DashboardStats => {
  const userClients = clients.filter(
    (c) => c.createdBy === userId && !c.deleted,
  );
  const userDeals = deals.filter((d) => d.createdBy === userId);
  const activeDeals = userDeals.filter(
    (d) => d.status === "new" || d.status === "in_progress",
  );
  const completedDeals = userDeals.filter((d) => d.status === "completed");

  return {
    clients: {
      total: userClients.length,
      today: userClients.filter((c) => isToday(c.createdAt)).length,
      week: userClients.filter((c) => isThisWeek(c.createdAt)).length,
      month: userClients.filter((c) => isThisMonth(c.createdAt)).length,
      quarter: userClients.filter((c) => isThisQuarter(c.createdAt)).length,
    },
    activeDeals: {
      total: activeDeals.length,
      today: activeDeals.filter((d) => isToday(d.createdAt)).length,
      week: activeDeals.filter((d) => isThisWeek(d.createdAt)).length,
      month: activeDeals.filter((d) => isThisMonth(d.createdAt)).length,
      quarter: activeDeals.filter((d) => isThisQuarter(d.createdAt)).length,
    },
    completedDeals: {
      total: completedDeals.length,
      today: completedDeals.filter((d) =>
        d.completedAt ? isToday(d.completedAt) : false,
      ).length,
      week: completedDeals.filter((d) =>
        d.completedAt ? isThisWeek(d.completedAt) : false,
      ).length,
      month: completedDeals.filter((d) =>
        d.completedAt ? isThisMonth(d.completedAt) : false,
      ).length,
      quarter: completedDeals.filter((d) =>
        d.completedAt ? isThisQuarter(d.completedAt) : false,
      ).length,
    },
  };
};

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

export const getLastTasks = (tasks: Task[], limit: number = 10): Task[] => {
  return [...tasks]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, limit);
};
