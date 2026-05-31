import { formatDate } from "../../helpers/formaters";
import { filterByPeriod } from "../../helpers/period";

import type { SortConfig } from "../../components";
import type { Client, Deal } from "../../types";
import type { DealStatus } from "../../types/deal";
import type {
  DealsStageReportRow,
  ReportPeriod,
  SalesReportRow,
} from "../../types/reports";

export const getCompletedDealsReport = (
  deals: Deal[],
  clients: Client[],
  period: ReportPeriod,
): SalesReportRow[] => {
  const completedDeals = deals.filter(
    (deal) =>
      deal.status === "completed" &&
      deal.completedAt &&
      filterByPeriod(deal.completedAt, period),
  );

  return completedDeals.map((deal) => {
    const client = clients.find((c) => c.id === deal.clientId);
    return {
      dealId: deal.id,
      title: deal.title,
      clientName: client?.name ?? "",
      amount: deal.amount,
      completedAt: deal.completedAt ? formatDate(deal.completedAt) : "",
    };
  });
};

export const getDealStagesReport = (
  deals: Deal[],
  period: ReportPeriod,
): DealsStageReportRow[] => {
  const stages: DealStatus[] = ["in_progress", "new", "cancelled", "completed"];

  const filteredDeals = deals.filter((deal) =>
    filterByPeriod(deal.createdAt, period),
  );

  return stages
    .map((stage) => {
      const stageDeals = filteredDeals.filter((deal) => deal.status === stage);
      return {
        stage,
        dealsCount: stageDeals.length,
        totalAmount: stageDeals.reduce((sum, deal) => sum + deal.amount, 0),
      };
    })
    .filter((row) => row.dealsCount > 0);
};

export const sortSalesReport = (
  data: SalesReportRow[],
  sort: SortConfig<SalesReportRow> | null,
): SalesReportRow[] => {
  if (!sort) return data;
  const { key, direction } = sort;
  return [...data].sort((a, b) => {
    if (key === "amount") {
      return direction === "asc" ? a.amount - b.amount : b.amount - a.amount;
    }
    const aVal = String(a[key] ?? "");
    const bVal = String(b[key] ?? "");
    const cmp = aVal.localeCompare(bVal, "ru");
    return direction === "asc" ? cmp : -cmp;
  });
};

export const sortStagesReport = (
  data: DealsStageReportRow[],
  sort: SortConfig<DealsStageReportRow> | null,
): DealsStageReportRow[] => {
  if (!sort) return data;
  const { key, direction } = sort;
  return [...data].sort((a, b) => {
    if (key === "dealsCount") {
      return direction === "asc"
        ? a.dealsCount - b.dealsCount
        : b.dealsCount - a.dealsCount;
    }
    if (key === "totalAmount") {
      return direction === "asc"
        ? a.totalAmount - b.totalAmount
        : b.totalAmount - a.totalAmount;
    }
    const aVal = String(a[key] ?? "");
    const bVal = String(b[key] ?? "");
    const cmp = aVal.localeCompare(bVal, "ru");
    return direction === "asc" ? cmp : -cmp;
  });
};
