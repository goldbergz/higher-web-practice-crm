import {
  isToday,
  isThisWeek,
  isThisMonth,
  isThisQuarter,
} from "../../helpers/period";
import type { Client, Deal } from "../../types";
import type { DashboardStats } from "../../types/dashboard";

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
