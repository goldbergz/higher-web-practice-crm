import { formatDate } from "../../helpers/formaters";
import { filterByPeriod } from "../../helpers/period";

import type { SortConfig } from "../../components";
import type { Client, Deal, Task } from "../../types";
import type {
  ReportPeriod,
  NewClientReportRow,
  ClientActivityReportRow,
} from "../../types/reports";

export const getNewClientsReport = (
  clients: Client[],
  period: ReportPeriod,
): NewClientReportRow[] => {
  const filtered = clients.filter(
    (client) => !client.deleted && filterByPeriod(client.createdAt, period),
  );

  return filtered.map((client) => ({
    clientId: client.id,
    clientName: client.name,
    company: client.company,
    createdAt: formatDate(client.createdAt),
  }));
};

export const getClientActivityReport = (
  clients: Client[],
  deals: Deal[],
  tasks: Task[],
): ClientActivityReportRow[] => {
  const activeClients = clients.filter((c) => !c.deleted);

  return activeClients.map((client) => {
    const clientDeals = deals.filter((d) => d.clientId === client.id);
    const clientDealIds = clientDeals.map((d) => d.id);
    const completedTasks = tasks.filter(
      (t) =>
        t.dealId &&
        clientDealIds.includes(t.dealId) &&
        t.status === "completed",
    );

    return {
      clientId: client.id,
      clientName: client.name,
      dealsCount: clientDeals.length,
      completedTasks: completedTasks.length,
    };
  });
};

export const sortNewClientsReport = (
  data: NewClientReportRow[],
  sort: SortConfig<NewClientReportRow> | null,
): NewClientReportRow[] => {
  if (!sort) return data;
  const { key, direction } = sort;
  return [...data].sort((a, b) => {
    const aVal = String(a[key] ?? "");
    const bVal = String(b[key] ?? "");
    const cmp = aVal.localeCompare(bVal, "ru");
    return direction === "asc" ? cmp : -cmp;
  });
};

export const sortClientActivityReport = (
  data: ClientActivityReportRow[],
  sort: SortConfig<ClientActivityReportRow> | null,
): ClientActivityReportRow[] => {
  if (!sort) return data;
  const { key, direction } = sort;
  return [...data].sort((a, b) => {
    if (key === "dealsCount") {
      return direction === "asc"
        ? a.dealsCount - b.dealsCount
        : b.dealsCount - a.dealsCount;
    }
    if (key === "completedTasks") {
      return direction === "asc"
        ? a.completedTasks - b.completedTasks
        : b.completedTasks - a.completedTasks;
    }
    const aVal = String(a[key] ?? "");
    const bVal = String(b[key] ?? "");
    const cmp = aVal.localeCompare(bVal, "ru");
    return direction === "asc" ? cmp : -cmp;
  });
};
